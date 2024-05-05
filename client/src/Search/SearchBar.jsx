import { FaFilter, FaSort } from "react-icons/fa";

export default function SearchBar() {
  return <div className="flex gap-2 w-full p-4 bg-base-200">
    <input className="input" placeholder="Search recipes" />
    <button className="btn dropdown"><FaFilter /></button>
    <button className="btn dropdown"><FaSort /></button>
  </div>
}