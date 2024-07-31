import { createSlice } from "@reduxjs/toolkit";
import CryptoJS from "crypto-js";

const secretKey = import.meta.env.VITE_SECRET_KEY;

const loadCartFromStorage = () => {
  try {
    const encryptedCart = localStorage.getItem("encryptedCart");

    if (encryptedCart) {
      const bytes = CryptoJS.AES.decrypt(encryptedCart, secretKey);
      const decryptedCart = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

      return decryptedCart;
    }
  } catch (error) {
    console.error("Error loading cart from local storage:", error);
  }

  return [];
};

const saveCartToStorage = (cartArray) => {
  try {
    const serializedCart = JSON.stringify(cartArray);

    const encryptedCart = CryptoJS.AES.encrypt(
      serializedCart,
      secretKey
    ).toString();

    localStorage.setItem("encryptedCart", encryptedCart);
  } catch (error) {
    console.error("Error saving cart to local storage:", error);
  }
};

const cartItemSlices = createSlice({
  name: "cart-array",
  initialState: {
    cartArray: loadCartFromStorage() || [],
    subTotal: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;

      if (state.cartArray.length === 0) {
        state.cartArray.push(newItem);
      } else {
        const existingItem = state.cartArray.find(
          (product) => product.artworkId === newItem.artworkId
        );

        if (!existingItem) {
          state.cartArray.push(newItem);
        }
      }
      saveCartToStorage(state.cartArray);
    },
    removeCart: (state, action) => {
      const artworkId = action.payload;
      const updatedCartItems = state.cartArray.filter(
        (product) => product.artworkId !== artworkId
      );
      state.cartArray = updatedCartItems;
      saveCartToStorage(updatedCartItems);
    },
    updateCartQuntity: (state, action) => {
      const { quantity, id } = action.payload;
      const updatedCartItems = state.cartArray.map((product) => {
        if (product.artworkId === id) {
          const total = (product.eachPrice + product.price) * quantity;
          return { ...product, quantity, total };
        }
        return product;
      });
      state.cartArray = updatedCartItems;
      saveCartToStorage(updatedCartItems);
    },
    updateSubTotal: (state) => {
      state.subTotal = state.cartArray.reduce(
        (acc, product) => acc + product.total,
        0
      );
    },
    updateCartItem: (state, action) => {
      const updatedItem = action.payload;
      const { artworkId } = updatedItem;

      const updatedCartItems = state.cartArray.map((product) => {
        if (product.artworkId === artworkId) {
          return { ...product, ...updatedItem };
        }
        return product;
      });
      console.log(updatedCartItems);

      state.cartArray = updatedCartItems;
      saveCartToStorage(updatedCartItems);
    },
  },
});

export const {
  updateCartItem,
  updateSubTotal,
  addToCart,
  removeCart,
  updateCartQuntity,
} = cartItemSlices.actions;

export default cartItemSlices.reducer;
