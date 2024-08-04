import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../api";
import { loadStripe } from "@stripe/stripe-js";
const public_key = import.meta.env.VITE_STRIPE_PUBLIC_KEY;

const stripePromise = loadStripe(public_key);

export const userPayment = createAsyncThunk(
  "user/payment",
  async (userCredentials, { rejectWithValue }) => {
    try {
      console.log(userCredentials);

      const response = await apiRequest(
        "/checkout/create-session",
        "POST",
        userCredentials,
        null
      );
      console.log(response);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const userPaymentCancel = createAsyncThunk(
  "user/paymentCancel",
  async (sessionId, { rejectWithValue }) => {
    try {
      const response = await apiRequest(
        `/checkout/cancel?session_id=${sessionId}`,
        "POST",
        null
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const paymentModel = createSlice({
  name: "stripe-payment",
  initialState: {},
  reducers: {
    openCardPayment: (state) => {},
  },
  extraReducers: (builder) => {
    builder.addCase(userPayment.fulfilled, async (state, action) => {
      try {
        const session = action.payload;

        console.log(session);

        const stripe = await stripePromise;
        const { error } = await stripe.redirectToCheckout({
          sessionId: session.id,
        });

        if (error) {
          console.error("Error redirecting to checkout:", error);
        }
      } catch (error) {
        console.error("Error during payment processing:", error);
      }
    });
    // builder.addCase(userPaymentCancel.fulfilled, async (state, action) => {
    //   // console.log(action.payload);
    // });
  },
});

export const { openCardPayment } = paymentModel.actions;
export default paymentModel.reducer;
