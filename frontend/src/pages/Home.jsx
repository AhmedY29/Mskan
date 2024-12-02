import * as React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import "../style.css";
import Typography from "@mui/material/Typography";
import CityCard from "../components/CityCard";
import Hero from "../components/Hero";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import EditUser from "./EditUser";


// f5f5f5
export default function Home() {
  const location = useLocation(); // للحصول على الكويري
  const opena = location.state || false;
  const [open, setOpen] = useState(opena);
  const [openEdit, setOpenEdit] = useState(false);

  const [query, setQuery] = useState({
    type: "الكل",
    location: "",
    minPrice: "",
    maxPrice: "",
    rooms: "",
    bathrooms: "",
    minArea: "",
    maxArea: "",
  });

  const navigate = useNavigate();
  
  function handleSearch() {
    navigate("/properties", { state: query }); // نقل الكويري إلى صفحة Properties
  }


  console.log("Open" , open)
  console.log("url opn" , opena)

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpenEdit = () => {
    setOpenEdit(true);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };
  return (
    <>
      <div style={{direction:'rtl'}}>
      <Hero/>
      {/* Section 2 Cities */}
      <Container fixed>
        <Typography variant="h6" component="h3" gutterBottom>
          الـمدن
        </Typography>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Grid size={{ xs: 2, sm: 4, md: 4 }}>
          <Link style={{textDecoration:'none' , color:'black'}} to={'/properties'} state={query} onMouseOver={() =>{setQuery({...query , location:'مكة المكرمة'})}}>
            <CityCard title={'مكة المكرمة'}  image={'https://images.unsplash.com/photo-1704104501127-56e411873d93?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'} />
          </Link>
          </Grid>
          <Grid size={{ xs: 2, sm: 4, md: 4 }}>
          <Link style={{textDecoration:'none' , color:'black'}} to={'/properties'} state={query} onMouseOver={() =>{setQuery({...query , location:'جدة'})}}>
            <CityCard title={'جدة'}  image={'https://plus.unsplash.com/premium_photo-1720520077739-962bc219cb91?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'} />
          </Link>
          </Grid>
          <Grid size={{ xs: 2, sm: 4, md: 4 }}>
          <Link style={{textDecoration:'none' , color:'black'}} to={'/properties'} state={query} onMouseOver={() =>{setQuery({...query , location:'الرياض'})}}>
            <CityCard title={'الرياض'} image={'https://images.unsplash.com/photo-1669529250752-9f5b54b30491?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'} />
          </Link>
          </Grid>
          <Grid size={{ xs: 2, sm: 4, md: 4 }}>
          <Link style={{textDecoration:'none' , color:'black'}} to={'/properties'} state={query} onMouseOver={() =>{setQuery({...query , location:'بريدة'})}}>
            <CityCard title={'بريدة'}  image={'https://i.pinimg.com/736x/b4/60/73/b46073d38525e12d8d67e70eb37939d5.jpg'} />
          </Link>
          </Grid>
          <Grid size={{ xs: 2, sm: 4, md: 4 }}>
          <Link style={{textDecoration:'none' , color:'black'}} to={'/properties'} state={query} onMouseOver={() =>{setQuery({...query , location:'الخبر'})}}>
            <CityCard title={'الخبر'}  image={'https://images.pexels.com/photos/28748837/pexels-photo-28748837/free-photo-of-al-khobar-airshow-with-water-tower-and-jets.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'} />
          </Link>
          </Grid>
          <Grid size={{ xs: 2, sm: 4, md: 4 }}>
            <Link style={{textDecoration:'none' , color:'black'}} to={'/properties'} state={query} onMouseOver={() =>{setQuery({...query , location:'المدينة المنورة'})}}>
            <CityCard title={'المدينة المنورة'}  image={'https://images.pexels.com/photos/18360295/pexels-photo-18360295/free-photo-of-prophets-mosque-in-medina.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'} />
            </Link>
          </Grid>
        </Grid>
      </Container>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          استكمل بيانات حسابك
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            استكمل بيانات حسابك عبر الضغط على استكمل 
            يمكنك التخطي ومن ثم استكمال البيانات لاحقًا عبر صفحة حسابك الشخصي
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>لاحقًا</Button>
          <Button onClick={handleClose} autoFocus>
            استكمال
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          استكمل بيانات حسابك
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            استكمل بيانات حسابك عبر الضغط على استكمل 
            يمكنك التخطي ومن ثم استكمال البيانات لاحقًا عبر صفحة حسابك الشخصي
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>لاحقًا</Button>
          <Button onClick={() => {
            setOpenEdit(true);
            handleClose();
          }} autoFocus>
            استكمال
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openEdit}
        onClose={handleCloseEdit}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <EditUser close={handleCloseEdit}/>
      </Dialog>
      </div>
    </>
  );
}
