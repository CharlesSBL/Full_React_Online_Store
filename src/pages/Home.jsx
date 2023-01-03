import React from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";

import { useState } from "react";
import { useEffect } from "react";
import { SearchContext } from "../App";

import { useSelector, useDispatch } from "react-redux";
import { setCategoryId, setCurrentPage } from "../redux/slices/filterSlice";

import axios from "axios";
import { current } from "@reduxjs/toolkit";

function Home() {
  const dispatch = useDispatch();
  const { categoryId, sortType, currentPage } = useSelector((state) => {
    const currentPage = state.filter.currentPage;
    const categoryId = state.filter.categoryId;
    const sortType = state.filter.sortName.sort;
    return { categoryId, sortType, currentPage };
  });
  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const { searchValue } = React.useContext(SearchContext);

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setIsLoading(true);

    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const order = sortType.includes("-") ? "asc" : "desc";
    const sortBy = sortType.replace("-", "");
    const search = searchValue ? `&search=${searchValue}` : "";

    const URL = `https://639f1d625eb8889197f4b7be.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`;

    axios.get(URL).then((response) => {
      setItems(response.data);
      setIsLoading(false);
    });

    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);
  // pierwszy render (didMount)
  //sa 3 sostajanija, render, zmiana, usuniecie

  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));
  const pizzas = items
    .filter((obj) => {
      return obj.title.toLowerCase().includes(searchValue.toLowerCase());
    })
    .map((elem) => <PizzaBlock key={elem.id} {...elem} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onClickCategory={(i) => onClickCategory(i)}
        />
        <Sort />
      </div>

      <div className="content__title_div">
        <h2 className="content__title">All pizzas</h2>
        <Pagination
          currentPage={currentPage}
          onChangePage={onChangePage}
        ></Pagination>
        <div></div>
      </div>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
    </div>
  );
}

export default Home;
