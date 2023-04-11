import './navbar.css';
import React from 'react';
import logo from '../../Assets/logo.png'

function Navbar() {
  return (
    <header className='sticky-header'>
        <div className="logo">
          <img src={logo} alt="Dayaa logo" className='header-logo' />
          <h1>Dayaa Store</h1>
        </div>
        <ul className="nav-links">
          <li>Home</li>
          <li>Shop</li>
          <li>About us</li>
          <li>Discounts</li>
          <li>Contact us</li>
        </ul>
        <div className="header-icons">
          Sign-in
        </div>
        <div className="burger-icon">
        </div>
    </header>
  )
}

export default Navbar;
