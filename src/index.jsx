import { createRoot } from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { store } from "./redux/store";

const rootElem = document.getElementById("root");

if (rootElem) {
  createRoot(rootElem).render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  );
}
