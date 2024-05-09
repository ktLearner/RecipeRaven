import { useId } from "react";

function Star({ i, total, id }) {
  return (
    <input
      type="radio"
      name={"rating" + id}
      className="mask mask-star-2 pointer-events-none bg-orange-400"
      checked={i < total}
      readOnly
    />
  );
}

export default function DisplayStars({ starCount }) {
  const id = useId();

  return (
    <div className="rating rating-xs">
      {Array(5)
        .fill(null)
        .map((_, i) => (
          <Star i={i} id={id} total={starCount} key={i} />
        ))}
    </div>
  );
}
