import { FaFilter, FaSearch, FaSort } from "react-icons/fa";
import { useRecipeSuggestions, useRecipes } from "../hooks/recipes";
import { debounce } from "../../helpers/utils";
import { useCallback, useState } from "react";
import SearchResults from "./SearchResults";
import Sort from "./Sort";
import Filter from "./Filter";

export default function SearchBar({ setFullSearchQuery }) {
  const [searchQuery, setSearchQuery] = useState("");
  const { recipes, error, isLoading } = useRecipeSuggestions(searchQuery);
  const [focused, setFocused] = useState(false);

  const searchInput = useCallback(
    debounce((e) => {
      setSearchQuery(e.target.value);
    }, 500),
    [],
  );

  function fullSearch(e) {
    e.preventDefault();
    const form = e.target;

    const query = {
      q: form.q.value,
      s: form.sort.value,
    };

    setFullSearchQuery([query.q, query.s && query.s.split(",")]);
  }

  return (
    <>
      <form
        method="get"
        onSubmit={fullSearch}
        className="join w-full bg-base-200 p-4"
      >
        <input
          className="input join-item input-bordered flex-grow lg:max-w-96"
          placeholder="Search"
          onInput={searchInput}
          onFocus={() => setFocused(true)}
          name="q"
          id="q"
          autoComplete="off"
        />
        <button className="btn btn-square btn-primary join-item">
          <FaSearch />
        </button>

        <Filter />
        <Sort />
      </form>
      <SearchResults hide={!focused} isLoading={isLoading} results={recipes} />
    </>
  );
}
