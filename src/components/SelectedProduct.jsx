import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import ImageGallery from "./ImageGallery";
import { useParams } from "react-router-dom";
import productData from "../data/Data";
import { useStateContext } from "./StateContext";
import axios from "axios";

const SelectedProduct = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const { selectCategory, cartArray, setCartArray } = useStateContext();

  const { id } = useParams();

  const images = [
    "/imgs/canvas.jpeg",
    "/imgs/framed_poster.jpeg",
    "/imgs/poster.jpeg",
    "/imgs/prem_can_poster.jpeg",
    "/imgs/trad_can_poster.jpeg",
  ];
  const [filteredProducts, setFilteredProducts] = useState(null);
  const [isPhysical, setIsPhysical] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(null);
  const [material, setMaterial] = useState("");
  const [sizesArray, setSizesArray] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState("56.00");
  const [size, setSize] = useState("");
  const [total, setTotal] = useState(0);
  const [designerNote, setDesignerNote] = useState("");
  const [paintingNote, setPaintingNote] = useState("");
  const [mainImages, setMainImages] = useState([]);

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

  const paintingInputTextChange = (e) => {
    setPaintingNote(e.target.value);
  };

  const designerInputTextChange = (e) => {
    setDesignerNote(e.target.value);
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

  const addTocart = (e) => {
    e.preventDefault();
    const productToAdd = {
      id: filteredProducts.artworkId,
      type: selectCategory,
      price: price,
      name: filteredProducts.material,
      imageUrl: filteredProducts.images[0].url,
      quantity: quantity,
      material: material,
      size: size,
      designerNote: designerNote,
      paintingNote: paintingNote,
    };

    setCartArray((prevCartArray) => {
      if (prevCartArray.length !== 0) {
        const findItem = prevCartArray.find((product) => product.id == id);
        if (findItem) {
          return [...prevCartArray];
        } else {
          return [...prevCartArray, productToAdd];
        }
      } else {
        return [productToAdd];
      }
    });
  };

  useEffect(() => {
    axios
      .get(backendUrl + `/${id}`)
      .then((response) => {
        let product = response.data;
        setMainImages(product.images);
        setFilteredProducts(product);
        setPrice(product.price);
        // console.log(product);
        // console.log(product.price);
      })
      .catch((error) => {
        console.log("error fetching data for id", error);
      });
  }, []);

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
          <ImageGallery images={mainImages} />
        </div>
        <div className="product-description">
          <div className="product-category">{selectCategory}</div>
          <div className="product-price">
            <span className="original-price">
              <del>$ 80.00</del>
            </span>
            <span className="discount-price">$ {price}</span>
          </div>
          <div className="product-pharagraph">
            Custom pop art portrait, WPAP, Custom portrait, Portrait
            illustration, Personalized gift, Birthday gift, Couple portrait,
            Family portrait
          </div>

          <div className="product-form">
            <form className="product-form-body">
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
                  <label htmlFor="selected-material-design">
                    Material : {productData && material}
                  </label>
                  <div className="material-sizes">
                    {productData &&
                      productData.map((product, index) => (
                        <div
                          key={index}
                          className="material-image-container"
                          onClick={() => handleImageClick(index, product)}
                        >
                          <img
                            id="selected-material-design"
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
                  <label htmlFor="selected-size">
                    Size : {productData && size}
                  </label>
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
                            id="selected-size"
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

              <label htmlFor="img">Upload your photo(s)</label>
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
                  <label htmlFor="persons">Number of Person/Pet</label>
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
                      <label htmlFor="styles">Style</label>
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
                      <label htmlFor="figures">Figures</label>
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
                    <label htmlFor="text-on-painting">
                      Text on the painting (Optional)
                    </label>
                    <input
                      id="text-on-painting"
                      type="text"
                      name="Text on the painting"
                      value={paintingNote}
                      onChange={paintingInputTextChange}
                    />
                  </div>
                )}
                <div className="designer-note">
                  <label htmlFor="designer-note">
                    Note for designer (Optional) {designerNote}
                  </label>
                  <textarea
                    id="designer-note"
                    name="designer-note"
                    rows="4"
                    cols="50"
                    value={designerNote}
                    onChange={designerInputTextChange}
                  ></textarea>
                </div>
              </div>

              <div className="quantity-container">
                <label htmlFor="q-value">Quantity : {quantity}</label>
                <div className="quantity-btn">
                  <button
                    id="q-value"
                    className="decrease-btn"
                    onClick={decreaseQuantity}
                  >
                    -
                  </button>
                  <span className="quantity-value">{quantity}</span>
                  <button
                    id="q-value"
                    className="increase-btn"
                    onClick={increaseQuantity}
                  >
                    +
                  </button>
                </div>
                <span>Subtotal : $ {total} </span>
              </div>
              <div className="cart-button">
                <button className="buy-it-now-btn">Buy it now</button>
                <button className="add-to-cart-btn" onClick={addTocart}>
                  ADD TO CART
                </button>
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
