import React from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";

const TermsAndConditions = () => (
  <div>
    <Navbar />
    <div className="terms-container">
      <h1>Terms and Conditions</h1>
      <p>
        Welcome to Jart Cafe! By using our website, you agree to comply with and
        be bound by the following terms and conditions.
      </p>

      <h2>Use of Website:</h2>
      <ul>
        <li>You agree to use our website for lawful purposes only.</li>
        <li>
          You are responsible for maintaining the confidentiality of your
          account information.
        </li>
      </ul>

      <h2>Intellectual Property:</h2>
      <ul>
        <li>
          All content on our website, including digital products, is the
          property of Jart Cafe and protected by intellectual property laws.
        </li>
        <li>
          You may not reproduce, distribute, or sell any content without our
          written permission.
        </li>
      </ul>

      <h2>Purchases and Payments:</h2>
      <ul>
        <li>
          By placing an order, you agree to provide accurate and complete
          payment information.
        </li>
        <li>All sales are final, except as provided in our refund policy.</li>
      </ul>

      <h2>Limitation of Liability:</h2>
      <ul>
        <li>
          Jart Cafe is not liable for any direct, indirect, or consequential
          damages arising from your use of our website or products.
        </li>
      </ul>

      <h2>Changes to Terms:</h2>
      <ul>
        <li>
          We reserve the right to modify these terms and conditions at any time.
        </li>
        <li>
          Your continued use of our website constitutes acceptance of the
          revised terms.
        </li>
      </ul>

      <h2>Contact Us:</h2>
      <p>
        If you have any questions about these terms and conditions, please
        contact us at{" support@jartcafe.com "}
        {/* <a href="mailto:support@jartcafe.com">support@jartcafe.com</a>. */}
      </p>
    </div>
    <Footer />
  </div>
);

export default TermsAndConditions;
