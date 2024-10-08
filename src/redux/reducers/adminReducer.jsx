import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PREVIEW_STATE } from "../adminPanleStates";
import apiRequest from "../api";
import { categories } from "../../data/Data";

export const updateItem = createAsyncThunk(
  "admin/updateItem",
  async (data, { getState, rejectWithValue }) => {
    const state = getState();
    const id = state.admin.editId;
    console.log(data);

    const formData = {
      ...data,
      category: data.category.name,
    };
    try {
      await apiRequest(`/artworks/update/${id}`, "PUT", formData);
      return await apiRequest("/artworks", "GET");
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);
export const deleteArtwork = createAsyncThunk(
  "admin/deleteImage",
  async (id, { rejectWithValue }) => {
    return await apiRequest(`/artworks/delete/${id}`, "DELETE");
  }
);
export const removeImages = createAsyncThunk(
  "admin/removeImages",
  async (removeImageUrl, { rejectWithValue }) => {
    console.log(removeImageUrl);
    const imageName = removeImageUrl.split("/").pop();
    console.log(imageName);
    return await apiRequest(`/images/delete/${imageName}`, "DELETE");
  }
);
export const uploadImages = createAsyncThunk(
  "admin/uploadImage",
  async (file, { rejectWithValue }) => {
    const formData = new FormData();
    formData.append("file", file);
    // return await apiRequest("/images/upload", "POST", formData);
    return await apiRequest("/images/upload/artwork", "POST", formData);
  }
);

export const createArtwork = createAsyncThunk(
  "admin/createArtwork",
  async (data, { rejectWithValue }) => {
    const cleanedMaterials = data.materials.map(
      ({ expanded, ...rest }) => rest
    );
    const cleanedData = {
      ...data,
      category: data.category.name,
      materials: cleanedMaterials,
    };
    return await apiRequest("/artworks", "POST", cleanedData);
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
    setEdit: false,
    editId: 0,
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
    handleRemove: (state, action) => {
      const index = action.payload;
      const updatedArray = state.previewState.images.filter(
        (url, id) => id !== index
      );
      state.previewState.images = updatedArray;
    },
    handleLinkChange: (state, action) => {
      const imageLinks = action.payload;
      if (imageLinks.trim() !== "") {
        state.previewState.images = [...state.previewState.images, imageLinks];
      }
    },
    handleSizePrice: (state, action) => {
      const { material, size, value } = action.payload;

      state.previewState.materials = state.previewState.materials.map((mat) =>
        mat.material === material
          ? {
              ...mat,
              sizes: mat.sizes.map((s) =>
                s.size === size ? { ...s, price: value } : s
              ),
            }
          : mat
      );
    },
    toggleSizeChange: (state, action) => {
      const { materialIndex } = action.payload;

      state.previewState.materials = state.previewState.materials.map(
        (mat, index) =>
          index === materialIndex ? { ...mat, expanded: !mat.expanded } : mat
      );
    },
    handleRemoveSize: (state, action) => {
      const { material, index } = action.payload;

      state.previewState.materials = state.previewState.materials
        .map((mat) => {
          if (mat.material === material) {
            return {
              ...mat,
              sizes: mat.sizes.filter((_, i) => i !== index),
            };
          }
          return mat;
        })
        .filter((mat) => mat.sizes.length > 0);
    },
    handleEditChange: (state, action) => {
      state.setEdit = true;
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      const artwork = action.payload;
      const selectedCategory = categories.find(
        (cat) => artwork.category === artwork.category
      );
      state.previewState.category = selectedCategory;
      state.editId = artwork.artworkId;
      state.previewState.title = artwork.title;
      state.previewState.description = artwork.description;
      state.previewState.lastPrice = artwork.lastPrice;
      state.previewState.price = artwork.price;
      state.previewState.images = artwork.images;
      state.previewState.materials = artwork.materials;
    },
    cancelEdit: (state, action) => {
      state.setEdit = false;
      state.previewState = PREVIEW_STATE;
    },
    enableEdit: (state) => {
      state.setEdit = true;
    },
    handleReset: (state, action) => {
      state.previewState = PREVIEW_STATE;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.artworks = action.payload;
    });
    builder.addCase(uploadImages.fulfilled, (state, action) => {
      console.log(action.payload);
      state.previewState.images = [
        ...state.previewState.images,
        action.payload,
      ];
    });
    builder.addCase(uploadImages.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(removeImages.fulfilled, (state, action) => {
      console.log(action.payload);
    });
    builder.addCase(deleteArtwork.fulfilled, (state, action) => {
      fetchProducts();
    });
    builder.addCase(updateItem.fulfilled, (state, action) => {
      state.artworks = action.payload;
    });
  },
});

export const {
  handleReset,
  enableEdit,
  cancelEdit,
  handleEditChange,
  handleRemoveSize,
  toggleSizeChange,
  handleSizePrice,
  handleLinkChange,
  handleRemove,
  fileChange,
  priceChange,
  lastPriceChange,
  categoryChange,
  titleChange,
  descriptionChange,
} = adminSlices.actions;
export default adminSlices.reducer;
