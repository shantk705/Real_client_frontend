import React, { useEffect, useState, useReducer } from "react";
import { NavLink } from "react-router-dom";
import honey from "../Assets/honey.png";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Carts = () => {
  const [cart, setCart] = useState([]);
  const [items, setitems] = useState([]);
  const [refresh, setRefresh] = useReducer((x) => x + 1, 0);
   function Remove(event, key){
    
   
    axios
      .delete(
        `http://localhost:5000/cart/64332eb3dfcb091305c650e8/${key}`,
        {},
        {
          headers: { "Content-Type": "application/json",},
        }
      )

      .then((res) => {
       
        if (res.status === 201) {
          Refresh();
        }
      })
      .catch((err) => {
        console.log(err);
      });
   }
  function Refresh() {
    setRefresh();
    toast.success("Cart Updated successfully ", {
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

  function Decrement(event, key) {
    axios
      .patch(
        "http://localhost:5000/cart/64332eb3dfcb091305c650e8",
        { productId: key },
        {
          headers: { "Content-Type": "application/json" },
        }
      )

      .then((res) => {
        if (res.status === 201) {
          Refresh();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function Increment(event, key) {
  
    axios
      .post(
        "http://localhost:5000/cart/64332eb3dfcb091305c650e8",
        { productId: key },
        {
          headers: { "Content-Type": "application/json" },
        }
      )

      .then((res) => {
        if (res.status === 201) {
          Refresh();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {}, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/cart/64332eb3dfcb091305c650e8", {
        headers: {},
      })

      .then((res) => {
        setCart(res.data);
        setitems(res.data.items);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refresh]);

  return (
    <div
      id="component-parent"
      className="md:mb-[10%] w-[100%]  flex flex-col md:w-[80%]  md:ml-[10%] md:mr-[10%]  xl:ml-[3.5%] xl:mt-[2%] xl:mr-[3.5%]"
    >
      <h1 id="component-title" className="mb-3 text-xl font-bold ml-[3%]">
        Cart
      </h1>
      <div id="cart-parent" className=" bg-[#F6F5F3]  h-[46rem] shadow-xl rounded-md">
        <div className="flex flex-col">
          <div
            id="item-container"
            className="ml-[5%] mr-[5%]  h-[65vh] overflow-y-auto"
          >
            {items.map((items) => (
              <div
                id="item-parent"
                key={items.item_id._id}
                className="flex flex-row w-[100%]  border-b-2  pb-[2%] pt-[2%]  "
              >
                <img
                  src={items.item_id.image.url}
                  alt="item "
                  className="w-[5vw] h-[12vh] ml-[5%] md:w-[75px] md:h-[8vh]"
                />
                
                <div className="flex flex-col space-y-2 xl:ml-[10%] md:ml-[4%] self-center xl:font-[5px] ">
                  <h2 className="font-bold m-0 p-0   md:text-[10px] xl:text-[90%]">
                    {items.item_id.name}
                  </h2>
                  <p className="text-[gray] md:text-[10px] xl:text-[75%]">
                    {items.item_id.weight}ML
                  </p>
                  <p className="font-light text-[75%] md:text-[10px]  ">
                    Unit Price: {items.unit}$
                  </p>
                </div>

                <div className="flex flex-row h-10  rounded-lg  bg-transparent mt-1 w-[15%] self-center xl:ml-[15%]  md:h-[1.5rem] md:items-center md:ml-[3%] ">
                  <button
                    onClick={(event) => Decrement(event, items.item_id._id)}
                    className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none md:flex md:items-center"
                  >
                    <span className="m-auto text-2xl font-large text-black md:text-[15px]">
                      -
                    </span>
                  </button>
                  <input
                    type="text"
                    className=" focus:outline-none text-center w-full bg-gray-300 font-semibold xl:text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none md:text-[15px]"
                    name="custom-input-number"
                    value={items.qty}
                    disabled
                  ></input>
                  <button
                    onClick={(event) => Increment(event, items.item_id._id)}
                    className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer flex items-center"
                  >
                    <span className=" m-auto text-2xl font-large text-black md:text-[15px]  ">
                      +
                    </span>
                  </button>
                </div>
                <button
                  onClick={(event) => Remove(event, items.item_id._id)}
                  className=" ml-[10%]  justify-self-end"
                >
                  <span className="font-bold text-xl">x</span>
                </button>
              </div>
            ))}
          </div>
          <div className="ml-[5%] mr-[5%] self-end w-[90%] h-[9vh] flex flex-col border-t-2 border-black ">
            <div className="flex flex-row xl:space-x-[74%] mt-[1%] md:space-x-[45%] md:mb-[5%] ">
              <div className="ml-[3%]">
                <span className=" font-bold">Total</span>
                <span className="text-[gray]">(USD):</span>
              </div>
              <div className=" md:text-sm  font-semibold">{cart.total} $</div>
            </div>
            <div className="flex flex-row   mt-[1%] gap-10 justify-center">
              <NavLink
                to="/shop"
                className=" md:text-sm md:w-[12rem] bg-[black] w-[15vw] h-[5vh] text-white text-xl  flex items-center justify-center hover:bg-white  hover:text-black  hover:border-2 hover:border-black  rounded-md md:text-center md:text-[10px] xl:text-center xl:text-[95%]"
              >
                
                Continue shopping
              </NavLink>
              <button className=" xl:text-center xl:text-[95%] md:text-sm md:w-[12rem] bg-[#FFA500] w-[15vw] h-[5vh] text-white text-xl text-semibold hover:bg-white hover:text-[black] hover:border-2 hover:border-[#FFA500] rounded-md">
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default Carts;
