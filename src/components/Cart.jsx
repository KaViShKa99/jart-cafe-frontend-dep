import { useState, useEffect } from "react";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import Navbar from "./Navbar";
import Modal from "react-modal";
import productData from "../data/Data";
import { useStateContext } from "./StateContext";

Modal.setAppElement("#root");

const Cart = () => {
  const { cartArray, setCartArray } = useStateContext();
  // const cartProducts = [
  //   { image: "/imgs/canvas.jpeg", name: "Product 1", price: 10, quantity: 1 },
  //   { image: "/imgs/poster.jpeg", name: "Product 1", price: 10, quantity: 1 },
  //   // { name: "Product 2", price: 15, quantity: 2 },
  //   // { name: "Product 3", price: 20, quantity: 1 },
  // ];

  const initialCartItem = {
    material: "Canvas",
    image: "/imgs/canvas.jpeg",
    size: [
      { s: '12"x16"', p: 30.0 },
      { s: '8"x10"', p: 35.0 },
      { s: '18"x24"', p: 40.0 },
      { s: '24"x30"', p: 10.0 },
      { s: '30"x40"', p: 60.0 },
    ],
  };

  const calculateTotal = (price, quantity) => price * quantity;

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
  // const [cartItem, setCartItem] = useState([initialCartItem]);
  const [cartItem, setCartItem] = useState([]);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openCartEdit = (index) => {
    const filteredProducts = cartArray.filter(
      (product) => product.id === index
    );
    console.log(index);
    console.log(filteredProducts);

    setCartItem(filteredProducts);
    setIsModalOpen(true);
  };

  const handleImageClick = (index, product) => {
    setSelectedSizeIndex(null);
    setSelectedIndex(index);
    setMaterial(product.name);
    setSizesArray(product.size);
    setTotal(0);
    setImage(product.imageUrl);
  };

  const handleSizeClick = (index, size) => {
    setSelectedSizeIndex(index);
    setPrice(size.p);
    setSize(size.s);
    setTotal(size.p);
  };

  const increaseQuantity = (e) => {
    e.preventDefault();
    setQuantity(quantity + 1);
    let total = price * (quantity + 1);
    setTotal(total);
  };

  const decreaseQuantity = (e) => {
    e.preventDefault();
    if (quantity > 1) {
      setQuantity(quantity - 1);
      let total = price * (quantity - 1);
      setTotal(total);
    }
  };

  const addNewItem = () => {
    setCartItem([...cartItem, initialCartItem]);
  };

  // const removeItem = (index) => {
  //   const updatedCartItems = cartItem.filter((_, i) => i !== index);
  //   setCartItem(updatedCartItems);
  // };

  const removeItem = (index) => {
    // const updatedCartItems = cartItem.filter((product) => product.id !== index);
    setCartArray((prevItem) =>
      prevItem.filter((product) => product.id !== index)
    );
    setCartItem((prevItem) =>
      prevItem.filter((product) => product.id !== index)
    );
    // console.log(updatedCartItems);
    console.log(index);
  };

  useEffect(() => {
    setImage(productData[0].imageUrl);
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    // Cleanup on unmount
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
                <th>QUANTITY</th>
                <th>TOTAL</th>
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
                      <img src={product.imageUrl} />
                      <div className="cart-product-details">
                        <span>{product.type}</span>

                        {/* <span className="design">Canvas / 12"x16" </span> */}
                        <span className="design">
                          {product.material} / {product.size}
                        </span>
                        <div className="cart-details-btn">
                          <span
                            className="cart-details-edit"
                            onClick={() => openCartEdit(product.id)}
                          >
                            <FiEdit />
                          </span>
                          <span
                            className="cart-remove-item"
                            onClick={() => removeItem(product.id)}
                          >
                            <AiOutlineDelete />
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>${product.price.toFixed(2)}</td>
                    <td className="quantity-details-column">
                      {/* {product.quantity} */}
                      <div className="quantity-container">
                        <div className="quantity-btn">
                          <button
                            className="decrease-btn"
                            onClick={decreaseQuantity}
                          >
                            -
                          </button>
                          <span className="quantity-value">{quantity}</span>
                          <button
                            className="increase-btn"
                            onClick={increaseQuantity}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className="product-total">
                      <span className="cart-total">
                        $
                        {calculateTotal(
                          product.price,
                          product.quantity
                        ).toFixed(2)}
                      </span>
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
            Sub Total:<span className="subTotal-value">$504.00</span>
          </div>
          <div className="total">
            <div className="gray-divider" />
            <div className="total-content">
              Total: <span className="total-value">$504.00</span>
            </div>
            <div className="gray-divider" />
          </div>
          <button className="checkout-btn">PROCEED TO CHECKOUT</button>
          <button className="continue-shopping">CONTINUE SHOPPING</button>
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
            {cartItem.map((item, index) => (
              <div key={index} className="cart-details-container">
                <div className="new-product-details">
                  <div className="cart-edit-product-image">
                    <img src={item.imageUrl} />
                  </div>
                  <div className="cart-edit-product-details">
                    <div className="cart-edit-product-text">
                      <span>{item.type}</span>

                      <span className="design">
                        {item.material} / {item.size}
                      </span>
                      <span>$ {item.price}</span>
                    </div>
                    <div className="cart-edit-btns">
                      <div className="quantity-container">
                        <div className="quantity-btn">
                          <button
                            className="decrease-btn"
                            onClick={decreaseQuantity}
                          >
                            -
                          </button>
                          <span className="quantity-value">{quantity}</span>
                          <button
                            className="increase-btn"
                            onClick={increaseQuantity}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <button
                        className="crat-item-remove"
                        onClick={() => removeItem(item.id)}
                      >
                        <AiOutlineDelete />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="product-edit-details">
                  <label>Material : {cartItem && item.material}</label>
                  <div className="material-sizes">
                    {productData &&
                      productData.map((product, index) => (
                        <div
                          key={index}
                          className="material-image-container"
                          onClick={() => handleImageClick(index, product)}
                        >
                          <img
                            src={product.imageUrl}
                            alt="Product"
                            className={
                              selectedIndex === index ? "selected" : ""
                            }
                          />
                          {selectedIndex === index && (
                            <div className="checkmark">&#10003; </div>
                          )}
                        </div>
                      ))}
                  </div>
                  <label>Size : {productData && size}</label>
                  <div className="sizes-box">
                    {productData &&
                      sizesArray.map((size, index) => (
                        <div
                          key={index}
                          className="material-size-container"
                          onClick={() => handleSizeClick(index, size)}
                        >
                          <span
                            // key={index}
                            className={
                              selectedSizeIndex === index ? "select" : ""
                            }
                          >
                            {size.s}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="edit-container-btns">
            <button className="add-item-btn" onClick={addNewItem}>
              + ADD
            </button>
            <button className="edit-add-to-cart">ADD TO CART</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Cart;
