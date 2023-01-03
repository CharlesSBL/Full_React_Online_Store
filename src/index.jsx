import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import App from "./App";

import { store } from "./redux/store.js";

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

// {
//   class AppRenderer {
//     constructor() {
//       this.rootElem = document.getElementById("root");
//     }

//     render() {
//       if (this.rootElem) {
//         const root = ReactDOM.createRoot(this.rootElem);

//         root.render(
//           <BrowserRouter>
//             <Provider store={store}>
//               <App />
//             </Provider>
//           </BrowserRouter>
//         );
//       }
//     }
//   }

//   const renderer = new AppRenderer();
//   renderer.render();
// }
