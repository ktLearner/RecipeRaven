export default function Stars({ avatar }) {
  return (
    <div className="rating items-center">
      <img className="mask mask-circle mr-2 aspect-square h-12" src={avatar} />
      <input
        type="radio"
        name="recipe-rating"
        id="r-1"
        className="mask mask-star-2 bg-warning"
        value="1"
      />
      <input
        type="radio"
        name="recipe-rating"
        id="r-2"
        className="mask mask-star-2 bg-warning"
        value="2"
      />
      <input
        type="radio"
        name="recipe-rating"
        id="r-3"
        className="mask mask-star-2 bg-warning"
        value="3"
      />
      <input
        type="radio"
        name="recipe-rating"
        id="r-4"
        className="mask mask-star-2 bg-warning"
        value="4"
      />
      <input
        type="radio"
        name="recipe-rating"
        id="r-5"
        className="mask mask-star-2 bg-warning"
        value="5"
        defaultChecked={true}
      />
    </div>
  );
}
