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
import { Autocomplete } from "@mui/material";
 
export default function AddMedicine() {
  const classes = useStyles();
  const [desc, setDesc] = useState("");
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [category, setCategory] = useState("");
  const [companies, setCompanies] = useState([]);
  const [categories, setCategories] = useState([]);
  //categories.map((x) => console.log(x.categoryName));
  const [categoryNames, setCategoryNames] = useState([]);
  function handleCategoryChange(event, value) {
    setCategory(value);
  }
  function handleCompanyChange(event, value) {
    setCompany(value);
  }
  categories.map((x)=>console.log(x.categoryName));
  const addmedicine = (e) => {
    e.preventDefault();
    if(title=="" || desc=="") alert("All the fields have to be filled") 
    else{ 
      console.log(company.companyName);
    Axios.post("http://localhost:5000/addMedicine", {
      medicineName:title, 
      medicineDescription:desc,
      companyName:company.companyName,
      categoryName:category.categoryName}).then((response) => {
      console.log(response.data);
    }).catch((err)=>console.log(err));}
  };
  
  useEffect(()=>{
    Axios.get("http://localhost:5000/getCategory").then((resp)=>{
      
      setCategories(resp.data);
      categories.map((x)=>console.log(x.categoryName));
    })
    Axios.get("http://localhost:5000/getCompany").then((resp)=>{
      
      setCompanies(resp.data);
      companies.map((x)=>console.log(x.companyName));
    })
  },[])
 
  const reset = (e) => {
    e.preventDefault();
    setTitle("");
    setCompany("");
    setDesc("");
    setCategory("");
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
        Add a Medicine
      </Typography>

      <Autocomplete
        fullWidth
        value={category}
        id="combo-box-demo"
        options={categories}
        getOptionLabel={(category) => category.categoryName || "" }
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Select Category" />}
        onChange={handleCategoryChange}
      />
      <FormControl sx={{ m: 0, minWidth: "100%" }}>
        
      <Autocomplete
        fullWidth
        value={company}
        id="combo-box-demo"
        options={companies}
        getOptionLabel={(company) => company.companyName || "" }
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Select Company" />}
        onChange={handleCompanyChange}
      /></FormControl>
 
      <TextField
        id="title"
        value={title}
        label="Product Title"
        className={classes.formcomps}
        fullWidth
        margin="dense"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
 
      <TextField
        id="desc"
        value={desc}
        label="Description"
        className={classes.formcomps}
        fullWidth
        margin="dense"
        onChange={(e) => {
          setDesc(e.target.value);
        }}
      />
 
      <Stack className={classes.buttonstack} direction="row" spacing={2}>
        <Button variant="contained" onClick={addmedicine}>
          Add
        </Button>
        <Button variant="contained" onClick={reset}>
          Reset
        </Button>
      </Stack>
    </Paper>
  );
}