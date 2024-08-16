import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import downloadImage from "../downloadApi";

export const downloadImg = createAsyncThunk(
  "admin/imageDownload",
  async (downloadOption, { rejectWithValue }) => {
    const { type, fileName } = downloadOption;
    
    return await downloadImage(type, fileName);
  }
);

const fileDownloadSlices = createSlice({
  name: "file-download",
  initialState: {},
  reducers: {},
  //   extraReducers: (builder) => {
  //     builder.addCase(downloadImg.fulfilled, (state, action) => {
  //       const data = action.payload;
  //     });
  //   },
});

export default fileDownloadSlices.reducer;
