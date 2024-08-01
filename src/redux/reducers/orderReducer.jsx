import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiRequest from "../api";

export const fetchOrderedDetails = createAsyncThunk(
  "admin/fetchProducts",
  async () => {
    return await apiRequest("/order", "GET");
  }
);
export const updateStatus = createAsyncThunk(
  "admin/updateStatus",
  async (data, { getState, rejectWithValue }) => {
    const { id, status } = data;
    console.log(status);
    try {
      return await apiRequest(`/order/update/status/${id}`, "PUT", status);
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);
export const updateCompletedDate = createAsyncThunk(
  "admin/updateCompletedDate",
  async (data, { getState, rejectWithValue }) => {
    try {
      const { id, date } = data;

      return await apiRequest(`/order/update/complete-date/${id}`, "PUT", date);
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

const adminOrderDetailsSlices = createSlice({
  name: "order-states",
  initialState: {
    orders: [],
    orderStatus: "Progress",
    orderCompleteDate: "",
  },
  reducers: {
    orderStatusChange: (state, action) => {
      const status = action.payload;
      state.orderStatus = status === "Complete" ? "Progress" : "Complete";
    },
    orderCompleteDateChange: (state, action) => {
      state.orderCompleteDate = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOrderedDetails.fulfilled, (state, action) => {
      state.orders = action.payload;
    });
  },
});

export const { orderStatusChange, orderCompleteDateChange } =
  adminOrderDetailsSlices.actions;

export default adminOrderDetailsSlices.reducer;
