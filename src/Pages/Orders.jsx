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

import axios from "axios";

import Box from "@mui/material/Box";
const styleBox = {};

const Orders = () => {
  const id = sessionStorage.getItem("user_id");
  const token = sessionStorage.getItem("token");
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(12);
  const [cart, setCart] = useState([]);
  
  const [pop, setPop] = useState(false);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  return (
    <>
    {pop&&(<div className="bg-[red] "> <div
    id="component-parent"
    className=" w-[40%] absolute h-[5rem]  left-[35%] top-[10%] "
  >
   
    <div id="cart-parent" className=" bg-[white]  h-[46rem]  rounded-md">
      <div className="flex flex-col">
        <div
          id="item-container"
          className="ml-[5%] mr-[5%]  h-[65vh] overflow-y-auto"
        >
      
        </div>
        <div className="ml-[5%] mr-[5%] self-end w-[90%] h-[9vh] flex flex-col border-t-2 border-black ">
          <div className="flex flex-row xl:space-x-[74%] mt-[1%] md:space-x-[45%] md:mb-[5%] ">
            <div className="ml-[3%]">
              <span className=" font-bold">Total</span>
              <span className="text-[gray]">(USD):</span>
            </div>
            <div className=" md:text-sm  font-semibold">{cart.total} $</div>
          </div>
      
        </div>
      </div>
    </div>
  
  </div>
  </div>)}
    <div className="flex flex-col xl:ml-[3%] xl:mr-[3%] md:ml-[2%] md:mr-[2%]  ">
    <button onClick={()=>setPop(true)}>click here</button>
      <h2 className="mb-[3%] mt-[2%] ml-[2%] xl:text-2xl">Orders</h2>
      <Box sx={styleBox}>
        <Paper variant="outlined"></Paper>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ pl: 3}}>Order-ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user, index) => (
                  <TableRow key={index}>
                    <TableCell >{user._id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.createdAt}</TableCell>
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
   
      </>
  );
};

export default Orders;
