import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiRequest from "../api";

export const submitReview = createAsyncThunk(
  "review/submitReview",
  async (reviewData, rejectWithValue) => {
    try {
      return await apiRequest("/review/save", "POST", reviewData, null);
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);
const productReviewSlices = createSlice({
  name: "product-review",
  initialState: {},
  reducers: {},
});

export default productReviewSlices.reducer;
