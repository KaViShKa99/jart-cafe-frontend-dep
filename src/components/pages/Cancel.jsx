// Cancel.js
import React, { useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import axios from "axios";

const Cancel = () => {
  const location = useLocation();
  // const { session_id } = useParams();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const sessionId = params.get("session_id");

    console.log(sessionId);
    // console.log(session_id);

    if (sessionId) {
      axios
        .post(
          `https://localhost:8080/api/checkout/cancel?session_id=${sessionId}`
        )
        .then((response) => {
          console.log("Cancellation handled:", response.data);
        })
        .catch((error) => {
          console.error("Error handling cancellation:", error);
        });
    }
  }, [location.search]);
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
