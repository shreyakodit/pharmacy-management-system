import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import { Link, Paper } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import useStyles from "../../styles";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Axios from "axios";
import { Button } from "@mui/material";
import { withRouter, RouteComponentProps } from "react-router-dom";

const drawerWidth = 200;

function OrderReports(props: UpdateProps) {
  const classes = useStyles();
  const [reports, setReports] = useState([]);
  useEffect(() => {
    getOrder()
}, []);
const getOrder = () => {
  Axios.get("http://localhost:5000/getOrder")
  .then((response) => {
    console.log(response.data);
    setReports(response.data);
  })
};
function deleteOrder(id){
  Axios.delete("http://localhost:5000/deleteOrder/"+id)
  .then((response)=>{
    console.log(id);
    window.location.reload(false);
  })
};
  return (
    <Paper
      elevation={16}
      className={classes.paper}
      style={{
        padding: 8,
        margin: 2,
      }}
    >
      <Typography
        variant="h5"
        marginLeft={1}
        marginTop={2}
        marginBottom={2}
        textAlign="initial"
      >
        Order Report
      </Typography>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell align="left">Order Date</TableCell>
              {/* <TableCell align="left">Customer ID</TableCell>
              <TableCell align="left">Total Amount</TableCell> */}
              
              <TableCell align="left">Actions</TableCell>
            </TableRow>
            {reports.map((report) => (
              <TableRow
                key={report.reportID}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{report.orderID}</TableCell>
                <TableCell align="center">{report.orderDate.slice(0,10)}</TableCell>
                {/* <TableCell align="center">{report.customerID}</TableCell>
                <TableCell align="center">{report.totalCost}</TableCell> */}
                <TableCell align="center">
                  <Button id={report.orderID} onClick={() => {deleteOrder(report.orderID)}}>
                    Delete
                  </Button>
                  <Button id={report.orderID} href={`/getdetorderById/${report.orderID}`}>
                    Show
                  </Button>
                </TableCell>
              </TableRow>
            ))}

          </TableHead>
          <TableBody>
            
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

interface updateEmProps extends RouteComponentProps {
  myField: string;
}

export default withRouter(OrderReports);
