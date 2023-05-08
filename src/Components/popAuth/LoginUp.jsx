import React from "react";
import "./loginup.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import hash from 'hash-it';
import { useContext } from 'react';
import { MyContext } from '../../myContext';



function LoginUp() {
  const { text, setText } = useContext(MyContext);
  const [invalid, setInvalid] = useState(true);
  const [error, setError] = useState(null)
  
  
  let navigate=useNavigate()
  const [lol, setLol]= useState(false)

  function login(){
    setLol(true)
    console.log(text)
  }

  function register(){
    setLol(false)
  }

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://dayaa-backend.onrender.com/api/login",
        {
          email: event.target.email.value,
          password: event.target.password.value,
        }
      );
      if(response.data.userType==="superAdmin"){
        setText(true)
      
      sessionStorage.setItem("token", response.data.token);
      sessionStorage.setItem("userType", hash(response.data.userType));
      sessionStorage.setItem("user_id", response.data._id);
      sessionStorage.setItem("userName", response.data.name);
       navigate('/items')
      }else{
      sessionStorage.setItem("token", response.data.token);
      sessionStorage.setItem("userType", response.data.userType);
      sessionStorage.setItem("user_id", response.data._id);
      sessionStorage.setItem("userName", response.data.name);
      navigate("/")
      }
    } catch (error) {
      setInvalid(false)
      setTimeout(() => {
        setInvalid(true);
      }, 3000);
      console.log(error);
    }

  };


  const handleRegisterSubmit = async (event) => {
    event.preventDefault();
   
    try {
      const response = await axios.post(
        "https://dayaa-backend.onrender.com/api/signup",
        {
          name: event.target.name.value,
          email: event.target.Email.value,
          password: event.target.Password.value,
        }
      );
      if(response.status===201){
        navigate("/")
      }
   
      sessionStorage.setItem("token", response.data.token);
      sessionStorage.setItem("userType", response.data.userType);
      sessionStorage.setItem("user_id", response.data._id);
      sessionStorage.setItem("userName", response.data.name);

      // handle successful registration
    } catch (error) {
      setInvalid(false)
      setError(error.response.data.message)
      setTimeout(() => {
        setInvalid(true);
      }, 3000);
      console.log(error);
    }
  };
  return(
    <>
   
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
            {invalid === false ? <p className="error-hndl">Invalid Email or password</p> : null}
            <div className="user-input-wrp">
              <input className={invalid ? 'inputText' : 'inputText shake'} id="email" type="text" required />
              <span className="floating-label">Email</span>
            </div>
            <div className="user-input-wrp">
              <input
                className={invalid ? 'inputText' : 'inputText shake'}
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
          {invalid === false ? <p className="rgst-hndl">{error}</p> : null}
            <div className="user-input-wrp">
              <input className={invalid === true ? 'inputText' : 'inputText shake'} id="name" type="text" required />
              <span className="floating-label">Name</span>
            </div>
            <div className="user-input-wrp">
              <input className={invalid ? 'inputText' : 'inputText shake'} id="Email" type="text" required />
              <span className="floating-label">Email</span>
            </div>
            <div className="user-input-wrp">
              <input
                className={invalid ? 'inputText' : 'inputText shake'}
                id="Password"
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
          <button onClick={()=>{navigate(-1)}}>Cancel</button>
        </div>
      </div>
    </section>
   
    </>
  )
}
export default LoginUp;