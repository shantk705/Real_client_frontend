import React from 'react'
import { NavLink } from 'react-router-dom';
import "./Error.css";


const Error = () => {
  return (
    <div>
      <h1 className="gradient-text text-h1 center">Error 404</h1>
      <h2>
        <NavLink className=" text-h2 " to="/">Click here to Go back home</NavLink>
      </h2>
    </div>
  )
}

export default Error;