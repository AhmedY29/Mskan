import { Box, Button, Dialog, DialogContent, DialogTitle, InputAdornment, Step, StepLabel, Stepper, TextField, Typography } from "@mui/material";
import * as React from 'react';
import { usePropertiesStore } from "../store/propertiesStore.js";
import toast from "react-hot-toast";
import User from "../../../backend/models/user.model.js";
import { useAuthStore } from "../store/authStore.js";
import Grid from "@mui/material/Grid2";

import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PriceCheckOutlinedIcon from '@mui/icons-material/PriceCheckOutlined';
import BathtubOutlinedIcon from '@mui/icons-material/BathtubOutlined';
import WeekendOutlinedIcon from '@mui/icons-material/WeekendOutlined';
import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined';
import WifiOutlinedIcon from '@mui/icons-material/WifiOutlined';

import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import SquareFootOutlinedIcon from '@mui/icons-material/SquareFootOutlined';
import HistoryEduOutlinedIcon from '@mui/icons-material/HistoryEduOutlined';
import LocalConvenienceStoreOutlinedIcon from '@mui/icons-material/LocalConvenienceStoreOutlined';



const steps = ['إضافة الرخص', 'إضافة المعلومات للعقار', 'إضافة الصور'];

export default function AddProperty({open , handleClose1} ){

    const handleClose = ()=> {
        handleClose1()
    }
    const {user} = useAuthStore()
    const [property, setProperty] = React.useState({
        title: '',
        description: '',
        images: [],
        adLicense: '',
        location: '',
        price: '',
        type: '',
        mainPhoto: '',
        rooms: '',
        bathrooms: '',
        livingrooms: '',
        garage: '',
        latitude: '',
        longitude: '',
        wifi: '',
        internet: false,
        size: '',
        floor: '',
        facade: '',
        a3dimage: '',
        nearbyServices: [],
        video: '',
        ageforbuild: '',
        // owner: user._id,

    })
    const {createProperty} = usePropertiesStore();

    async function handelAddProperty(){
        await createProperty(property)
        toast.success('تم اضافة العقار بنجاح')
        handleClose()
    }
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
  

  
    const isStepSkipped = (step) => {
      return skipped.has(step);
    };
  
    const handleNext = () => {
      let newSkipped = skipped;
      if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
      }
  
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
  

  
    return(
        <>
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="md"
        fullWidth={true}
        sx={{direction: 'ltr'}}
      >
        <DialogTitle id="alert-dialog-title" sx={{display:'flex', justifyContent:'center'}}>
          اضافة عقار جديد
        </DialogTitle>
        <DialogContent>
            
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            مراجعة المعلومات
          </Typography>
          <Typography sx={{ mt: 2, mb: 1 }}>
            الاسم : {property.title}
          </Typography>
          <Typography sx={{ mt: 2, mb: 1 }}>
            السعر : {property.price}
          </Typography>
          <Typography sx={{ mt: 2, mb: 1 }}>
            الوصف : {property.description}
          </Typography>
          <Typography sx={{ mt: 2, mb: 1 }}>
            النوع : {property.type}
          </Typography>
          <Typography sx={{ mt: 2, mb: 1 }}>
            النوع : {property.rooms}
          </Typography>
          <Typography sx={{ mt: 2, mb: 1 }}>
            النوع : {property.bathrooms}
          </Typography>
          <Typography sx={{ mt: 2, mb: 1 }}>
            النوع : {property.livingrooms}
          </Typography>
          <Typography sx={{ mt: 2, mb: 1 }}>
            النوع : {property.garage}
          </Typography>
          <Typography sx={{ mt: 2, mb: 1 }}>
            النوع : {property.location}
          </Typography>
          <Typography sx={{ mt: 2, mb: 1 }}>
            خط العرض : {property.latitude}
          </Typography>
          <Typography sx={{ mt: 2, mb: 1 }}>
            خط الطول : {property.longitude}
          </Typography>
          <Typography sx={{ mt: 2, mb: 1 }}>
            النوع : {property.wifi}
          </Typography>
          <Typography sx={{ mt: 2, mb: 1 }}>
            النوع : {property.size}
          </Typography>
          <Typography sx={{ mt: 2, mb: 1 }}>
            النوع : {property.internet}
          </Typography>
          <Typography sx={{ mt: 2, mb: 1 }}>
            النوع : {property.floor}
          </Typography>
          <Typography sx={{ mt: 2, mb: 1 }}>
            النوع : {property.facade}
          </Typography>
          <Typography sx={{ mt: 2, mb: 1 }}>
            النوع : {property.nearbyServices}
          </Typography>
          <Typography sx={{ mt: 2, mb: 1 }}>
            النوع : {property.ageforbuild}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handelAddProperty}>  إضافة العقار</Button>
          </Box>
        </React.Fragment>
      ) : activeStep === 0 ? (
        <React.Fragment>
        <form onSubmit={handleNext} style={{display:'flex' , alignItems:'center' , justifyContent:'center'}}>
          <Typography sx={{ mt: 2, mb: 1 }}>إضافة معلومات الرخصة</Typography>
          <TextField type="number" required value={property.adLicense} onChange={(e) => setProperty({...property , adLicense:e.target.value})} placeholder=" رخصة فال للإعلان" />
          </form>
          
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              الرجوع
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleNext}>
            التالي
            </Button>
          </Box>
        </React.Fragment>
      ): activeStep === 1 ?  <React.Fragment>
        <form style={{direction:'rtl'}}>
      <Typography sx={{ mt: 2, mb: 1 , textAlign:'center'}}>إضافة معلومات العقار</Typography>
      
          {/* المعلومات العامة */}
          <Typography variant="h6" sx={{ mt: 2 }}>المعلومات العامة</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField 
            value={property.title} 
            onChange={(e) => setProperty({ ...property, title: e.target.value })} 
            required 
            placeholder="الاسم" 
            fullWidth 
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <ApartmentOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField 
            value={property.description} 
            onChange={(e) => setProperty({ ...property, description: e.target.value })} 
            required 
            placeholder="الوصف" 
            fullWidth 
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <DescriptionOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField 
            value={property.type} 
            onChange={(e) => setProperty({ ...property, type: e.target.value })} 
            required 
            placeholder="النوع" 
            fullWidth 
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CategoryOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField 
            type="number" 
            value={property.price} 
            onChange={(e) => setProperty({ ...property, price: e.target.value })} 
            required 
            placeholder="السعر" 
            fullWidth 
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PriceCheckOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>

      {/* مساحة وعدد الغرف */}
      <Typography variant="h6" sx={{ mt: 2 }}>المساحة وعدد الغرف</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField 
            type="number" 
            value={property.rooms} 
            onChange={(e) => setProperty({ ...property, rooms: e.target.value })} 
            required 
            placeholder="عدد الغرف" 
            fullWidth 
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <WeekendOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField 
            type="number" 
            value={property.garage} 
            onChange={(e) => setProperty({ ...property, garage: e.target.value })} 
            required 
            placeholder="عدد الكراجات" 
            fullWidth 
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <WeekendOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField 
            type="number" 
            value={property.bathrooms} 
            onChange={(e) => setProperty({ ...property, bathrooms: e.target.value })} 
            required 
            placeholder="دورات المياه" 
            fullWidth 
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <BathtubOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField 
            type="number" 
            value={property.livingrooms} 
            onChange={(e) => setProperty({ ...property, livingrooms: e.target.value })} 
            required 
            placeholder="عدد الصالات" 
            fullWidth 
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <WeekendOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField 
            type="number" 
            value={property.size} 
            onChange={(e) => setProperty({ ...property, size: e.target.value })} 
            required 
            placeholder="المساحة (م²)" 
            fullWidth 
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SquareFootOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField 
            type="number" 
            value={property.ageforbuild} 
            onChange={(e) => setProperty({ ...property, ageforbuild: e.target.value })} 
            required 
            placeholder="عمر العقار (سنوات)" 
            fullWidth 
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <HistoryEduOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>

      {/* الإحداثيات والموقع */}
      <Typography variant="h6" sx={{ mt: 2 }}>الإحداثيات والموقع</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField 
            type="number" 
            value={property.latitude} 
            onChange={(e) => setProperty({ ...property, latitude: e.target.value })} 
            required 
            placeholder="خط العرض" 
            fullWidth 
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationOnOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField 
            type="number" 
            value={property.longitude} 
            onChange={(e) => setProperty({ ...property, longitude: e.target.value })} 
            required 
            placeholder="خط الطول" 
            fullWidth 
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationOnOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField 
            value={property.location} 
            onChange={(e) => setProperty({ ...property, location: e.target.value })} 
            required 
            placeholder="الموقع" 
            fullWidth 
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationOnOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>

      {/* خيارات إضافية */}
      <Typography variant="h6" sx={{ mt: 2 }}>خيارات إضافية</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField 
            value={property.wifi} 
            onChange={(e) => setProperty({ ...property, wifi: e.target.value })} 
            required 
            placeholder="تغطية الإنترنت" 
            fullWidth 
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <WifiOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField 
            value={property.internet} 
            onChange={(e) => setProperty({ ...property, internet: e.target.value })} 
            required 
            placeholder="يوجد إنترنت؟" 
            fullWidth 
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <WifiOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField 
            value={property.facade} 
            onChange={(e) => setProperty({ ...property, facade: e.target.value })} 
            required 
            placeholder="الواجهة" 
            fullWidth 
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <ApartmentOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField 
            value={property.nearbyServices} 
            onChange={(e) => setProperty({ ...property, nearbyServices: e.target.value })} 
            required 
            placeholder="الخدمات القريبة" 
            fullWidth 
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocalConvenienceStoreOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, direction:'ltr'  }}>
        <Button
          color="inherit"
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{ mr: 1 }}
        >
          الرجوع
        </Button>
        <Box sx={{ flex: '1 1 auto'}} />
        <Button onClick={handleNext}>
          التالي
        </Button>
      </Box>
    </form>
    </React.Fragment> : activeStep === 2 ?         <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}> إضافة الصور</Typography>
          <TextField value={property.mainPhoto} onChange={(e) => setProperty({...property ,mainPhoto:e.target.value})} required placeholder="الصورة الاساسية" />
          <TextField value={property.images} onChange={(e) => setProperty({...property ,images:e.target.value})} required placeholder="الصور" />
          <TextField value={property.a3dimage} onChange={(e) => setProperty({...property ,a3dimage:e.target.value})} required placeholder=" رابط النموذج ثلاثي الابعاد" />
          <TextField value={property.video} onChange={(e) => setProperty({...property ,video:e.target.value})} required placeholder=" رابط النموذج ثلاثي الابعاد" />
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              الرجوع
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleNext}>
            التالي
            </Button>
          </Box>
        </React.Fragment> :'' }
    </Box>
        </DialogContent>
      </Dialog>
        </>
    )
}