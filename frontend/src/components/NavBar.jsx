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
import { Avatar, Card, CardActions, CardContent, CardMedia, Dialog, DialogActions, DialogTitle, Menu } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import axios from "axios";

export default function NavBar() {
  const {isAuthenticated , logout  , user} = useAuthStore();
  const [open, setOpen] = useState(false)
  const [openDarwer, setOpenDarwer] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openReq, setOpenReq] = useState(false);
  const openA = Boolean(anchorEl);
  const [reqAgents, setReqAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [urReq, setUrReq] = useState([]);
  const [confirma, setConfirma] = useState();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseA = () => {
    setAnchorEl(null);
  };
  const handleCloseReq = () => {
    setOpenReq(false);
  };
  const handleOpenReq = () => {
    setOpenReq(true);
  };
  const handleClickFalse = (id) => {
    setConfirma(false);
    handleConfirm(id, false)
  };
  const handleClickTrue = (id) => {
    setConfirma(true);
    handleConfirm(id , true)
  };

  const handleConfirm = async (id , confirm) => {
    console.log('before',confirm)
    await axios.put(`/api/reqAgent/${id}` , { confirm } )
    console.log('after',confirm)
    confirm ? toast.success('تم قبول الطلب بنجاح') : toast.success('تم رفض الطلب بنجاح');
    setOpenReq(false)
  };

  console.log(confirma)



  useEffect(() => {
    // دالة لجلب بيانات reqAgents عند تحميل المكون
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/reqAgent"); // استدعاء GET API
        setReqAgents(response.data.data); // تخزين البيانات المسترجعة في الحالة
        setLoading(false); // تغيير حالة التحميل
      } catch (err) {
        setError("Error fetching data."); // في حالة حدوث خطأ
        setLoading(false); // تغيير حالة التحميل
        console.error(err);
      }
    };

    fetchData(); // استدعاء الدالة عند تحميل المكون
  }, []); 


  useEffect(() => {
    // دالة لجلب بيانات reqAgents عند تحميل المكون
    const filterReqs = async () => {
    if(!user){return}
      if(reqAgents){
        const userReq = reqAgents.filter(req => req.userId == user._id);
        setUrReq(userReq);
      }
    };

    filterReqs(); // استدعاء الدالة عند تحميل المكون
  }, [reqAgents , user]); 
  
  console.log("Filter" , urReq)
  console.log("nn" , reqAgents)


  
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
            <Button variant="text" sx={{color:'black'}} onClick={() => {navigate('/agents')}}>الشركات العقارية</Button>
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
            {urReq.length > 0 &&
              <MenuItem onClick={handleOpenReq} >
              الطلبات
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
      <Dialog open={openReq} onClose={handleCloseReq} sx={{direction:'rtl'}}>
      <DialogTitle id="alert-dialog-title">
          طلبات الانضمام الى الشركات العقارية
        </DialogTitle>
          {
            urReq && urReq.map((req)=>(
              <Card key={req._id} sx={{ display: 'flex' ,marginTop:'10px' , marginBottom:'10px', justifyContent:'space-between' }}>
                      <CardMedia
                       component="img"
                       sx={{ width: 70 }}
                       image={req.agent_Id.avatar}
                       alt={req.agent_Id.name}
                     />
                     <Box sx={{ display: 'flex', flexDirection: 'column' }}>

                       <CardContent sx={{ flex: '1 0 auto' }}>
                         <Typography component="div" variant="h5">
                         {req.agent_Id.name}
                         </Typography>

                       </CardContent>
                     </Box>
                     <CardActions>
                      <Button variant="text" color="primary" onClick={() => handleClickTrue(req._id)}>
                        قبول
                      </Button>
                      <Button variant="text" color="error" onClick={() => handleClickFalse(req._id)} >
                        رفض
                      </Button>
                     </CardActions>
                  <Divider sx={{marginTop:'20px' , marginBottom:'20px'}} />
                   </Card>
            ))
          }
        <DialogActions>
          <Button onClick={handleCloseReq} >اغلاق</Button>
        </DialogActions>
      </Dialog>
    </div>
    
  );
}
