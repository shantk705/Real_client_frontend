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

import { useState, useEffect } from "react";
import axios from "axios";

import Box from "@mui/material/Box";

import "react-toastify/dist/ReactToastify.css";

const styleBox = {};

function Users() {
  let token = sessionStorage.getItem("token");
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(12);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  useEffect(() => {
    let token = sessionStorage.getItem("token");
    axios
      .get("https://dayaa-backend.onrender.com/api/get", {
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
    <div className="flex flex-col xl:ml-[3%] xl:mr-[3%] md:ml-[2%] md:mr-[2%]  ">
      <h2 className="mb-[3%] mt-[2%] ml-[2%] xl:text-2xl">Users</h2>
      <Box sx={styleBox}>
        <Paper variant="outlined"></Paper>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ pl: 7 }}>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user,index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ pl: 3}}>{user._id}</TableCell>
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
  );
}

export default Users;
