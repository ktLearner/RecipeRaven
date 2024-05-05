import { useEffect, useState } from "react";
import { server } from "../../helpers/server";
import RecipeCard from "./RecipeCard";

export default function AllRecipes() {
  const [recipes, setRecipes] = useState([]);
  
  useEffect(() => {
    const controller = new AbortController;

    server.get("recipe/all", {
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
    <h1 className="divider divider-start text-lg text-accent lg:text-2xl">All recipes</h1>
    <div className="py-8 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-2">
      {recipes.length ? recipes.map(recipe => <RecipeCard key={recipe._id} {...recipe} />) : "(Empty)"}
    </div>
  </div>
}