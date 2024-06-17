import { useState, useEffect } from "react";
import ProductItem from "./ProductItem";
import Data from "../data/Data";
import { useStateContext } from "./StateContext";
import axios from "axios";
import { Pagination, Dropdown } from "rsuite";

const ProductGallery = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { selectCategory, products, setProducts } = useStateContext();
  const filteredProducts = products.filter(
    (product) => product.category === selectCategory
  );
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
  //     price: "44",
  //   },
  //   {
  //     imageUrl: "src/assets/c3.jpeg",
  //     price: "50",
  //   },
  //   {
  //     imageUrl: "src/assets/c4.jpeg",
  //     price: "80",
  //   },
  //   {
  //     imageUrl: "src/assets/c5.jpeg",
  //     price: "34",
  //   },
  //   {
  //     imageUrl: "src/assets/canvas.jpeg",
  //     price: "20",
  //   },
  //   {
  //     imageUrl: "src/assets/poster.jpeg",
  //     price: "38",
  //   },
  //   {
  //     imageUrl: "src/assets/vector.jpeg",
  //     price: "70",
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

  const [currentPage, setCurrentPage] = useState(1);
  // const [productData, setProductData] = useState([]);
  const itemsPerPage = 3;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(products.length / itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, []);

  useEffect(() => {
    axios
      .get(backendUrl + `/artworks`)
      .then((response) => {
        setProducts(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching artworks:", error);
      });
  }, []);

  useEffect(() => {
    console.log(filteredProducts);
  }, [selectCategory]);

  if (!filteredProducts || filteredProducts.length === 0) {
    return <div className="product-view-not-avilable">No item available</div>;
  }

  return (
    <div className="product-view">
      <div className="product-details">
        <span className="products-name">{selectCategory}</span>
        <p className="products-page-info">
          Showing {indexOfFirstItem + 1} -
          {currentItems.length + indexOfFirstItem}
          out of {products.length} products
        </p>
      </div>

      <div className="product-list">
        {currentItems.map((product, index) => (
          <ProductItem key={index} product={product} />
        ))}
      </div>
      <div className="product-gallery-pagination">
        <Pagination
          prev
          last
          next
          first
          size="md"
          total={filteredProducts.length}
          limit={itemsPerPage}
          activePage={currentPage}
          onChangePage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default ProductGallery;
