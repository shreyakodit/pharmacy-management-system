import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { Button, Link, Paper } from "@mui/material";
import useStyles from "../../styles";
import { TextField } from "@mui/material";
import { Stack } from "@mui/material";
import Axios from "axios";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { withRouter, RouteComponentProps } from "react-router-dom";

function UpdateStock(props: UpdateProps) {
  const [stockID, setStockID] = useState(props.match.params.id);

  const classes = useStyles();
  const [medicines, setMedicines] = useState([]);
  const [costPerItem, setCostPerItem] = useState('');
  const [quantity, setQuantity] = useState('');
  const [manufactureDate, setManufactureDate] = useState(null);
  const [expiryDate, setExpiryDate] = useState('');
  const [medicineID, setMedicineID] = useState('');
  const [medicineName, setMedicineName] = useState('');

  const addStock = (e) => {
    e.preventDefault();
    if (
      quantity == 0 ||
      manufactureDate == null ||
      expiryDate == null ||
      medicineID == 0
    )
      alert("All the fields have to be filled");
    else {
      Axios.put(`http://localhost:5000/editStock/${stockID}`, {
        costPerItem,
        quantity,
        manufactureDate:manufactureDate.toISOString().slice(0, 10),
        expiryDate:expiryDate.toISOString().slice(0, 10),
        medicineID: medicineID,
      })
        .then((response) => {
          //console.log(response.data);
        })
        .catch((err) => console.log(err));
    }
  };

  ///editMedicine/:id
  useEffect(() => {
    Axios.get("http://localhost:5000/getAllMedicine").then((resp) => {
      setMedicines(resp.data);
    });

    Axios.get(`http://localhost:5000/getStockById/${stockID}`).then((resp) => {
      const body = resp.data[0];
      console.log(body.medicineID);
      setMedicineID(body.medicineID);
      console.log(medicineID);
      setCostPerItem(body.costPerItem);
      setQuantity(body.quantity);
      setManufactureDate(body.manufactureDate);
      setExpiryDate(body.expiryDate);
    });

    Axios.get(`http://localhost:5000/getMedicine/${medicineID}`).then((resp)=>{
    let p =   resp.data[0].medicineName;
    console.log(p);
    setMedicineName(p);
    console.log(resp.data[0].medicineName);
    console.log(medicineName);
    });
   
  }, []);

  const reset = (e) => {
    e.preventDefault();
    setCostPerItem(0);
    setQuantity(0);
    setManufactureDate(null);
    setExpiryDate(null);
    setMedicineName(null);
    setMedicineID(null);
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
        Update Stock
      </Typography>

      <FormControl sx={{ m: 0, minWidth: "100%" }}>
        <InputLabel id="label">Select Medicine</InputLabel>
        <Select
          labelId="label"
          id="medicine"
          value={medicineName}
          fullWidth
          label="Select Medicine"
          onChange={(e) => {
            setMedicineName(e.target.value);
            // Axios.get(`http://localhost:5000/getMedicineByName/${medicineName}`)
            // .then((response) => {
            //   console.log(response.data);
            //   setMedicineID(response.data[0].medicineID);
            //   console.log(response.data[0].medicineID, medicineID);
            // })
          }}
        >
          {medicines.map((x) => {
            return (
              <MenuItem
                value={`${x.medicineName}`}
              >{`${x.medicineName}`}</MenuItem>
            );
          })}
        </Select>
      </FormControl>

      <TextField
        id="quantity"
        value={quantity}
        label="Quantity"
        className={classes.formcomps}
        fullWidth
        margin="dense"
        onChange={(e) => {
          setQuantity(e.target.value);
        }}
      />

      <TextField
        id="CostPerItem"
        value={costPerItem}
        label="CostPerItem"
        className={classes.formcomps}
        fullWidth
        margin="dense"
        onChange={(e) => {
          setCostPerItem(e.target.value);
        }}
      />

      {/* <TextField
        id="Mfd"
        value={manufactureDate}
        label="Manufacture Date"
        className={classes.formcomps}
        fullWidth
        margin="dense"
        onChange={(e) => {
          setManufactureDate(e.target.value);
        }}
      /> */}

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Manufacture Date"
          value={manufactureDate}
          format="YYYY-MM-DD"
          onChange={(e) => {
            setManufactureDate(e);
           
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          InputProps={{ className: classes.input }}
          label="Expiry date"
          value={expiryDate}
          format="YYYY-MM-DD"
          onChange={(e) => {
            setExpiryDate(e);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>

      {/* <TextField
        id="Expd"
        value={expiryDate}
        label="Expiry Date"
        className={classes.formcomps}
        fullWidth
        margin="dense"
        onChange={(e) => {
          setExpiryDate(e.target.value);
        }}
      /> */}

      <Stack className={classes.buttonstack} direction="row" spacing={2}>
        <Button variant="contained" onClick={addStock}>
          Update
        </Button>
        <Button variant="contained" onClick={reset}>
          Reset
        </Button>
      </Stack>
    </Paper>
  );
}

interface updateEmProps extends RouteComponentProps {
  myField: string;
}

export default withRouter(UpdateStock);
