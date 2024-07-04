import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./components/pages/Home";
import SelectedProduct from "./components/pages/SelectedProduct";
import Cart from "./components/pages/Cart";
import { Admin } from "./components/pages/Admin";
import NewPasswordPage from "./components/pages/NewPasswordPage";
import AdminLogin from "./components/pages/AdminLogin";
import SearchPage from "./components/pages/SearchPage";
import "rsuite/dist/rsuite.min.css";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products/:id" element={<SelectedProduct />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/admin" element={<PrivateRoute element={<Admin />} />} />
      <Route path="/password-reset" element={<NewPasswordPage />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/search" element={<SearchPage />} />
    </Routes>
  );
};

export default App;
