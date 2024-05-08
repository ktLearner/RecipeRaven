import { IoIosSend } from "react-icons/io";
import Stars from "./Stars";
import { useAuth } from "../contexts/AuthProvider";
import { server } from "../../helpers/server";
import OtherReviews from "./OtherReviews";

export default function ReviewSection({ rid }) {
  const { user } = useAuth();

  function comment(e) {
    e.preventDefault();
    const stars = +[...e.target["recipe-rating"]].find((s) => s.checked).value;
    const review = e.target["review-comment"].value;
    const uid = user.data._id;

    const data = {
      stars,
      review,
      uid,
    };

    server
      .post("/recipe/review", data, {
        params: {
          rid,
        },
      })
      .then(console.log)
      .catch(console.log);
  }

  return (
    <>
      <h1 className="divider divider-start py-8 text-2xl">Reviews</h1>
      <div>
        <form onSubmit={comment} className="flex flex-col gap-2">
          <Stars avatar={user?.data.avatar} />
          <div className="flex gap-2">
            <textarea
              placeholder="Write review"
              className="textarea textarea-bordered flex-grow resize-none"
              rows="4"
              required
              maxLength={100}
              name="review-comment"
              id="review-comment"
            />
            <button className="btn btn-accent btn-lg self-start">
              <IoIosSend />
            </button>
          </div>
        </form>
      </div>
      <OtherReviews rid={rid} />
    </>
  );
}
