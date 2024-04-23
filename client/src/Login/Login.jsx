import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "./PasswordInput";
import reactLogo from "../assets/react.svg";
import { server } from "../../helpers/server";
import { useState } from "react";
import { useAuth } from "../contexts/AuthProvider";
import { FaCheck } from "react-icons/fa";

export default function Login() {
  const [status, setStatus] = useState("idle"); // idle, loading, success, error
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const btnVariantMap = {
    idle : "btn-accent",
    error: "btn-accent",
    loading : "",
    success : "btn-success"
  };

  const statusIconMap = {
    idle : null,
    error: null,
    loading : <span className='loading loading-spinner' />,
    success : <FaCheck />
  }

  function upload(e) {
    e.preventDefault();
    if (status !== "idle" && status !== "error") return false;

    setStatus("loading");
    let data = new FormData(e.target);
    data = Object.fromEntries(data);
    
    server.post("/login", data)
      .then(res => {
        setStatus("success");
        const { data: resData } = res;
        loginUser({...resData});
        navigate("/");
      })
      .catch(err => {
        setStatus("error");
        setError(err.response.data.error || err.message);
      });
  }

  return <form onSubmit={upload} method="post" className="p-8 gap-4 bg-base-300 card fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-max shadow-lg">
    <h1 className="text-xl text-center font-bold text-accent p-4 bg-base-200 rounded">
      Log In
      <img className="inline animate-spin ml-2" src={reactLogo} />
    </h1>
    <div className="divider m-0 p-0"></div>
    <div className="grid grid-cols-2 items-center">
      <label htmlFor="uname">Username or Email</label>
      <input className="input input-bordered input-ghost" placeholder="Username/Email" name="uname" id="uname" required />
    </div>
    <div className="grid grid-cols-2 items-center">
      <label htmlFor="pass">Password</label>
      <PasswordInput placeholder="Password" name="pass" id="pass" required />
    </div>
    {status === "error" && <div className="border rounded p-4 border-error text-error">{error}</div>}
    <button className={`btn ${btnVariantMap[status]} hover:scale-105`}>Log In {statusIconMap[status]}</button>
    <button className="btn hover:scale-105">Anonymous login</button>
    <div className="divider">Don't have an account ?</div>
    <Link to="/signup" className="btn btn-secondary hover:scale-105">Sign up!</Link>
  </form>
}