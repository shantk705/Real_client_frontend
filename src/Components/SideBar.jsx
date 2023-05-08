import React from 'react'
import { useState } from 'react'
import { NavLink } from "react-router-dom";

import arrow from "../Assets/sideArrow.svg"
import Logo from "../Assets/logo.png"
import Users from "../Assets/users.png"
import Orders from "../Assets/orders.png"
import Exit from "../Assets/exit.png"
import Items from "../Assets/items.png"
import Carousel from "../Assets/carousel.png";
const SideBar = () => {
const [open, setopen] = useState(true)
const links=[
  {title:"Items" ,nav:"/items", img:Items},
  {title:"Users" ,nav:"/users", img:Users},
  {title:"Orders" ,nav:"/orders", img:Orders},
  {title:"Carousel", nav:"/carousel", img: Carousel},
  {title:"Log Out",  nav:"/",img:Exit}
 ]

  return (

    <>
    <div className='flex' id='flex-wrap'>
    <div className={` ${open ? "w-72" : "w-20 "} duration-300 h-screen bg-light-orange relative md:w-[3rem]` }>
    <img  src={arrow} className={` ${!open && 'rotate-180'} duration-300 absolute rounded-full cursor-pointer -right-3 top-20 w-8 border-2  border-light-orange md:hidden  bg-white`} alt="Arrow logo" onClick={()=>setopen(!open)}/>
    

    <div className=' flex gap-x-4 items-center mt-[3%]'>
    <img src={Logo} alt="Company Logo" className={`w-[5rem]   cursor-pointer duration-500 ${open ? "xl:ml-[5%]" : ""}  `}/>
    <h1 className={`${!open && 'scale-0'} text-xl duration-300 text-black origin-left font font-medium md:hidden`}>
      Dayaa Store
    </h1>
    </div>
    <div className='flex items-center flex-col mt-8  ' >
    {links.map((link,index)=>(
<NavLink key={index} to={link.nav} onClick={link.title==="Log Out"?()=>{sessionStorage.clear()}:""}   className={`${link.title==="Log Out" ?"mt-[410px]":""} focus:bg-white flex items-center gap-x-4 hover:bg-[#FFD580] w-[90%]  ml-[5%] mr-[5%] h-[8vh] rounded-md md:justify-center`}>
<img src={link.img} alt="Button logo" className="w-12 h-12 xl:ml-[14%] md:w-8 md:h-8"/>
<div className={`text-xl ${!open && 'scale-0'}  w-24  md:hidden`}>{link.title}</div>
</NavLink>
  ))}
  </div>
    </div>


    </div>

    </>
  )
}

export default SideBar