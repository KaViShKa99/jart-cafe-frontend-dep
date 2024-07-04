// PrivateRoute.js
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const isAuthenticated = () => {
  return localStorage.getItem("isLoggedIn") === "true";
};

const PrivateRoute = ({ element }) => {
  const location = useLocation();

  return isAuthenticated() ? (
    element
  ) : (
    <Navigate to="/admin-login" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
