import { Link } from "react-router-dom";
const ProductItem = ({ id, imageUrl, price }) => {
  return (
    <div className="item-container">
      <div className="image">
        {/* <img src={imageUrl} alt="Product" /> */}
        <Link to={`/product/${id}`}>
          <img src={imageUrl} alt="Product" />
        </Link>
        <div className="price">USD {price}</div>
      </div>
    </div>
  );
};

export default ProductItem;
