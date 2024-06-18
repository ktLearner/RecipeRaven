import ProfileLink from "../Profile/ProfileLink";
import DisplayStars from "./DisplayStars";

export default function ReviewComment({ user, rating, review }) {
  return (
    <div className="chat chat-start">
      <div className="avatar chat-image">
        <div className="w-12 rounded-full">
          <img alt="pfp" src={user.avatar} />
        </div>
      </div>
      <div className="chat-header">
        <ProfileLink uid={user.uid} uname={user.uname} />
        <br />
        <DisplayStars starCount={rating} />
      </div>
      <div className="chat-bubble chat-bubble-accent">{review}</div>
    </div>
  );
}
