import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaPinterestP,
} from "react-icons/fa";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const Footer = () => (
  <footer className="footer">
    <div className="footer-container">
      <div className="footer-column">
        <h4>INFORMATION</h4>
        <a href="/about-us">About Us</a>
        <a href="/terms-and-conditions">Terms and Conditions</a>
        <a href="/privacy-policy">Privacy Policy</a>
        <a href="/refund-policy">Refund Policy</a>
      </div>
      <div className="footer-column">
        <h4>CONTACT</h4>
        <p>
          <FaMapMarkerAlt /> 123 Cafe Street, Brew City, BC 12345
        </p>
        <p>
          <FaPhoneAlt /> +94 XXX-XXXX
        </p>
        <p>
          <FaEnvelope /> info@jartcafe.com
        </p>
      </div>
      <div className="footer-column">
        <h4>STAY CONNECTED</h4>
        <div className="footer-social">
          <a
            href="https://facebook.com"
            aria-label="Facebook"
            className="circle-icon"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://twitter.com"
            aria-label="Twitter"
            className="circle-icon"
          >
            <FaTwitter />
          </a>
          <a
            href="https://instagram.com"
            aria-label="Instagram"
            className="circle-icon"
          >
            <FaInstagram />
          </a>
          <a
            href="https://pinterest.com"
            aria-label="Pinterest"
            className="circle-icon"
          >
            <FaPinterestP />
          </a>
        </div>
      </div>
    </div>

    <div className="footer-branding">
      <p className="footer-rights">© 2024 Jart Cafe. All Rights Reserved</p>
      <div className="payment-icons">
        <img src="/imgs/visa.jpg" alt="Visa" title="Visa" />
        <img src="/imgs/master_card.jpg" alt="MasterCard" title="MasterCard" />
        <img
          src="/imgs/amer_exp.png"
          alt="American Express"
          title="American Express"
        />
        <img src="/imgs/apple_pay.png" alt="Apple Pay" title="Apple Pay" />
        <img src="/imgs/pay_pal.jpg" alt="Pay Pal" title="Pay Pal" />
      </div>
    </div>
  </footer>
);

export default Footer;
