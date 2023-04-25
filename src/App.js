import { Route, Routes, BrowserRouter} from 'react-router-dom';
import './App.css';
import ContactUs from './Pages/Contactus/contact';
import Home from './Pages/Home/home';
import React from 'react';
import Layout from "./Pages/layout.jsx"
import Category from './Pages/Shop/category';
import Shop from './Pages/Shop/shop';
import Discounts from './Pages/Discounts/discount';
import AboutUs from './Pages/Aboutus/AboutUs'
import LoginUp from './Components/popAuth/LoginUp';
import SideBar from "./Components/SideBar"

function App() {

  return (  
    <>
        <BrowserRouter>
                  <Routes>
                  <Route element={<SideBar/>}>
                  <Route path="/admin"/>
                  </Route>
                  </Routes>
        </BrowserRouter>
        <main className= "main">
          <BrowserRouter>
            <Routes>      
                <Route element={<Layout />}> 
                  <Route path='/' element={<Home />} />
                  <Route path='/shop' element={<Category/>} />
                  <Route path='/shop/:category_id' element={<Shop />} />
                  <Route path='/contactus' element={<ContactUs />} />
                  <Route path='/discounts' element={<Discounts />} />
                  <Route path='/aboutUs' element={<AboutUs />} />
                  <Route path='/login' element={<LoginUp/>}/>
                </Route>
            </Routes>
          </BrowserRouter>
        </main>
    </>
  );
}

export default App;