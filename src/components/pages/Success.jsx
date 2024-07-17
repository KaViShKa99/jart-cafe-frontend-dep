// Success.js
import React from "react";
import { Link } from "react-router-dom";

const Success = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Payment Successful</h1>
      <p>Your payment has been processed successfully.</p>
      <Link to="/" style={{ textDecoration: "none", color: "blue" }}>
        Return to Home
      </Link>
    </div>
  );
};

export default Success;
