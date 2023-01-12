// {import { createRoot } from "react-dom";
// import { Provider } from "react-redux";
// import { BrowserRouter } from "react-router-dom";

// import App from "./App";
// import { store } from "./redux/store";

// import ReactDOM from "react-dom";}
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import App from "./App";

import { store } from "./redux/store";

const rootElem = document.getElementById("root");

if (rootElem) {
  const root = ReactDOM.createRoot(rootElem);

  root.render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  );
}
