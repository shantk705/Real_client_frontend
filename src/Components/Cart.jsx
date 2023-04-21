import React, { useEffect, useState, useReducer } from "react";
import honey from "../Assets/honey.png";
import axios from "axios";

const Carts = () => {
  const [cart, setCart] = useState([]);
  const [items, setitems] = useState([]);
  const [refresh, setRefresh] = useReducer((x) => x + 1, 0);
  function Refresh() {
    setRefresh();
  }

  function Decrement(event, key) {
    console.log("dec", key);
  }
  function Increment(event, key) {
    console.log(key);
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
      className="w-[60rem]   xl:ml-12 xl:mr-12 xl:mt-12 flex flex-col md:w-[80%]  md:ml-[10%] md:mr-[10%] md:mb-[3%]"
    >
      <h1 id="component-title" className="mb-5 text-xl font-bold">
        Cart
      </h1>
      <div id="cart-parent" className=" bg-white  h-[46rem] shadow-xl">
        <div id="item-container" className="ml-[5%] mr-[5%] ">
          {items.map((items) => (
            <div
              id="item-parent"
              key={items.item_id._id}
              className="flex flex-row w-[100%]  border-b-2  pb-[2%] pt-[2%] "
            >
              <img
                src={items.item_id.image.url}
                alt="item "
                className="w-[100px] h-[120px] ml-[5%]"
              />
              <div className="flex flex-col space-y-2 ml-[10%] self-center max-w-[10vw] ">
                <h2 className="font-bold m-0 p-0 max-w-[8vw] ">
                  {items.item_id.name}
                </h2>
                <p className="text-[gray]">{items.item_id.weight}ML</p>
                <p className="font-light text-lg">Unit Price: {items.unit}$</p>
              </div>

              <div className="flex flex-row h-10  rounded-lg  bg-transparent mt-1 w-[15%] self-center ml-[12rem]">
                <button
                  onClick={(event) => Decrement(event, items.item_id._id)}
                  className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
                >
                  <span className="m-auto text-2xl font-large text-black">
                    -
                  </span>
                </button>
                <input
                  type="text"
                  className=" focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none"
                  name="custom-input-number"
                  value={items.qty}
                  disabled
                ></input>
                <button
                  onClick={(event) => Increment(event, items.item_id._id)}
                  className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
                >
                  <span className="m-auto text-2xl font-large text-black ">
                    +
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carts;
