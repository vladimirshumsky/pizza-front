import * as React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
// @ts-ignore
import styles from "./pizzaItem.module.scss";
import { ColorRing } from "react-loader-spinner";

const PizzaItem: React.FC = () => {
  const [pizzas, setPizzas] = useState<{
    title: string;
    imageUrl: string;
    price: number;
  }>({ title: "", imageUrl: "", price: 0 });
  const [spinner, setSpinner] = useState(true);
  const params = useParams();
  useEffect(() => {
    axios
      .get(`https://637e6c265b1cc8d6f92daf08.mockapi.io/items/${params.id}`)
      .then((response) => {
        setPizzas(response.data);
        setSpinner(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (spinner) {
    return (
      <div className={styles.wrapper}>
        <ColorRing
          // @ts-ignore
          type="Puff"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={3000}
        />
      </div>
    );
  }

  return (
    <div>
      <div className={styles.wrapper}>
        <img className={styles.img} src={pizzas.imageUrl} alt="" />
        <div>{pizzas.title}</div>
        <p>{pizzas.price} рублей</p>
      </div>
    </div>
  );
};
export default PizzaItem;
