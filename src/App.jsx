import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import SelectedProduct from "./components/SelectedProduct";
import Cart from "./components/Cart";
import { Admin } from "./components/Admin";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/products/:id" element={<SelectedProduct />}></Route>
      <Route path="/cart" element={<Cart />}></Route>
      <Route path="/admin" element={<Admin />}></Route>
    </Routes>
  );
};

export default App;
