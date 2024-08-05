import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { Loader, Placeholder } from "rsuite";

const Success = () => {
  const [showLoading, setShowLoading] = useState(false);
  const navigate = useNavigate(); // Use useNavigate to control navigation
  const numberOfPlaceholders = 8;

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(true);
    }, 3000);

    const redirectTimer = setTimeout(() => {
      navigate("/");
    }, 3000);
    return () => {
      clearTimeout(timer);
      clearTimeout(redirectTimer);
    };
  }, [navigate]);

  const placeholders = Array.from(
    { length: numberOfPlaceholders },
    (_, index) => (
      <div className="loading-item" key={index}>
        <Placeholder.Graph active width={300} height={200} />
      </div>
    )
  );

  return (
    <div className="success-container-wrapper">
      {!showLoading ? (
        <div className="success-container">
          <FaCheckCircle className="success-icon" />

          <h1>Payment Successful</h1>
          <p>Your payment has been processed successfully.</p>
        </div>
      ) : (
        <div className="loading-container">
          {/* {placeholders} */}
          <Loader center size="lg" />
        </div>
      )}
    </div>
  );
};

export default Success;
