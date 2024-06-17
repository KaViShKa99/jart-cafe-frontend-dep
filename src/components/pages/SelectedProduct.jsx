import { useState, useEffect } from "react";
import Navbar from "../Navbar";
import axios from "axios";
import { useParams } from "react-router-dom";
import ProductImageGallery from "../ProductImageGallery";
import ReviewsContainer from "../ReviewsContainer";
import ProductDetails from "../ProductDetails";
import ProductBuyForm from "../ProductBuyForm";

const SelectedProduct = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { id } = useParams();

  //const [mainImages, setMainImages] = useState(null);
  const [productImages, setProductImages] = useState([]);
  const [productDetails, setProductDetails] = useState("");
  const [productBuyerDetails, setProductBuyerDetails] = useState([]);

  useEffect(() => {
    axios
      .get(backendUrl + `/artworks/${id}`)
      .then((response) => {
        let product = response.data;
        setProductImages(product.images);
        setProductDetails(product.description);

        setProductBuyerDetails(product);
        // setProductBuyerDetails({
        //   category: product.category,
        //   title: product.title,
        //   materials: product.materials,
        //   lastPrice: product.lastPrice,
        //   price: product.price,
        // });

        console.log(product);

        // images(product.images);
        // setFilteredProducts(product);
        // setPrice(product.price);
      })
      .catch((error) => {
        console.log("error fetching data for id", error);
      });
  }, []);

  useEffect(() => {
    // console.log(productBuyerDetails);
    // console.log(productImages);
  }, [productImages]);

  return (
    <div className="selected-products">
      <Navbar />
      <div className="selected-product-container">
        <ProductImageGallery images={productImages} />
        <ProductBuyForm
          props={productBuyerDetails}
          editForm={false}
          close={() => {}}
        />
      </div>
      <div className="reviews-and-shipping">
        <ReviewsContainer />
        <ProductDetails productDetails={productDetails} />
      </div>
    </div>
  );
};

export default SelectedProduct;
