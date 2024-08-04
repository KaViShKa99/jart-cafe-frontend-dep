import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import "rsuite/dist/rsuite.min.css";
import Home from "./components/pages/Home";
import SelectedProduct from "./components/pages/SelectedProduct";
import Cart from "./components/pages/Cart";
import NewPasswordPage from "./components/pages/NewPasswordPage";
import AdminLogin from "./components/pages/AdminLogin";
import SearchPage from "./components/pages/SearchPage";
import Checkout from "./components/pages/Checkout";
import Success from "./components/pages/Success";
import Cancel from "./components/pages/Cancel";
import OrderdItems from "./components/pages/OrderdItems";
import { Admin } from "./components/pages/Admin";
import AdminManageOrders from "./components/pages/AdminManageOrders";
import TermsAndConditions from "./components/pages/TermsAndConditions";
import PrivacyPolicy from "./components/pages/PrivacyPolicy";
import RefundPolicy from "./components/pages/RefundPolicy";
import AboutUs from "./components/pages/AboutUs";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products/:id" element={<SelectedProduct />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/password-reset" element={<NewPasswordPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/success" element={<Success />} />
      <Route path="/cancel" element={<Cancel />} />
      <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/refund-policy" element={<RefundPolicy />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/ordered-items" element={<OrderdItems />} />
      <Route path="/admin" element={<PrivateRoute element={<Admin />} />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/admin/ordered-items" element={<AdminManageOrders />} />
    </Routes>
  );
};

export default App;
