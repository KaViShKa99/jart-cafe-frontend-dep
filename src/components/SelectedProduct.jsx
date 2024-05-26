import React from "react";
import Navbar from "./Navbar";
import ImageGallery from "./ImageGallery";

const SelectedProduct = () => {
  const images = [
    "https://picsum.photos/id/1018/1000/600/",
    "https://picsum.photos/id/1015/1000/600/",
    "https://picsum.photos/id/1013/1000/600/",
    "https://picsum.photos/id/1019/1000/600/",
  ];
  return (
    <div className="selected-product">
      <Navbar />
      <div className="selected-product-container">
        <div className="product-image">
          <ImageGallery images={images} />
        </div>
        <div className="product-description">
          <div className="product-category">Pop Arts</div>
          <div className="product-price">$330.00 $199.00</div>
          <div className="product-pharagraph">
            Custom pop art portrait, WPAP, Custom portrait, Portrait
            illustration, Personalized gift, Birthday gift, Couple portrait,
            Family portrait
          </div>
          <div className="product-form">
            <form>
              <label>Upload your photo(s)</label>
              <input type="file" id="img" name="img" accept="image/*" />
              <label>Number of Person/Pet</label>
              <select name="persons" id="persons">
                <option value="1">1</option>
                <option value="2">
                  <span className="choice-list"></span>2
                  <span className="money">(+$7.00)</span>
                </option>
                <option value="3">
                  <span className="choice-list"></span>3
                  <span className="money">(+$14.00)</span>
                </option>
                <option value="4">
                  <span className="choice-list"></span>4
                  <span className="money">(+$21.00)</span>
                </option>
                <option value="5">
                  <span className="choice-list"></span>5 or more
                  <span className="money">(+$28.00)</span>
                </option>
              </select>
              <label>Text on the painting (Optional)</label>
              <input type="text" name="Text on the painting" value="" />
              <label>Note for designer (Optional)</label>
              <input type="text" name="Note for designer" value="" />
              <label>Quantity</label>
              <button>Add to cart</button>
            </form>
          </div>
        </div>
      </div>
      <div className="product-review"></div>
    </div>
  );
};

export default SelectedProduct;
