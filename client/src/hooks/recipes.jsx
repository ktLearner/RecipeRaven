import { useEffect, useState } from "react";
import { server } from "../../helpers/server";

export function useRecipe(rid) {
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    server
      .get("/search?rid=" + rid, {
        signal: controller.signal,
      })
      .then((data) => setRecipe(data))
      .catch((e) => setError(e));

    return () => controller.abort();
  }, [rid]);

  return { recipe, error };
}

export function useRecipes(query) {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    setIsLoading(true);
    server
      .get("/search?q=" + query, {
        signal: controller.signal,
      })
      .then((data) => setRecipes(data["data"]))
      .catch((e) => setError(e))
      .finally(() => setIsLoading(false));

    return () => controller.abort();
  }, [query]);

  return { recipes, error, isLoading };
}
