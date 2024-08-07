import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Pagination } from "rsuite";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import ProductItem from "../ProductItem";
import Footer from "../Footer";

const SearchPage = () => {
  const navigate = useNavigate();

  const { searchArray } = useSelector((state) => state.searchItems);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  //   const filteredProducts = products.filter(
  //     (product) => product.category === category
  //   );
  // const currentItems =
  //   searchArray.length > 1
  //     ? searchArray.slice(indexOfFirstItem, indexOfLastItem)
  //     : 1;

  const currentItems = searchArray.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    const isRefreshed = localStorage.getItem("isRefreshed");

    if (isRefreshed) {
      localStorage.removeItem("isRefreshed");
      navigate("/");
    } else {
      localStorage.setItem("isRefreshed", "true");
    }

    return () => {
      localStorage.removeItem("isRefreshed");
    };
  }, [navigate]);

  return (
    <div className="home-container">
      <Navbar />
      <div className="product-view">
        <div className="product-details">
          <span className="products-name">Searched products</span>
          <p className="products-page-info">
            Showing {indexOfFirstItem + 1} -
            {currentItems.length + indexOfFirstItem} out of {searchArray.length}{" "}
            products
          </p>
        </div>
        <div className="product-list">
          {Array.isArray(searchArray) && searchArray.length > 0 ? (
            searchArray.map((product, index) => (
              <ProductItem key={index} product={product} />
            ))
          ) : searchArray ? (
            <ProductItem key={1} product={searchArray} />
          ) : null}
        </div>
        <div className="product-gallery-pagination">
          <Pagination
            prev
            last
            next
            first
            size="md"
            total={searchArray.length}
            limit={itemsPerPage}
            activePage={currentPage}
            onChangePage={setCurrentPage}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SearchPage;
