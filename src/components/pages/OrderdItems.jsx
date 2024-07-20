import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import Modal from "react-modal";
import { useSelector, useDispatch } from "react-redux";
import {
  removeCart,
  updateCartQuntity,
  updateSubTotal,
} from "../../redux/reducers/cartItemReducer";

import { format } from "date-fns";
import ReviewModal from "../ReviewModal";

Modal.setAppElement("#root");

const PurchaseItems = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartArray, subTotal } = useSelector((state) => state.cartItems);
  const { signIn } = useSelector((state) => state.userProfile);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (e) => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    dispatch(updateSubTotal());
  }, [cartArray]);

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isModalOpen]);

  return (
    <div className="purchase-container">
      <Navbar />
      <div className="purchase-body">
        <div className="purchase-list">
          <span className="purchase-heading">Ordered Items</span>
          <table className="purchase-table">
            <thead>
              <tr>
                <th>PRODUCTS</th>
                <th>ORDER STATUS</th>
                <th>REVIEW PRODUCT</th>
              </tr>
            </thead>
            <tbody>
              {cartArray.length === 0 ? (
                <tr key="no-items">
                  <td colSpan="4" className="empty-cart-message">
                    <span>Your cart is currently empty.</span>
                  </td>
                </tr>
              ) : (
                cartArray.map((product, index) => (
                  <tr key={index}>
                    <td className="purchase-details-column">
                      <div className="purchase-details-column-container">
                        <img src={product.productImage[0]} />
                        <div className="cart-purchase-details">
                          <span>{product.category}</span>

                          <span className="design">
                            {product.isPhysicalArt
                              ? `${product.material} / ${product.size.size}`
                              : "Digital arts"}
                          </span>
                          <span>
                            Each Price - $
                            {(product.eachPrice + product.price).toFixed(2)}
                          </span>
                          <span>Quantity - {product.quantity}</span>
                          <span>
                            Total - ${product.total && product.total.toFixed(2)}
                          </span>
                          <span>
                            Date: {format(new Date(), "MMMM do, yyyy")}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="order-status">
                      <span className={`status progress`}>completed</span>
                      {/* <span className={`status ${completed}`}>completed</span> */}
                    </td>
                    <td className="review-product">
                      <button className="review-button" onClick={openModal}>
                        Review
                      </button>
                    </td>

                    <td className="purchase-combined-column">
                      <div className="combined-column-container">
                        <div className="c-price">
                          Price :- $
                          {(product.eachPrice + product.price).toFixed(2)}{" "}
                        </div>
                        <div className="c-price">
                          Quantity :- {product.quantity}
                        </div>
                        <div className="c-total">
                          Total :- $ {product.total && product.total.toFixed(2)}
                        </div>
                        <div className="c-total">
                          Date: {format(new Date(), "MMMM do, yyyy")}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <ReviewModal isModalOpen={isModalOpen} onRequestClose={closeModal} />
    </div>
  );
};

export default PurchaseItems;
