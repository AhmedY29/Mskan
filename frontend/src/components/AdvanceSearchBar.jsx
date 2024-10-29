import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { useState } from "react";
import FormControl from "@mui/material/FormControl";
import { Card, CardContent, Dialog, Divider, Typography } from "@mui/material";

const types = ["بيع", "إيجار"];

export default function AdvanceSearchBar(){
    const [query, setQuery] = useState({
        type: "بيع",
        location: "",
        sort: "newest",
        priceRange: { min: 0, max: 1000000 },
        rooms: 0,
        bathrooms: 0,
      });
      const [openPhoto, setOpenPhoto] = useState(false);
      
    function handleClick(id){
      setOpenPhoto(true);
  }
  function handleCloseOpen(){
      setOpenPhoto(false);
  }

      function switchType(value) {
        setQuery((prev) => ({ ...prev, type: value }));
      }
    return(
        <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {types.map((type) => (
          <Button
            key={type}
            variant="contained"
            sx={{
              height: "30px",
              boxShadow: "none !important",
              backgroundColor: query.type == type ? "" : "rgb(153 157 161)",
            }}
            onClick={() => switchType(type)}
          >
            {type}
          </Button>
        ))}
        <TextField
          sx={{
            textAlign: "right",
            direction: "rtl",
            marginRight: 2,
            fontSize: "16px",
            width: "30%",
          }}
          id="outlined-basic"
          label="أدخل الموقع"
          variant="outlined"
        />
        <FormControl sx={{ width:100}}>
          <InputLabel id="demo-simple-select-label">الغرف</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={6}>6</MenuItem>
            <MenuItem value={7}>7</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ width:100}}>
          <InputLabel id="demo-simple-select-label">السعر</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={6}>6</MenuItem>
            <MenuItem value={7}>7</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ width:130}}>
          <InputLabel id="demo-simple-select-label">ترتيب حسب</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={6}>6</MenuItem>
            <MenuItem value={7}>7</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ width:130}}>
          <Button sx={{padding:'15px'}} variant="outlined" onClick={handleClick}>بحث متقدم</Button>
        </FormControl>
        {/* Add your code here */}
        {/* ... */}
        {/* Add more cards for properties */}
        {/* ... */}
        <Dialog open={openPhoto} onClose={handleCloseOpen} maxWidth="md">
          <Card sx={{minWidth:275}}>
            <CardContent>
              <Typography>
                الغرف
              </Typography>
            <FormControl sx={{marginLeft:'5px', width:100}}>
          <InputLabel id="demo-simple-select-label">غرف</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={6}>6</MenuItem>
            <MenuItem value={7}>7</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ width:100}}>
          <InputLabel id="demo-simple-select-label">دورات مياة</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={6}>6</MenuItem>
            <MenuItem value={7}>7</MenuItem>
          </Select>
        </FormControl>
        <Divider sx={{marginBottom:'10px' , marginTop:'10px'}}/>
          <Typography>
            السعر
          </Typography>
          <TextField size="small" label="السعر الادنى"/>
          <TextField size="small" label="السعر الاعلي"/>
        <Divider sx={{marginBottom:'10px' , marginTop:'10px'}}/>
          <Typography>
            المساحة
          </Typography>
          <TextField size="small" label="المساحة الادنى"/>
          <TextField size="small" label="المساحة الاعلي"/>
            </CardContent>
          </Card>
        </Dialog>
      </div>
    )
}