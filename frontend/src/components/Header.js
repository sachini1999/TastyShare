// src/components/Header.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';
import companylogoImage from '../assets/images/companylogo.png';
import searchImage from '../assets/images/search.png';
import userImage from '../assets/images/account.png';
import MiniLoginIcon from '../assets/images/minilogin.png';
import MiniSignupIcon from '../assets/images/minisignup.png';

const Header = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [gemCount, setGemCount] = useState(0);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch cart items and user details from backend or local storage
    fetchCartItems();
    fetchUserDetails();
  }, []);

  const fetchCartItems = () => {
    // Fetch cart items logic here
  };

  const fetchUserDetails = () => {
    // Fetch user details
  };

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <header>
      <div className="top-row">
        <div className="logo-container">
          <Link to="/">
            <img src={companylogoImage} alt="Signature Cuisine Logo" className="logoicon" />
          </Link>
          <div id="logo">TastyShare</div>
        </div>

        <nav>
          <button className="hamburger" id="hamburgerBtn">
            <img src="/resources/hamburger.png" alt="Menu" />
          </button>
          <ul id="navList">
            <li className="search-icon">
              <a href="#" id="search-icon-link">
                <img id="search-icon-img" src={searchImage} alt="Search Icon" />
              </a>
            </li>
            <div id="search-bar" style={{ display: 'none' }}>
              <div className="search-container">
                <input type="text" id="search-input" placeholder="Search..." />
                <div id="search-results" className="search-results"></div>
              </div>
            </div>

            <li className="account-dropdown">
              {user ? (
                <>
                  <a href="#" onClick={toggleDropdown}>
                    <img src={userImage} alt="User Account" className="login-icon" />
                  </a>
                  <div className={`dropdown-content ${isDropdownVisible ? 'show' : ''}`} id="dropdownMenu">
                    <Link to="/profile">Profile</Link>
                    <Link to="/history">Order History</Link>
                    <Link to="/logout">Logout</Link>
                  </div>
                </>
              ) : (
                <>
                  <a href="#" onClick={toggleDropdown}>
                    <img src={userImage} alt="Login/Register" className="login-icon" />
                  </a>
                  <div className={`dropdown-content ${isDropdownVisible ? 'show' : ''}`} id="dropdownMenu">
                    <Link to="/login">Login <img src={MiniLoginIcon} alt="Arrow" className="mini-login" /> </Link>
                    <Link to="/signup">Signup <img src={MiniSignupIcon} alt="Arrow" className="mini-signup" /></Link>
                  </div>
                </>
              )}
            </li>
          </ul>
        </nav>
      </div>
      
      <div className="bottom-section">
        <nav>
          <ul>
            <li className="nav-item">
              <Link to="/home">Home</Link>
            </li>
            
            <li className="nav-item">
              <Link to="/list">Recipes</Link>
            </li>
            
            <li className="nav-item">
              <Link to="/community">Community</Link>
            </li>
            
            <li className="nav-item">
              <Link to="/services">Services</Link>
            </li>
            
            <li className="nav-item">
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;