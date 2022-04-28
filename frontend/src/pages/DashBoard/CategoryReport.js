import React, { useState, useEffect, useRef} from "react";
import Button from "@mui/material/Button";
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
import { Autocomplete } from "@mui/material";
import { TextField } from "@mui/material";
 
const drawerWidth = 200;
 
export default function CategoryReport() {
  const classes = useStyles();
 
  const [categories, setCategories] = useState(["abc"]);
  const [category, setCategory] = useState(" ");
  const [categoryName, setCategoryName] = useState(" ");
 
  const [NoOutput, setNoOutput]=useState(false);

  function handleCategoryChange(event, value) {
    console.log(value);
    if(!value){
      getCategories();
    }
    else{
      setCategory(value);
      console.log(category);
    }
  }

  const firstUpdate = useRef(true);


  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    Axios.get(`http://localhost:5000/getCategoryByName/${category.categoryName}`)
  .then((response) => {
    console.log(response.data);
    setCategories(response.data);
  })
  }, [category])

  useEffect(() => {
    getCategories();
}, []);

const getCategories = () => {
  Axios.get("http://localhost:5000/getCategory")
  .then((response) => {
    console.log(response.data);
    setCategories(response.data);
    //setNoOutput(false);
  })
};

    function deleteCategory(Name){
      Axios.delete("http://localhost:5000/deleteCategory/"+Name)
      .then((response)=>{
        console.log(Name);
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
      {/* <div style={{display:"flex",alignItems:"center"}} >
<TextField
className={classes.formcomps}
id="compName"
value={categoryName}
label="Category"
variant="outlined"
margin="dense"
sx={{margin:"10px"}}
onChange={(e) => {
    setCategoryName(e.target.value);
}}
/>
<Button onClick={handleSearch}>
Search
</Button>
</div> */}
<Autocomplete
        fullWidth
        value={category}
        id="combo-box-demo"
        options={categories}
        getOptionLabel={(category) => category.categoryName || "" }
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Select Company" />}
        onChange={handleCategoryChange}
      />
      <Typography
        variant="h5"
        marginLeft={1}
        marginTop={2}
        marginBottom={2}
        textAlign="initial"
      >
        Category Report
      </Typography>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Category Name</TableCell>
              <TableCell align="center">Description</TableCell>
              
              <TableCell align="center">Action</TableCell>
            </TableRow>
            {categories.map((category) => (
              <TableRow
                key={category.categoryID}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{category.categoryName}</TableCell>
                <TableCell align="center">
                  {category.categoryDescription}
                </TableCell>
                <TableCell align="center">
                  <Button id={category.categoryDescription} onClick={() => {deleteCategory(category.categoryName)}}>
                    Delete
                  </Button>
                  <Button id={category.categoryID} href={`/UpdateCategory/${category.categoryName}`}>
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            
          </TableBody>
        </Table>
      </TableContainer>
      {/* {NoOutput && <Typography align="center" sx={{color:"red", display:`${NoOutput}`}} variant="h6">No Such Category Exists, try a different Category Name</Typography>} */}
    </Paper>
  );
}