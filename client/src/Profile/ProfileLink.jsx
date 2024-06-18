import { Link } from "react-router-dom";

export default function ProfileLink({ uid, uname }) {
  return (
    <Link className="link link-primary" to={"/profile?id=" + uid}>
      {uname}
    </Link>
  );
}
