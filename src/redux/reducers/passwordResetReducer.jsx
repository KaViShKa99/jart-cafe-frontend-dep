import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiRequest from "../api";
// import AlertBox from "../../components/AlertBox";

export const resetNewPassword = createAsyncThunk(
  "user/resetNewPassword",
  async (data, { rejectWithValue }) => {
    try {
      const { token, newPassword } = data;
      return await apiRequest("/password-reset/reset", "POST", data, null);
      // return await apiRequest("/password-reset/reset", "POST", newPassword, token);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const passwordResetSlice = createSlice({
  name: "password-reset",
  initialState: {
    message: "",
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(resetNewPassword.fulfilled, (state, action) => {
      // setMessage("Password has been reset successfully");
      // setLoading(false);
      state.message = "Password has been reset successfully";
      state.loading = false;
    });
    builder.addCase(resetNewPassword.rejected, (state, action) => {
      // setMessage("An error occurred");
      state.message = "An error occurred";
    });
  },
});

export default passwordResetSlice.reducer;
