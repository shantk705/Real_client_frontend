import React from "react";
import honey from "../Assets/honey.png";

const Carts = () => {
  return (
    <div
      id="component-parent"
      className="w-[60rem]   xl:ml-12 xl:mr-12 xl:mt-12 flex flex-col md:w-[80%]  md:ml-[10%] md:mr-[10%] md:mb-[3%]"
    >
      <h1 id="component-title" className="mb-5 text-xl font-bold">
        Cart
      </h1>
      <div id="cart-parent" className=" bg-white  h-[46rem] shadow-xl">
        <div id="item-container" className="ml-[5%] mr-[5%] mt-[5%]">
          <div id="item-parent" className="flex flex-row w-[100%]  border-b-2  pb-[2%]">
            <img src={honey} className="w-[100px] h-[120px] ml-[5%]" />
            <div
              id="item-description"
              className="flex flex-col space-y-2 ml-[10%] self-center "
            >
              <h2 className="font-bold">Dayaa Honey</h2>
              <p className="text-[gray]">600 ML</p>
              <p className="font-light text-lg">Unit Price:  16.2$</p>
            </div>

            <div class="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1 w-[15%] self-center ml-[30%] ">
              <button
                data-action="decrement"
                class=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
              >
                <span class="m-auto text-2xl font-large text-black">-</span>
              </button>
              <input
                type="text"
                class=" focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none"
                name="custom-input-number"
                value="5"
                disabled
              ></input>
              <button
                data-action="increment"
                class="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
              >
                <span class="m-auto text-2xl font-large text-black ">+</span>
              </button>
            </div>
          </div>
        </div>
        <div id="item-container" className="ml-[5%] mr-[5%] mt-[5%]">
          <div id="item-parent" className="flex flex-row w-[100%]  border-b-2  pb-[2%]">
            <img src={honey} className="w-[100px] h-[120px] ml-[5%]" />
            <div
              id="item-description"
              className="flex flex-col space-y-2 ml-[10%] self-center "
            >
              <h2 className="font-bold">Dayaa Honey</h2>
              <p className="text-[gray]">600 ML</p>
              <p className="font-light text-lg">Unit Price:  16.2$</p>
            </div>

            <div class="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1 w-[15%] self-center ml-[30%] ">
              <button
                data-action="decrement"
                class=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
              >
                <span class="m-auto text-2xl font-large text-black">-</span>
              </button>
              <input
                type="text"
                class=" focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none"
                name="custom-input-number"
                value="5"
                disabled
              ></input>
              <button
                data-action="increment"
                class="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
              >
                <span class="m-auto text-2xl font-large text-black ">+</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carts;
