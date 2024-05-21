const ProductItem = ({ imageUrl, price }) => {
  return (
    <div className="item-container">
      <div className="image">
        <img src={imageUrl} alt="Product" />
        <div className="price">USD {price}</div>
      </div>
    </div>
  );
};

export default ProductItem;
