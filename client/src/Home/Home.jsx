
import Navbar from "../Navbar/Navbar";
import YourRecipes from "./YourRecipes";
import { Suspense } from "react";

export default function Home() {
  return <>
    <Navbar />
    <YourRecipes></YourRecipes>
  </>
}