import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";



export default function NavBar() {
  const {isAuthenticated , logout} = useAuthStore();
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
            <Button  variant="outlined">اضافة اعلان</Button>
            </div>) : (<div>
            <Button sx={{ marginLeft:1}} variant="contained" onClick={()=> navigate('/auth')}>الدخول</Button>
            </div>
          )
        }
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
