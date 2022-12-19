import React from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";

import { useState } from "react";
import { useEffect } from "react";

function Home() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const URL = "https://639f1d625eb8889197f4b7be.mockapi.io/items";
    fetch(URL)
      .then((data) => data.json())
      .then((dataJson) => {
        setItems(dataJson);
        setIsLoading(false);
      });
  }, []);
  // pierwszy render (didMount)
  //sa 3 sostajanija, render, zmiana, usuniecie

  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">All pizzas</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : items.map((elem) => <PizzaBlock key={elem.id} {...elem} />)}
      </div>
    </>
  );
}

export default Home;
