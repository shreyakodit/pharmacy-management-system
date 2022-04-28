import { Typography } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import Axios from "axios";
import { withRouter, RouteComponentProps, useHistory } from "react-router-dom";
import { Box } from "@mui/system";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button } from "@mui/material";

function ShowOrder(props: UpdateProps) {
  const [orderID, setOrderID] = useState(props.match.params.id);
  const [customerID, setCustomerID] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [totalCost, setTotalCost] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [items, setItems] = useState([]);
  const [det, setdet] = useState(null);
   
  useEffect(() => {
    Axios.get(`http://localhost:5000/getdetorderById/${orderID}`).then((resp) => {
      console.log(resp.data);
      const body = resp.data[0];
      console.log(body);
      setOrderID(body.orderID);
      getCustomerID(body.orderID);
      setItems(resp.data);
      //setItems(resp.data);
      // setCustomerID(body.CustomerID);
      // setTotalCost(body.totalCost);
      // setOrderDate(body.orderDate);
      //console.log(customerID);
    });
  }, []);

  function getCustomerID(id){
    Axios.get(`http://localhost:5000/getOrderCustById/${id}`).then(
      (resp) => {
        console.log(resp.data);
        const body = resp.data[0];
        console.log(body);
        setdet(body);
        console.log(det);
        //getname(body.CustomerID);
      });
      //firstUpdate.current = false;
  }

  // const firstUpdate = useRef(true);

  // useEffect(() => {
  //   if (firstUpdate.current) {
  //     return;
  //   }
  //   Axios.get(`http://localhost:5000/getCustomerById/${customerID}`)
  //   .then((response) => {
  //     console.log(response.data);
  //     //setCustomerName(response.data.customerName);
  //   })
  // }, [customerID])


  return (
    <div>
      <Box pt={3}>
        <Typography variant="h4">Order Details: </Typography>
      </Box>
      <Box pt={3}>
        <Typography>Order ID : {orderID}</Typography>
        {det && <><Typography>Customer Name : {det.customerName}</Typography>
        <Typography>Total Cost : {det.totalCost}</Typography>
        <Typography>Order Date: {det.orderDate.slice(0,10)}</Typography></>}
      </Box>

      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Stock ID</TableCell>
              <TableCell align="center">Medicine Name</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="center">Cost Per Item</TableCell>
              <TableCell align="center">Total Amount</TableCell>
              </TableRow>
            {items.map((report) => (
              <TableRow
                key={report.stockID}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{report.stockID}</TableCell>
                <TableCell align="center">{report.medicineName}</TableCell>
                <TableCell align="center">{report.quantity}</TableCell>
                <TableCell align="center">{report.costPerItem}</TableCell>
                <TableCell align="center">{report.quantity*report.costPerItem}</TableCell>
              </TableRow>
            ))}

          </TableHead>
          <TableBody>
            
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

interface updateEmProps extends RouteComponentProps {
  myField: string;
}

export default withRouter(ShowOrder);
