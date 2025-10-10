import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const auth = JSON.parse(localStorage.getItem("yourstorage"));

  const handleLogout = () => {
    localStorage.removeItem("yourstorage");
    navigate("/");
    window.location.reload();
  };

  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Main Navbar */}
      <nav className="navbar-wrapper">
        <div className="navbar-container">
          {/* Brand Logo */}
          <Link className="navbar-brand" to="/" onClick={closeMobileMenu}>
            <img
              src={`${process.env.PUBLIC_URL}/assets/images/logo/logo.svg`}
              alt="MediGrids Logo"
              className="navbar-logo"
              onError={(e) => {
                e.target.src = `${process.env.PUBLIC_URL}/assets/images/logo/default-logo.png`;
              }}
            />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="navbar-nav-desktop">
            <div className="main-nav-links">
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/AboutUs" className="nav-link">About Us</Link>
              <Link to="/contact-us" className="nav-link">contact</Link>
              
              {auth && (
                <>
                  <Link to="/AvailableHospitals" className="nav-link">Hospitals</Link>
                  <Link to="/PatientDashboard" className="nav-link">MyDashboard</Link>
                  <Link to="/Appointment" className="nav-link">Book Appointment</Link>
                </>
              )}
            </div>
            
            <div className="auth-buttons">
              {!auth ? (
                <>
                  <Link to="/register" className="register-link">Register</Link>
                  <Link to="/login" className="login-btn">Login</Link>
                </>
              ) : (
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              )}
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className={`mobile-toggle ${isMenuOpen ? 'active' : ''}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`mobile-menu-overlay ${isMenuOpen ? 'active' : ''}`}>
          <div className="mobile-menu-content">
            <div className="mobile-nav-links">
              <Link to="/" className="mobile-nav-link" onClick={closeMobileMenu}>
                Home
              </Link>
              <Link to="/AboutUs" className="mobile-nav-link" onClick={closeMobileMenu}>
                About Us
              </Link>
              
              {!auth ? (
                // Mobile menu items when not logged in
                <>
                  <Link to="/register" className="mobile-nav-link" onClick={closeMobileMenu}>
                    Register
                  </Link>
                  <Link to="/login" className="mobile-nav-link" onClick={closeMobileMenu}>
                    Login
                  </Link>
                </>
              ) : (
                // Mobile menu items when logged in
                <>
                  <Link to="/AvailableHospitals" className="mobile-nav-link" onClick={closeMobileMenu}>
                    Hospitals
                  </Link>
                  <Link to="/PatientDashboard" className="mobile-nav-link" onClick={closeMobileMenu}>
                    MyDashboard
                  </Link>
                  <Link to="/Appointment" className="mobile-nav-link" onClick={closeMobileMenu}>
                    Book Appointment
                  </Link>
                  <button 
                    onClick={() => { handleLogout(); closeMobileMenu(); }} 
                    className="mobile-logout-btn"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Navbar Spacer */}
      <div className="navbar-spacer"></div>
    </>
  );
};

export default Navbar;

