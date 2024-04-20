import { Link } from "react-router-dom";
import PasswordInput from "./PasswordInput";
import reactLogo from "../assets/react.svg";
import { server } from "../../helpers/server";

export default function Login() {
  function upload(e) {
    e.preventDefault();

    let data = new FormData(e.target);
    data = Object.fromEntries(data);
    
    server.post("/login", data).then(res => {
      const { data: resData } = res;
      console.log(resData);
    });
  }

  return <form onSubmit={upload} method="post" className="p-8 gap-4 bg-base-300 card fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-max shadow-lg">
    <h1 className="text-xl text-center font-bold text-accent p-4 bg-base-200 rounded">
      Log In
      <img className="inline animate-spin ml-2" src={reactLogo} />
    </h1>
    <div className="divider m-0 p-0"></div>
    <div className="grid grid-cols-2 items-center">
      <label htmlFor="email">Email</label>
      <input className="input input-bordered input-ghost" placeholder="Email" name="email" id="email" />
    </div>
    <div className="grid grid-cols-2 items-center">
      <label htmlFor="pass">Password</label>
      <PasswordInput placeholder="Password" name="pass" id="pass" />
    </div>
    <button className="btn btn-accent hover:scale-105">Log In</button>
    <button className="btn hover:scale-105">Anonymous login</button>
    <div className="divider">Don't have an account ?</div>
    <Link to="/signup" className="btn btn-secondary hover:scale-105">Sign up!</Link>
  </form>
}