import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import { Button, Link, Paper } from "@mui/material";
import useStyles from "../../styles";
import { TextField } from "@mui/material";
import { Stack } from "@mui/material";
import Axios from "axios";

const drawerWidth = 200;

export default function AddCustomer() {
  const classes = useStyles();
  const [customerName, setCustomerName] = useState("");
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState([]);

  const addCustomer = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:5000/insertCustomer", {
      customerName,
      customerPhoneNumber,
    }).then((response) => {
      if(response.data!="result"){
        setErrorMessage(response.data);
        console.log(response.data);
      }
      else setErrorMessage("Customer added!");
    });
  };

  const reset = (e) => {
    e.preventDefault();
    setCustomerPhoneNumber("");
    setCustomerName("");
    setErrorMessage("");
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
          <Typography variant="h5" marginLeft={1} marginTop = {2} marginBottom={2} textAlign="initial">
            Add a Customer
          </Typography>

          <TextField
            className={classes.formcomps}
            id="custName"
            value={customerName}
            label="Customer Name"
            variant="outlined"
            margin="dense"
            fullWidth
            onChange={(e) => {
              setCustomerName(e.target.value);
            }}
          />

          <TextField
            id="custNum"
            className={classes.formcomps}
            value={customerPhoneNumber}
            label="Customer Phone Number"
            variant="outlined"
            fullWidth
            margin="dense"
            onChange={(e) => {
              setCustomerPhoneNumber(e.target.value);
            }}
          />
          <Stack className={classes.buttonstack} direction="row" spacing={2}>
            <Button variant="contained" onClick={addCustomer}>
              Add
            </Button>
            <Button variant="contained" onClick={reset}>
              Reset
            </Button>
            {/* <Typography color={"red"}>
              {errorMessage}
            </Typography> */}
          </Stack>
        </Paper>
     
  );
}
