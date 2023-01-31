import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeSortType } from "../redux/slices/filterSlice";
type SortList = {
  title: string;
  sort: string;
  id: string;
};
export const sortArr: SortList[] = [
  { title: "Популярности", sort: "rating", id: "0" },
  { title: "Цене", sort: "price", id: "1" },
  { title: "Алфавиту", sort: "title", id: "2" },
];
const Sort: React.FC = ({ open, setOpen }) => {
  const state = useSelector((state) => state.filter.sortFirst);
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement>(null);
  const openHandler = () => {
    setOpen(!open);
  };
  const closeHandler = (item: SortList) => {
    dispatch(changeSortType(item));
    setOpen(false);
  };
  //снятие фокуса с сортировки
  useEffect(() => {
    //willMount
    const handleClickOut = (e) => {
      if (!e.path.includes(ref.current)) {
        setOpen(false);
      }
    };
    document.body.addEventListener("click", handleClickOut);
    //unmount
    return () => {
      document.body.removeEventListener("click", handleClickOut);
    };
  }, []);

  return (
    <div className="sort" ref={ref}>
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
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={openHandler}>{state.title}</span>
      </div>
      {open ? (
        <>
          <div className="sort__popup">
            <ul>
              {sortArr.map((item, index) => (
                <li
                  onClick={() => closeHandler(item)}
                  className={state.sort === item.sort ? "active" : ""}
                  key={index}
                >
                  {" "}
                  {item.title}{" "}
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default Sort;
