import apiRequest from "../api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DIGITAL_ART, PHISICAL_ART } from "../productBuyStates";
import { persons, styles, figures } from "../../data/Data";

export const fetchSelectedProduct = createAsyncThunk(
  "selectedProducts/fetchProduct",
  async (id) => {
    return await apiRequest(`/artworks/get/${id}`, "GET");
  }
);

export const uploadUserImage = createAsyncThunk(
  "user/uploadImage",
  async ({ file, isPhysical }, { rejectWithValue }) => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await apiRequest("/images/upload/user", "POST", formData);
    return { imageUrl: response, isPhysical: isPhysical };
  }
);

const productBuyDetails = createSlice({
  name: "product-buy-details",
  initialState: {
    selectedProduct: [],
    digitalArt: DIGITAL_ART,
    physicalArt: PHISICAL_ART,
  },
  reducers: {
    uploadImageChange: (state, action) => {
      const { file, isPhysical } = action.payload;
      const imageUrl = URL.createObjectURL(file);

      if (isPhysical) {
        state.physicalArt.uploadedImage = imageUrl;
        // state.physicalArt.uploadImgObj = file;
      } else {
        state.digitalArt.uploadedImage = imageUrl;
        // state.digitalArt.uploadImgObj = file;
      }
      // const { imageUrl, isPhysical } = action.payload;
      // if (isPhysical) {
      //   state.physicalArt.uploadedImage = imageUrl;
      // } else {
      //   state.digitalArt.uploadedImage = imageUrl;
      // }
    },
    personChange: (state, action) => {
      const { id, isPhysical } = action.payload;
      const selectedPerson = persons.find(
        (person) => person.id === parseInt(id)
      );
      const artType = isPhysical ? state.physicalArt : state.digitalArt;

      if (artType.numOfPersons) {
        const previousPerson = persons.find(
          (person) => person.id === artType.numOfPersons.id
        );
        artType.eachPrice += selectedPerson.value - previousPerson.value;
      } else {
        artType.eachPrice += selectedPerson.value;
      }

      artType.numOfPersons = selectedPerson;
    },
    styleChange: (state, action) => {
      const id = action.payload;
      const selectedStyle = styles.find((sty) => sty.id === parseInt(id));

      if (!state.digitalArt.style) {
        state.digitalArt.eachPrice += selectedStyle.value;
      } else {
        const prvPer = styles.find(
          (per) => per.id === state.digitalArt.style.id
        );
        state.digitalArt.eachPrice =
          state.digitalArt.eachPrice - prvPer.value + selectedStyle.value;
      }
      state.digitalArt.style = selectedStyle;
    },
    figureChange: (state, action) => {
      const id = action.payload;

      const selectedFigure = figures.find((fig) => fig.id === parseInt(id));
      if (!state.digitalArt.figure) {
        state.digitalArt.eachPrice += selectedFigure.value;
      } else {
        const prvPer = figures.find(
          (per) => per.id === state.digitalArt.figure.id
        );
        state.digitalArt.eachPrice =
          state.digitalArt.eachPrice - prvPer.value + selectedFigure.value;
      }
      state.digitalArt.figure = selectedFigure;
    },
    designerNoteChange: (state, action) => {
      const { note, isPhysical } = action.payload;
      state[isPhysical ? "physicalArt" : "digitalArt"].designerNote = note;
    },
    clearUploadedImage: (state) => {
      state.digitalArt.uploadedImage = null;
      state.digitalArt.uploadImgObj = null;
      state.physicalArt.uploadedImage = null;
      state.physicalArt.uploadImgObj = null;
    },
    updateQuantityChange: (state, action) => {
      const { quantity, isPhysical } = action.payload;
      state[isPhysical ? "physicalArt" : "digitalArt"].quantity = quantity;
    },
    updateTotal: (state, action) => {
      const isPhysical = action.payload;
      const { eachPrice, price, quantity } =
        state[isPhysical ? "physicalArt" : "digitalArt"];
      state[isPhysical ? "physicalArt" : "digitalArt"].total =
        (eachPrice + price) * quantity;
    },
    updateProductInfo: (state, action) => {
      const { props, editForm } = action.payload;
      const { artworkId, category, price, materials } = props;

      const updatedFields = {
        artworkId,
        category,
        price,
        materials,
        productImage: editForm ? props.productImage : props.images,
      };

      Object.assign(state.digitalArt, updatedFields);
      Object.assign(state.physicalArt, updatedFields);
    },
    materialNameChange: (state, action) => {
      state.physicalArt.material = action.payload;
    },
    materialSizeChange: (state, action) => {
      const { price } = action.payload;
      if (!state.physicalArt.size) {
        state.physicalArt.eachPrice += price;
      } else {
        const prvPrice = state.physicalArt.size.price;
        state.physicalArt.eachPrice =
          state.physicalArt.eachPrice - prvPrice + price;
      }
      state.physicalArt.size = action.payload;
    },
    paintingNoteChange: (state, action) => {
      state.physicalArt.paintingNote = action.payload;
    },
    clearStates: (state) => {
      state.digitalArt = DIGITAL_ART;
      state.physicalArt = PHISICAL_ART;
    },
    updateEditForms: (state, action) => {
      const { isPhysicalArt } = action.payload;
      state[isPhysicalArt ? "physicalArt" : "digitalArt"] = action.payload;
    },
    updateArtworkState: (state, action) => {
      // const isPhysical = action.payload;
      // console.log(isPhysical);
      // if (isPhysical) {
      //   state.physicalArt.isPhysicalArt = isPhysical;
      // } else {
      //   state.digitalArt.isPhysicalArt = isPhysical;
      // }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSelectedProduct.fulfilled, (state, action) => {
      state.selectedProduct = action.payload;
    });
    builder.addCase(uploadUserImage.fulfilled, (state, action) => {
      const { imageUrl, isPhysical } = action.payload;
      if (isPhysical) {
        state.physicalArt.uploadedImage = imageUrl;
      } else {
        state.digitalArt.uploadedImage = imageUrl;
      }
    });
  },
});

export const {
  updateArtworkState,
  updateEditForms,
  updateProductInfo,
  uploadImageChange,
  personChange,
  styleChange,
  figureChange,
  designerNoteChange,
  clearUploadedImage,
  updateQuantityChange,
  updateTotal,
  materialSizeChange,
  materialNameChange,
  paintingNoteChange,
  clearStates,
} = productBuyDetails.actions;

export default productBuyDetails.reducer;
