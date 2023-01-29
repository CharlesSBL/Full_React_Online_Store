import { Routes, Route } from "react-router-dom";

import "./scss/app.scss";
import MainLayout from "./layouts/MainLayout";
import React from "react";

import { Suspense } from "react";

// import PayPalBtn from "./components/PayPal/PayPalBtn";
import Paypal from "./components/PayPal/PayPalBtn";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";
// import process from "process";

// bedzie ladowac strony tylko wtedy gdy to bedzie potrzebne
// tym samym skracamy czas 1 ladowania strony
// rozbijamy app na chunks
const Home = React.lazy(() => import("./pages/Home"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const Cart = React.lazy(() => import("./pages/Cart"));
const FullPizza = React.lazy(() => import("./pages/FullPizza"));

const App = () => {
  const { items, totalPrice } = useSelector((state: any) => {
    const items = state.cart.items;
    const totalPrice = state.cart.totalPrice;
    return { items, totalPrice };
  });

  const product = {
    description: "design + code",
    price: totalPrice,
  };

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route
          path=""
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Home />
            </Suspense>
          }
        />
        {/* <Route path="cart" element={<Cart />} /> */}
        <Route
          path="cart"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Cart></Cart>
            </Suspense>
          }
        />
        <Route
          path="pizza/:id"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <FullPizza />
            </Suspense>
          }
        />

        <Route
          path="*"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
      <Route
        path="paypal"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <Paypal product={product} />
          </Suspense>
        }
      />
    </Routes>
  );
};

export default App;
