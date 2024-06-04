import { Link } from "react-router-dom";

const ProductItem = ({ product }) => {
  return (
    <div className="item-container">
      <div className="image">
        <Link to={`/products/${product.id}`}>
          <img src={product.imageUrl} alt="Product" />
        </Link>
        <div className="price">USD {product.price}</div>
      </div>
    </div>
  );
};

export default ProductItem;
