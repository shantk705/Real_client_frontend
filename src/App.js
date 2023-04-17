import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import './App.css';
import ContactUs from './Pages/Contactus/contact';
import Navbar from './Components/Navbar/navbar';
import Home from './Pages/Home/home';
import React from 'react';
import Footer from './Components/Footer/footer';
import Shop from './Pages/Shop/shop';
import Cart from './Pages/Cart.jsx'

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <main className='main'>
          <Routes>
            <Route element={<Outlet />}>
              <Route path='/' element={<Home />} />
              <Route path='/shop' element={<Shop />} />
              <Route path='/contactus' element={<ContactUs />} />
              <Route path='/cart' element={<Cart />} />
            </Route>
          </Routes>
          <Footer />
        </main>
      </Router>
    </>
  );
}

export default App;