import { useCallback, useReducer, useState } from "react";
import { debounce } from "../../helpers/utils";
import { FaArrowDown, FaFilter } from "react-icons/fa";
import { fetchRecipeMeta } from "../../helpers/recipe";

function ChipSelect({ label, dispatch, route }) {
  const [selected, setSelected] = useState([]);
  const [fetchedTags, setFetchedTags] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  const inputHandler = useCallback(
    debounce(async (e) => {
      try {
        const tags = await fetchRecipeMeta(route, {
          sort: e.target.value,
        });
        setFetchedTags(tags);
      } catch (e) {}
    }, 200),
    [],
  );

  return (
    <>
      {label}{" "}
      <span>
        <span>
          {selected.map((s) => (
            <span className="badge text-nowrap">
              {s}{" "}
              <button
                onClick={() => {
                  setSelected((prev) => {
                    const i = prev.findIndex((t) => t === s);
                    return [...prev.slice(0, i), ...prev.slice(i + 1)];
                  });
                }}
              >
                &times;
              </button>
            </span>
          ))}
        </span>
        <input className="input input-bordered" onInput={inputHandler} />
        <button onClick={() => setMenuOpen((prev) => !prev)}>
          <FaArrowDown />
        </button>
      </span>
      <ul className={`${menuOpen ? "menu" : "hidden"}`}>
        {fetchedTags.map((tag) => {
          if (selected.includes(tag)) return "";
          return (
            <li>
              <a onClick={() => setSelected((prev) => [...prev, tag])}>{tag}</a>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default function Filter() {
  const [filterCriteria, dispatchFilter] = useReducer(reducer, [
    { name: "Tags", value: "tags", selected: [] },
    { name: "Allergens", value: "allergens", selected: [] },
    { name: "Calories", min: 0, max: 10000 },
    { name: "Cuisine", selected: null },
    { name: "Creator", selected: [] },
  ]);

  function reducer() {}

  return (
    <div className="dropdown dropdown-end dropdown-open dropdown-hover join-item">
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
        className="menu dropdown-content z-[1] rounded-box bg-base-100 p-2 shadow"
      >
        <li>
          <ChipSelect label={"Tags"} route={"tags"} dispatch={dispatchFilter} />
        </li>
      </ul>
    </div>
  );
}
