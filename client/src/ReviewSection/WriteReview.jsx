import { IoIosSend } from "react-icons/io";
import Stars from "./Stars";
import { FaCheck, FaTimes } from "react-icons/fa";

export default function WriteReview({ comment, user, status }) {
  const iconMap = {
    posting: <i className="loading"></i>,
    success: <FaCheck />,
    idle: <IoIosSend />,
    error: <FaTimes />,
  };

  const variantMap = {
    posting: "btn-disabled",
    success: "btn-success",
    idle: "",
    error: "btn-error",
  };

  return (
    <form
      onSubmit={comment}
      className="flex flex-col gap-2 rounded bg-base-200 p-4"
    >
      <h1>Write a review</h1>
      <Stars avatar={user?.data.avatar} />
      <div className="flex gap-2">
        <textarea
          placeholder="Write review"
          className="textarea textarea-bordered flex-grow resize-none leading-6"
          rows="4"
          required
          maxLength={600}
          name="review-comment"
          id="review-comment"
        />
        <button
          className={`${variantMap[status]} btn btn-square btn-accent btn-lg self-start`}
        >
          {iconMap[status]}
        </button>
      </div>
    </form>
  );
}
