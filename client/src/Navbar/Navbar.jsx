import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

export default function Navbar() {
  const { user, signOutUser } = useAuth();

  return <div className="m-2 p-4 sm:p-8 bg-base-200 rounded flex items-center justify-between shadow-lg">
    <Link to="/" className="text-lg sm:text-2xl font-bold">Recipe<b className="text-yellow-300">Raven</b></Link>
    <div className="flex items-center gap-2">
      <div className="hidden sm:visible">{user?.data.uname}</div>
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="h-16 w-16">
          <img src={user?.data.avatar} className="h-full w-full" />
        </div>
        <div className="dropdown-content z-[1] shadow-md rounded-box bg-base-200 min-w-52 overflow-hidden">
          <div className="bg-base-300 p-4 flex flex-col items-center rounded-box shadow-lg">
            <img src={user?.data.avatar} className="size-20" />
            <Link to="/profile" className="text-lg flex items-center transition hover:text-primary">{user?.data.uname}&nbsp;<span className="text-primary"><FaEdit /></span></Link>
          </div>
          <div className="pt-2">
            <ul className="flex flex-col p-2">
              <li className="p-2 rounded cursor-pointer bg-base-200 transition hover:brightness-110"><Link to="/recipe/create">Create new Recipe</Link></li>
              <li onMouseDown={signOutUser} className="p-2 rounded cursor-pointer bg-base-200 transition hover:brightness-110">Sign out</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
}