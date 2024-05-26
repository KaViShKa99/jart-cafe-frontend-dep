import { useState, useEffect } from "react";
import ProductItem from "./ProductItem";

const ProductView = () => {
  const productData = [
    {
      imageUrl: "src/assets/vector.jpeg",
      price: "3.49",
    },
    {
      imageUrl: "src/assets/c1.jpeg",
      price: "3.49",
    },
    {
      imageUrl: "src/assets/c2.jpeg",
      price: "3.49",
    },
    {
      imageUrl: "src/assets/c3.jpeg",
      price: "3.49",
    },
    {
      imageUrl: "src/assets/c4.jpeg",
      price: "3.49",
    },
    {
      imageUrl: "src/assets/c5.jpeg",
      price: "3.49",
    },
    {
      imageUrl: "src/assets/vector.jpeg",
      price: "3.49",
    },
    {
      imageUrl: "src/assets/vector.jpeg",
      price: "3.49",
    },
    {
      imageUrl: "src/assets/vector.jpeg",
      price: "3.49",
    },
    {
      imageUrl: "src/assets/vector.jpeg",
      price: "3.49",
    },
    {
      imageUrl: "src/assets/vector.jpeg",
      price: "3.49",
    },
    {
      imageUrl: "src/assets/vector.jpeg",
      price: "3.49",
    },
    {
      imageUrl: "src/assets/vector.jpeg",
      price: "3.49",
    },
    {
      imageUrl: "src/assets/vector.jpeg",
      price: "3.49",
    },
    {
      imageUrl: "src/assets/vector.jpeg",
      price: "3.49",
    },
    {
      imageUrl: "src/assets/vector.jpeg",
      price: "3.49",
    },
    {
      imageUrl: "src/assets/vector.jpeg",
      price: "3.49",
    },
  ];

  const [currentPage, setCurrentPage] = useState([]);
  const itemsPerPage = 12;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = productData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(productData.length / itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, []);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    // Left arrow
    if (currentPage > 1) {
      pageNumbers.push(
        <li key="prev" onClick={() => handlePageClick(currentPage - 1)}>
          &lt;
        </li>
      );
    }

    // First two pages
    for (let i = 1; i <= 2; i++) {
      if (i <= totalPages) {
        pageNumbers.push(
          <li
            key={i}
            onClick={() => handlePageClick(i)}
            className={currentPage === i ? "active" : null}
          >
            {i}
          </li>
        );
      }
    }

    // Ellipsis if needed
    if (currentPage > 3) {
      pageNumbers.push(<li key="ellipsis-left">...</li>);
    }

    // Current page and neighbors
    if (currentPage > 2 && currentPage < totalPages - 1) {
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pageNumbers.push(
          <li
            key={i}
            onClick={() => handlePageClick(i)}
            className={currentPage === i ? "active" : null}
          >
            {i}
          </li>
        );
      }
    }

    // Ellipsis if needed
    if (currentPage < totalPages - 2) {
      pageNumbers.push(<li key="ellipsis-right">...</li>);
    }

    // Last two pages
    for (let i = totalPages - 1; i <= totalPages; i++) {
      if (i > 2) {
        pageNumbers.push(
          <li
            key={i}
            onClick={() => handlePageClick(i)}
            className={currentPage === i ? "active" : null}
          >
            {i}
          </li>
        );
      }
    }

    // Right arrow
    if (currentPage < totalPages) {
      pageNumbers.push(
        <li key="next" onClick={() => handlePageClick(currentPage + 1)}>
          &gt;
        </li>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="product-view">
      <div className="product-details">
        <span className="products-name">Pop Arts</span>
        <p className="products-page-info">
          Showing {indexOfFirstItem + 1} -{" "}
          {currentItems.length + indexOfFirstItem}
          {"  "}
          out of {productData.length} products
        </p>
      </div>

      <div className="product-list">
        {currentItems.map((product, index) => (
          <ProductItem
            key={index}
            id={index}
            imageUrl={product.imageUrl}
            price={product.price}
          />
        ))}
      </div>
      <ul className="pagination">{renderPageNumbers()}</ul>
    </div>
  );
};

export default ProductView;
