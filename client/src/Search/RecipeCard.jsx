import { useMemo } from "react";
import { Link } from "react-router-dom";
import { imgToObjectURL } from "../../helpers/utils";
import moment from "moment";
import { FaStar } from "react-icons/fa";
import ProfileLink from "../Profile/ProfileLink";

function RecipeTag(props) {
  return <span className="badge badge-primary">{props.text}</span>;
}

export default function RecipeCard(props) {
  const img = useMemo(() => imgToObjectURL(props.imageUrl.data), []);

  return (
    <div className="card card-side bg-base-300">
      <figure className="aspect-video flex-1">
        <img className="transition hover:scale-110" src={img} />
      </figure>

      <div className="card-body flex-1">
        <Link
          to={`/recipe?rid=${props._id}`}
          className="link link-secondary text-lg leading-3"
        >
          {props.title}
        </Link>
        <span className="text-sm">{props.cuisine}</span>
        <span className="flex items-center gap-2">
          {props.avgRating} <FaStar className="text-yellow-200" />
        </span>
        <span className="text-warning">{props.calories}</span>
        <span className="flex gap-2">
          {props.tags.map((tag, i) => (
            <RecipeTag key={i} text={tag} />
          ))}
        </span>
        <span className="text-sm">
          Uploaded {moment(props.createdAt).fromNow()} by{" "}
          <ProfileLink uname={props.createdBy.name} uid={props.createdBy.id} />
        </span>
      </div>
    </div>
  );
}
