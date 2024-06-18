
import Navbar from "../Navbar/Navbar";
import AllRecipes from "./AllRecipes";
import Hero from "./Hero";
import YourRecipes from "./YourRecipes";
import { Suspense } from "react";

export default function Home() {
  return <>
    <Navbar />
    <Hero />
    <YourRecipes />
    <h1 id="all-recipes" />
    <AllRecipes />
  </>
}