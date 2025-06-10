import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../styles_components/style_navbar.css';
import LoginModal from '../login-signup/LoginModal';
import navbarData from '../data/data-Navbar/navbarData.json';
import logo from '../logo/zenTreeLogo.png';

const Navbar = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const userID = localStorage.getItem('userID');
    if (userID) {
      setLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('userID');
    setLoggedIn(false);
    navigate('/');
  };

  const handleNavCollapse = () => {
    setIsNavCollapsed(!isNavCollapsed);
  };

  const closeNav = () => {
    setIsNavCollapsed(true);
  };

  const handleLinkClick = () => {
    closeNav();
  };

  return (
    <nav className="navbar navbar-expand-lg px-5 py-4 sticky-top">
      <div className='logo-hamb-icon-responsive'>
        <Link className="navbar-brand" to="/" onClick={handleLinkClick}>
          <img src={logo} alt="Logo" className="logo-img" /> {/* Use imported logo */}
        </Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          aria-controls="navbarSupportedContent" 
          aria-expanded={!isNavCollapsed} 
          aria-label="Toggle navigation" 
          onClick={handleNavCollapse}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
      <div className={`navbar-collapse ${!isNavCollapsed ? 'show' : ''}`} id="navbarSupportedContent">
        <ul className="navbar-nav mx-auto">
          {navbarData.navLinks.map((link, index) => (
            <li className="nav-item" key={index}>
              <Link className="nav-link" to={link.path} onClick={handleLinkClick}>{link.name}</Link>
            </li>
          ))}
        </ul>
        <div className="d-flex hambItems">
          {loggedIn ? (
            <>
              <button className="btn btn-navbar btn-login" onClick={handleLogout}>{navbarData.buttons.signOut}</button>
              <Link className="btn btn-navbar btn-become-member" to="/my-membership" onClick={handleLinkClick}>{navbarData.buttons.myPlan}</Link>
            </>
          ) : (
            <>
              <button className="btn btn-navbar btn-login" onClick={() => { setShowLoginModal(true); closeNav(); }}>{navbarData.buttons.signIn}</button>
              <Link className="btn btn-navbar btn-become-member" to="/plans-page" onClick={handleLinkClick}>{navbarData.buttons.signUp}</Link>
            </>
          )}
        </div>
      </div>
      {showLoginModal && <LoginModal showModal={showLoginModal} setShowModal={setShowLoginModal} setLoggedIn={setLoggedIn} />}
    </nav>
  );
}

export default Navbar;
