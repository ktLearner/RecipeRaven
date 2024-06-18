import moment from "moment";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

export default function PublicInfo({ uname, createdAt, avatar }) {
  return (
    <div className="relative grid w-full grid-cols-1 py-4 sm:grid-cols-2">
      <figure className="aspect-square h-40 place-self-center overflow-hidden rounded-full border-4 border-x-8 border-primary border-opacity-30">
        <img src={avatar} alt="User avatar" />
      </figure>
      <div className="m-8 flex flex-col items-center place-self-center rounded-box bg-base-300 p-8 leading-5 sm:place-self-stretch">
        <span className="text-lg text-accent">{uname}</span>
        <span className="text-sm">
          Joined on {moment(createdAt).format("llll")}
        </span>
      </div>
    </div>
  );
}
