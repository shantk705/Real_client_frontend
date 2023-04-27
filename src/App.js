import { Route, Routes, BrowserRouter } from "react-router-dom";

import "./App.css";
import ContactUs from "./Pages/Contactus/contact";

import Home from "./Pages/Home/home";

import Layout from "./Pages/layout.jsx";
import Category from "./Pages/Shop/category";
import Shop from "./Pages/Shop/shop";
import Cart from "./Pages/Cart.jsx";
import Discounts from "./Pages/Discounts/discount";
import AboutUs from "./Pages/Aboutus/AboutUs";
import LoginUp from "./Components/popAuth/LoginUp";
import SuperLayout from "./Pages/Dashboard/SuperLayout";
import Single from "./Pages/Single/Single";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<SuperLayout />}>
            <Route path="/users" />
            <Route path="/orders" />
            <Route path="/items" />
          </Route>
        

          <Route  element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Category />} />
            <Route path="/shop/:category_id" element={<Shop />} />
            <Route path="/single" element={<Single />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/discounts" element={<Discounts />} />
            <Route path="/aboutUs" element={<AboutUs />} />
            <Route path="/login" element={<LoginUp />} />
            <Route path="/cart" element={<Cart />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
