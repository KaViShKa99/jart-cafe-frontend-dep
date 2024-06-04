import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./sass/index.sass";
import { StateProvider } from "./components/StateContext.jsx";

import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <StateProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StateProvider>
  // </React.StrictMode>
);
