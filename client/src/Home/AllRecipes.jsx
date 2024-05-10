import { useEffect, useMemo, useState } from "react";
import RecipeCard from "./RecipeCard";
import { useRecipesAll } from "../hooks/recipes";
import { fetchFavs } from "../../helpers/recipe";

export default function AllRecipes() {
  const { recipes, error, isLoading } = useRecipesAll();

  if (isLoading) return <div className="loading loading-spinner"></div>;

  return (
    <div className="p-4">
      <h1 className="divider divider-start text-lg text-accent lg:text-2xl">
        All recipes
      </h1>
      <div className="grid grid-cols-1 gap-2 py-8 sm:grid-cols-3 lg:grid-cols-5">
        {recipes.length
          ? recipes.map((recipe) => <RecipeCard key={recipe._id} {...recipe} />)
          : "(Empty)"}
      </div>
    </div>
  );
}
