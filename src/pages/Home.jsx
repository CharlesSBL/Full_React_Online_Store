import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import qs from "qs";

import { SearchContext } from "../App";

import Categories from "../components/Categories";
import Pagination from "../components/Pagination";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Sort, { arrName } from "../components/Sort";

import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

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

  const fetchPizzas = async () => {
    setIsLoading(true);

    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const order = sortType.includes("-") ? "asc" : "desc";
    const sortBy = sortType.replace("-", "");
    const search = searchValue ? `&search=${searchValue}` : "";

    const URL = `https://639f1d625eb8889197f4b7be.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`;

    try {
      const res = await axios.get(URL);
      setItems(res.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log("+++error", error);
      alert(error);
    } finally {
    }
  };

  // if there been some changes in parametrs and been already first render
  useEffect(() => {
    if (isMounted.current) {
      const queryStrings = qs.stringify({
        sortProperty: sortType,
        categoryId,
        currentPage,
      });

      navigate(`?${queryStrings}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, currentPage]);

  // if been first render, than check url-parametres and saved them in redux
  useEffect(() => {
    fetchPizzas();

    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sortList = arrName.find((obj) => obj.sort == params.sortName);

      dispatch(
        setFilters({
          ...params,
          sortList,
        })
      );

      isSearch.current = true;
    }
  }, []);

  // if there been first render, then we do get request for getting pizzas
  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      fetchPizzas();
    }

    isSearch.current = false;
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
        {/* <Pagination
          currentPage={currentPage}
          onChangePage={onChangePage}
        ></Pagination> */}
        <div></div>
      </div>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination
        currentPage={currentPage}
        onChangePage={onChangePage}
      ></Pagination>
    </div>
  );
}

export default Home;
// makaka
