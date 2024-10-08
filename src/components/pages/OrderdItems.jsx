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

import { fetchOrderByEmail } from "../../redux/reducers/orderReducer";
import { format } from "date-fns";
import ReviewModal from "../ReviewModal";
import Footer from "../Footer";

Modal.setAppElement("#root");

const PurchaseItems = () => {
  const dispatch = useDispatch();
  const { cartArray, subTotal } = useSelector((state) => state.cartItems);
  const { signIn, userProfile } = useSelector((state) => state.userProfile);
  const { orderListByEmail } = useSelector((state) => state.order);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedArtworkId, setSelectedArtworkId] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [purchaseId, setPurchaseId] = useState(null);

  const openModal = (e, productId, orderId, purchaseId) => {
    setSelectedArtworkId(productId);
    setOrderId(orderId);
    setPurchaseId(purchaseId);
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

  useEffect(() => {
    dispatch(fetchOrderByEmail(userProfile.email));
  }, [userProfile, isModalOpen]);

  // useEffect(() => {
  //   console.log(orderListByEmail);
  // }, [orderListByEmail]);

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
              </tr>
            </thead>
            <tbody>
              {orderListByEmail.length === 0 ? (
                <tr key="no-items" className="no-items">
                  <td colSpan="4" className="empty-cart-message">
                    <span>Your Ordered Items is currently empty.</span>
                  </td>
                </tr>
              ) : (
                orderListByEmail.map((product, index) => (
                  <tr key={index}>
                    <td className="purchase-details-column">
                      {product.items.map((item, index) => {
                        return (
                          <div
                            className="purchase-details-column-container"
                            key={index}
                          >
                            <div className="purchase-product-image-col">
                              <img
                                // className="purchase-product-image"
                                src={item.productImage[0]}
                                alt="Product Image"
                              />
                            </div>
                            <div className="purchase-product-details-col">
                              <div className="purchase-details-container">
                                <span>{item.category}</span>

                                <span className="design">
                                  {item.physicalArt
                                    ? `${item.materialAndSize}`
                                    : "Digital arts"}
                                </span>
                                <span>
                                  Each Price - $
                                  {(item.eachPrice + item.price).toFixed(2)}
                                </span>
                                <span>Quantity - {item.quantity}</span>
                                <span>
                                  Total - ${item.total && item.total.toFixed(2)}
                                </span>
                                <span>
                                  Orderd Date:{" "}
                                  {format(product.orderedDate, "MMMM do, yyyy")}
                                </span>
                                <span>
                                  Completed Date:{" "}
                                  {format(
                                    product.completedDate,
                                    "MMMM do, yyyy"
                                  )}
                                </span>
                                <button
                                  type="button"
                                  className="review-button"
                                  onClick={(e) =>
                                    openModal(
                                      e,
                                      item.artworkId,
                                      product.id,
                                      item.id
                                    )
                                  }
                                  disabled={
                                    product.orderStatus
                                      ? item.reviewStatus
                                      : true
                                  }
                                >
                                  Review {item.reviewStatus}
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </td>

                    <td className="order-status-column">
                      <div className="order-status-column-container">
                        <span
                          className={`status ${
                            product.orderStatus ? "Completed" : "Progress"
                          }`}
                        >
                          {product.orderStatus ? "Completed" : "Progress"}
                        </span>

                        {/* <span
                          className={`status ${
                            orderStatuses[product.id] === "Completed"
                              ? "Completed"
                              : "Progress"
                          }`}
                        >
                          {orderStatuses[product.id] === "Completed"
                            ? "Completed"
                            : "In Progress"}
                        </span> */}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
      <ReviewModal
        isModalOpen={isModalOpen}
        onRequestClose={closeModal}
        artworkId={selectedArtworkId}
        orderId={orderId}
        purchaseId={purchaseId}
      />
    </div>
  );
};

export default PurchaseItems;
