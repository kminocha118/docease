import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-brand"> 
        <div img src="/assets/docsease.png" alt="Logo"className="navbar-logo" />Docsease</div>
      <ul className="nav-links">
        <li>
          <Link to="/">Upload Documents</Link>
        </li>
        <li>
          <Link to="/search">Search Documents</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
