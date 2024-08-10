import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiRequest from "../api";

export const submitReview = createAsyncThunk(
  "review/submitReview",
  async (reviewData, { rejectWithValue }) => {
    try {
      return await apiRequest("/review/save", "POST", reviewData, null);
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);
export const getProductReviews = createAsyncThunk(
  "review/getProductReviews",
  async (productId, { rejectWithValue }) => {
    try {
      return await apiRequest(`/review/get/${productId}`, "GET", null);
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const updateReviewStatus = createAsyncThunk(
  "review/updateReviewStatus",
  async (data, { rejectWithValue }) => {
    try {
      const { purchaseId, orderId, status } = data;
      return await apiRequest(
        `/order/update/review-status/${orderId}/${purchaseId}`,
        "PUT",
        status
      );
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);
const productReviewSlices = createSlice({
  name: "product-review",
  initialState: {
    productReviewsById: [],
    sortOption: "newest",
  },
  reducers: {
    sortedReview: (state, action) => {
      const option = action.payload;
      state.sortOption = option;
      let reviewArray = [...state.productReviewsById];

      switch (option) {
        case "Newest":
          reviewArray.sort((a, b) => new Date(b.date) - new Date(a.date));
          break;
        case "Highest":
          reviewArray.sort((a, b) => b.rating - a.rating);
          break;
        case "Lowest":
          reviewArray.sort((a, b) => a.rating - b.rating);
          break;
        default:
          break;
      }
      state.productReviewsById = reviewArray;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProductReviews.fulfilled, (state, action) => {
      state.productReviewsById = action.payload;
    });
  },
});

export const { sortedReview } = productReviewSlices.actions;

export default productReviewSlices.reducer;
