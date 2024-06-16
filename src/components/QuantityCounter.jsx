import { useState, useEffect } from "react";
import { useStateContext } from "./StateContext";

const QuantityCounter = ({ TotalQuantity, product }) => {
  const { updateQuantity } = useStateContext();

  const [quantity, setQuantity] = useState(product.quantity || 1);

  const decreaseQuantity = (e) => {
    e.preventDefault();
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const increaseQuantity = (e) => {
    e.preventDefault();
    setQuantity(quantity + 1);
  };

  useEffect(() => {
    updateQuantity(product.id, quantity);
    TotalQuantity(quantity);
  }, [quantity]);

  return (
    <div className="quantity-container">
      <div className="quantity-btn">
        <button className="decrease-btn" onClick={decreaseQuantity}>
          -
        </button>
        <span className="quantity-value">{quantity}</span>
        <button className="increase-btn" onClick={increaseQuantity}>
          +
        </button>
      </div>
    </div>
  );
};

export default QuantityCounter;
