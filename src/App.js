import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import './App.css';
import ContactUs from './Pages/Contactus/contact';
import Navbar from './Components/Navbar/navbar';
import Home from './Pages/Home/home';
import React from 'react';
import Footer from './Components/Footer/footer';
import Category from './Pages/Shop/category';
import Shop from './Pages/Shop/shop';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <main className='main'>
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
      </Router>
    </>
  );
}

export default App;