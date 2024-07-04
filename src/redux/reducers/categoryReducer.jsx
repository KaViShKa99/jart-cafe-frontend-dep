import { createSlice } from "@reduxjs/toolkit";

const cateregorySlice = createSlice({
  name: "category",
  initialState: {
    category: "Pop art",
    activeIndex: 0,
  },
  reducers: {
    setSelectCategory: (state, action) => {
      const { name, index } = action.payload;
      state.category = name;
      state.activeIndex = index;
    },
  },
});

export const { setSelectCategory } = cateregorySlice.actions;
export default cateregorySlice.reducer;
