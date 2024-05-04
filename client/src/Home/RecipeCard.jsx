import moment from "moment";
import { Suspense, useEffect, useState } from "react";
import { Link } from "react-router-dom";

function RecipeTag(props) {
  return <span className="badge text-nowrap badge-primary">{props.text}</span>
}

function RecipeAllergen(props) {
  return <span className="badge text-nowrap badge-secondary">{props.text}</span>
}

export default function RecipeCard(props) {
  const [img, setImg] = useState(null);

  useEffect(() => {
    const view = new Uint8Array(props.imageUrl.data);
    const blob = new Blob([view], {type: "image.jpeg"});
    const url = URL.createObjectURL(blob);
    
    setImg(url);

    return () => {
      URL.revokeObjectURL(url);
    }
  }, []);
  
  return <div className="card max-sm:card-side shrink-0 bg-base-300">
    <figure className="p-4">
      <img src={img} className="size-52 rounded" alt="Recipe image" />
    </figure>
    <div className="card-body">
      <h1 className="card-title text-primary">{props.title}</h1>
      <span>Cuisine : {props.cuisine}</span>
      {props.tags && <span className="text-sm flex gap-1 items-center text-nowrap">{props.tags.map((tag, i) => <RecipeTag key={i} text={tag} />)}</span>}
      {props.allergens && <span className="text-sm flex gap-1 items-center">{props.allergens.map((allergen, i) => <RecipeAllergen key={i} text={allergen} />)}</span>}
      <span className="text-sm py-2 line-clamp-2">{props.description}</span>
      <span className="text-sm">By <span className="text-primary">{props.createdBy.name}</span></span>
      <span className="text-xs">Uploaded {moment(props.createdAt).fromNow()}</span>
      <Link to={`/recipe?rid=${props._id}`} className="btn btn-primary mt-2">View Recipe</Link>
    </div>
  </div>
}