import { IoIosSend } from "react-icons/io";
import Stars from "./Stars";
import { useAuth } from "../contexts/AuthProvider";
import { server } from "../../helpers/server";
import AllReviews from "./AllReviews";
import WriteReview from "./WriteReview";
import { useState } from "react";

export default function ReviewSection({ rid }) {
  const { user } = useAuth();
  const [status, setStatus] = useState("idle"); // posting, success, error
  const [refresh, setRefresh] = useState(0);

  function comment(e) {
    e.preventDefault();
    if (status !== "idle") return;

    const stars = +[...e.target["recipe-rating"]].find((s) => s.checked).value;
    const review = e.target["review-comment"].value;
    const uid = user.data._id;

    const data = {
      stars,
      review,
      uid,
    };

    setStatus("posting");
    server
      .post("/recipe/review", data, {
        params: {
          rid,
        },
      })
      .then(() => {
        setRefresh(() => Math.random());
        setStatus("success");
        setTimeout(() => setStatus("idle"), 1000);
      })
      .catch(() => {
        setStatus("error");
      });
  }

  if (!user) return <div>Loading...</div>;

  return (
    <>
      <h1 id="review-section"></h1>
      <h1 className="divider divider-start py-8 text-2xl">Reviews</h1>
      <WriteReview status={status} comment={comment} user={user} />
      <AllReviews refresh={refresh} rid={rid} />
    </>
  );
}
