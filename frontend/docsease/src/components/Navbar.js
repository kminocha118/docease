import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';
import logo from './assets/docsease.png';

const Navbar = () => {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <img src={logo} alt="Logo" className="navbar-logo" />
        Docsease
      </div>

      <ul className="nav-links">
        <li
          className="dropdown"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <button className="dropbtn">
            Upload ▾
          </button>

          <AnimatePresence>
            {hovered && (
              <motion.ul
                className="dropdown-content show"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                <li><Link to="/upload">On-role Employee</Link></li>
                <li><Link to="/offrole">Off-role Employee</Link></li>
              </motion.ul>
            )}
          </AnimatePresence>
        </li>

        <li><Link to="/search">Search</Link></li>
        <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
      </ul>
    </nav>
  );
};

export default Navbar;
