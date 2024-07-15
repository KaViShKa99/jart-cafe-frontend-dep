import { createSlice } from "@reduxjs/toolkit";

const signModel = createSlice({
  name: "cart-array",
  initialState: {
    isModalOpen: false,
    isOpenSignUp: false,
    isForgotPassword: false,
  },
  reducers: {
    setIsModalOpen: (state) => {
      state.isModalOpen = true;
    },
    setIsOpenSignUp: (state,action) => {

      state.isOpenSignUp = action.payload;
    },
    setIsForgotPassword: (state) => {
      state.isForgotPassword = true;
    },
    closeModel: (state) => {
      state.isModalOpen = false;
      state.isOpenSignUp = false;
      state.isForgotPassword = false;
    },
  },
});

export const {
  setIsModalOpen,
  setIsOpenSignUp,
  setIsForgotPassword,
  closeModel,
} = signModel.actions;
export default signModel.reducer;
