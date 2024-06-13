import { useState, useEffect } from "react";
import Navbar from "../Navbar";
import ProductImageGallery from "../ProductImageGallery";
import ReviewsContainer from "../ReviewsContainer";
import ProductDetails from "../ProductDetails";
import ProductBuyForm from "../ProductBuyForm";

const SelectedProduct = () => {
  const [mainImages, setMainImages] = useState(null);

  return (
    <div className="selected-products">
      <Navbar />
      <div className="selected-product-container">
        <ProductImageGallery images={mainImages} />
        <ProductBuyForm images={setMainImages} />
      </div>
      <div className="reviews-and-shipping">
        <ReviewsContainer />
        <ProductDetails />
      </div>
    </div>
  );
};

export default SelectedProduct;
