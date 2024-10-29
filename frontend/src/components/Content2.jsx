import * as React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import "../style.css";
import Typography from "@mui/material/Typography";
import CityCard from "./CityCard";
import Hero from "./Hero";


// f5f5f5
export default function Content2() {
  return (
    <>

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
            <CityCard title={'مكة المكرمة'} count={221} image={'https://images.unsplash.com/photo-1704104501127-56e411873d93?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'} />
          </Grid>
          <Grid size={{ xs: 2, sm: 4, md: 4 }}>
            <CityCard title={'جدة'} count={321} image={'https://plus.unsplash.com/premium_photo-1720520077739-962bc219cb91?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'} />
          </Grid>
          <Grid size={{ xs: 2, sm: 4, md: 4 }}>
            <CityCard title={'الرياض'} count={12} image={'https://images.unsplash.com/photo-1669529250752-9f5b54b30491?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'} />
          </Grid>
          <Grid size={{ xs: 2, sm: 4, md: 4 }}>
            <CityCard title={'بريدة'} count={242} image={'https://i.pinimg.com/736x/b4/60/73/b46073d38525e12d8d67e70eb37939d5.jpg'} />
          </Grid>
          <Grid size={{ xs: 2, sm: 4, md: 4 }}>
            <CityCard title={'الخبر'} count={111} image={'https://images.pexels.com/photos/28748837/pexels-photo-28748837/free-photo-of-al-khobar-airshow-with-water-tower-and-jets.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'} />
          </Grid>
          <Grid size={{ xs: 2, sm: 4, md: 4 }}>
            <CityCard title={'المدينة المنورة'} count={234} image={'https://images.pexels.com/photos/18360295/pexels-photo-18360295/free-photo-of-prophets-mosque-in-medina.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
