import { server } from "../../helpers/server";
import Instructions from "./Instructions";
import MetaData from "./Meta";

export default function CreateRecipe() {
  function upload(e) {
    e.preventDefault();

    const data = new FormData(e.target);

    server
      .post("createrecipe", Object.fromEntries(data))
      .then(console.log)
      .catch(console.error);
  }

  return <div className="p-4 bg-base-200">
    <h1 className="divider divider-secondary text-primary sm:text-xl font-bold">Create new Recipe</h1>
    <form onSubmit={upload} method="post">
      <MetaData />
      <span className="divider divider-start">Instructions</span>
      <Instructions />
      <i className="divider" />
      <button className="btn btn-primary">Create!</button>
    </form>
  </div>
}