import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import ImageGallery from "./ImageGallery";
import { useParams } from "react-router-dom";
import productData from "../data/Data";

const SelectedProduct = () => {
  const images = [
    "/imgs/canvas.jpeg",
    "/imgs/framed_poster.jpeg",
    "/imgs/poster.jpeg",
    "/imgs/prem_can_poster.jpeg",
    "/imgs/trad_can_poster.jpeg",
    // "https://picsum.photos/id/1018/1000/600/",
    // "https://picsum.photos/id/1015/1000/600/",
    // "https://picsum.photos/id/1013/1000/600/",
    // "https://picsum.photos/id/1019/1000/600/",
  ];
  const [isPhysical, setIsPhysical] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(null);
  const [material, setMaterial] = useState("");
  const [sizes, setSizes] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = (e) => {
    e.preventDefault();
    setQuantity(quantity + 1);
  };
  const decreaseQuantity = (e) => {
    e.preventDefault();
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const inputTextChange = () => {
    console.log("onchange");
  };

  const handleImageClick = (index, product) => {
    setSelectedSizeIndex(null);
    setSelectedIndex(index);
    setMaterial(product.name);
    setSizes(product.size);
  };

  const handleSizeClick = (index) => {
    setSelectedSizeIndex(index);
  };

  const { id } = useParams();
  const product = productData[id];

  // if (!product) {
  //   return <div>Product not found</div>;
  // }

  // return (
  //   <div>
  //     <img src={product.imageUrl} alt={`Product ${id}`} />
  //     <p>Price: ${product.price}</p>
  //   </div>
  // );

  return (
    <div className="selected-product">
      <Navbar />
      <div className="selected-product-container">
        <div className="product-image">
          <ImageGallery images={images} />
        </div>
        <div className="product-description">
          <div className="product-category">Pop Arts</div>
          <div className="product-price">
            <span className="original-price">
              <del>$330.00</del>
            </span>
            <span className="discount-price">$199.00</span>
          </div>
          <div className="product-pharagraph">
            Custom pop art portrait, WPAP, Custom portrait, Portrait
            illustration, Personalized gift, Birthday gift, Couple portrait,
            Family portrait
          </div>

          <div className="product-form">
            <form>
              <div
                className={`toggle-container ${
                  isPhysical ? "is-physical" : "is-digital"
                }`}
              >
                <div
                  className={`toggle-background ${
                    isPhysical ? "is-physical" : "is-digital"
                  }`}
                ></div>
                <div
                  className={`toggle-option ${
                    isPhysical ? "active-digital" : ""
                  }`}
                  onClick={() => setIsPhysical(false)}
                >
                  Digital Art Print
                </div>
                <div
                  className={`toggle-option ${
                    !isPhysical ? "active-physical" : ""
                  }`}
                  onClick={() => setIsPhysical(true)}
                >
                  Physical Art Print
                </div>
              </div>
              <label>Material : {productData && material}</label>
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
                        className={selectedIndex === index ? "selected" : ""}
                      />
                      {selectedIndex === index && (
                        <div className="checkmark">&#10003; </div>
                      )}
                    </div>
                  ))}
              </div>
              <label>Size : {productData && sizes[selectedSizeIndex]}</label>
              <div className="sizes-box">
                {productData &&
                  sizes.map((size, index) => (
                    <div
                      className="material-size-container"
                      onClick={() => handleSizeClick(index)}
                    >
                      <span
                        className={selectedSizeIndex === index ? "select" : ""}
                      >
                        {size}
                      </span>
                    </div>
                  ))}
              </div>

              <label>Upload your photo(s)</label>
              <div className="file-input-container">
                <input
                  type="file"
                  id="img"
                  name="img"
                  accept="image/*"
                  className="file-input"
                />
                <label htmlFor="img" className="file-input-label">
                  Choose Image
                </label>
              </div>

              <label>Number of Person/Pet</label>
              <select name="persons" id="persons">
                <option value="1">1</option>
                <option value="2">2 (+$7.00)</option>
                <option value="3">3 (+$14.00)</option>
                <option value="4">4 (+$21.00)</option>
                <option value="5">5 or more (+$28.00)</option>
              </select>
              <div className="input-container">
                <label>Text on the painting (Optional)</label>
                <input
                  type="text"
                  name="Text on the painting"
                  value=""
                  onChange={inputTextChange}
                />
                <label>Note for designer (Optional)</label>
                <input
                  type="text"
                  name="Note for designer"
                  value=""
                  onChange={inputTextChange}
                />
              </div>
              {/* <div className="quantity-container">
              </div> */}
              <div className="quantity-container">
                <label>Quantity : {quantity}</label>
                <div className="quantity-btn">
                  <button className="decrease-btn" onClick={decreaseQuantity}>
                    -
                  </button>
                  <span class="quantity-value">{quantity}</span>
                  <button className="increase-btn" onClick={increaseQuantity}>
                    +
                  </button>
                </div>
                <span>Subtotal : </span>
              </div>
              <div className="cart-button">
                <button>ADD TO CART</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="product-review"></div>
    </div>
  );
};

export default SelectedProduct;
