import { useReviews } from "../hooks/recipes";
import ReviewComment from "./Comment";

export default function AllReviews({ rid, refresh }) {
  const { reviews, isLoading, error } = useReviews(rid, refresh);

  if (error || !reviews) return <div>Error...</div>;
  if (isLoading)
    return (
      <div className="grid place-items-center p-8">
        <i className="loading loading-spinner"></i>
      </div>
    );

  return (
    <>
      <div
        className="empty:text-l mt-4 flex flex-col gap-2 empty:text-center empty:opacity-30 empty:before:content-[attr(before)]"
        before="No Reviews"
      >
        {reviews.map((review) => (
          <ReviewComment {...review} key={review._id} />
        ))}
      </div>
    </>
  );
}
