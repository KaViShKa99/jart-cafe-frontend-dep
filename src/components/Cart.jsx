import React from "react";
import { FiEdit } from "react-icons/fi";
import { AiOutlineCloseSquare } from "react-icons/ai";
import Navbar from "./Navbar";

const Cart = () => {
  const products = [
    { image: "/imgs/canvas.jpeg", name: "Product 1", price: 10, quantity: 1 },
    { image: "/imgs/poster.jpeg", name: "Product 1", price: 10, quantity: 1 },
    // { name: "Product 2", price: 15, quantity: 2 },
    // { name: "Product 3", price: 20, quantity: 1 },
  ];

  const calculateTotal = (price, quantity) => price * quantity;

  return (
    <div className="cart-container">
      <Navbar />
      <div className="cart-body">
        <div className="cart-list">
          <span className="cart-heading">My Cart</span>
          <table className="product-table">
            <thead>
              <tr>
                <th>PRODUCTS</th>
                <th>PRICE</th>
                <th>QUANTITY</th>
                <th>TOTAL</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index}>
                  <td className="product-details-column">
                    <img src={product.image} />
                    <div className="cart-product-details">
                      <span>Personalized Pet portrait</span>

                      <span className="design">Canvas / 12"x16" </span>
                      <div className="cart-details-btn">
                        <span className="cart-details-edit">
                          <FiEdit />
                        </span>
                        <span className="cart-remove-item">
                          <AiOutlineCloseSquare />
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>${product.price.toFixed(2)}</td>
                  <td>{product.quantity}</td>
                  <td className="product-total">
                    <span className="cart-total">
                      $
                      {calculateTotal(product.price, product.quantity).toFixed(
                        2
                      )}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="order-summary">
          <div className="summary-heading">ORDER SUMMARY</div>
          <div className="divider"></div>
          <div className="sub-total">
            Sub Total:<span>$504.00</span>
          </div>
          <div className="total">
            <div className="gray-divider"></div>
            Total: <span>$504.00</span>
            <div className="gray-divider"></div>
          </div>
          <button className="checkout-btn">PROCEED TO CHECKOUT</button>
          <button className="continue-shopping">CONTINUE SHOPPING</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
