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
import orderReducer from "./reducers/orderReducer";
import reviewReducer from "./reducers/reviewReducer";
import fileDownloadReducer from "./reducers/fileDownloadReducer";
import passwordResetReducer from "./reducers/passwordResetReducer";

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
    admin: adminReducer,
    order: orderReducer,
    review: reviewReducer,
    fileDownload: fileDownloadReducer,
    passwordReset: passwordResetReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
