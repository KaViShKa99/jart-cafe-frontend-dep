import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userPaymentCancel } from "../../redux/reducers/paymentReducer";
import { MdCancel } from "react-icons/md";
import { Loader } from "rsuite";

const Cancel = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Use useNavigate to control navigation
  const dispatch = useDispatch();
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const sessionId = params.get("session_id");

    if (sessionId) {
      dispatch(userPaymentCancel(sessionId));
    }
    const timer = setTimeout(() => {
      setShowLoading(true);
    }, 3000);

    const redirectTimer = setTimeout(() => {
      navigate("/cart");
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearTimeout(redirectTimer);
    };
  }, [location.search, dispatch, navigate]);

  return (
    <div className="cancel-container-wrapper">
      {!showLoading ? (
        <div className="cancel-container">
          <MdCancel className="cancel-icon" />
          <h1>Payment Cancelled</h1>
          <p>
            Your payment has been cancelled. Please try again or contact support
            if you need assistance.
          </p>
          {/* <Link to="/cart" className="return-link">
            Return to Cart
          </Link> */}
        </div>
      ) : (
        <div className="loading-container">
          <Loader center size="lg" />
        </div>
      )}
    </div>
  );
};

export default Cancel;
