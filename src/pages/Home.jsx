import React from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";

import { useState } from "react";
import { useEffect } from "react";

function Home({ searchValue, setSearchValue }) {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState({
    name: "Popularity",
    sort: "rating",
  });

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setIsLoading(true);

    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const sortBy = sortType.sort.replace("-", "");
    const order = sortType.sort.includes("-") ? "asc" : "desc";
    const search = searchValue ? `&search=${searchValue}` : "desc";

    const URL = `https://639f1d625eb8889197f4b7be.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`;

    fetch(URL)
      .then((data) => data.json())
      .then((dataJson) => {
        setItems(dataJson);
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
          onClickCategory={(i) => setCategoryId(i)}
        />
        <Sort value={sortType} onClickSort={(i) => setSortType(i)} />
      </div>

      <div className="content__title_div">
        <h2 className="content__title">All pizzas</h2>
        <Pagination
          onChangePage={(number) => setCurrentPage(number)}
        ></Pagination>
        <div></div>
      </div>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
    </div>
  );
}

export default Home;
