import React from "react";
import "./loginup.css";
import { useState } from "react";
import axios from "axios";



function LoginUp({ showPopUp, onCloseButtonClick }) {
  const [lol, setLol]= useState(false)

  function login(){
    setLol(true)
  }

  function register(){
    setLol(false)
  }

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/login",
        {
          email: event.target.email.value,
          password: event.target.password.value,
        }
      );
      sessionStorage.setItem("token", response.data.token);
      sessionStorage.setItem("userType", response.data.userType);
      console.log("done");
    } catch (error) {
      console.log(error);
    }
  };

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/signup",
        {
          name: event.target.name.value,
          email: event.target.email.value,
          password: event.target.password.value,
        }
      );
      sessionStorage.setItem("token", response.data.token);
      sessionStorage.setItem("userType", response.data.userType);
      // handle successful registration
    } catch (error) {
      console.log(error);
    }
  };
  return(
    <>
    {showPopUp && (
    <section className="log-popup">
      <div className="forms-wrapper">
        <div className={lol === true ? "log-header-left" : "log-header"}>
          <h1 className="indicator-title">Login</h1>
          <h1 className="indicator-title">Register</h1>
        </div>
        <div className={lol === true ? "map-left" : "map"}>
          <div className="depending"></div>
          <button className="destination-1" onClick={register}>login</button>
          <button className="destination-2" onClick={login}>register</button>
        </div>
        <div className={lol === true ? "log-body-left" : "log-body"}>
        <form className="login child" onSubmit={handleLoginSubmit}>
            <div className="user-input-wrp">
              <input className="inputText" id="email" type="text" required />
              <span className="floating-label">Email</span>
            </div>
            <div className="user-input-wrp">
              <input
                className="inputText"
                id="password"
                type="password"
                required
              />
              <span className="floating-label">Password</span>
            </div>
            <button className="login-button" type="submit">
              Login
            </button>
          </form>
          <form className="register child" onSubmit={handleRegisterSubmit}>
            <div className="user-input-wrp">
              <input className="inputText" id="name" type="text" required />
              <span className="floating-label">Name</span>
            </div>
            <div className="user-input-wrp">
              <input className="inputText" id="email" type="text" required />
              <span className="floating-label">Email</span>
            </div>
            <div className="user-input-wrp">
              <input
                className="inputText"
                id="password"
                type="password"
                required
              />
              <span className="floating-label">Password</span>
            </div>
            <button className="login-button" type="submit">
              Register
            </button>
          </form>
        </div>
        <div className="guid">
          <button onClick={onCloseButtonClick}>Cancel</button>
        </div>
      </div>
    </section>
    )}
    </>
  )
}
export default LoginUp;