// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import { useState } from 'react'

import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import ProductView from "./components/ProductView";
import SelectedProduct from "./components/SelectedProduct";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/product/:id" element={<SelectedProduct />}></Route>
      {/* <Route path="/product" element={<SelectedProduct />}></Route> */}
      {/* <Route path='/order' element={<Home />}></Route> */}
    </Routes>
  );
};

export default App;
