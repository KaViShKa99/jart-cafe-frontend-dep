import { Link } from "react-router-dom";

const ProductItem = ({ product }) => {
  return (
    product && (
      <div className="item-container">
        <div className="image">
          <Link to={`/products/${product.artworkId}`}>
            <img
              src={
                product && product.images && product.images.length > 0
                  ? product.images[0]
                  : null
              }
              alt="Product"
            />
          </Link>
        </div>
        <div className="gallery-title">{product.title}</div>
        <div className="gallery-price">USD {product.price}</div>
      </div>
    )
  );
};

export default ProductItem;
