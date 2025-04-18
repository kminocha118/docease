import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from './assets/docsease.png';


const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <img src={logo} alt="Logo" className="navbar-logo" />
        Docsease
      </div>

      <ul className="nav-links">
        

        <li className="dropdown">
          <button className="dropbtn" onClick={toggleDropdown}>
            Upload
          </button>
          <ul className={`dropdown-content ${dropdownOpen ? 'show' : ''}`}>
            <li><Link to="/upload">On-role Employee</Link></li>
            <li><Link to="/offrole">Off-role Employee</Link></li>
          </ul>
        </li>

        <li><Link to="/search">Search</Link></li>
        <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
      </ul>
    </nav>
  );
};

export default Navbar;
