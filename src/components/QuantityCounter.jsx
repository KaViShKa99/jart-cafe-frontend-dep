import { useState, useEffect } from "react";
import { useStateContext } from "./StateContext";

const QuantityCounter = ({
  TotalQuantity,
  initialQuantity,
  product,
  cartUpdate,
}) => {
  // const { updateQuantity } = useStateContext();

  // const [quantity, setQuantity] = useState(product.quantity || initialQuantity);
  const [quantity, setQuantity] = useState(initialQuantity);

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
    if (cartUpdate) {
      // updateQuantity(product.artworkId, quantity);
      TotalQuantity(quantity);
    } else {
      TotalQuantity(quantity);
    }
  }, [quantity]);

  useEffect(() => {
    setQuantity(initialQuantity);
  }, [initialQuantity]);

  return (
    <div className="quantity-container">
      <div className="quantity-btn">
        <button className="decrease-btn" onClick={decreaseQuantity}>
          -
        </button>
        <span className="quantity-value">{quantity}</span>
        {/* <span className="quantity-value">{initialQuantity}</span> */}
        <button className="increase-btn" onClick={increaseQuantity}>
          +
        </button>
      </div>
    </div>
  );
};

export default QuantityCounter;
