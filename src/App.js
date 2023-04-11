import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { Outlet } from "react-router-dom";
import './App.css';
import ContactUs from './Pages/Contactus/contact';
import Navbar from './Components/Navbar/navbar';
import Home from './Pages/Home/home';
import React from 'react';

function App() {
  return (
    <>
     <Navbar />
    <Router>
    <Routes>
        
        
        <Route element={<Outlet />}>
          <Route path='/' element={<Home />} />
          <Route path='/contactus' element={<ContactUs />} />
        </Route>
    </Routes>
    </Router>
    </>
  )
}

export default App;
