import React, { useEffect, useState, useRef } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import { Button, Link, Paper } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import useStyles from "../../styles";
import { TextField } from "@mui/material";
import { Stack } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


import Axios from "axios";

const drawerWidth = 200;

export default function StartSell() {
  const classes = useStyles();
  const[isValid,setisValid]=useState(true)
  const [custID, setCustID] = useState("");
  const [custName, setCustName] = useState("");
  const [custNumber, setCustNumber] = useState("");
  const [customers, setCustomers] = useState([]);
  const [medicineName,setMedicineName]=useState("");
  const [stocks, setStocks] = useState([]);
  const [qnty, setQnty] = useState("");
  const [quantities,setQuantities]=useState([]);
  const [totCost, setTotCost] = useState(0);
  const [CartItems,setCart]=useState([]);
  const [orderID, setOrderID] = useState(0);
  const [disc, setDisc] = useState(1);
  
  const [custdone, setcustdone] = useState(false);
  const [stockQuantity, setStockQuantity] = useState(0);
  const [qt, setQt]=useState(0);
  const [discShow, setDiscShow] = useState('');

  const [stckid, setstckid] = useState(0);
  const [q, setq] = useState(0);

  useEffect(()=>console.log("hello"),[isValid])
  const continueButton=()=>{
    if (custName=="" || custNumber=="") alert("Customer Name and Phone Number cannot be empty");
    else if(custNumber.length!=10) alert("Invalid Phone Number")
    else setisValid(true)
  }

  const reset = (e) => {
    e.preventDefault();
    setCustNumber("");
    setCustName("");
    setCustID("");
    //setQnty("");
    isValid=false;
  };

  const Search = (e) => {
    e.preventDefault();
    if (custName=="" && custNumber=="") alert("Customer Name and Phone Number cannot be empty");
    else if(custNumber===""){
      Axios.get(`http://localhost:5000/getCustomerByName/${custName}`)
      .then((response => {
        console.log(response.data);
        setCustomers(response.data);
      }))
    }
    else{
        Axios.get(`http://localhost:5000/getCustomerByNumber/${custNumber}`)
      .then((response => {
        console.log(response.data);
        setCustomers(response.data);
      }))
      }
  }

  const SearchStock = (e) => {
    
    e.preventDefault();
    Axios.get(`http://localhost:5000/getStockByName/${medicineName}`)
    .then((response) => {
      console.log(response.data);
      setStocks(response.data);
    })
  }

  const placeOrder = (e) => {
    e.preventDefault();
    let date = new Date().toISOString().slice(0, 10);
    console.log(date, totCost);
    Axios.post(`http://localhost:5000/insertOrder`, {
      orderDate:date,
      customerID:custID,
      totalcost:totCost
    }).then((response) => {
      console.log(response.data.insertId);
      setOrderID(response.data.insertId);
      console.log(orderID);
      editStock();
    })
    
  }

  const editStock = () => {
    CartItems.map((item) => {
      Axios.put(`http://localhost:5000/editStockWithQuantity/${item.StockID}`, {
        quantity:item.StockQuantity
      }).then((response) => {
        console.log(response.data);
        
      })
      setstckid(item.StockID);
      setq(item.Qnty);
      console.log(item, q);
      firstUpdate.current = false;
    })
    //getupdatevisits();
  }

  const firstUpdate = useRef(true);

  useEffect(() => {
    if (firstUpdate.current) {
      return;
    }
    Axios.post(`http://localhost:5000/insertdetorder`, {
        orderID:orderID,
        stockID:stckid,
        quantity:q
      })
  }, [stckid])

  // const getupdatevisits = () => {
    
  // }

  useEffect(() => {
    if (firstUpdate.current) {
      //firstUpdate.current = false;
      return;
    }
    Axios.put(`http://localhost:5000/editVisits/${custID}`).then((response) => {
      console.log(response.data);
      alert("Order placed!!!")
    })
  }, [orderID])

  const deleteFromCart=(e)=>{
    e.preventDefault();
    console.log(e.target.id);
    setCart(CartItems.filter((item)=>item.CartItemID!=e.target.id))
}

  return (
    
<>
        <Paper
          elevation={16}
          className={classes.paper}
          style={{
            padding: 4,
            margin: 2,
          }}
        >
          <Typography variant="h5" marginLeft={1} marginTop = {2} marginBottom={2} textAlign="initial">
            Customer Details
          </Typography>
        <div style={{display:"flex",flexDirection:"row",alignItems:"stretch"}}>
        
          <TextField
            className={classes.formcomps}
            id="compName"
            value={custName}
            label="Customer Name"
            variant="outlined"
            margin="dense"
            
            sx={{margin:"10px",width:"350px"}}
            onChange={(e) => {
              setCustName(e.target.value);
            }}
          />

          <TextField
            id="compDesc"
            value={custNumber}
            label="Phone Number"
            className={classes.formcomps}
            sx={{margin:"10px",width:"350px"}}
            margin="dense"
            onChange={(e) => {
              setCustNumber(e.target.value);
            }}
          /></div>

  <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
            <TableCell>Customer ID</TableCell>
            <TableCell align="right">Customer Name</TableCell>
            <TableCell align="right">Phone Number</TableCell>
            <TableCell align="right">Number of visits</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customers.map((row) => (
            <TableRow
              key={row.customerID}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.customerID} 
              </TableCell>
              <TableCell align="right">{row.customerName}</TableCell>
              <TableCell align="right">{row.customerPhoneNumber}</TableCell>
              <TableCell align="right">{row.numberOfVisits}</TableCell>
              <TableCell align="right"><Button id={row.customerID} onClick={() => {
                setCustID(row.customerID);
                setCustName(row.customerName);
                setCustNumber(row.customerPhoneNumber);
                if(row.numberOfVisits!=0 && row.numberOfVisits%10==0){
                  setDisc(0.95);
                  setDiscShow(true);
                }
                else setDiscShow(false);
              }}>Select</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>

          <Stack className={classes.buttonstack} direction="row" spacing={2}>
            <Button variant="contained" onClick={Search}>
              Search
            </Button>
            <Button variant="contained" onClick={continueButton}>
              Continue
            </Button>
            <Button variant="contained" onClick={reset}>
              Reset
            </Button>
          </Stack>

          {custID && <Typography variant="h7" marginLeft={1} marginTop = {2} marginBottom={2} textAlign="initial">
            CustomerID: {custID}, 
            Name: {custName}, 
            Phone Number: {custNumber}
          </Typography>}

          {discShow && <Typography variant="h7" marginLeft={1} marginTop = {2} marginBottom={2} textAlign="initial">The customer is eligible for discount</Typography>}

        </Paper>
        <div style={{display:`${isValid?"compact":"none"}`}}>
        <Paper
          elevation={16}
          className={classes.paper}
          style={{
            padding: 8,
            margin: 2,
          }}
        >
            <Typography variant="h5" marginLeft={1} marginTop = {2} marginBottom={2} textAlign="initial">
            Medicine Details
          </Typography>

        <div >

        <TextField
        className={classes.formcomps}
        id="compName"
        value={medicineName}
        label="Medicine Name"
        variant="outlined"
        margin="dense"
        sx={{margin:"10px"}}
        onChange={(e) => {
            setMedicineName(e.target.value);
        }}
        />
        
        <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Stock ID</TableCell>
              <TableCell align="center">Medicine Name</TableCell>
              <TableCell align="center">Manufacture Date</TableCell>
              <TableCell align="center">Expiry Date</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="center">Cost per item</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
            {stocks.map((report) => (
              <TableRow
                key={report.stockID}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{report.stockID}</TableCell>
                <TableCell align="center">{report.medicineName}</TableCell>
                <TableCell align="center">{report.manufactureDate.slice(0, 10)}</TableCell>
                <TableCell align="center">{report.expiryDate.slice(0, 10)}</TableCell>
                <TableCell align="center">{report.quantity}</TableCell>
                <TableCell align="center">{report.costPerItem}</TableCell>
                <TableCell align="center">
                <TextField
                  id={`compDesc${report.stockID}`}
                  label="Quantity"
                  className={classes.formcomps}
                  sx={{margin:"5px"}}
                  margin="dense"
                  onChange={(e) => {
                      setQnty(e.target.value);

                  }}
                  />
                  <Button variant="contained" onClick={(e) => {
                    e.preventDefault();
                    if(custID=="") alert("Enter Customer details")
                    if(!qnty){
                      alert("Enter a valid quantity!");
                    }
                    else{
                      console.log(report.stockID, report.medicineName, qnty, report.costPerItem)
                      if(qnty>report.quantity)alert("Enter a valid quantity!");
                      else if(disc==0.95)  {
                        setTotCost(totCost+report.costPerItem*qnty*0.95);
                        setCart([...CartItems,{
                          CartItemID:Math.floor((Math.random() * 10000) + 1),
                            StockID:report.stockID,
                            MedicineID:report.medicineID,
                            MedicineName:report.medicineName,
                            Qnty:qnty,
                            StockQuantity:report.quantity-qnty,
                            CostPerItem: report.costPerItem,
                            TotalCost:report.costPerItem*qnty*0.95,
                            customerID:custID
                        }])
                      }
                      else {setTotCost(totCost+report.costPerItem*qnty);
                        setCart([...CartItems,{
                          CartItemID:Math.floor((Math.random() * 10000) + 1),
                            StockID:report.stockID,
                            MedicineID:report.medicineID,
                            MedicineName:report.medicineName,
                            Qnty:qnty,
                            StockQuantity:report.quantity-qnty,
                            CostPerItem: report.costPerItem,
                            TotalCost:report.costPerItem*qnty,
                            customerID:custID
                        }])
                    }
                      setQnty(0);
                    }
                  }}>
                    Add to cart
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            
          </TableBody>
        </Table>
      </TableContainer>

        
        </div>

          <Stack className={classes.buttonstack} direction="row" spacing={2}>
          <Button variant="contained" onClick={SearchStock}>
            Search
          </Button>
            <Button variant="contained" onClick={reset}>
              Reset
            </Button>
          </Stack>

        </Paper>

        <Paper
          elevation={16}
          style={{
            padding: 8,
            margin: 2,
          }}
        >
  <TableContainer>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Stock ID</TableCell>
            <TableCell align="right">Medicine Name</TableCell>
            <TableCell align="right">Quantity taken</TableCell>
            <TableCell align="right">Cost Per Item</TableCell>
            <TableCell align="right">Total Cost</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {CartItems.map((row) => (
            <TableRow
              key={row.StockID}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.StockID} 
              </TableCell>
              <TableCell align="right">{row.MedicineName}</TableCell>
              <TableCell align="right">{row.Qnty}</TableCell>
              <TableCell align="right">{row.CostPerItem}</TableCell>
              <TableCell align="right">{row.TotalCost}</TableCell>
              <TableCell align="right"><Button id={row.CartItemID} onClick={(e) => {
                setTotCost(totCost-row.TotalCost);
                deleteFromCart(e);
              }}>Delete</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>
          
            <Button variant="contained" onClick={placeOrder} >
              Place Order
            </Button>

            <Typography variant="h7" marginLeft={60} marginTop = {2} marginBottom={2} textAlign="initial">
            Total Cost: {totCost}
          </Typography>
          
      </Paper>
      </div></>
      
  );
}
