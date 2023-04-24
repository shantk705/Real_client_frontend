import { Route, Routes, BrowserRouter} from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import './App.css';
import ContactUs from './Pages/Contactus/contact';
import Navbar from './Components/Navbar/navbar';
import Home from './Pages/Home/home';
import React, { useState } from 'react';
import Footer from './Components/Footer/footer';
import Layout from "./Pages/layout.jsx"
import Category from './Pages/Shop/category';
import Shop from './Pages/Shop/shop';
import Discounts from './Pages/Discounts/discount';
import AboutUs from './Pages/Aboutus/AboutUs'
import LoginUp from './Components/popAuth/LoginUp';
import SideBar from "./Components/SideBar"

function App() {
  const [showPopUp, setShowPopUp] = useState(false);

  function handleButtonClick() {
    setShowPopUp(true);
  }

  function handleCloseButtonClick() {
    setShowPopUp(false);
  }

  return (
    <>
   
      
     
        <main className={showPopUp ? "none" : "main" }>
        <BrowserRouter>
          <Routes>
         <Route element={<Layout/>}>
              <Route path='/' element={<Home />} />
              <Route path='/shop' element={<Category/>} />
              <Route path='/shop/:category_id' element={<Shop />} />
              <Route path='/contactus' element={<ContactUs />} />
              <Route path='/discounts' element={<Discounts />} />
              <Route path='/aboutUs' element={<AboutUs />} />

              </Route>
              </Routes>
         
          </BrowserRouter>
        </main>
        
        <LoginUp showPopUp={showPopUp} onCloseButtonClick={handleCloseButtonClick}/>
     
    </>
  );
}

export default App;