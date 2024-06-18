import { FaStar } from "react-icons/fa";
import { useAuth } from "../contexts/AuthProvider";
import { server } from "../../helpers/server";
import { throttle } from "../../helpers/utils";
import { useCallback } from "react";

export default function ToggleFavButton({ rid }) {
  const { user, toggleFav, isFav } = useAuth();
  const like = useCallback(
    throttle(() => toggleFav(rid)),
    [rid]
  );

  if (!user) return <></>;

  return (
    <button
      onClick={like}
      className={`btn btn-square ${isFav(rid) ? null : "btn-outline"} btn-warning`}
    >
      <FaStar />
    </button>
  );
}
