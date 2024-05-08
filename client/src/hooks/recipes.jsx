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
      .then((res) => setRecipe(res["data"]))
      .catch((e) => setError(e));

    return () => controller.abort();
  }, [rid]);

  return { recipe, error };
}

export function useRecipesAll() {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    setIsLoading(true);
    server
      .get("/recipe/all", {
        signal: controller.signal,
      })
      .then((res) => {
        setRecipes(res.data);
        setError(null);
      })
      .catch((err) => {
        setError(err);
        setRecipes([]);
      })
      .finally(() => setIsLoading(false));

    return () => controller.abort();
  }, []);

  return { recipes, error, isLoading };
}

export function useRecipes(name, sort = [], filters = []) {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const sortQ = sort && sort.map((s) => "sort=" + s).join("&");
  let query = `q=${name}${sortQ ? "&" + sortQ : ""}`;

  useEffect(() => {
    const controller = new AbortController();

    setIsLoading(true);
    server
      .get("/search?" + query, {
        signal: controller.signal,
      })
      .then((res) => {
        setRecipes(res["data"]);
        setError(null);
      })
      .catch((e) => {
        setError(e);
        setRecipes([]);
      })
      .finally(() => setIsLoading(false));

    return () => controller.abort();
  }, [query]);

  return { recipes, error, isLoading };
}

export function useRecipeMy(uid) {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const params = uid ? { uid } : null;

    setIsLoading(true);
    server
      .get("/recipe/my", {
        signal: controller.signal,
        params,
      })
      .then((res) => {
        setRecipes(res.data);
        setError(null);
      })
      .catch((err) => {
        setError(err);
        setRecipes([]);
      })
      .finally(() => setIsLoading(false));

    return () => controller.abort();
  }, [uid]);

  return { recipes, error, isLoading };
}

export function useRecipeSuggestions(query) {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    setIsLoading(true);
    server
      .get(
        "/search/suggestions?q=" + query,
        {
          signal: controller.signal,
        },
        ["title", "createdBy"],
      )
      .then((res) => {
        setRecipes(res.data);
        setError(null);
      })
      .catch((err) => {
        setError(err);
        setRecipes([]);
      })
      .finally(() => setIsLoading(false));

    return () => controller.abort();
  }, [query]);

  return { recipes, error, isLoading };
}

export function useRecipeFavs(uid) {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const params = uid ? { uid } : null;

    setIsLoading(true);
    server
      .get("/recipe/favourites", {
        signal: controller.signal,
        params,
      })
      .then((res) => {
        setRecipes(res.data);
        setError(null);
      })
      .catch((err) => {
        setError(err);
        setRecipes([]);
      })
      .finally(() => setIsLoading(false));

    return () => controller.abort();
  }, [uid]);

  return { recipes, error, isLoading };
}
