import { Link } from "react-router-dom";

const ProductItem = ({ product }) => {
  const image = product.images[0];
  return (
    <div className="item-container">
      <div className="image">
        <Link to={`/products/${product.artworkId}`}>
          <img src={image} alt="Product" />
        </Link>
      </div>
      <div className="gallery-title">{product.title}</div>
      <div className="gallery-price">USD {product.price}</div>
    </div>
  );
};

export default ProductItem;
