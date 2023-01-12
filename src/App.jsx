import React, { Children, useState } from "react";
import "./scss/app.scss";

import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Header from "./components/Header";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";
import FullPizza from "./pages/FullPizza";

import MainLayout from "./layouts/MainLayout";

// export const SearchContext = React.createContext();

// function Parent({ children }) {
//   return (
//     <div>
//       <h1>Header</h1>
//       {/* {children} */}
//       <Outlet />
//       <h4>123. 123. 123.</h4>
//     </div>
//   );
// }

const App = () => {
  // const [searchValue, setSearchValue] = useState("");

  return (
    // <div className="wrapper">
    // {/* <SearchContext.Provider value={{ searchValue, setSearchValue }}> */}
    // <Header />
    // {/* <Parent>aaa</Parent> */}
    // <div className="content">
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="pizza/:id" element={<FullPizza />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
    // </div>
    // {/* </SearchContext.Provider> */}
    // </div>
  );
};

export default App;
