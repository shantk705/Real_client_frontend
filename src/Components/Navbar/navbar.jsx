import './navbar.css';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import logo from '../../Assets/logo.png';

function Navbar({ onButtonClick }) {
  const [show, setShow] = useState(false);
  const [nav, setNav] = useState(false)
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

  function navbar(){
    if (window.scrollY >= 1035){
      setNav(true)
    }
    else{
      setNav(false)
    }
  }

  window.addEventListener("scroll", navbar)
  return (
    <header className={nav ? 'not' : 'sticky-header'}>
      <a href="/" className="logo">
        <img src={logo} alt="Dayaa logo" className="header-logo" />
        <span>Dayaa Store</span>
      </a>
      <ul className={menu}>
        <li className={nav ? 'maintain' : 'normal'}>
          <a href="/" className={location.pathname === '/' ? 'active' : ''}>
            Home
          </a>
        </li>
        <li className={nav ? 'maintain' : 'normal'}>
          <a href="/shop" className={location.pathname === '/shop' ? 'active' : ''}>
            Shop
          </a>
        </li>
        <li className={nav ? 'maintain' : 'normal'}>
          <a href="/aboutUs" className={location.pathname === '/aboutUs' ? 'active' : ''}>
            About us
          </a>
        </li>
        <li className={nav ? 'maintain' : 'normal'}>
          <a href="/discounts" className={location.pathname === '/discounts' ? 'active' : ''}>
            Discounts
          </a>
        </li>
        <li className={nav ? 'maintain' : 'normal'}>
          <a href="/contactus" className={location.pathname === '/contactus' ? 'active' : ''}>
            Contact us
          </a>
        </li>
      </ul>
      <div className={nav ? 'head-icons' : 'header-icons'}>
        <p onClick={onButtonClick} className="user">
          <i className="ri-user-fill"></i>Sign-in
        </p>
        <div className={icon} id="menu-icon" onClick={toggle}></div>
      </div>
    </header>
  );
}

export default Navbar;