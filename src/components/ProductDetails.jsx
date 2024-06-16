import { useState } from "react";

const ProductDetails = () => {
  const [activeTab, setActiveTab] = useState("details");

  return (
    <div className="product-and-shipping-details">
      <div className="tabs">
        <button
          className={`tab ${activeTab === "details" ? "active" : ""}`}
          onClick={() => setActiveTab("details")}
        >
          Item More Details
        </button>
        <button
          className={`tab ${activeTab === "shipping" ? "active" : ""}`}
          onClick={() => setActiveTab("shipping")}
        >
          Shipping Details
        </button>
      </div>
      <div className="tab-content">
        {activeTab === "details" && (
          <div className="item-more-details">
            <h2>Item More Details</h2>
            <p style={{ whiteSpace: "pre-wrap" }}>
              This is a <strong>bold</strong> text and this is <em>italic</em>{" "}
              text
            </p>
          </div>
        )}
        {activeTab === "shipping" && (
          <div className="shipping-details">
            <h2>Shipping Details</h2>
            <p>Free worldwide shipping on all orders.</p>
            <p>Estimated delivery time:</p>
            <ul>
              <li>USA: 5-10 business days</li>
              <li>Europe: 7-14 business days</li>
              <li>Rest of the world: 10-20 business days</li>
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
