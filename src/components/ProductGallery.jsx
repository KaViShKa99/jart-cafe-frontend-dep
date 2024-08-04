import { useState } from "react";
import ProductItem from "./ProductItem";
import { Pagination, Dropdown } from "rsuite";
import { useSelector } from "react-redux";

const ProductGallery = () => {
  const { category } = useSelector((state) => state.selectedCategory);
  const { products } = useSelector((state) => state.products);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const filteredProducts = products.filter(
    (product) => product.category === category
  );

  const currentItems = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  if (!filteredProducts || filteredProducts.length === 0) {
    return <div className="product-view-not-avilable">No item available</div>;
  }

  return (
    <div className="product-view">
      <div className="product-details">
        <span className="products-name">{category}</span>
        <p className="products-page-info">
          Showing {indexOfFirstItem + 1} -{" "}
          {currentItems.length + indexOfFirstItem} out of{" "}
          {filteredProducts.length} products
        </p>
      </div>

      <div className="product-list">
        {filteredProducts.map((product, index) => (
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
