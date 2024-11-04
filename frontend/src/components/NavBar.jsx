import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useState } from "react";
import AddProperty from "./AddProperty";
import toast from "react-hot-toast";



export default function NavBar() {
  const {isAuthenticated , logout  , user} = useAuthStore();
  const [open, setOpen] = useState(false)


  const handleClose = () => {
    setOpen(false);
  }
  const handleClickOpen = () => {
    if (!isAuthenticated && !user.isVerified) {
      toast.error('يجب ان تسجل الدخول او تفعل حسابك.')
      setOpen(false)
  }else{

    setOpen(true);
  }
  }
  const navigate = useNavigate();
  function handelLogout() {
    logout();
    navigate('/');
  }
  return (
    <div style={{direction:'rtl'}}>
      <AppBar position="static" sx={{backgroundColor:'white'}}>
        <Container fixed>
          <Toolbar>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 , color:'black',fontWeight:'bold'}}>
            <Link style={{textDecoration:'none', color:'black'}} to={'/'}>
              مسكن
            </Link>
            </Typography> 
            <Typography variant="p" component="a" >
            <Button variant="text" sx={{color:'black'}}>الشركات العقارية</Button>
            </Typography>
            <Typography variant="p" component="a" >
            <Button variant="text" sx={{color:'black'}}>المشاريع العقارية</Button>
              
            </Typography>
            {isAuthenticated ? (
              <div>
            <Button onClick={handelLogout} sx={{ marginLeft:1}} variant="contained">خروج</Button>
            <Button onClick={handleClickOpen} variant="outlined">اضافة اعلان</Button>
            </div>) : (<div>
            <Button sx={{ marginLeft:1}} variant="contained" onClick={()=> navigate('/auth')}>الدخول</Button>
            </div>
          )
        }
        {
          open &&( <AddProperty open={open} handleClose1={handleClose} />)
        }
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
