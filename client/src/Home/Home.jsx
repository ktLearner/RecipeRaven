import { useAuth } from "../contexts/AuthProvider"
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import YourRecipes from "./YourRecipes";

export default function Home() {
  return <>
  <Navbar />
  <YourRecipes></YourRecipes>
  </>
}