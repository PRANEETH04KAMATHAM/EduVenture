import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/EduVenture logo.png"; 

const Header = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <img src={logo} alt="EduVenture Logo" className="logo" />
        <div className="logo-text">EduVenture</div>
      </div>

      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/events">Events</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/login" className="login-btn">Login</Link></li>
          <li><Link to="/register" className="register-btn">Register</Link></li> 
        </ul>
      </nav>
    </header>
  );
};
export default Header;
