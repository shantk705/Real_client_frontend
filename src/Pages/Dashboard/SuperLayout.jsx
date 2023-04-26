import React from 'react'
import { Outlet } from 'react-router'
import SideBar from '../../Components/SideBar.jsx'

const SuperLayout = () => {
  return (
   <>
   <div className='flex flex-row'>
   <SideBar/>
   
   <Outlet />
 
   </div>
   </>
  )
}

export default SuperLayout