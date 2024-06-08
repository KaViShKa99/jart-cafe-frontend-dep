import { Link } from "react-router-dom";

const ProductItem = ({ product }) => {
  const imgUrl = product.images[0].url;
  return (
    <div className="item-container">
      <div className="image">
        <Link to={`/products/${product.artworkId}`}>
          <img src={imgUrl} alt="Product" />
        </Link>
        <div className="price">USD {product.price}</div>
      </div>
    </div>
  );
};

export default ProductItem;
