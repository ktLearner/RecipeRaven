import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <div className="hero my-4">
      <div className="hero-overlay bg-opacity-100"></div>
      <div className="hero-content flex-col p-16">
        <h1 className="text-5xl font-bold text-warning">Hello world!</h1>
        <span>Welcome to our recipe app!</span>
        <a href="#all-recipes" className="btn btn-accent">
          Explore!
        </a>
        <Link
          to="/search"
          className="input input-bordered flex cursor-text items-center justify-between gap-6 rounded-lg p-4 lg:gap-24"
        >
          Search recipes
          <FaSearch />
        </Link>
      </div>
    </div>
  );
}
