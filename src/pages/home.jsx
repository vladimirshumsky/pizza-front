import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFiltersParams } from "../redux/slices/filterSlice";
import { addItem } from "../redux/slices/cartSlice";
import Categories from "../components/categories";
import Sort, { sortArr } from "../components/sort.tsx";
import Skeleton from "../components/pizzaSkeleton";
import Item from "../components/item";
import axios from "axios";
import Pagination from "../components/pagination";
import qs from "qs";
import { pizzaArr } from "../App.tsx";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // useState
  const { pizzaItems, setPizzaItems } = useContext(pizzaArr);

  const [skeleton, setSkeleton] = useState(true);
  const [open, setOpen] = useState(false);
  // redux state
  const filterState = useSelector((state) => state.filter.categoryId);
  const sortTypeState = useSelector((state) => state.filter.sortFirst.sort);
  const searchValueState = useSelector((state) => state.filter.searchValue);
  const paginateState = useSelector((state) => state.filter.paginate);
  const basketState = useSelector((state) => state.cart.basketItem);
  //
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  const isPost = useRef(false);
  const itemAddHandler = (i, size, type) => {
    dispatch(
      addItem({
        title: i.title,
        price: i.price,
        imageUrl: i.imageUrl,
        sizes: size,
        types: type,
        itemId: i.id,
      })
    );
  };
  const axiosQuery = () => {
    axios
      .get(
        `https://637e6c265b1cc8d6f92daf08.mockapi.io/items?page=${paginateState}&limit=4${
          filterState > 0 ? `&category=${filterState}` : ""
        }&sortBy=${sortTypeState}&order=desc&search=${searchValueState}`
      )
      .then((response) => {
        setPizzaItems(response.data);
        setSkeleton(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //параметры с url парсятся в редакс
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sorting = sortArr.find((i) => i.sort === params.sortType);
      dispatch(setFiltersParams({ ...params, sorting }));
      isSearch.current = true;
    }
  }, []);
  //если были параматеры в url то не делается стандартный запрос с state redux
  useEffect(() => {
    if (!isSearch.current) {
      axiosQuery();
    }
    isSearch.current = false;
  }, [filterState, sortTypeState, searchValueState, paginateState]);
  //qs создается обьект и засовывает в url только если произошел первый рендер
  useEffect(() => {
    if (isMounted.current) {
      const queryStr = qs.stringify({
        sortType: sortTypeState,
        filter: filterState,
        paginate: paginateState,
      });
      navigate(`?${queryStr}`);
    }
    isMounted.current = true;
  }, [filterState, sortTypeState, searchValueState, paginateState]);

  useEffect(() => {
    if (isPost.current) {
      axios
        .post("https://637e6c265b1cc8d6f92daf08.mockapi.io/basket", basketState)
        .then((res) => console.log(res.data))
        .catch((e) => console.log(e));
    }
    isPost.current = true;
  }, [basketState]);

  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories />
          <Sort open={open} setOpen={setOpen} />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {skeleton ? (
            <>
              {[...new Array(6)].map((i, index) => (
                <Skeleton className="pizza-block" key={index} />
              ))}
            </>
          ) : (
            pizzaItems.map((i) => (
              <Item
                key={i.id}
                id={i.id}
                title={i.title}
                price={i.price}
                imageUrl={i.imageUrl}
                sizes={i.sizes}
                types={i.types}
                onClick={(size, type) => itemAddHandler(i, size, type)}
              />
            ))
          )}
        </div>
        <Pagination />
      </div>
    </>
  );
};

export default Home;
