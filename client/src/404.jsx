import { Link } from "react-router-dom";

export default function Error404Page() {
  return <div className="bg-base-300 m-4 p-8 rounded-box">
    <div className="text-error text-2xl">404 Page not found!</div>
    <i className="divider"></i>
    <div>This page doesn't seem to exist on this website. Go back to <Link to="/" className="link link-primary">home page</Link></div>
  </div>
}