import { useEffect, useState } from "react";
import { server } from "../../helpers/server"
import RecipeCard from "./RecipeCard";

export default function YourRecipes() {
  const [recipes, setRecipes] = useState([]);
  
  useEffect(() => {
    server.get("recipe/my")
      .then(res => {
        setRecipes(res.data);
      })
      .catch(console.log);

    return () => setRecipes([]);
  }, []);

  return <div className="p-4">
    <h1 className="divider divider-start text-lg text-accent">Your recipes</h1>
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-2">
      {recipes.length ?
      recipes.map(recipe => <RecipeCard key={recipe._id} {...recipe} />)
      : "Create new Recipes!" }
    </div>
    
  </div>
}