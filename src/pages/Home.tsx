import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// import axios from "axios";
import qs from "qs";

// import { SearchContext } from "../App";

import Categories from "../components/Categories";
import Pagination from "../components/Pagination";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import { arrName } from "../components/Sort";

import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filter/slice";

// import { FilterSliceState } from "../redux/slices/filter/types";

// import { setItems } from "../redux/slices/pizzaSlice";

// import { selectCart } from "../redux/slices/cart/selectors";

// import { Link } from "react-router-dom";
import { useAppDispatch } from "../redux/store";
import SortComp from "../components/Sort";
import { fetchPizzas } from "../redux/slices/asyncFunc/FetchPizzas";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { items, status } = useSelector((state: any) => state.pizza);

  const { categoryId, sortType, currentPage, searchValue } = useSelector(
    (state: any) => {
      const currentPage = state.filter.currentPage;
      const categoryId = state.filter.categoryId;
      const sortType = state.filter.sortName.sort;
      const searchValue = state.filter.searchValue;

      return { categoryId, sortType, currentPage, searchValue };
    }
  );

  // ukazujemy ze ma sie odpalic przy 1 renderze
  const onClickCategory = useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, []);

  const onChangePage = (val: number) => {
    dispatch(setCurrentPage(val));
  };

  // const { searchValue } = React.useContext(SearchContext);

  // const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getPizzas = async () => {
    setIsLoading(true);

    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const order = sortType.includes("-") ? "asc" : "desc";
    const sortBy = sortType.replace("-", "");
    const search = searchValue ? `&search=${searchValue}` : "";

    const URL = `https://639f1d625eb8889197f4b7be.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`;

    dispatch(
      fetchPizzas({
        category,
        order,
        sortBy,
        search,
        currentPage: String(currentPage),
      })
    );

    setIsLoading(false);
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
    getPizzas();

    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sortList = arrName.find((obj) => {
        return obj.sort == params.sortName;
      });

      if (typeof sortList === "undefined") {
        console.log("dupa");
      } else {
        dispatch(
          setFilters({
            ...params,
            ...sortList,
            searchValue: "",
            categoryId: 0,
            currentPage: 0,
            sortName: {
              name: "",
              sort: "title",
            },
          })
        );
      }

      isSearch.current = true;
    }
  }, []);

  // if there been first render, then we do get request for getting pizzas
  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sortType, searchValue, currentPage]);
  // pierwszy render (didMount)
  //sa 3 sostajanija, render, zmiana, usuniecie

  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  const pizzas = items
    .filter((obj: any) => {
      return obj.title.toLowerCase().includes(searchValue.toLowerCase());
    })
    // .map((elem) => <PizzaBlock key={elem.id} {...elem} />);
    .map((elem: any) => <PizzaBlock key={elem.id} {...elem} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onClickCategory={(i: number) => onClickCategory(i)}
        />
        <SortComp />
      </div>

      <div className="content__title_div">
        <h2 className="content__title">All pizzas</h2>
        {/* <Pagination
          currentPage={currentPage}
          onChangePage={onChangePage}
        ></Pagination> */}
        <div></div>
      </div>
      {status == "error" ? (
        <div className="content__error-info">
          <h2>An error has occurred 😞</h2>
          <p>It seems that pizzas can't appear.</p>
          <p>We apologize for the inconvenience.</p>
          <p>Please try again later.</p>
        </div>
      ) : (
        <div className="content__items">
          {status == "loading" ? skeletons : pizzas}
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        onChangePage={onChangePage}
      ></Pagination>
    </div>
  );
};

export default Home;
// makaka
