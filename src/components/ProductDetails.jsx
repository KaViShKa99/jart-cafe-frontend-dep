import { useState } from "react";
import { FaPlane, FaClock, FaGlobe } from "react-icons/fa";

const ProductDetails = ({ productDetails }) => {
  const [activeTab, setActiveTab] = useState("details");
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="product-and-shipping-details">
      <div className="tabs">
        <button
          className={`tab ${activeTab === "details" ? "active" : ""}`}
          onClick={(event) => {
            event.preventDefault();
            setActiveTab("details");
          }}
        >
          Item details
        </button>
        <button
          className={`tab ${activeTab === "shipping" ? "active" : ""}`}
          onClick={(event) => {
            event.preventDefault();
            setActiveTab("shipping");
          }}
        >
          Shipping policy
        </button>
      </div>
      <div className="tab-content">
        {activeTab === "details" && (
          <div className="item-more-details">
            {/* <h2 className="product-details-title">Item More Details</h2> */}
            {productDetails && (
              <div
                className="product-details"
                dangerouslySetInnerHTML={{
                  __html: !isExpanded
                    ? productDetails.substring(0, 700) + "..."
                    : productDetails,
                }}
              />
            )}
            <div className="read-more-container">
              <button className="readmore-btn" onClick={toggleExpansion}>
                {isExpanded ? "Read Less" : "Learn more about this item"}
              </button>
            </div>
          </div>
        )}
        {activeTab === "shipping" && (
          <div className="shipping-details">
            {/* <h2>Shipping Details</h2> */}
            <div className="shipping-header">
              {/* <h2>
                <FaGlobe /> Shipping Details
              </h2> */}
            </div>
            <p>
              <FaPlane /> Free worldwide shipping on all orders.
            </p>
            <p>
              <FaClock /> Estimated delivery time:
            </p>
            <ul>
              <li>
                <FaPlane /> USA: 5-10 business days
              </li>
              <li>
                <FaPlane /> Europe: 7-14 business days
              </li>
              <li>
                <FaPlane /> Rest of the world: 10-20 business days
              </li>
            </ul>
            <p>
              Please note that due to the custom nature of our products,
              production time may vary.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
