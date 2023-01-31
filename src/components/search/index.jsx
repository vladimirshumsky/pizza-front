import React, { useCallback, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeSearchValue } from "../../redux/slices/filterSlice";
import styles from "./search.module.scss";
import searchLogo from "../../assets/img/search.png";
import close from "../../assets/img/close.png";
import debounce from "lodash.debounce";

const Search = () => {
  const ref = useRef(null);
  const [value, setValue] = useState("");
  // const searchState = useSelector((state) => state.filter.searchValue);
  const dispatch = useDispatch();
  const nullHandler = (e) => {
    e.preventDefault();
    setValue("");
    dispatch(changeSearchValue(""));
    ref.current.focus();
  };
  const deBounce = useCallback(
    debounce((value) => {
      dispatch(changeSearchValue(value));
    }, 2000),
    []
  );
  const onChangeSearchHandler = (value) => {
    setValue(value);
    deBounce(value);
  };
  return (
    <div className={styles.root}>
      <img className={styles.icon} src={searchLogo} alt="logo" />
      <input
        value={value}
        onChange={(e) => onChangeSearchHandler(e.target.value)}
        type="text"
        className={styles.input}
        placeholder="найти пиццы ..."
        ref={ref}
      />
      {value ? (
        <img
          onMouseDown={nullHandler}
          className={styles.close}
          src={close}
          alt="close"
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Search;
