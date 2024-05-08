import RecipeCard from "../Home/RecipeCard";

export default function Created({ recipes }) {
  return (
    <div className="p-4">
      <div className="divider divider-start text-xl text-primary">Created</div>
      <div className="grid grid-cols-1 gap-2 py-8 sm:grid-cols-3 lg:grid-cols-5">
        {recipes.length
          ? recipes.map((fav) => <RecipeCard {...fav} key={fav._id} />)
          : "(Nothing added)"}
      </div>
    </div>
  );
}
