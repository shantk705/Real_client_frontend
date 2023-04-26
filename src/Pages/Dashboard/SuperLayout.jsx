import React from 'react'
import { Outlet } from 'react-router'
import SideBar from '../../Components/SideBar.jsx'

const SuperLayout = () => {
  return (
   <>
   <div className='flex flex-col'>
   <SideBar/>
   <Outlet/>
   </div>
   </>
  )
}

export default SuperLayout