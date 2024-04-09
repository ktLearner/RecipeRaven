import { Link } from "react-router-dom";
import PasswordInput from "../Login/PasswordInput";
import { useEffect, useState } from "react";
import generateAvatar from "../../helpers/generateAvatar";
import reactLogo from "../assets/react.svg";

export default function Signup() {
  const [avatar, setAvatar] = useState(generateAvatar());

  function uploadAvatar(e) {
    console.log(e.target.files);
    const file = e.target.files[0];

    console.log(file);
    
    setAvatar(() => e.target.files[0]);
  }

  function upload(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    console.log([...data]);
  }

  return <form method="post" onSubmit={upload} className="p-8 gap-4 bg-base-300 card fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-max shadow-lg">
    <h1 className="text-xl p-4 text-center font-bold text-accent bg-base-200 rounded">Sign up <img className="inline animate-spin duration-100" src={reactLogo} /></h1>
    <div className="divider m-0 p-0"></div>
    <div className="grid grid-cols-2 items-center">
      <label htmlFor="uname">Username</label>
      <input className="input input-bordered input-ghost" required placeholder="Username" name="uname" id="uname" />
    </div>
    <div className="grid grid-cols-2 items-center">
      <label htmlFor="pass">Password</label>
      <PasswordInput placeholder="Password" name="pass" id="pass" required />
    </div>
    <div className="flex gap-2 items-center">
      <label className="grow bg-base-200 p-4 flex items-center rounded-lg self-stretch cursor-pointer hover:brightness-95 transition" htmlFor="avatar-input">Choose your avatar</label>
      <input type="file" name="avatar-input" id="avatar-input" className="hidden" onChange={e => uploadAvatar(e)} />
      <span className="h-14 aspect-square cursor-pointer" onClick={() => setAvatar(generateAvatar())}>
        <img className="h-full w-full" src={avatar} />
      </span>
    </div>
    <button className="btn btn-accent hover:scale-105">Sign up</button>
    <button className="btn hover:scale-105">Anonymous login</button>
    <div className="divider">Already have an account ?</div>
    <Link to="/login" className="btn btn-secondary hover:scale-105">Log In</Link>
  </form>
}