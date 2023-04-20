import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';
import ContactUs from './Pages/Contactus/contact';
import Navbar from './Components/Navbar/navbar';
import Home from './Pages/Home/home';
import React from 'react';
import Footer from './Components/Footer/footer';
import Category from './Pages/Shop/category';
import Shop from './Pages/Shop/shop';
import LoginUp from './Components/popAuth/LoginUp';

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
      <Router>
        <Navbar onButtonClick={handleButtonClick}/>
        <main className={showPopUp ? "none" : "main" }>
          <Routes>
            <Route element={<Outlet />}>
              <Route path='/' element={<Home />} />
              <Route path='/shop' element={<Category/>} />
              <Route path='/shop/:category_id' element={<Shop />} />
              <Route path='/contactus' element={<ContactUs />} />
            </Route>
          </Routes>
          <Footer />
        </main>
      <LoginUp showPopUp={showPopUp} onCloseButtonClick={handleCloseButtonClick}/>
      </Router>
    </>
  );
}

export default App;
