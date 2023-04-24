import React from 'react'
import Navbar from '../Components/Navbar/navbar';
import Footer from '../Components/Footer/footer';
import { Outlet } from 'react-router';
const Layout = () => {
  return (
    <>
    <Navbar/>
    <Outlet/>
    <Footer/>
    
    </>
   
  )
}

export default Layout