import { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { useRecipes } from "../hooks/recipes";
import SearchBar from "./SearchBar";
import SearchResultCards from "./SearchResultCards";

export default function SearchPage() {
  const [fullSearchQuery, setFullSearchQuery] = useState(["", [], []]);
  const { recipes, isLoading } = useRecipes(...fullSearchQuery);

  return (
    <>
      <Navbar></Navbar>
      <SearchBar setFullSearchQuery={setFullSearchQuery} />
      <SearchResultCards isLoading={isLoading} results={recipes} />
    </>
  );
}
