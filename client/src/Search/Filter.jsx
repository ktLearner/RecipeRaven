import { FaFilter } from "react-icons/fa";

export default function Filter() {
  return (
    <div className="dropdown dropdown-end dropdown-hover join-item">
      <button
        type="button"
        className="btn dropdown btn-outline join-item relative"
      >
        <FaFilter />
        <input type="hidden" id="filter" name="filter" />
        <span className="badge badge-info badge-xs absolute left-1 top-1">
          2
        </span>
      </button>

      <ul
        tabIndex={0}
        className="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow"
      >
        <li>Hello</li>
      </ul>
    </div>
  );
}
