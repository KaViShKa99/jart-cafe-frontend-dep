import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./sass/index.sass";
import { StateProvider } from "./components/StateContext.jsx";
import { BrowserRouter } from "react-router-dom";

import store from "./redux/store.jsx";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <StateProvider>
  //   <BrowserRouter>
  //     <App />
  //   </BrowserRouter>
  // </StateProvider>

  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
