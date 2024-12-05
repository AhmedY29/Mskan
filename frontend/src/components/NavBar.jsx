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

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import { useEffect } from "react";
import { Avatar, Menu } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';

export default function NavBar() {
  const {isAuthenticated , logout  , user} = useAuthStore();
  const [open, setOpen] = useState(false)
  const [openDarwer, setOpenDarwer] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const openA = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseA = () => {
    setAnchorEl(null);
  };

  
    useEffect(() => {
      const checkWindowSize = () => {
        if (window.innerWidth <= 748) {
          setMobile(true);
        } else {
          setMobile(false);
        }
      };
  
      // فحص الحجم عند التحميل
      checkWindowSize();
      window.addEventListener("resize", checkWindowSize);
  
      // تنظيف المستمع عند إزالة المكون
      return () => window.removeEventListener("resize", checkWindowSize);
    }, []);

  const handleClose = () => {
    setOpen(false);
  }
  const handleClickOpen = () => {
    if (!isAuthenticated || !user.isVerified) {
      toast.error('يجب ان تسجل الدخول او تفعل حسابك.');
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
            { mobile == false ?
              <>
            <Typography variant="p" component="a" >
            <Button variant="text" sx={{color:'black'}}>الشركات العقارية</Button>
            </Typography>
            <Typography variant="p" component="a" >
            <Button variant="text" sx={{color:'black'}}>المشاريع العقارية</Button>
              
            </Typography>
            {isAuthenticated ? (
              <div>
                <Button onClick={handleClick} variant="text" sx={{color:'black'}}><Avatar sx={{width:'30px', height:'30px' , marginLeft:'2px'}}  alt={user.name} src={user.avatar || ""}/>  مرحبا  {user.name}  </Button>
                <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={openA}
            onClose={handleCloseA}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={()=> {navigate(`/profile/${user.name}`); handleCloseA()}} >
            حسابي
            </MenuItem>

            {user.agent_Id &&
              <MenuItem onClick={()=> {navigate(`/profile/agent/${user.agent_Id?.name}`); handleCloseA()}} >
            الملف الشخصي للشركة
            </MenuItem>}

            <Divider/>
            <MenuItem onClick={() =>{handelLogout(); handleCloseA()}}> تسجيل خروج</MenuItem>
          </Menu>
                
            <Button onClick={handleClickOpen} variant="outlined">اضافة اعلان</Button>
            </div>) : (<div>
            <Button sx={{ marginLeft:1}} variant="contained" onClick={()=> navigate('/auth')}>الدخول</Button>
            </div>
          )
        }
        </> :''}
        {
          open &&( <AddProperty open={open} handleClose1={handleClose} />)
        }

        {
          mobile ?
           <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={() => setOpenDarwer(true)}
          sx={{ mr: 2 }}
        >
          <MenuIcon sx={{color:'black'}} />
        </IconButton> :''
        }
                  



    <Drawer open={openDarwer} onClose={()=>{setOpenDarwer(false)}}>
    <Box sx={{ width: 250 , direction:'rtl'}} role="presentation" onClick={()=>setOpenDarwer(false)}>
      {
        isAuthenticated ? '': 
         <List>
        <ListItem disablePadding>
          <ListItemButton onClick={()=> navigate('/auth')}>
          <ListItemText primary={'الدخول'} />
          </ListItemButton>
        </ListItem>
    </List>
      }
      
      <List>
        {['الصفحة الرئيسية'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() =>navigate('/')} >
            <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <List>
        {[ 'المشاريع العقارية', 'الشركات العقارية'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton >
            <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      {isAuthenticated ?
      <>
      <Divider />
      <List>
        {['اضافة اعلان','حسابي', 'تسجيل الخروج'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={text == 'تسجيل الخروج' ? () => {handelLogout()} : text == 'حسابي' ? ()=>{navigate(`/profile/${user.name}`)} : text == 'اضافة اعلان' ? () => {setOpen(true)} : ''} >
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
  
        ))}
      </List>
      </>
        :''}
    </Box>
      </Drawer>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
