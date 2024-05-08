import RecipeCard from "../Home/RecipeCard";

export default function Favourites({ favourites }) {
  return (
    <div className="p-4">
      <div className="divider divider-start text-xl text-primary">
        Favourites
      </div>
      <div className="grid grid-cols-1 gap-2 py-8 sm:grid-cols-3 lg:grid-cols-5">
        {favourites.length
          ? favourites.map((fav) => <RecipeCard {...fav} key={fav._id} />)
          : "(Nothing added)"}
      </div>
    </div>
  );
}
