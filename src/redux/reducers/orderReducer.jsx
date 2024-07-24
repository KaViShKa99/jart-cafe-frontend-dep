import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiRequest from "../api";

export const fetchOrderedDetails = createAsyncThunk(
  "admin/fetchProducts",
  async () => {
    return await apiRequest("/order", "GET");
  }
);

const adminOrderDetailsSlices = createSlice({
  name: "order-states",
  initialState: {
    orders: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOrderedDetails.fulfilled, (state, action) => {
      console.log(action.payload);
      state.orders = action.payload;
    });
  },
});

export default adminOrderDetailsSlices.reducer;
