import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import { useEffect } from "react";

export default function Navbar() {
  const { user, signOutUser } = useAuth();

  return (
    <div className="m-2 flex items-center justify-between rounded bg-base-200 p-4 shadow-lg sm:p-8">
      <Link to="/" className="text-lg font-bold sm:text-2xl lg:text-3xl">
        Recipe<b className="text-yellow-300">Raven</b>
      </Link>
      <div className="flex items-center gap-2">
        <div className="hidden sm:visible">{user?.data.uname}</div>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="h-16 w-16">
            <img src={user?.data.avatar} className="h-full w-full" />
          </div>
          <div className="dropdown-content z-[1] min-w-52 overflow-hidden rounded-box bg-base-200 shadow-md">
            <div className="flex flex-col items-center rounded-box bg-base-300 p-4 shadow-lg">
              <img src={user?.data.avatar} className="size-20" />
              <Link
                to={"/profile?id=" + user?.data._id}
                className="flex items-center text-lg transition hover:text-primary"
              >
                {user?.data.uname}&nbsp;
                <span className="text-primary">
                  <FaEdit />
                </span>
              </Link>
            </div>
            <div className="pt-2">
              <ul className="menu flex flex-col p-2">
                <li>
                  <Link to="/recipe/create">Create new Recipe</Link>
                </li>
                <li>
                  <Link to="/favourites">Favourites</Link>
                </li>
                <li onMouseDown={signOutUser}>
                  <a>Sign out</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
