import { createSlice } from "@reduxjs/toolkit";

const searchItemSlices = createSlice({
  name: "search-items",
  initialState: {
    searchArray: [],
  },
  reducers: {
    addToSearchArray: (state, action) => {
      const { product } = action.payload;
      state.searchArray = product;
    },
  },
});

export const { addToSearchArray } = searchItemSlices.actions;

export default searchItemSlices.reducer;
