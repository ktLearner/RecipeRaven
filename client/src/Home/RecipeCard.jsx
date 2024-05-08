import moment from "moment";
import { Suspense, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddFavButton from "../Recipe/ToggleFavButton";

function RecipeTag(props) {
  return <span className="badge badge-primary text-nowrap">{props.text}</span>;
}

function RecipeAllergen(props) {
  return (
    <span className="badge badge-secondary text-nowrap">{props.text}</span>
  );
}

export default function RecipeCard(props) {
  const [img, setImg] = useState(null);

  useEffect(() => {
    const view = new Uint8Array(props.imageUrl.data);
    const blob = new Blob([view], { type: "image.jpeg" });
    const url = URL.createObjectURL(blob);

    setImg(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, []);

  return (
    <div className="card shrink-0 bg-base-300 max-sm:card-side">
      <figure className="p-4">
        <img src={img} className="size-52 rounded" alt="Recipe image" />
      </figure>
      <div className="card-body">
        <h1 className="card-title text-primary">{props.title}</h1>
        <span>Cuisine : {props.cuisine}</span>
        {props.tags && (
          <span className="flex items-center gap-1 text-nowrap text-sm">
            {props.tags.map((tag, i) => (
              <RecipeTag key={i} text={tag} />
            ))}
          </span>
        )}
        {props.allergens && (
          <span className="flex items-center gap-1 text-sm">
            {props.allergens.map((allergen, i) => (
              <RecipeAllergen key={i} text={allergen} />
            ))}
          </span>
        )}
        <span className="line-clamp-2 py-2 text-sm">{props.description}</span>
        <span className="text-sm">
          By <span className="text-primary">{props.createdBy.name}</span>
        </span>
        <span className="text-xs">
          Uploaded {moment(props.createdAt).fromNow()}
        </span>
        <div className="flex items-baseline gap-2">
          <Link
            to={`/recipe?rid=${props._id}`}
            className="btn btn-primary mt-2 flex-grow"
          >
            View Recipe
          </Link>
          <AddFavButton rid={props._id} />
        </div>
      </div>
    </div>
  );
}
