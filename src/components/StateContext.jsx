import { createContext, useContext, useState } from "react";

const stateContext = createContext();

export const StateProvider = ({ children }) => {
  const [selectCategory, setSelectCategory] = useState(null);
  const [selectProduct, setSelectProduct] = useState(null);
  const [cartArray, setCartArray] = useState([]);
  const [products, setProducts] = useState([]);
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
      }}
    >
      {children}
    </stateContext.Provider>
  );
};
export const useStateContext = () => useContext(stateContext);
