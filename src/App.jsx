// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import { useState } from 'react'

import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import ProductView from "./components/ProductView";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/product" element={<ProductView />}></Route>
      {/* <Route path='/order' element={<Home />}></Route> */}
    </Routes>
  );
};

export default App;
