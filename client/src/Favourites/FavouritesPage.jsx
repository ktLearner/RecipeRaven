import Navbar from "../Navbar/Navbar";
import { useAuth } from "../contexts/AuthProvider";
import { useRecipeFavs } from "../hooks/recipes";
import RecipeCard from "../Home/RecipeCard";

export default function FavouritesPage() {
  const { user } = useAuth();
  const { recipes, isLoading, error } = useRecipeFavs();

  if (!user || error)
    return (
      <div className="m-2 rounded-box border border-error bg-error bg-opacity-10 p-4 text-error">
        Error : {error?.toString()}
      </div>
    );

  if (!recipes) return <div>Error</div>;

  return (
    <>
      <Navbar />
      <h1 className="p-4 text-2xl font-bold text-primary">My favourites</h1>
      <div
        before="Add favourites"
        className="grid grid-cols-1 gap-2 py-8 empty:grid-cols-1 empty:text-center empty:text-3xl empty:opacity-40 empty:before:content-[attr(before)] sm:grid-cols-3 lg:grid-cols-5"
      >
        {!isLoading &&
          recipes.map?.((recipe) => {
            return <RecipeCard key={recipe._id} {...recipe} />;
          })}
      </div>
    </>
  );
}
