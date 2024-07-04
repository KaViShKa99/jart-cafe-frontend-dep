import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./sass/index.sass";
import { BrowserRouter as Router } from "react-router-dom";

import store from "./redux/store.jsx";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);
