// src/components/PrivacyPolicy.js
import React from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";

const PrivacyPolicy = () => (
  <div>
    <Navbar />
    <div className="privacy-container">
      <h1>Privacy Policy</h1>
      <p>
        Your privacy is important to us. This privacy policy explains how Jart
        Cafe collects, uses, and protects your information when you visit our
        website.
      </p>

      <h2>Information We Collect:</h2>
      <ul>
        <li>
          Personal identification information (name, email address, phone
          number, etc.)
        </li>
        <li>
          Payment information (processed securely through our payment provider)
        </li>
        <li>Usage data (browsing history, IP address, cookies, etc.)</li>
      </ul>

      <h2>How We Use Your Information:</h2>
      <ul>
        <li>To process and manage your orders</li>
        <li>To improve our website and services</li>
        <li>
          To send promotional emails and updates (you can opt out at any time)
        </li>
        <li>To respond to your inquiries and provide customer support</li>
      </ul>

      <h2>Data Protection:</h2>
      <ul>
        <li>
          We implement secure measures to protect your information from
          unauthorized access, alteration, or disclosure.
        </li>
        <li>
          We do not sell or share your personal information with third parties,
          except as necessary to provide our services or comply with legal
          obligations.
        </li>
      </ul>

      <h2>Your Rights:</h2>
      <ul>
        <li>
          You have the right to access, update, or delete your personal
          information.
        </li>
        <li>You can opt out of receiving promotional emails at any time.</li>
      </ul>

      <h2>Contact Us:</h2>
      <p>
        If you have any questions or concerns about our privacy policy, please
        contact us at{" "}
        <a href="mailto:support@jartcafe.com">support@jartcafe.com</a>.
      </p>
    </div>
    <Footer />
  </div>
);

export default PrivacyPolicy;
