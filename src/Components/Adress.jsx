import React from "react";

const Adress = () => {
  return (
    <>
   
  
    <div class="w-[60rem] h-5/6  ml-12 mt-12 flex flex-col  ">
    <h1 className="mb-5 text-xl font-bold">Delivery information </h1>
    <form className="  bg-white  grid-cols-2 grid  gap-5 h-5/6"  >
    <label className="flex  flex-col ml-5 mr-10 pt-5">
    Name
    <input type="text" name="name"  className="border-2 h-10  mt-2"/>
    </label>
    <label className="flex  flex-col ml-5 mr-10 pt-5">
    Phone Number
    <input type="text" name="name"  className="border-2 h-10 mt-2"/>
    </label>
    <label className="flex  flex-col ml-5 mr-10">
    Email
    <input type="text" name="name"  className="border-2 h-10 mt-2"/>
    </label>
    <label className="flex  flex-col ml-5 mr-10">
   City
    <input type="text" name="name"  className="border-2 h-10 mt-2"/>
    </label>
    <label className="flex  flex-col ml-5 mr-10">
    Street
    <input type="text" name="name"  className="border-2 h-10 mt-2"/>
    </label>
    <label className="flex  flex-col ml-5 mr-10">
    Building
    <input type="text" name="name"  className="border-2 h-10 mt-2"/>
    </label>
    <label className="flex  flex-col ml-5 mr-10 ">
    Aditional Information
    <textarea type="text" name="name"   className="border-2 h-24  mt-2"/>
    </label>
    <button className="bg-black h-10 w-3/4 text-white mt-10 ml-12">Save Adress</button>
    </form>
    </div>
    <div className="ml-12 mt-0">
    <h2 className="mb-5 text-xl font-bold ">Payment Method</h2>
    <div className=" w-[60rem] flex flex-col bg-white mb-32 h-[6rem]  justify-center	 ">
    <label className="  ml-14 text-xl ">
    <input type="radio" name="name" checked  className="mr-4 w-4 h-4 text-black"/>
    Cash On Delivery
    
    </label>
    </div>
    
    </div>
    
  
    
   
    </>
  );
};

export default Adress;
