// import { useState } from 'react'
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import SelectedProduct from "./components/SelectedProduct";
import Cart from "./components/Cart";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/product/:id" element={<SelectedProduct />}></Route>
      <Route path="/cart" element={<Cart />}></Route>
    </Routes>
  );
};

export default App;
