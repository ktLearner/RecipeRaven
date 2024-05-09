import { server } from "./server";

export function addFav(rid) {
  server.post("recipe/addfav")
    .then(() => {
      console.log("added to fav !");
    });
}

export async function fetchFavs() {
  try {
    const { data: favs } = await server.get("recipe/favourites");
    return favs;
  } catch(e) {
    throw e;
  }
}

export async function fetchRecipeMeta(path, params) {
  try {
    const { data } = await server.get("/recipe/"+path, {params})
    return data;
  } catch(e) {
    throw e;
  }
}