import React, { useCallback, useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  "pk_test_51PZ7ycBsyZu44QDtrkM54OTfmO7SoRh1emWvFspOCmMAPntWAFAj7GdRhIAmvXWYmPENQOytvsDIWMuiSOsOmFPy001xtRcY6Z"
);
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const CheckoutForm = () => {
  const fetchClientSecret = useCallback(() => {
    // Create a Checkout Session
    return fetch(backendUrl + "/create-checkout-session", {
      method: "POST",
      // data:{
      //       currency: "usd",
      //       amount: 4000, // amount in cents
      //     },
      // headers:{
      //   "Content-Type": "application/json",

      // }
    })
      .then((res) => res.json())
      .then((data) => data.clientSecret);
  }, []);

  const options = { fetchClientSecret };

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
};

export default CheckoutForm;
