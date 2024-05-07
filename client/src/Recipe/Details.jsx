import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom"
import { server } from "../../helpers/server";
import moment from "moment";
import { imgToObjectURL } from "../../helpers/utils";

function Loader() {
  return <div className="text-center">
    <span className="py-8 loading loading-spinner" />
  </div>
}

function RecipeTag(props) {
  return <span className="badge badge-primary">{props.text}</span>
}

function RecipeAllergen(props) {
  return <span className="badge badge-secondary">{props.text}</span>
}

function RecipeIngredient(props) {
  return <li className="flex justify-around p-4">
    <span>{props.name}</span>
    <span>{props.quantity}</span>  
  </li>
}

export default function RecipeDetails() {
  const [params] = useSearchParams();
  const [pageData, setPageData] = useState({});
  const [status, setStatus] = useState("loading"); // loading, error, success
  
  useEffect(() => {
    const controller = new AbortController;

    server.get(`/recipe?${params.toString()}`, {
      signal: controller.signal
    })
      .then(res => {
        const { data:resData } = res;
        resData.imageUrl = imgToObjectURL(resData.imageUrl.data);
        setPageData(resData);
        setStatus("success");
      })
      .catch(err => {
        console.log(err);
        setStatus("error");
      });

    return () => {
      controller.abort();
      URL.revokeObjectURL(pageData.imageUrl);
    }
  }, []);

  if (status === "loading") return <Loader />;

  if (status === "error") return <div className="text-error p-4">
    Some error occured while fetching the recipe!
  </div>

  return <section className="p-4">
    <div className="grid sm:grid-cols-2 gap-4">
      <img src={pageData.imageUrl} className="aspect-square object-cover" />
      <div className="flex flex-col gap-2 bg-base-300 p-4 rounded-lg">
        <span className="text-xl text-accent font-bold">{pageData.title}</span>
        <span>{pageData.cuisine}</span>
        <span className="text-warning">{pageData.calories}</span>
        <span className="flex gap-2">{pageData.tags?.map((tag, i) => <RecipeTag key={i} text={tag} />)}</span>
        <span className="flex gap-2">{pageData.allergens?.map((allergen, i) => <RecipeAllergen key={i} text={allergen} />)}</span>
        <span className="flex-grow bg-base-200 p-2 line-clamp-6">{pageData.description}</span>
        {/* TODO update after creating profile pg */}
        <span className="text-sm">Uploaded by <Link to="" className="link link-primary no-underline">{pageData.createdBy.name}</Link> {moment(pageData.createdAt).fromNow()}</span>
      </div>
      <div className="sm:col-span-2">
        <span className="text-primary">Ingredients : </span>
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 divide-x divide-neutral">
          {pageData.ingredients.map(ingredient => <RecipeIngredient key={ingredient._id} {...ingredient} />)}
        </ul>
      </div>
      <Link to={`/recipe/cook?rid=${params.get("rid")}`} className="btn btn-primary">Cook</Link>
    </div>
  </section>
}