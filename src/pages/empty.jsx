import React from "react";
import logo from "../assets/img/pizza-logo.svg";
import empty from "../assets/img/empty-cart.png";
import { Link } from "react-router-dom";

const Empty = () => {
  return (
    <>
      <div className="container container--cart">
        <div className="cart cart--empty">
          <h2>
            Корзина пустая <icon>😕</icon>
          </h2>
          <p>
            Вероятней всего, вы не заказывали ещё пиццу.
            <br />
            Для того, чтобы заказать пиццу, перейди на главную страницу.
          </p>
          <img src={empty} alt="Empty cart" />
          <a href="/pizza-react/src/pages" className="button button--black">
            <Link to="/">
              <span>Вернуться назад</span>
            </Link>
          </a>
        </div>
      </div>
    </>
  );
};

export default Empty;
