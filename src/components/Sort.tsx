import React, { useState, useRef, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { setSort } from "../redux/slices/filterSlice";

type SortItem = {
  name: string;
  sort: string;
};

type PopupClick = MouseEvent & {
  path: Node[];
};

// type SortPopupProps = {
//   value: SortType;
// };

export const arrName: SortItem[] = [
  { name: "Popularity ↓", sort: "rating" },
  { name: "Popularity ↑", sort: "-rating" },
  { name: "Price ↓", sort: "price" },
  { name: "Price ↑", sort: "-price" },
  { name: "Alphabet ↓", sort: "title" },
  { name: "Alphabet ↑", sort: "-title" },
];

function Sort() {
  const dispatch = useDispatch();
  const sort = useSelector((state: any) => state.filter.sortName);
  const sortRef = React.useRef<HTMLDivElement>(null);

  const [popUp, setPopUp] = useState(false);

  const listSeleted = (obj: SortItem) => {
    dispatch(setSort(obj));
    setPopUp(!popUp);
  };

  useEffect(() => {
    // Jak nie robic ---------------------------------
    // const handleClickOutside = (event: MouseEvent) => {
    //   const _event = event as MouseEvent & {
    //     path: Node[];
    //   };
    //   if (sortRef.current && !_event.path.includes(sortRef.current)) {
    //     setPopUp(false);
    //   }
    // };

    const handleClickOutside = (event: MouseEvent) => {
      // event.composedPath() zwraca (path) eventa
      if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
        setPopUp(false);
      }
    };

    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          ></path>
        </svg>
        <b>Sorting by:</b>
        <span onClick={() => setPopUp(!popUp)}>{sort.name}</span>
      </div>
      {popUp && (
        <div className="sort__popup">
          <ul>
            {arrName.map((obj, index) => {
              return (
                <li
                  key={index}
                  onClick={() => listSeleted(obj)}
                  className={sort.sort == obj.sort ? "active" : ""}
                >
                  {obj.name}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Sort;
// 25:29
