import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiRequest from "../api";

export const fetchOrderByEmail = createAsyncThunk(
  "admin/fetchOrderByEmail",
  async (email) => {
    return await apiRequest(`/order/get/${email}`, "GET");
  }
);
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
    orderStatus: "progress",
    orderCompleteDate: "",
    orderListByEmail: [],
  },
  reducers: {
    orderStatusChange: (state, action) => {
      const { id, status } = action.payload;
      const orderToUpdate = state.orders.find((order) => order.orderId === id);
      if (orderToUpdate) {
        orderToUpdate.orderStatus = status;
      }
    },
    orderCompleteDateChange: (state, action) => {
      state.orderCompleteDate = action.payload;
      const { id, completedDate } = action.payload;
      const orderToUpdate = state.orders.find((order) => order.orderId === id);
      if (orderToUpdate) {
        orderToUpdate.completedDate = completedDate;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOrderedDetails.fulfilled, (state, action) => {
      console.log(action.payload);
      state.orders = action.payload;
    });
    builder.addCase(fetchOrderByEmail.fulfilled, (state, action) => {
      console.log(action.payload);

      state.orderListByEmail = action.payload;
    });
  },
});

export const { orderStatusChange, orderCompleteDateChange } =
  adminOrderDetailsSlices.actions;

export default adminOrderDetailsSlices.reducer;
