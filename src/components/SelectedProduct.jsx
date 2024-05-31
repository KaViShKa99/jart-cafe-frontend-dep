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
  const [sizesArray, setSizesArray] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState("0.00");
  const [size, setSize] = useState("");
  const [total, setTotal] = useState(0);

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

  const inputTextChange = () => {
    console.log("onchange");
  };

  const handleImageClick = (index, product) => {
    setSelectedSizeIndex(null);
    setSelectedIndex(index);
    setMaterial(product.name);
    setSizesArray(product.size);
    setTotal(0);
  };

  const handleSizeClick = (index, size) => {
    setSelectedSizeIndex(index);
    setPrice(size.p);
    setSize(size.s);
    setTotal(size.p);
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
              <del>$80.00</del>
            </span>
            <span className="discount-price">${price}.00</span>
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
              {isPhysical && (
                <div className="physical-art-details">
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
              )}

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
              <div className="select-options">
                <div className="number-persons">
                  <label>Number of Person/Pet</label>
                  <select name="persons" id="persons">
                    <option value="1">1</option>
                    <option value="2">2 (+$7.00)</option>
                    <option value="3">3 (+$14.00)</option>
                    <option value="4">4 (+$21.00)</option>
                    <option value="5">5 or more (+$28.00)</option>
                  </select>
                </div>
                {!isPhysical && (
                  <div className="digital-image-details">
                    <div className="digital-image-style">
                      <label>Style</label>
                      <select name="styles" id="styles">
                        <option value="1">Select a style</option>
                        <option value="2">
                          head to shoulder (USD 17.00 to USD 108.00)
                        </option>
                        <option value="3">
                          half body (USD 18.00 to USD 140.00)
                        </option>
                        <option value="4">full body</option>
                      </select>
                    </div>
                    <div className="digital-image-figures">
                      <label>Figures</label>
                      <select name="figures" id="figures">
                        <option value="0">Select an option</option>
                        <option value="1">1 figure (USD 34.00)</option>
                        <option value="2">2 figure (USD 44.00)</option>
                        <option value="3">3 figure (USD 54.00)</option>
                        <option value="4">4 figure (USD 74.00)</option>
                        <option value="5">5 figure (USD 104.00)</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>
              <div className="input-container">
                {isPhysical && (
                  <div className="text-on-painting">
                    <label>Text on the painting (Optional)</label>
                    <input
                      type="text"
                      name="Text on the painting"
                      value=""
                      onChange={inputTextChange}
                    />
                  </div>
                )}
                <div className="designer-note">
                  <label>Note for designer (Optional)</label>
                  <input
                    type="text"
                    name="Note for designer"
                    value=""
                    onChange={inputTextChange}
                  />
                </div>
              </div>

              <div className="quantity-container">
                <label>Quantity : {quantity}</label>
                <div className="quantity-btn">
                  <button className="decrease-btn" onClick={decreaseQuantity}>
                    -
                  </button>
                  <span className="quantity-value">{quantity}</span>
                  <button className="increase-btn" onClick={increaseQuantity}>
                    +
                  </button>
                </div>
                <span>Subtotal : $ {total} </span>
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
