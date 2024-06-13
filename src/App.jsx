import { Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import SelectedProduct from "./components/pages/SelectedProduct";
import Cart from "./components/pages/Cart";
import { Admin } from "./components/pages/Admin";
import NewPasswordPage from "./components/pages/NewPasswordPage";
import "rsuite/dist/rsuite.min.css";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/products/:id" element={<SelectedProduct />}></Route>
      <Route path="/cart" element={<Cart />}></Route>
      <Route path="/admin" element={<Admin />}></Route>
      <Route path="/password-reset" element={<NewPasswordPage />}></Route>
    </Routes>
  );
};

export default App;
