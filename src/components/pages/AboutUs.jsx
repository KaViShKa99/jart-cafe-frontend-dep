// src/components/AboutUs.js
import React from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";

const AboutUs = () => (
  <div>
    <Navbar />
    <div className="about-container">
      <h1>About Us</h1>
      <p>Welcome to Jart Cafe, where digital art comes alive!</p>

      <p>
        At Jart Cafe, we are passionate about connecting talented digital
        artists with enthusiasts and customers looking for unique and
        high-quality digital artwork. Our platform is an innovative online
        marketplace dedicated to offering a diverse range of digital products,
        including illustrations, design elements, and other creative assets.
      </p>

      <h2>Our Mission:</h2>
      <p>
        Our mission is to empower digital artists by providing them with a
        platform to sell their work, while also offering customers a rich
        selection of digital art that inspires creativity and innovation. We aim
        to create a vibrant community where art and technology merge seamlessly,
        making digital art accessible and enjoyable for everyone.
      </p>

      <h2>Why Choose Us:</h2>
      <ul>
        <li>Wide variety of digital art and products</li>
        <li>Easy-to-navigate online marketplace</li>
        <li>Supportive community for digital artists</li>
        <li>High-quality, unique, and exclusive digital products</li>
      </ul>

      <p>
        Join us in celebrating creativity and innovation at Jart Cafe. Explore
        our collection today and discover the perfect digital art pieces for
        your personal and professional projects.
      </p>
    </div>
    <Footer />
  </div>
);

export default AboutUs;
