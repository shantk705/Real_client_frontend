import React from 'react'
import { Outlet } from 'react-router'
import SideBar from '../../Components/SideBar.jsx'

const SuperLayout = () => {
  return (
   <>
   <div className='flex flex-row'>
   <SideBar/>
   <div className='w-[100%] h-[100%] overflow-auto'>
   
   <Outlet />
   </div>
 
   </div>
   </>
  )
}

export default SuperLayout