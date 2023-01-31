import { FC, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
type ItemProps = {
  title: string;
  price: number;
  imageUrl: string;
  sizes;
  types;
  onClick;
  id;
};

const Item: FC<ItemProps> = ({
  title,
  price,
  imageUrl,
  sizes,
  types,
  onClick,
  id,
}) => {
  const [activeTypes, setActiveTypes] = useState(0);
  const [activeTypesValue, setActiveTypesValue] = useState("");
  const [activeSize, setActiveSize] = useState(0);
  const [activeSizeValue, setActiveSizeValue] = useState("");
  const [total, setTotal] = useState(0);

  const ref = useRef(null);
  const typesArr = ["тонкое", "традиционное"];
  const setSizes = (item, index) => {
    setActiveSize(index);
    setActiveSizeValue(item);
  };
  const setTypes = (item, index) => {
    setActiveTypes(index);
    setActiveTypesValue(typesArr[types[index]]);
  };
  const addItemHandler = (e) => {
    e.stopPropagation();
    setTotal((prevState) => prevState + 1);
    onClick(activeSizeValue, activeTypesValue);
  };

  useEffect(() => {
    setActiveTypesValue(typesArr[types[0]]);
    setActiveSizeValue(sizes[0]);
  }, []);

  return (
    <div className="pizza-block">
      <Link to={"/pizzas/" + id}>
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      </Link>
      <h4 className="pizza-block__title">{title}</h4>
      <div className="pizza-block__selector">
        <ul>
          {types.map((item, index) => (
            <li
              ref={ref}
              className={activeTypes === index ? "active" : ""}
              key={index}
              onClick={() => setTypes(item, index)}
            >
              {" "}
              {typesArr[item]}
            </li>
          ))}
        </ul>
        <ul>
          {sizes.map((i, index) => (
            <li
              onClick={() => setSizes(i, index)}
              className={activeSize === index ? "active" : ""}
              key={index}
            >
              {i} см
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">{price} ₽</div>
        <div
          onClick={addItemHandler}
          className="button button--outline button--add"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          <i>{total}</i>
        </div>
      </div>
    </div>
  );
};

export default Item;
