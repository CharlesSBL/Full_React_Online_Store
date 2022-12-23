import React from "react";
import ReactPaginate from "react-paginate";

import styles from "./Pagination.module.scss";

export default function Pagination({ onChangePage }) {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(ev) => {
        onChangePage(ev.selected + 1);
      }}
      pageRangeDisplayed={4}
      pageCount={3}
      renderOnZeroPageCount={null}
    />
  );
}
