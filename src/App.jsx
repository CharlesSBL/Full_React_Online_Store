import "./scss/app.scss";
import Categories from "./components/Categories";
import Header from "./components/Header";
import Sort from "./components/Sort";
import PizzaBlock from "./components/PizzaBlock";

import pizzaDB from "./assets/pizzaDB.json";

function Pizza() {}

function App() {
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
            {pizzaDB.map((elem, index) => {
              return (
                <PizzaBlock
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
