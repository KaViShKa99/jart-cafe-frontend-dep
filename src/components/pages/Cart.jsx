import { useState, useEffect } from "react";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import Navbar from "../Navbar";
import Modal from "react-modal";
import productData from "../../data/Data";
import { useStateContext } from "../StateContext";

import QuantityCounter from "../QuantityCounter";
import ProductBuyForm from "../ProductBuyForm";

Modal.setAppElement("#root");

const Cart = () => {
  const { cartArray, setCartArray, cartTotalAmount } = useStateContext();
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
  const [cartItem, setCartItem] = useState(null);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openCartEdit = (index) => {
    const filteredProducts = cartArray.filter(
      (product) => product.artworkId === index
    );
    console.log(index);
    console.log(filteredProducts);

    setCartItem(filteredProducts);
    //setSizesArray(filteredProducts.sizeArray);
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

  const removeItem = (index) => {
    console.log(cartArray);
    const updatedCartItems = cartArray.filter(
      (product) => product.artworkId !== index
    );

    setCartArray((prevItem) =>
      prevItem.filter((product) => product.artworkId !== index)
    );
    console.log(index);
    console.log(updatedCartItems);
  };

  useEffect(() => {
    setImage(productData[0].image);
    console.log(cartArray);
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
                        <img src={product.productImage} />
                        <div className="cart-product-details">
                          <span>{product.category}</span>

                          <span className="design">
                            {!product.isDigitalArt
                              ? `${product.material} / ${product.size}`
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
                      ${product.eachPrice.toFixed(2)}
                    </td>
                    <td className="quantity-details-column">
                      <QuantityCounter
                        TotalQuantity={() => {}}
                        initialQuantity={product.quantity}
                        product={product}
                        cartUpdate={true}
                      />
                    </td>
                    <td className="product-total">
                      <span className="cart-total">
                        {/* $
                        {calculateTotal(
                          product.price,
                          product.quantity
                        ).toFixed(2)} */}
                        $ {product.total && product.total.toFixed(2)}
                      </span>
                    </td>

                    <td className="combined-column">
                      <div className="combined-column-container">
                        <div className="c-price">
                          Price :- ${product.eachPrice.toFixed(2)}
                        </div>

                        <QuantityCounter
                          TotalQuantity={() => {}}
                          initialQuantity={product.quantity}
                          product={product}
                          cartUpdate={true}
                        />
                        <div className="c-total">
                          Total :-
                          {/* $
                          {calculateTotal(
                            product.price,
                            product.quantity
                          ).toFixed(2)} */}
                          {/* &{product.total.toFixed(2)} */}
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
            <span className="subTotal-value">
              $ {cartTotalAmount.toFixed(2)}
            </span>
          </div>
          <div className="total">
            <div className="gray-divider" />
            <div className="total-content">
              Total:{" "}
              <span className="total-value">
                $ {cartTotalAmount.toFixed(2)}
              </span>
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
            <ProductBuyForm
              props={cartItem ? cartItem[0] : []}
              editForm={true}
              close={(e) => setIsModalOpen(e)}
            />
          </div>

          {/* <div className="edit-container-btns">
            <button className="add-item-btn" onClick={addNewItem}>
              UPDATE CART
            </button>
            <button className="edit-add-to-cart">CLEAR CART</button>
          </div> */}
        </div>
      </Modal>
    </div>
  );
};

export default Cart;
