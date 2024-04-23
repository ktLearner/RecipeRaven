import { useEffect } from "react";
import { useAuth } from "../contexts/AuthProvider"
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";

export default function Home() {
  const { user, signOutUser } = useAuth();

  return <div className="m-2 p-8 bg-base-200 rounded flex items-center justify-between">
    <span className="text-2xl font-bold">Recipe<b className="text-yellow-300">Raven</b></span>
    <div className="flex items-center gap-2">
      <div>{user?.data.uname}</div>
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="h-16 w-16">
          <img src={user?.data.avatar} className="h-full w-full" />
        </div>
        <div className="dropdown-content z-[1] shadow-md rounded-box bg-base-200 min-w-52 overflow-hidden">
          <div className="bg-base-300 p-4 flex flex-col items-center rounded-box shadow-lg">
            <img src={user?.data.avatar} className="size-20" />
            <Link to="/profile" className="text-lg flex items-center hover:text-primary">{user?.data.uname}&nbsp;<span className="text-primary"><FaEdit /></span></Link>
          </div>
          <div className="pt-2">
            <ul className="flex flex-col p-2">
              <li className="p-2 rounded cursor-pointer bg-base-200 transition hover:brightness-110">Create new Recipe</li>
              <li onMouseDown={signOutUser} className="p-2 rounded cursor-pointer bg-base-200 transition hover:brightness-110">Sign out</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
}