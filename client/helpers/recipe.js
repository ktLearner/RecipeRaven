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