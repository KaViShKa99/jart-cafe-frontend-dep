import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import ImageGallery from "./ImageGallery";
import ProductItem from "./ProductItem";
import { useParams } from "react-router-dom";
import productData from "../data/Data";

const SelectedProduct = () => {
  const images = [
    "https://picsum.photos/id/1018/1000/600/",
    "https://picsum.photos/id/1015/1000/600/",
    "https://picsum.photos/id/1013/1000/600/",
    "https://picsum.photos/id/1019/1000/600/",
  ];
  const [isPhysical, setIsPhysical] = useState(false);

  const handleToggleChange = () => {
    console.log("click");
    setIsPhysical(!isPhysical);
  };

  const inputTextChange = () => {
    console.log("onchange");
  };

  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleImageClick = (index) => {
    setSelectedIndex(index);
  };

  // useEffect(() => {
  //   setImg(productData);
  // }, []);

  // const productData = [
  //   {
  //     imageUrl: "src/assets/vector.jpeg",
  //     price: "3.49",
  //   },
  //   {
  //     imageUrl: "src/assets/c1.jpeg",
  //     price: "3.49",
  //   },
  //   {
  //     imageUrl: "src/assets/c2.jpeg",
  //     price: "3.49",
  //   },
  //   {
  //     imageUrl: "src/assets/c3.jpeg",
  //     price: "3.49",
  //   },
  //   {
  //     imageUrl: "src/assets/c4.jpeg",
  //     price: "3.49",
  //   },
  //   {
  //     imageUrl: "src/assets/c5.jpeg",
  //     price: "3.49",
  //   },
  //   {
  //     imageUrl: "src/assets/vector.jpeg",
  //     price: "3.49",
  //   },
  //   {
  //     imageUrl: "src/assets/vector.jpeg",
  //     price: "3.49",
  //   },
  //   {
  //     imageUrl: "src/assets/vector.jpeg",
  //     price: "3.49",
  //   },
  //   {
  //     imageUrl: "src/assets/vector.jpeg",
  //     price: "3.49",
  //   },
  //   {
  //     imageUrl: "src/assets/vector.jpeg",
  //     price: "3.49",
  //   },
  //   {
  //     imageUrl: "src/assets/vector.jpeg",
  //     price: "3.49",
  //   },
  //   {
  //     imageUrl: "src/assets/vector.jpeg",
  //     price: "3.49",
  //   },
  //   {
  //     imageUrl: "src/assets/vector.jpeg",
  //     price: "3.49",
  //   },
  //   {
  //     imageUrl: "src/assets/vector.jpeg",
  //     price: "3.49",
  //   },
  //   {
  //     imageUrl: "src/assets/vector.jpeg",
  //     price: "3.49",
  //   },
  //   {
  //     imageUrl: "src/assets/vector.jpeg",
  //     price: "3.49",
  //   },
  // ];

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
              <label>Material :</label>
              <div className="material-sizes">
                {productData &&
                  productData.map((product, index) => (
                    <div
                      key={index}
                      className="image-container"
                      onClick={() => handleImageClick(index)}
                    >
                      <img
                        src={product.imageUrl}
                        alt="Product"
                        className={selectedIndex === index ? "selected" : ""}
                      />
                      {selectedIndex === index && (
                        <div className="checkmark">&#10003;</div>
                      )}
                    </div>
                  ))}
              </div>
              <label>Size: 8"x10"</label>
              <div className="sizes-box">
                <span>18"x24"</span>
                <span>18"x24"</span>
                <span>18"x24"</span>
                <span>18"x24"</span>
                <span>18"x24"</span>
              </div>

              <label>Upload your photo(s)</label>
              <input type="file" id="img" name="img" accept="image/*" />
              <label>Number of Person/Pet</label>
              <select name="persons" id="persons">
                <option value="1">1</option>
                <option value="2">2 (+$7.00)</option>
                <option value="3">3 (+$14.00)</option>
                <option value="4">4 (+$21.00)</option>
                <option value="5">5 or more (+$28.00)</option>
              </select>
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
              <label>Quantity</label>
              <button>ADD TO CART</button>
            </form>
          </div>
        </div>
      </div>
      <div className="product-review"></div>
    </div>
  );
};

export default SelectedProduct;
