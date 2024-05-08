import { useEffect, useState } from "react";
import { server } from "../../helpers/server"
import RecipeCard from "./RecipeCard";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

export default function YourRecipes() {
  const [recipes, setRecipes] = useState([]);
  
  useEffect(() => {
    const controller = new AbortController;

    server.get("recipe/my", {
      signal: controller.signal
    })
      .then(res => {
        setRecipes(res.data);
      })
      .catch(console.log);

    return () => {
      controller.abort();
      setRecipes([]);
    }
  }, []);

  return <div className="p-4">
    <h1 className="divider divider-start text-lg text-accent lg:text-2xl">Your recipes</h1>
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-2 py-8">
      {recipes.length ?
      recipes.map(recipe => <RecipeCard key={recipe._id} {...recipe} />)
      : <Link to="/recipe/create" className="btn btn-primary">Create new Recipe <FaPlus /></Link> }
    </div>
  </div>
}