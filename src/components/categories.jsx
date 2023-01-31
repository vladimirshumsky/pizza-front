import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeCategory } from "../redux/slices/filterSlice";

function Categories() {
  const categoryArr = [
    {
      value: 0,
      title: "все",
    },
    {
      value: 1,
      title: "Мясные",
    },
    {
      value: 2,
      title: "Вегетарианская",
    },
    {
      value: 3,
      title: "Гриль",
    },
    {
      value: 4,
      title: "Острые",
    },
    {
      value: 5,
      title: "Закрытые",
    },
  ];
  const state = useSelector((state) => state.filter.categoryId);
  const dispatch = useDispatch();
  return (
    <>
      {categoryArr.map((i, index) => (
        <div className="categories">
          <ul key={index}>
            <li
              key={index}
              onClick={() => dispatch(changeCategory(index))}
              className={state === index ? "active" : ""}
            >
              {i.title}
            </li>
          </ul>
        </div>
      ))}
    </>
  );
}

export default Categories;
