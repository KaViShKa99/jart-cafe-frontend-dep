import React from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";

const RefundPolicy = () => (
  <div>
    <Navbar />
    <div className="refund-container">
      <h1>Refund Policy</h1>
      <p>
        At Jart Cafe, we strive to ensure your satisfaction with our digital
        products. If for any reason you are not completely satisfied with your
        purchase, we are here to help.
      </p>

      <h2>Refunds:</h2>
      <ul>
        <li>Our refund policy lasts 30 days from the date of purchase.</li>
        <li>
          To be eligible for a refund, you must provide proof of purchase.
        </li>
        <li>
          Refunds will be processed through the original method of payment
          within 7-10 business days.
        </li>
      </ul>

      <h2>Non-refundable items:</h2>
      <ul>
        <li>Customized digital art pieces</li>
        <li>Items marked as final sale</li>
      </ul>

      <h2>How to Request a Refund:</h2>
      <ul>
        <li>
          Contact our support team at{" "}
          <a href="mailto:support@jartcafe.com">support@jartcafe.com</a> with
          your order details and reason for refund.
        </li>
        <li>
          Our team will review your request and respond within 3-5 business
          days.
        </li>
        <li>If approved, we will initiate the refund process.</li>
      </ul>

      <h2>Exchanges:</h2>
      <p>
        We do not offer exchanges for digital products. If you encounter any
        issues with your purchase, please contact us for assistance.
      </p>
    </div>
    <Footer />
  </div>
);

export default RefundPolicy;
