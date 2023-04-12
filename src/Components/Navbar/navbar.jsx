import './navbar.css';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import logo from '../../Assets/logo.png';

function Navbar() {
  const [show, setShow] = useState(false);
  const [menu, setMenu] = useState("nav-links");
  const [icon, setIcon] = useState("bx bx-menu");
  const location = useLocation();

  useEffect(() => {
    setShow(false);
    setMenu("nav-links");
    setIcon("bx bx-menu");
  }, [location]);

  const toggle = () => {
    if (!show) {
      console.log("opened");
      setMenu("nav-links open");
      setIcon("bx bx-x");
    } else {
      console.log("closed");
      setMenu("nav-links");
      setIcon("bx bx-menu");
    }
    setShow(!show);
  };

  return (
    <header className="sticky-header">
      <a href="/" className="logo">
        <img src={logo} alt="Dayaa logo" className="header-logo" />
        <span>Dayaa Store</span>
      </a>
      <ul className={menu}>
        <li>
          <a href="/" className={location.pathname === '/' ? 'active' : ''}>
            Home
          </a>
        </li>
        <li>
          <a href="/shop" className={location.pathname === '/shop' ? 'active' : ''}>
            Shop
          </a>
        </li>
        <li>
          <a href="/about" className={location.pathname === '/about' ? 'active' : ''}>
            About us
          </a>
        </li>
        <li>
          <a href="/discounts" className={location.pathname === '/discounts' ? 'active' : ''}>
            Discounts
          </a>
        </li>
        <li>
          <a href="/contactus" className={location.pathname === '/contactus' ? 'active' : ''}>
            Contact us
          </a>
        </li>
      </ul>
      <div className="header-icons">
        <a href="/" className="user">
          <i className="ri-user-fill"></i>Sign-in
        </a>
        <div className={icon} id="menu-icon" onClick={toggle}></div>
      </div>
    </header>
  );
}

export default Navbar;