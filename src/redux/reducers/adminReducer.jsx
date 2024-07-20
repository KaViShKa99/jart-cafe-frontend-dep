import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PREVIEW_STATE } from "../adminPanleStates";
import apiRequest from "../api";
import { categories } from "../../data/Data";
import { uploadFiles } from "../ImageUpload";

// import { storage } from "../../config/firebase";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// const uploadFiles = async (files) => {
//   try {
//     const urls = await Promise.all(
//       files.map(async (file) => {
//         const storageRef = ref(storage, `images/${file.name}`);
//         const snapshot = await uploadBytes(storageRef, file);
//         const url = await getDownloadURL(snapshot.ref);
//         return url;
//       })
//     );
//     return urls;
//   } catch (error) {
//     console.error("Error uploading images:", error);
//     throw error;
//   }
// };

export const uploadImages = createAsyncThunk(
  "admin/uploadImages",
  async (files, { rejectWithValue }) => {
    return files;
    // try {
    // //   const urls = await uploadFiles(files);
    // //   return urls;
    // } catch (error) {
    //   return rejectWithValue(error);
    // }
  }
);

export const fetchProducts = createAsyncThunk(
  "admin/fetchProducts",
  async () => {
    return await apiRequest("/artworks", "GET");
  }
);

const adminSlices = createSlice({
  name: "admin-states",
  initialState: {
    previewState: PREVIEW_STATE,
    artworks: [],
  },
  reducers: {
    categoryChange: (state, action) => {
      const id = action.payload;
      if (id !== 0) {
        const selectedCategory = categories.find(
          (cat) => cat.id === parseInt(action.payload)
        );
        state.previewState.category = selectedCategory;
      }
    },
    titleChange: (state, action) => {
      state.previewState.title = action.payload;
    },
    descriptionChange: (state, action) => {
      state.previewState.description = action.payload;
    },
    lastPriceChange: (state, action) => {
      state.previewState.lastPrice = action.payload;
    },
    priceChange: (state, action) => {
      state.previewState.price = action.payload;
    },
    fileChange: (state, action) => {
      state.previewState.images = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.artworks = action.payload;
    });
    builder.addCase(uploadImages.fulfilled, (state, action) => {
      state.previewState.images = [
        ...state.previewState.images,
        ...action.payload,
      ];
    });
    builder.addCase(uploadImages.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

export const {
  fileChange,
  priceChange,
  lastPriceChange,
  categoryChange,
  titleChange,
  descriptionChange,
} = adminSlices.actions;
export default adminSlices.reducer;
