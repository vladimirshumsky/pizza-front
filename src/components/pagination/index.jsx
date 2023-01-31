import React from "react";
import { useDispatch } from "react-redux";
import { paginate } from "../../redux/slices/filterSlice";
import ReactPaginate from "react-paginate";
import styles from "./pagination.module.scss";

const Pagination = () => {
  const dispatch = useDispatch();
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(e) => dispatch(paginate(e.selected + 1))}
      pageRangeDisplayed={4}
      pageCount={3}
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
