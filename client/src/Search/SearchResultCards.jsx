import RecipeCard from "./RecipeCard";

export default function SearchResultCards({ isLoading, results }) {
  return isLoading ? (
    <div className="flex w-full justify-center p-8">
      <i className="loading loading-spinner" />
    </div>
  ) : (
    <div
      before="Search recipes"
      className="grid grid-cols-1 gap-2 p-4 empty:p-8 empty:text-center empty:text-3xl empty:text-gray-600 empty:before:content-[attr(before)] md:grid-cols-2 lg:grid-cols-3"
    >
      {results.map((result) => (
        <RecipeCard key={result._id} {...result} />
      ))}
    </div>
  );
}
