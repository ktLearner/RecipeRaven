import { useEffect, useState } from "react";
import { server } from "../../helpers/server";
import Instructions from "./Instructions";
import MetaData from "./Meta";
import { FaCheck } from "react-icons/fa";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";

export default function CreateRecipe() {
  const [isIngredientsEmpty, setIsIngredientsEmpty] = useState(true);
  const [isInstructionsEmpty, setIsInstructionsEmpty] = useState(true);
  const [state, setState] = useState("idle"); // idle, loading, success, error
  const [isImageSet, setIsImageSet] = useState(false);

  const textMap = {
    idle: "Create!",
    error: "Create!",
    loading: "Uploading...",
    success: "Created successfully!",
  };

  const btnVariantMap = {
    idle: "btn-primary",
    error: "btn-primary",
    loading: "btn-disabled",
    success: "btn-success",
  };

  const iconMap = {
    idle: "",
    error: "",
    loading: <i className="loading loading-spinner" />,
    success: <FaCheck />,
  };

  function upload(e) {
    e.preventDefault();

    if (!isImageSet) return alert("Add image!");
    if (!["idle", "error"].includes(state)) return;
    if (isIngredientsEmpty) return alert("Fill in the ingredients first!");
    if (isInstructionsEmpty) return alert("Fill in the instructions first!");

    setState("loading");
    const data = new FormData(e.target);

    server
      .post("recipe/create", data)
      .then(() => {
        setState("success");
      })
      .catch((err) => {
        setState("error");
      });
  }

  return (
    <div className="bg-base-200 p-4">
      <h1 className="divider divider-secondary font-bold text-primary sm:text-xl">
        Create new Recipe
      </h1>
      <form onSubmit={upload} method="post">
        <MetaData
          isImageSet={setIsImageSet}
          isIngredientsEmpty={setIsIngredientsEmpty}
        />
        <span className="divider divider-start">Instructions</span>
        <Instructions isInstructionsEmpty={setIsInstructionsEmpty} />
        <i className="divider" />
        <button className={`btn ${btnVariantMap[state]}`}>
          {textMap[state]} {iconMap[state]}
        </button>
        {state === "success" && (
          <Link to="/" className="btn btn-neutral mx-2">
            Go back
          </Link>
        )}
      </form>
    </div>
  );
}
