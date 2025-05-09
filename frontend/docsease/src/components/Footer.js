import React from "react";
import "./Footer.css"; 
import logo from "./assets/LG-Logo.jpg"; 

const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer-text">Powered by</p>
      <img src={logo} alt="Logo" className="footer-logo" />
      <p className="footer-text">Electronics</p>
      <p className="footer-text">Developed by Khushman Minocha (Intern)</p>
      <div className="footer-bottom">
        <p>© 2025 Docsease. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

