import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiRequest from "../api";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    return await apiRequest("/artworks", "GET");
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    });
  },
});

export default productSlice.reducer;
