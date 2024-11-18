import { Box, Button, Checkbox, Dialog, DialogContent, DialogTitle, FormControl, InputAdornment, InputLabel, ListItemButton, ListItemIcon, ListItemText, MenuItem, Select, Step, StepLabel, Stepper, TextField, Typography } from "@mui/material";
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
import LocalParkingOutlinedIcon from "@mui/icons-material/LocalParkingOutlined";
import Woman2Icon from "@mui/icons-material/Woman2";
import MosqueIcon from "@mui/icons-material/Mosque";
import BusinessIcon from "@mui/icons-material/Business";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import SensorDoorOutlinedIcon from "@mui/icons-material/SensorDoorOutlined";
import VideocamIcon from "@mui/icons-material/Videocam";
import ElevatorIcon from "@mui/icons-material/Elevator";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";
import StoreIcon from "@mui/icons-material/Store";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import { useNavigate } from "react-router-dom";



const steps = ['إضافة الرخص', 'إضافة المعلومات للعقار', 'إضافة الصور'];

export default function AddProperty({open , handleClose1} ){
  const services = [
    { id: "mosque", label: "مسجد قريب", icon: <MosqueIcon /> },
    { id: "park", label: "حديقة قريبة", icon: <LocalConvenienceStoreOutlinedIcon /> },
    { id: "restaurants", label: "مطاعم قريبة", icon: <RestaurantMenuIcon /> },
    { id: "maidRoom", label: "غرفة خادمة", icon: <Woman2Icon /> },
    { id: "school", label: "مدرسة قريبة", icon: <BusinessIcon /> },
    { id: "privateEntrance", label: "مدخل خاص", icon: <SensorDoorOutlinedIcon /> },
    { id: "privateParking", label: "موقف خاص", icon: <LocalParkingOutlinedIcon /> },
    { id: "securityCameras", label: "كاميرات مراقبة", icon: <VideocamIcon /> },
    { id: "elevator", label: "مصعد", icon: <ElevatorIcon /> },
    { id: "hospital", label: "مستشفى قريب", icon: <LocalHospitalIcon /> },
    { id: "grocery", label: "تموينات قريب", icon: <StoreIcon /> },
    { id: "shoppingCenter", label: "مركز تسوق قريب", icon: <LocalGroceryStoreIcon /> },
    { id: "maintenance", label: "خدمات صيانة", icon: <ManageAccountsIcon /> },
    { id: "cleaning", label: "خدمات تنظيف", icon: <CleaningServicesIcon /> },
  ];

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
        owner: user._id,

    })
    const {createProperty} = usePropertiesStore();
    const navigate = useNavigate()
    async function handelAddProperty(){
        await createProperty(property)
        navigate(`/propertyDetails/${property._id}`)
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
  
    const handleServiceToggle = (serviceId) => {
      setProperty((prev) => {
        const isSelected = prev.nearbyServices.includes(serviceId);
        return {
          ...prev,
          nearbyServices: isSelected
            ? prev.nearbyServices.filter((id) => id !== serviceId) // إزالة الخدمة إذا كانت محددة
            : [...prev.nearbyServices, serviceId], // إضافة الخدمة إذا لم تكن محددة
        };
      });
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
        <Typography variant="h6" sx={{ mt: 2 }}>
            إضافة معلومات الرخصة
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                type="number"
                required
                value={property.adLicense}
                onChange={(e) =>
                  setProperty({
                    ...property,
                    adLicense: e.target.value,
                  })
                }
                placeholder=" رخصة فال للإعلان"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="number"
                required
                value={property.adLicense}
                onChange={(e) =>
                  setProperty({
                    ...property,
                    adLicense: e.target.value,
                  })
                }
                placeholder=" رخصة فال للمعلن"
              />
            </Grid>
          </Grid>
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
          <Typography variant="h6" sx={{ mt: 2 }}>
            المعلومات العامة
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                value={property.title}
                onChange={(e) =>
                  setProperty({
                    ...property,
                    title: e.target.value,
                  })
                }
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
                onChange={(e) =>
                  setProperty({
                    ...property,
                    description: e.target.value,
                  })
                }
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
              <FormControl sx={{ width: 100 }}>
                <InputLabel id="demo-simple-select-label">نوع العرض</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  value={property.type} // تأكد من ربط هذه القيمة
                  onChange={(e) =>
                    setProperty({
                      ...property,
                      type: e.target.value,
                    })
                  }
                >
                  <MenuItem value={"ايجار"}>ايجار</MenuItem>
                  <MenuItem value={"بيع"}>بيع</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="number"
                value={property.price}
                onChange={(e) =>
                  setProperty({
                    ...property,
                    price: e.target.value,
                  })
                }
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
  <Typography variant="h6" sx={{ mt: 2 }}>
            المساحة وعدد الغرف
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                type="number"
                value={property.rooms}
                onChange={(e) =>
                  setProperty({
                    ...property,
                    rooms: e.target.value,
                  })
                }
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
                onChange={(e) =>
                  setProperty({
                    ...property,
                    garage: e.target.value,
                  })
                }
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
                onChange={(e) =>
                  setProperty({
                    ...property,
                    bathrooms: e.target.value,
                  })
                }
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
                onChange={(e) =>
                  setProperty({
                    ...property,
                    livingrooms: e.target.value,
                  })
                }
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
                onChange={(e) =>
                  setProperty({ ...property, size: e.target.value })
                }
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
                onChange={(e) =>
                  setProperty({
                    ...property,
                    ageforbuild: e.target.value,
                  })
                }
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
      <Typography variant="h6" sx={{ mt: 2 }}>
            الإحداثيات والموقع
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                type="number"
                value={property.latitude}
                onChange={(e) =>
                  setProperty({
                    ...property,
                    latitude: e.target.value,
                  })
                }
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
                onChange={(e) =>
                  setProperty({
                    ...property,
                    longitude: e.target.value,
                  })
                }
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
                onChange={(e) =>
                  setProperty({
                    ...property,
                    location: e.target.value,
                  })
                }
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
      <Typography variant="h6" sx={{ mt: 2 }}>
            خيارات إضافية
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                value={property.wifi}
                onChange={(e) =>
                  setProperty({ ...property, wifi: e.target.value })
                }
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
              <FormControl
                sx={{ width: 150, direction: "rtl", textAlign: "center" }}
              >
                <InputLabel
                  sx={{ textAlign: "right" }}
                  id="demo-simple-select-label"
                >
                  يوجد انترنت ؟
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={property.internet === true ? true : false} // تأكد من ربط هذه القيمة
                  onChange={(e) =>
                    setProperty({
                      ...property,
                      internet: e.target.value === "true" ? true : false,
                    })
                  }
                >
                  <MenuItem value={true}>نعم</MenuItem>
                  <MenuItem value={false}>لا</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl
                sx={{ width: 150, direction: "rtl", textAlign: "center" }}
              >
                <InputLabel
                  sx={{ textAlign: "right" }}
                  id="demo-simple-select-label"
                >
                  الواجهة
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={property.facade} // تأكد من ربط هذه القيمة
                  onChange={(e) =>
                    setProperty({
                      ...property,
                      facade: e.target.value,
                    })
                  }
                >
                  <MenuItem value={"شرقية"}>شرقية</MenuItem>
                  <MenuItem value={"جنوبية"}>جنوبية</MenuItem>
                  <MenuItem value={"غربية"}>غربية</MenuItem>
                  <MenuItem value={"شمالية"}>شمالية</MenuItem>
                  <MenuItem value={"شمالية شرقية"}> شمالية شرقية</MenuItem>
                  <MenuItem value={"شمالية غربية"}> شمالية غربية</MenuItem>
                  <MenuItem value={"جنوبية شرقية"}> جنوبية شرقية</MenuItem>
                  <MenuItem value={"جنوبية غربية"}> جنوبية غربية</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
              type='number'
                value={property.floor}
                onChange={(e) =>
                  setProperty({
                    ...property,
                    floor: e.target.value,
                  })
                }
                required
                placeholder="الدور"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <DensityMediumIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>

                    {/* التفا��يل ال��ضافية */}
                    <Typography variant="h6">الخدمات والمميزات</Typography>
           <Grid container spacing={2}>
      {services.map((service) => (
        <Grid item xs={12} sm={6} key={service.id}>
          <ListItemButton role={undefined} dense onClick={() => handleServiceToggle(service.id)}>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={property.nearbyServices.includes(service.id)}
                tabIndex={-1}
                disableRipple
              />
            </ListItemIcon>
            {service.icon}
            <ListItemText primary={service.label} />
          </ListItemButton>
        </Grid>
      ))}
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
    </React.Fragment> : activeStep === 2 ?      <React.Fragment>
    <Typography sx={{ mt: 2, mb: 1 }}>إضافة الصور</Typography>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            {/* الصورة الأساسية */}
            <Box>
              <Typography>الصورة الأساسية:</Typography>
              <Button variant="outlined" component="label" sx={{ mb: 2 }}>
                رفع الصورة الأساسية
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = () => {
                        setProperty({
                          ...property,
                          mainPhoto: reader.result,
                        });
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </Button>
              {property.mainPhoto && (
                <Box
                  component="img"
                  src={property.mainPhoto}
                  alt="الصورة الأساسية"
                  sx={{
                    width: 150,
                    height: 150,
                    objectFit: "cover",
                    borderRadius: 2,
                    mb: 2,
                    display: "block",
                  }}
                />
              )}
            </Box>

            {/* الصور المتعددة */}
            <Box>
              <Typography>الصور الإضافية:</Typography>
              <Button variant="outlined" component="label" sx={{ mb: 2 }}>
                رفع الصور الإضافية
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  multiple
                  onChange={(e) => {
                    const files = Array.from(e.target.files);
                    const previewImages = [];

                    files.forEach((file) => {
                      const reader = new FileReader();
                      reader.onload = () => {
                        previewImages.push(reader.result);
                        if (previewImages.length === files.length) {
                          setProperty({
                            ...property,
                            images: previewImages,
                          });
                        }
                      };
                      reader.readAsDataURL(file);
                    });
                  }}
                />
              </Button>
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}>
                {property.images?.map((image, index) => (
                  <Box
                    key={index}
                    component="img"
                    src={image}
                    alt={`image-${index}`}
                    sx={{
                      width: 100,
                      height: 100,
                      objectFit: "cover",
                      borderRadius: 2,
                    }}
                  />
                ))}
              </Box>
            </Box>

            {/* الفيديو */}
            <Box>
              <Typography>الفيديو:</Typography>
              <Button variant="outlined" component="label" sx={{ mb: 2 }}>
                رفع الفيديو
                <input
                  type="file"
                  accept="video/*"
                  hidden
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = () => {
                        setProperty({
                          ...property,
                          video: reader.result,
                        });
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </Button>
              {property.video && (
                <Box sx={{ mb: 2 }}>
                  <video
                    src={property.video}
                    controls
                    style={{ width: "100%", maxWidth: 300, borderRadius: 8 }}
                  ></video>
                </Box>
              )}
            </Box>
          </div>

      {/* أزرار التنقل */}
      <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
        <Button
          color="inherit"
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{ mr: 1 }}
        >
          الرجوع
        </Button>
        <Box sx={{ flex: "1 1 auto" }} />
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