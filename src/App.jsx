import "./scss/app.scss";
import Categories from "./components/Categories";
import Header from "./components/Header";
import Sort from "./components/Sort";
import PizzaBlock from "./components/PizzaBlock";

import pizzaDB from "./assets/pizzaDB.json";
import { useState } from "react";
import { useEffect } from "react";

function Pizza() {}

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const URL = "https://639f1d625eb8889197f4b7be.mockapi.io/items";
    fetch(URL)
      .then((data) => data.json())
      .then((dataJson) => setItems(dataJson));
  }, []);
  // pierwszy render (didMount)
  //sa 3 sostajanija, render, zmiana, usuniecie

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">All pizzas</h2>
          <div className="content__items">
            {items.map((elem, index) => {
              return (
                <PizzaBlock
                  key={elem.id}
                  // title={elem.title}
                  // price={elem.price}
                  {...elem}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
