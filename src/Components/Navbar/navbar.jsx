import './navbar.css';
import React, { useState, useEffect } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import logo from '../../Assets/logo.png';


function Navbar() {

  let navigate=useNavigate();
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
      
      setMenu("nav-links open");
      setIcon("bx bx-x");
    } else {
     
      setMenu("nav-links");
      setIcon("bx bx-menu");
    }
    setShow(!show);
  };

  function navbar(){
    if (window.scrollY >= 851){
      setNav(true)
    }
    else{
      setNav(false)
    }
  }

  const handleSignClick = () => {
    navigate("/login")
    setMenu("nav-links");
    setIcon("bx bx-menu");
 
  };

  const token = sessionStorage.getItem('token'); 
  const logout = () => {
    sessionStorage.removeItem('user_id');
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('userType');
    sessionStorage.removeItem('token');
    window.location.href = "/";
  };
  window.addEventListener("scroll", navbar);

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
        <li className={`willhidden ${nav ? 'maintain' : 'normal'}`}>
          <a href="/cart" className={location.pathname === '/contactus' ? 'active' : ''}>
            Cart
          </a>
        </li>
        <li className={nav ? 'maintain' : 'normal'}>
          <a href="/contactus" className={location.pathname === '/contactus' ? 'active' : ''}>
            Contact us
          </a>
        </li>
        <li className="willhide">
        {token ? <p onClick={logout} className={location.pathname === '/' ? 'active' : ''}>Logout</p> : <p onClick={handleSignClick} className={location.pathname === '/sign-in' ? 'active' : ''}>
            Sign-in
          </p>}
        </li>
      </ul>
      <div  className={nav ? 'head-icons' : 'header-icons'}>
      {token ? 
      <div className='cart-logo-wrpr'>
        <i className="ri-shopping-cart-2-line" onClick={()=>{
          navigate("/cart")
        }}></i>
      <p
          onKeyDown={(e) => {
            if (e.keyCode === 13) {
              logout();
            }
            }} 
            onClick={logout}
            tabIndex="0"
            className="user"
        >
          Logout
        </p> 
        </div> : <p onKeyDown={(e) => {
          if (e.keyCode === 13) {
            handleSignClick();
          }
          }} 
          onClick={handleSignClick}
          tabIndex="0"
          className="user"
        >
          <i className="ri-user-fill"></i>Sign-in
        </p>
        }
        <div className={icon} id="menu-icon" onClick={toggle}></div>
      </div>
    </header>
  );
}

export default Navbar;
