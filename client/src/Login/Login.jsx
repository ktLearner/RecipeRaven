import { Link } from "react-router-dom";
import PasswordInput from "./PasswordInput";
import reactLogo from "../assets/react.svg";

export default function Login() {
  return <form className="p-8 gap-4 bg-base-300 card fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-max shadow-lg">
    <h1 className="text-xl text-center font-bold text-accent p-4 bg-base-200 rounded">
      Log In
      <img className="inline animate-spin ml-2" src={reactLogo} />
    </h1>
    <div className="divider m-0 p-0"></div>
    <div className="grid grid-cols-2 items-center">
      <label htmlFor="uname">Username</label>
      <input className="input input-bordered input-ghost" placeholder="Username" name="uname" id="uname" />
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