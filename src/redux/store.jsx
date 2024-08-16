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

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "selectedProductInfo",
  storage,
  whitelist: ["selectedProduct", "digitalArt", "physicalArt"], // Persisting selectedProduct state too
};

const persistedReducer = persistReducer(persistConfig, productBuyReducer);

const store = configureStore({
  reducer: {
    selectedCategory: categoryReducer,
    products: productsReducer,
    selectedProductInfo: persistedReducer,
    // selectedProductInfo: productBuyReducer,
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

export const persistor = persistStore(store);
export default store;
