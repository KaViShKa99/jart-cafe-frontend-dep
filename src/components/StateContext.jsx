import { createContext, useContext, useState, useEffect } from "react";
import CryptoJS from "crypto-js";

const stateContext = createContext();

export const StateProvider = ({ children }) => {
  const [selectCategory, setSelectCategory] = useState(null);
  const [selectProduct, setSelectProduct] = useState(null);
  const [cartTotalAmount, setCartTotalAmount] = useState(0);
  const [products, setProducts] = useState([]);

  const [cartArray, setCartArray] = useState(() => {
    const savedCart = localStorage.getItem("cart-sync");
    if (savedCart) {
      try {
        const bytes = CryptoJS.AES.decrypt(savedCart, "secretKey");
        const decryptedCart = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        return decryptedCart || [];
      } catch (error) {
        console.error("Error decrypting cart data:", error);
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    console.log(cartArray);
    const encryptedCart = CryptoJS.AES.encrypt(
      JSON.stringify(cartArray),
      "secretKey"
    ).toString();
    localStorage.setItem("cart-sync", encryptedCart);

    setCartTotalAmount(cartArray.reduce((sum, item) => sum + item.total, 0));
  }, [cartArray]);

  const addItemToCart = (item) => {
    setCartArray((prevCart) => [...prevCart, item]);
  };

  const clearCart = () => {
    setCartArray([]);
  };

  const updateQuantity = (id, quantity) => {
    setCartArray((prevCart) =>
      prevCart.map((item) =>
        item.artworkId === id
          ? { ...item, quantity: quantity, total: item.eachPrice * quantity }
          : item
      )
    );
  };

  return (
    <stateContext.Provider
      value={{
        selectCategory,
        setSelectCategory,
        selectProduct,
        setSelectProduct,
        cartArray,
        setCartArray,
        products,
        setProducts,
        addItemToCart,
        clearCart,
        updateQuantity,
        cartTotalAmount,
      }}
    >
      {children}
    </stateContext.Provider>
  );
};
export const useStateContext = () => useContext(stateContext);
