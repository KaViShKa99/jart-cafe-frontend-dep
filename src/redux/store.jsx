import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./reducers/categoryReducer";
import productsReducer from "./reducers/productsReducer";
import productBuyReducer from "./reducers/productBuyReducer";
import cartItemReducer from "./reducers/cartItemReducer";
import searchItemReducer from "./reducers/searchItemReducer";
import userProfileReducer from "./reducers/userProfileReducer";
import signModelReducer from "./reducers/signModelReducer";
import paymentReducer from "./reducers/paymentReducer";
import adminReducer from "./reducers/adminReducer";

const store = configureStore({
  reducer: {
    selectedCategory: categoryReducer,
    products: productsReducer,
    selectedProductInfo: productBuyReducer,
    cartItems: cartItemReducer,
    searchItems: searchItemReducer,
    userProfile: userProfileReducer,
    signModel: signModelReducer,
    userPayment: paymentReducer,
    admin:adminReducer
  },
});

export default store;
