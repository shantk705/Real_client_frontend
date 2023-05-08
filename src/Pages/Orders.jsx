import { React, useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";
import Cart from "../Assets/cart.svg"

import axios from "axios";

import Box from "@mui/material/Box";
const styleBox = {};

const Orders = () => {

 
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(12);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState("");
 
  
  const [pop, setPop] = useState(false);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  function seeItems(event,props){
    setCart(data[props].items)
    setTotal(data[props].total)
    setPop(true)
   
  }
  function clear(){
    setPop(false)
     setCart([]) 
     setTotal("")
     
  }
  
 

  useEffect(() => {
    let token = sessionStorage.getItem("token");
    axios
      .get("https://dayaa-backend.onrender.com/order", {
        headers: { Authorization: `Bearer ${token}` },
      })

      .then((res) => {
      
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },[]);
  return (
    <>
    <div className="relative w-full h-[100vh]">
    {pop&&(<div className="absolute w-full h-full   flex align-center justify-center index-1"> <div
    id="component-parent"
    className=" w-[40%] absolute h-[5rem]  md:w-[65%]  "
  >
   
    <div id="cart-parent" className=" bg-[white]  h-[46rem]  rounded-md opacity-1 mt-[10%] duration-300">
      <div className="flex flex-col">
        <div
          id="item-container"
          className="ml-[5%] mr-[5%]  h-[65vh] overflow-y-auto"
        >
        {cart &&
          cart.map((items) => (
            <>
            {items.item_id != null ? 
            <div
              id="item-parent"
              key={items.item_id._id}
              className="flex flex-row w-[100%]  border-b-2  pb-[2%] pt-[2%]  "
            >

            {console.log("items ",items)}
              <img
                src={items.item_id.image.url}
                alt="item "
                className="w-[5vw] h-[12vh] ml-[5%] md:w-[75px] md:h-[8vh]"
              />

              <div className="flex flex-col space-y-2 xl:ml-[6%] md:ml-[4%] self-center xl:font-[5px] xl:w-[80%]  md:w-[30vw]">
                <h2 className="font-bold m-0 p-0   md:text-[10px] xl:text-[90%]">
                  {items.item_id.name}
                </h2>
                <p className="text-[gray] md:text-[10px] xl:text-[75%]">
                  {items.item_id.weight}ML
                </p>
                <p className="font-light text-[75%] md:text-[10px]   ">
                  Unit Price: {items.unit}$
                </p>
              </div>

              <div className="flex flex-row h-10  rounded-lg  bg-transparent mt-1 w-[15%] self-center xl:ml-[15%]  md:h-[1.5rem] md:items-center md:ml-[3%] ">
            
                <input
                  type="text"
                  className=" md:h-[24px] focus:outline-none text-center w-full bg-gray-300 font-semibold xl:text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none md:text-[15px]"
                  name="custom-input-number"
                  value={items.qty}
                  disabled
                ></input>
            
              </div>
           
            </div> : ""}
            </>
          ))}
      
        </div>
        <div className="ml-[5%] mr-[5%] self-end w-[90%] h-[9vh] flex flex-col border-t-2 border-black ">
          <div className="flex flex-row xl:space-x-[74%] mt-[1%] md:space-x-[45%] md:mb-[5%] ">
            <div className="ml-[3%]">
              <span className=" font-bold">Total</span>
              <span className="text-[gray]">(USD):</span>
            </div>
            <div className=" md:text-sm  font-semibold">{total} $</div>
          </div>
      
        </div>
        <button className=" hover:cursor-pointer text-white text-xl hover:bg-[white] hover:border-black hover:text-[gray] hover:border-2 bg-[gray] -mt-[5%] ml-[10%] mr-[10%] h-[2.5rem] rounded-md"  onClick={clear}>Close</button>
      </div>
    </div>
  
  </div>
  </div>)}
    <div className="flex flex-col xl:ml-[3%] xl:mr-[3%] md:ml-[2%] md:mr-[2%]  h-full ">
   
      <h2 className="mb-[3%] mt-[2%] ml-[2%] xl:text-2xl">Orders</h2>
      <Box sx={styleBox}>
        <Paper variant="outlined"></Paper>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ pl: 3}}>Order-ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Total</TableCell>
              
                <TableCell>Date</TableCell>
                <TableCell>View Items</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((order, index) => (
                  <TableRow key={index}>
                    <TableCell >{order._id}</TableCell>
                    <TableCell>{order.user_id.name}</TableCell>
                    <TableCell>{order.user_id.email}</TableCell>
                    <TableCell>{order.total} $</TableCell>
                    <TableCell>{order.createdAt}</TableCell>
                    <TableCell><button onClick={(event)=>seeItems(event,index)}><img className="h-6 w-6" src={Cart} alt="Cart Logo"/></button></TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[3, 5, 12]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            sx={{ width: 1 }}
          />
        </TableContainer>
      </Box>
    </div>
    </div>
      </>
  );
};

export default Orders;
