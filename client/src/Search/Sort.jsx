import { useEffect, useState } from "react";
import { FaArrowDown, FaArrowUp, FaDownload, FaSort } from "react-icons/fa";

function ListItem({ name, order, onClick }) {
  const icon = [
    null,
    <FaArrowUp className="text-info" />,
    <FaArrowDown className="text-info" />,
  ][order];

  return (
    <li>
      <a
        onClick={onClick}
        className={`${order ? "outline outline-1 outline-info hover:outline hover:outline-1 hover:outline-info" : ""} flex justify-between`}
      >
        {name} {icon}
      </a>
    </li>
  );
}

export default function Sort() {
  const [sortCriteria, setSortCriteria] = useState([
    { name: "Name", value: "title", order: 0 },
    { name: "Cuisine", value: "cuisine", order: 0 },
    { name: "Calories", value: "calories", order: 0 },
    { name: "Upload date", value: "createdAt", order: 0 },
    // { name: "Steps count", value: "stepCount", order: 0 },
  ]);

  const query = sortCriteria
    .filter((c) => c.order)
    .map((c) => {
      return `${c.value}-${c.order}`;
    })
    .join(",");

  const applied = sortCriteria.filter((c) => c.order).length;

  function toggle(value) {
    return () => {
      setSortCriteria((criteria) => {
        const i = criteria.findIndex((c) => c.name === value);
        const order = (criteria[i].order + 1) % 3;

        return [
          ...criteria.slice(0, i),
          { ...criteria[i], order },
          ...criteria.slice(i + 1),
        ];
      });
    };
  }

  return (
    <div className="dropdown dropdown-end dropdown-hover">
      <div tabIndex={0} role="button" className="btn btn-outline join-item">
        <FaSort />
        <input value={query} type="hidden" id="sort" name="sort" />
        {applied ? (
          <span className="badge badge-info badge-xs absolute left-1 top-1">
            {applied}
          </span>
        ) : null}
      </div>

      <ul
        tabIndex={0}
        className="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow"
      >
        <li className="menu-title">Sort Recipes</li>

        {sortCriteria.map((criteria) => (
          <ListItem
            key={criteria.name}
            {...criteria}
            onClick={toggle(criteria.name)}
          />
        ))}
      </ul>
    </div>
  );
}
