import React from "react";
import "./Footer.css"; // Import the CSS file
 // Update with the correct path to your image

const Footer = () => {
  return (
    <footer className="footer">
      <p class="footer-text">Powered by</p>
      <img src="/assets/LG-Logo-759x500.jpg" alt="Logo" className="footer-logo" />
      <p class="footer-text">Electronics</p>
    </footer>
  );
};

export default Footer;
