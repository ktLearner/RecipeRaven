import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../Login/PasswordInput";
import { useCallback, useEffect, useMemo, useState } from "react";
import generateAvatar from "../../helpers/generateAvatar";
import reactLogo from "../assets/react.svg";
import { server } from "../../helpers/server";
import { FaCheck } from "react-icons/fa";
import { debounce, throttle } from "../../helpers/utils";
import { v5 } from "uuid";
import crypot from "crypto";
import { useAuth } from "../contexts/AuthProvider";

export default function Signup() {
  const [avatar, setAvatar] = useState(generateAvatar());
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

  function uploadAvatar(e) {
    const file = e.target.files[0];
    const reader = new FileReader;
    reader.readAsDataURL(file);
    reader.addEventListener("load", () => setAvatar(reader.result));
  }

  function upload(e) {
    e.preventDefault();
    if (status !== "idle" && status !== "error") return false;  
    
    setStatus("loading");
    let data = new FormData(e.target);
    data = Object.fromEntries(data);
    data["avatar"] = avatar;
    data["uid"] = crypto.randomUUID();

    server.post("signup", data)
      .then(res => {
        setStatus("success");
        loginUser({...res.data});
        navigate("/");
      })
      .catch(res => {
        setStatus("error");
        setError(res.response.data.error);
      });
  }

  return <form method="post" onSubmit={upload} className="p-8 gap-4 bg-base-300 card fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-max shadow-lg">
    <h1 className="text-xl p-4 text-center font-bold text-accent bg-base-200 rounded">Sign up <img className="inline animate-spin duration-100" src={reactLogo} /></h1>
    <div className="divider m-0 p-0"></div>
    <div className="grid grid-cols-2 items-center">
      <label htmlFor="uname">Username</label>
      <input className="input input-bordered input-ghost" required placeholder="Username" name="uname" id="uname" />
    </div>
    <div className="grid grid-cols-2 items-center">
      <label htmlFor="email">Email</label>
      <input className="input input-bordered input-ghost" required placeholder="Email" name="email" id="email" />
    </div>
    <div className="grid grid-cols-2 items-center">
      <label htmlFor="pass">Password</label>
      <PasswordInput placeholder="Password" name="pass" id="pass" required />
    </div>
    <div className="flex gap-2 items-center">
      <label className="grow bg-base-200 p-4 flex items-center rounded-lg self-stretch cursor-pointer hover:brightness-95 transition" htmlFor="avatar-input">Choose your avatar</label>
      <input type="file" accept="image/*" name="avatar-input" id="avatar-input" className="hidden" onChange={e => uploadAvatar(e)} />
      <span className="h-14 aspect-square cursor-pointer" onClick={() => setAvatar(generateAvatar())}>
        <img className="h-full w-full" src={avatar} />
      </span>
    </div>
    {status === "error" && <div className="border rounded p-4 border-error text-error">{error}</div>}
    <button className={`btn ${btnVariantMap[status]} hover:scale-105`}>Sign up {statusIconMap[status]}</button>
    <button className="btn hover:scale-105">Anonymous login</button>
    <div className="divider">Already have an account ?</div>
    <Link to="/login" className="btn btn-secondary hover:scale-105">Log In</Link>
  </form>
}