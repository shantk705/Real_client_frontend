import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import './App.css';
import ContactUs from './Pages/Contactus/contact';
import Navbar from './Components/Navbar/navbar';
import Home from './Pages/Home/home';
import React from 'react';
import Footer from './Components/Footer/footer';
import Shop from './Pages/Shop/shop';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <div className='main'>
          <Routes>
            <Route element={<Outlet />}>
              <Route path='/' element={<Home />} />
              <Route path='/shop' element={<Shop />} />
              <Route path='/contactus' element={<ContactUs />} />
            </Route>
          </Routes>
          <Footer />
        </div>
      </Router>
    </>
  );
}

export default App;