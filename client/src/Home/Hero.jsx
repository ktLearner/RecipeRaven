import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Hero() {
  return <div className="hero my-4">
    <div className="hero-overlay bg-opacity-100"></div>
    <div className="hero-content p-16 flex-col">
      <h1 className="text-5xl font-bold text-warning">Hello world!</h1>
      <span>Welcome to our recipe app!</span>
      <a href="#all-recipes" className="btn btn-accent">Explore!</a>
      <Link to="/search" className="input input-bordered p-4 rounded-lg flex gap-6 lg:gap-24 justify-between items-center cursor-text">Search recipes<FaSearch /></Link>
    </div>
  </div>
}