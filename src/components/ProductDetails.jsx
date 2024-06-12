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
            <p>
              Handmade Materials: Digital, portrait, drawing Welcome to The Best
              Custom Portraits Shop ! Create a beautiful custom portrait of your
              family or your best friends. This portrait is perfect for someone
              as a gift. It would be charming detail in your home ! These custom
              portraits will capture the unique characteristics of each member
              of your family. You can add in your pets, too! It's perfect for
              wedding gift, anniversary, birthday, housewarming gift and more!
              HOW TO ORDER : 1. Choose number of characters 2. Checkout 3. Send
              me a reference photos through etsy message and i'll do the rest :)
              IMPORTANT - This is Digital Files only. This is sent to you by
              email or link immediately, so that you can print it out at home or
              at a local print shop. So, you will save cost and time. No
              shipping time, shipping cost and risk of damage. - The portrait
              will be complete within 3 - 5 days. ( the time may change
              depending on the number of orders received, check our shops
              announcement for current waiting time ) - You will receive High
              Quality Files in JPEG and PDF files. - You have deadline and need
              rush order? No problem, just contact me.
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
