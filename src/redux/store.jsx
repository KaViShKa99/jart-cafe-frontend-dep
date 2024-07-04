import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./reducers/categoryReducer";
import productsReducer from "./reducers/productsReducer";
import productBuyReducer from "./reducers/productBuyReducer";
import cartItemReducer from "./reducers/cartItemReducer";
import searchItemReducer from "./reducers/searchItemReducer";

const store = configureStore({
  reducer: {
    selectedCategory: categoryReducer,
    products: productsReducer,
    selectedProductInfo: productBuyReducer,
    cartItems: cartItemReducer,
    searchItems: searchItemReducer,
  },
});

export default store;
