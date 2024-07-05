import { useState, useEffect } from "react";
import Navbar from "../Navbar";
import axios from "axios";
import { useParams } from "react-router-dom";
import ProductImageGallery from "../ProductImageGallery";
import ReviewsContainer from "../ReviewsContainer";
import ProductDetails from "../ProductDetails";
import ProductBuyForm from "../ProductBuyForm";
import { useDispatch, useSelector } from "react-redux";
import { fetchSelectedProduct } from "../../redux/reducers/productBuyReducer";

const SelectedProduct = () => {
  const dispatch = useDispatch();
  const { selectedProduct } = useSelector((state) => state.selectedProductInfo);

  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchSelectedProduct(id));
  }, [dispatch]);

 
  return (
    <div className="selected-products">
      <Navbar />
      <div className="selected-product-container">
        <ProductImageGallery images={selectedProduct.images} />
        <ProductBuyForm
          props={selectedProduct}
          editForm={false}
          close={() => {}}
        />
      </div>
      <div className="reviews-and-shipping">
        <ReviewsContainer />
        <ProductDetails productDetails={selectedProduct.description} />
      </div>
    </div>
  );
};

export default SelectedProduct;
