// Cancel.js
import React from "react";
import { Link } from "react-router-dom";

const Cancel = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Payment Cancelled</h1>
      <p>Your payment has been cancelled.</p>
      <Link to="/cart" style={{ textDecoration: "none", color: "blue" }}>
        Return to Cart
      </Link>
    </div>
  );
};

export default Cancel;
