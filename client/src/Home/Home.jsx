import { useAuth } from "../contexts/AuthProvider"

export default function Home() {
  const { user, signOutUser } = useAuth();

  console.log(user?.data);

  return <div className="m-2 p-4 bg-base-200">
    Welcome {user?.data.uname} !
    <img src={user?.data.avatar} className="w-20 mask mask-circle inline" />
    &nbsp;
    <button className="btn btn-primary" onClick={signOutUser}>Sign out</button>
  </div>
}