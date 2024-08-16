import { createSlice } from "@reduxjs/toolkit";
import CryptoJS from "crypto-js";
import AlertBox from "../../components/AlertBox";
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
      const { newItem, isPhysical } = action.payload;
      if (isPhysical) {
        const { uploadedImage, numOfPersons, material, size } = newItem;
        if (!uploadedImage || !numOfPersons || !material || !size) {
          AlertBox(
            "error",
            "Error",
            "Please fill in all required fields for physical items."
          );

          return;
        }
      } else {
        const { uploadedImage, numOfPersons, style, figure } = newItem;
        if (!uploadedImage || !numOfPersons || !style || !figure) {
          AlertBox(
            "error",
            "Error",
            "Please fill in all required fields for digital items."
          );
          return;
        }
      }

      if (state.cartArray.length === 0) {
        state.cartArray.push(newItem);
        AlertBox(
          "success",
          "Cart Update",
          "Item successfully added to your cart.44"
        );
        saveCartToStorage(state.cartArray);
      } else {
        const existingItem = state.cartArray.find(
          (product) => product.artworkId === newItem.artworkId
        );

        if (!existingItem) {
          state.cartArray.push(newItem);
          AlertBox(
            "success",
            "Cart Update",
            "Item successfully added to your cart."
          );
          saveCartToStorage(state.cartArray);
        } else {
          AlertBox("error", "Error", "Cart Item already in the cart.");
        }
      }
      // saveCartToStorage(state.cartArray);
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
