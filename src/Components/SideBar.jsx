import React from 'react'
import { useState } from 'react'
import arrow from "../Assets/sideArrow.svg"
import Logo from "../Assets/logo.png"

const SideBar = () => {
const [open, setopen] = useState(true)

  return (

    <>
    <div className='flex' id='flex-wrap'>
    <div className={` ${open ? "w-72" : "w-20"} duration-300 h-screen bg-light-orange relative`}>
    <img  src={arrow} className={` ${!open && 'rotate-180'} duration-300 absolute rounded-full cursor-pointer -right-3 top-20 w-8 border-2  border-light-orange  bg-white`} alt="Arrow logo" onClick={()=>setopen(!open)}/>

    <div className=' flex gap-x-4 items-center mt-[3%]'>
    <img src={Logo} alt="Company Logo" className={`w-24  cursor-pointer duration-500 `}/>
    <h1 className={`${!open && 'scale-0'} text-xl duration-300 text-black origin-left font font-medium`}>
      Dayaa Store
    </h1>
    </div>
    </div>





    <div className='p-7 text-2xl font-semibold flex-1 h-screen flex content-center justify-center items-center'>
    <h1>Home Page</h1>
    <p>hellooooooo</p>
    </div>
    </div>

    </>
  )
}

export default SideBar