import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Adress = () => {
  let id=sessionStorage.getItem("user_id")
  let token = sessionStorage.getItem("token");

  const [adress, setAdress] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    street: '',
    building: '',
    details: '',
  });

  useEffect(() => {
    let id=sessionStorage.getItem("user_id")
    let token = sessionStorage.getItem("token");
    
    axios
      .get(`https://dayaa-backend.onrender.com/adress/${id}`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      
      .then((res) => {
       
        
        setAdress({
          name: res.data.data.name,
          phone: res.data.data.phone,
          email: res.data.data.email,
          city: res.data.data.city,
          street: res.data.data.street,
          building: res.data.data.building,
          details: res.data.data.details,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  async function updateAddress(event) {
   
    event.preventDefault();
     const x =await fetch(`https://dayaa-backend.onrender.com/adress/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        name: adress.name,
        phone: adress.phone,
        email: adress.email,
        city: adress.city,
        street: adress.street,
        building: adress.building,
        details: adress.details,


      }),
    });
    const response= await x.json()
    if(response.name){
      toast.success('Address saved !', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    }else{
      toast.error('Something went wrong !', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    }
  }
  function handleChange(evt) {
    const value = evt.target.value;
    setAdress({
      ...adress,
      [evt.target.name]: value,
    });
  }
  
  return (
    <>
    <div className="flex flex-col w-[100%]  mt-[2%] xl:ml-[3.5%]">
      <div className="w-[100%] h-[40rem]    flex flex-col  md:h-[60rem] md:pl-[10vw]  md:pr-[10vw] md:w-[80vw]">
        <h1 className="mb-3 text-xl font-bold ">Delivery information </h1>
        <form onSubmit={updateAddress} id="Adress-parent" className="  bg-[white] rounded-md  grid-cols-2 grid  gap-5 h-5/6 shadow-xl md:w-[78vw]  md:grid-cols-1 md:h-[58rem] ">
          <label className="flex  flex-col ml-5 mr-10 pt-5">
            Name
            <input
              type="text"
              name="name"
              value={adress.name}
              onChange={handleChange}
              className="border-2 h-10  mt-2  rounded-md pl-[3%]"
            />
          </label>
          <label className="flex  flex-col ml-5 mr-10 pt-5">
            Phone Number
            <input
              type="text"
              name="phone"
              value={adress.phone}
              onChange={handleChange}
              className="border-2 h-10 mt-2 rounded-md pl-[3%]"
            />
          </label>
          <label className="flex  flex-col ml-5 mr-10">
            Email
            <input
              type="text"
              name="email"
              value={adress.email}
              onChange={handleChange}
              className="border-2 h-10 mt-2 rounded-md pl-[3%]"
            />
          </label>
          <label className="flex  flex-col ml-5 mr-10 " >
            City
            <input
              type="text"
              name="city"
              value={adress.city}
              onChange={handleChange}
              className="border-2 h-10 mt-2 rounded-md pl-[3%]"
            />
          </label>
          <label className="flex  flex-col ml-5 mr-10">
            Street
            <input
              type="text"
              name="street"
              value={adress.street}
              onChange={handleChange}
              className="border-2 h-10 mt-2 rounded-md pl-[3%]"
            />
          </label>
          <label className="flex  flex-col ml-5 mr-10">
            Building
            <input
              type="text"
              name="building"
              value={adress.building}
              onChange={handleChange}
              className="border-2 h-10 mt-2 rounded-md pl-[3%]"
            />
          </label>
          <label className="flex  flex-col ml-5 mr-10 ">
            Aditional Information
            <textarea
              type="text"
              name="details"
              value={adress.details}
              onChange={handleChange}
              className="border-2 h-24  mt-2 rounded-md pl-[3%] resize-none"
            />
          </label>
          <button type="submit" className="bg-black  w-3/4 text-white mt-10 ml-[10%] md:ml-[12%] h-[5vh] text-xl  hover:bg-[#FFA500] hover:text-black hover:border-2 hover:border-[black] rounded-md">
            Save Adress
          </button>
        </form>
      </div>
      <div className="mt-0 md:ml-[10%] md:mr-[10%] md:w-[100%]  md:mt-[10%] md:h-[25vh]">
        <h2 className="mb-3 text-xl font-bold  ">Payment Method</h2>
        <div id="Payment-parent" className=" xl:w-[100%]  flex flex-col bg-[white] mb-24 h-[6rem]  justify-center	shadow-xl md:w-[80%]  rounded-md ">
          <label className="  ml-14 text-xl ">
            <input
              type="radio"
              name="name"
              defaultChecked
              className="mr-4 w-4 h-4 text-black"
            />
            Cash On Delivery
          </label>
        </div>
        <ToastContainer  position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"/>
      </div>
      </div>
    </>
  );
};

export default Adress;
