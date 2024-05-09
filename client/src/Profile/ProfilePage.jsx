import { useEffect, useMemo } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useProfile } from "../hooks/userProfile";
import PublicInfo from "./PublicInfo";
import Favourites from "./Favourites";
import { useRecipeFavs, useRecipeMy } from "../hooks/recipes";
import Created from "./Created";
import { IoIosArrowBack } from "react-icons/io";

export default function Profile() {
  const [params] = useSearchParams();
  const { profile, isLoading, error } = useProfile(params?.get("id"));
  const { recipes: favRecipes } = useRecipeFavs(params?.get("id"));
  const { recipes: createdRecipes } = useRecipeMy(params?.get("id"));
  const navigate = useNavigate();

  if (!profile || error)
    return (
      <div className="border p-8">
        Error finding {error && error.toString()}
      </div>
    );

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <div className="m-4 flex items-center justify-between rounded bg-base-200 p-4">
        <button onClick={() => navigate(-1)} className="group btn btn-link">
          <IoIosArrowBack className="transition group-hover:-translate-x-1/2" />{" "}
          Back
        </button>
        <Link to="/" className="text-lg font-bold sm:text-2xl lg:text-3xl">
          Recipe<b className="text-yellow-300">Raven</b>
        </Link>
      </div>
      <PublicInfo {...profile} />
      <Favourites favourites={favRecipes} />
      <Created recipes={createdRecipes} />
    </>
  );
}
