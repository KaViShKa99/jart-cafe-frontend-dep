import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import Navbar from "../Navbar";
import Modal from "react-modal";
import QuantityCounter from "../QuantityCounter";
import ProductBuyForm from "../ProductBuyForm";
import { useSelector, useDispatch } from "react-redux";
import {
  removeCart,
  updateCartQuntity,
  updateSubTotal,
} from "../../redux/reducers/cartItemReducer";
import { setIsModalOpen } from "../../redux/reducers/signModelReducer";
import {
  openCardPayment,
  userPayment,
} from "../../redux/reducers/paymentReducer";
import { format } from "date-fns";

Modal.setAppElement("#root");

const PurchaseItems = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartArray, subTotal } = useSelector((state) => state.cartItems);
  const { signIn } = useSelector((state) => state.userProfile);

  const updateQuantity = (quantity, id) => {
    dispatch(updateCartQuntity({ quantity: quantity, id: id }));
  };

  const [isCartModalOpen, setIsCartModelOpen] = useState(false);
  const [cartItem, setCartItem] = useState(null);

  const closeModal = () => {
    setIsCartModelOpen(false);
  };

  const goHome = (e) => {
    e.preventDefault();
    navigate("/");
  };

  const openCartEdit = (index) => {
    const filteredProducts = cartArray.filter(
      (product) => product.artworkId === index
    );

    setCartItem(filteredProducts);
    setIsCartModelOpen(true);
  };

  const removeItem = (artworkId) => {
    dispatch(removeCart(artworkId));
  };

  const openCheckoutPage = (e) => {
    e.preventDefault();
    if (!signIn) {
      dispatch(setIsModalOpen());
    } else {
      console.log(cartArray);
      const formatCartItemsForPayment = (cartArray) => {
        return cartArray.map((item) => ({
          category: item.category,
          designerNote: item.designerNote,
          eachPrice: item.eachPrice,
          isPhysicalArt: item.isPhysicalArt,
          material: item.material,
          materials: item.materials,
          price: item.price,
          total: item.total,
          uploadedImage: item.uploadedImage,
          productImage: item.productImage,
          quantity: item.quantity,
        }));
      };
      const items = formatCartItemsForPayment(cartArray);

      // const arr = cartArray.map((item) => item.quantity);
      dispatch(userPayment({ items: items }));

      // navigate("/checkout");
    }
  };

  useEffect(() => {
    dispatch(updateSubTotal());
    console.log(cartArray);
  }, [cartArray]);

  useEffect(() => {
    if (isCartModalOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isCartModalOpen]);

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
                <th>PRICE</th>
                <th className="q-hide">QUANTITY</th>
                <th className="t-hide">TOTAL</th>
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
                          {/* <div className="cart-details-btn">
                            <span
                              className="cart-details-edit"
                              onClick={() => openCartEdit(product.artworkId)}
                            >
                              <FiEdit />
                            </span>
                            <span
                              className="cart-remove-item"
                              onClick={() => removeItem(product.artworkId)}
                            >
                              <AiOutlineDelete />
                            </span>
                          </div> */}
                        </div>
                      </div>
                    </td>
                    <td className="purchase-price">
                      ${(product.eachPrice + product.price).toFixed(2)}
                    </td>
                    <td className="quantity-details-column">
                      {product.quantity}
                      {/* <QuantityCounter
                        TotalQuantity={(q) =>
                          updateQuantity(q, product.artworkId)
                        }
                        initialQuantity={product.quantity}
                        product={product}
                        cartUpdate={true}
                      /> */}
                    </td>
                    <td className="purchase-total">
                      <span className="cart-total">
                        $ {product.total && product.total.toFixed(2)}
                      </span>
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
        {/* <div className="order-summary">
          <div className="summary-heading">ORDER SUMMARY</div>
          <div className="divider"></div>
          <div className="sub-total">
            Sub Total:
            <span className="subTotal-value">$ {subTotal.toFixed(2)}</span>
          </div>
          <div className="total">
            <div className="gray-divider" />
            <div className="total-content">
              Total:{" "}
              <span className="total-value">$ {subTotal.toFixed(2)}</span>
            </div>
            <div className="gray-divider" />
          </div>
          <button className="checkout-btn" onClick={openCheckoutPage}>
            PROCEED TO CHECKOUT {subTotal ? `( $ ${subTotal.toFixed(2)} )` : ""}
          </button>
          <button className="continue-shopping" onClick={goHome}>
            CONTINUE SHOPPING
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default PurchaseItems;
