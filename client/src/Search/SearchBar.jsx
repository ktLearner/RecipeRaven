import { FaFilter, FaSearch, FaSort } from "react-icons/fa";
import { useRecipes } from "../hooks/recipes";
import { debounce } from "../../helpers/utils";
import { useCallback, useEffect, useState } from "react";
import SearchResults from "./SearchResults";
import SearchResultCards from "./SearchResultCards";

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const { recipes, error, isLoading } = useRecipes(searchQuery);
  const [focused, setFocused] = useState(false);

  const [fullSearchQuery, setFullSearchQuery] = useState("");
  const { recipes: mainResults, isLoading: isLoadingMain } =
    useRecipes(fullSearchQuery);

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
    };

    setFullSearchQuery(query.q);
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
          onBlur={() => setFocused(false)}
          name="q"
          id="q"
          autoComplete="off"
        />
        <button className="btn btn-square btn-primary join-item">
          <FaSearch />
        </button>
        <button type="button" className="btn dropdown btn-outline join-item">
          <FaFilter />
          <input type="hidden" id="filter" name="filter" />
        </button>
        <button type="button" className="btn dropdown btn-outline join-item">
          <FaSort />
          <input type="hidden" id="sort" name="sort" />
        </button>
      </form>
      <SearchResults hide={!focused} isLoading={isLoading} results={recipes} />
      <SearchResultCards isLoading={isLoadingMain} results={mainResults} />
    </>
  );
}
