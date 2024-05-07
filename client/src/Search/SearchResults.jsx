import { Link } from "react-router-dom";

function ResultLi({ resultText, recipeId, user }) {
  return (
    <li>
      <Link className="grid grid-cols-4" to={"/recipe?rid=" + recipeId}>
        <span className="col-span-3 text-info">{resultText}</span>
        <span className="text-right">{user}</span>
      </Link>
    </li>
  );
}

export default function SearchResults({ results, isLoading, hide }) {
  return (
    <ul
      className={`${isLoading ? "opacity-40" : "opacity-100"} ${hide ? "hidden" : null} menu mx-2 rounded-box rounded-se-none rounded-ss-none bg-base-200 shadow-lg empty:hidden lg:max-w-96`}
    >
      {isLoading && <progress className="progress progress-info m-2 w-full" />}
      {results.map((result) => (
        <ResultLi
          key={result._id}
          resultText={result.title}
          recipeId={result._id}
          user={result.createdBy.name}
        />
      ))}
    </ul>
  );
}
