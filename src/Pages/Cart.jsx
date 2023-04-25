import React from 'react'
import Adress from '../Components/Adress'
import Carts from '../Components/Cart.jsx'

const Cart = () => {
  return (
    <>
    
    <div className='flex flex-row  md:flex-col-reverse   absolute'>
    <Adress/>
    <Carts/>

    </div>
    
    
    </>
  )
}

export default Cart