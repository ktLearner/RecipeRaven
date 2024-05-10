import { useCallback, useEffect, useReducer, useState } from "react";
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

  useEffect(() => {
    dispatch(selected);
  }, [selected]);

  return (
    <>
      <div className="flex flex-col">
        <span className="self-start">{label}</span>
        <div className="no-scrollbar gap-1">
          <div className="flex flex-wrap gap-1 pb-2">
            {selected.map((s) => (
              <span key={s} className="badge badge-primary text-nowrap">
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
          </div>
          <div className="flex gap-2">
            <input
              className="input input-bordered flex-grow"
              onInput={inputHandler}
            />
            <button
              className="btn btn-square btn-ghost"
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              <FaArrowDown />
            </button>
          </div>
        </div>
      </div>
      <ul className={`${menuOpen ? "menu" : "hidden"}`}>
        {fetchedTags.map((tag) => {
          if (selected.includes(tag)) return "";
          return (
            <li key={tag}>
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
    {
      name: "Calories",
      min: 0,
      max: 10000,
      selectedMin: 0,
      selectedMax: 10000,
      selected: false,
    },
    { name: "Cuisine", selected: null },
    { name: "Creator", selected: [] },
  ]);

  const applied = filterCriteria.filter((c) =>
    Array.isArray(c.selected) ? c.selected.length : c.selected,
  ).length;

  const query = filterCriteria
    .filter((c) => (Array.isArray(c.selected) ? c.selected.length : c.selected))
    .map((c) => {
      switch (c.value) {
        case "tags":
          return c.selected.map((t) => "t=" + t).join("&");

        case "allergens":
          return c.selected.map((a) => "a=" + a).join("&");

        default:
          return "";
      }
    })
    .join("&");

  function reducer(state, action) {
    let criteria = [...state];

    switch (action.type) {
      case "tags":
        criteria = [...state];
        criteria[0].selected = action.payload;
        return criteria;

      case "allergens":
        criteria = [...state];
        criteria[1].selected = action.payload;
        return criteria;

      default:
        return [];
    }
  }

  function dispatcher(value) {
    return (payload) => dispatchFilter({ type: value, payload });
  }

  return (
    <div className="dropdown dropdown-end dropdown-hover join-item">
      <button type="button" className="btn dropdown btn-outline join-item">
        <FaFilter />
        <input value={query} type="hidden" id="filter" name="filter" />
        {applied ? (
          <span className="badge badge-info badge-xs absolute left-1 top-1">
            {applied}
          </span>
        ) : null}
      </button>

      <ul
        tabIndex={0}
        className="menu dropdown-content z-[1] rounded-box bg-base-100 p-2 shadow"
      >
        <li>
          <ChipSelect
            label={"Tags"}
            route={"tags"}
            dispatch={dispatcher("tags")}
          />
        </li>
        <li>
          <ChipSelect
            label={"Allergens"}
            route={"allergens"}
            dispatch={dispatcher("allergens")}
          />
        </li>
      </ul>
    </div>
  );
}
