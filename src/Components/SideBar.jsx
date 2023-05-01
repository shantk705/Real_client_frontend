import React from 'react'
import { useState } from 'react'
import { NavLink } from "react-router-dom";
import {  FaBeer } from 'react-icons/fa'
import arrow from "../Assets/sideArrow.svg"
import Logo from "../Assets/logo.png"
import Users from "../Assets/users.png"
import Orders from "../Assets/orders.png"
import Items from "../Assets/items.png"
import Carousel from "../Assets/carousel.png";
const SideBar = () => {
const [open, setopen] = useState(true)
const links=[
  {title:"Items" ,nav:"/items", img:Items},
  {title:"Users" ,nav:"/users", img:Users},
  {title:"Orders" ,nav:"/orders", img:Orders},
  {title:"Carousel", nav:"/carousel", img: Carousel}
 ]

  return (

    <>
    <div className='flex' id='flex-wrap'>
    <div className={` ${open ? "w-72" : "w-20"} duration-300 h-screen bg-light-orange relative`}>
    <img  src={arrow} className={` ${!open && 'rotate-180'} duration-300 absolute rounded-full cursor-pointer -right-3 top-20 w-8 border-2  border-light-orange  bg-white`} alt="Arrow logo" onClick={()=>setopen(!open)}/>

    <div className=' flex gap-x-4 items-center mt-[3%]'>
    <img src={Logo} alt="Company Logo" className={`w-24  cursor-pointer duration-500  ml-[5%]`}/>
    <h1 className={`${!open && 'scale-0'} text-xl duration-300 text-black origin-left font font-medium`}>
      Dayaa Store
    </h1>
    </div>
    <div className='flex items-center flex-col mt-8  ' >
    {links.map((link,index)=>(
<NavLink key={index} to={link.nav}   className=" focus:bg-white flex items-center gap-x-4 hover:bg-[#FFD580] w-[90%]  ml-[5%] mr-[5%] h-[8vh] rounded-md">
<img src={link.img} className="w-14 h-14 ml-[6%]"/>
<div className={`text-xl ${!open && 'scale-0'}  w-24 `}>{link.title}</div>
</NavLink>
  ))}
  </div>
    </div>

    </div>

    </>
  )
}

export default SideBar