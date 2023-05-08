import React from 'react'
import Adress from '../Components/Adress'
import Carts from '../Components/Cart.jsx'

const Cart = () => {
  return (
    <>
  
    <div id="carte-container" className='flex flex-row   md:flex-col w-[100%] bg-white'>
    <Adress/>
    <Carts/>

    </div>
   
    
    
    </>
  )
}

export default Cart