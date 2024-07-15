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

Modal.setAppElement("#root");

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartArray, subTotal } = useSelector((state) => state.cartItems);

  const updateQuantity = (quantity, id) => {
    dispatch(updateCartQuntity({ quantity: quantity, id: id }));
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(null);
  const [material, setMaterial] = useState("");
  const [sizesArray, setSizesArray] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState("0.00");
  const [size, setSize] = useState("");
  const [total, setTotal] = useState(0);
  const [image, setImage] = useState("");
  const [cartItem, setCartItem] = useState(null);

  const closeModal = () => {
    setIsModalOpen(false);
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
    setIsModalOpen(true);
  };

  const handleImageClick = (index, product) => {
    setSelectedSizeIndex(null);
    setSelectedIndex(index);
    setMaterial(product.name);
    setSizesArray(product.size);
    //setTotal(0);
    setImage(product.imageUrl);
  };

  const handleSizeClick = (index, size) => {
    setSelectedSizeIndex(index);
    setPrice(size.p);
    setSize(size.s);
    //setTotal(size.p);
  };

  const removeItem = (artworkId) => {
    dispatch(removeCart(artworkId));
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
                    <td className="product-details-column">
                      <div className="product-details-column-container">
                        <img src={product.productImage[0]} />
                        <div className="cart-product-details">
                          <span>{product.category}</span>

                          <span className="design">
                            {product.isPhysicalArt
                              ? `${product.material} / ${product.size.size}`
                              : "Digital arts"}
                          </span>
                          <div className="cart-details-btn">
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
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="product-price">
                      ${(product.eachPrice + product.price).toFixed(2)}
                    </td>
                    <td className="quantity-details-column">
                      <QuantityCounter
                        TotalQuantity={(q) =>
                          updateQuantity(q, product.artworkId)
                        }
                        initialQuantity={product.quantity}
                        product={product}
                        cartUpdate={true}
                      />
                    </td>
                    <td className="product-total">
                      <span className="cart-total">
                        $ {product.total && product.total.toFixed(2)}
                      </span>
                    </td>

                    <td className="combined-column">
                      <div className="combined-column-container">
                        <div className="c-price">
                          Price :- ${product.eachPrice.toFixed(2)}
                        </div>

                        <QuantityCounter
                          TotalQuantity={(q) =>
                            updateQuantity(q, product.artworkId)
                          }
                          initialQuantity={product.quantity}
                          product={product}
                          cartUpdate={true}
                        />
                        <div className="c-total">
                          Total :- $ {product.total && product.total.toFixed(2)}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="order-summary">
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
          <button className="checkout-btn">
            PROCEED TO CHECKOUT {subTotal ? `( $ ${subTotal.toFixed(2)} )` : ""}
          </button>
          <button className="continue-shopping" onClick={goHome}>
            CONTINUE SHOPPING
          </button>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        // onRequestClose={closeModal}
        contentLabel="cart edit Modal"
        className="cart-edit-modal"
        overlayClassName="cart-overlay"
      >
        <div className="cart-edit-container">
          <button className="close-button" onClick={closeModal}>
            &times;
          </button>
          <span className="cart-heading">Edit item</span>

          <div className="cart-edit-scrollbar">
            <ProductBuyForm
              props={cartItem ? cartItem[0] : []}
              editForm={true}
              close={(e) => setIsModalOpen(e)}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Cart;
