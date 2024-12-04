import { Box, Button, Checkbox, CircularProgress, Dialog, DialogContent, DialogTitle, FormControl, InputAdornment, InputLabel, ListItemButton, ListItemIcon, ListItemText, MenuItem, Select, Step, StepLabel, Stepper, TextField, Typography } from "@mui/material";
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
import Loading from "./Loading.jsx";
import { useState } from "react";
import axios from "axios";
import ThreeDRotationIcon from "@mui/icons-material/ThreeDRotation";
import { useEffect } from "react";



const steps = ['إضافة الرخص', 'إضافة المعلومات للعقار', 'إضافة الصور'];

export default function AddProperty({open , handleClose1} ){
  const services = [
       { id: "مسجد قريب", label: "مسجد قريب", icon: <MosqueIcon /> },
    { id: "حديقة قريبة", label: "حديقة قريبة", icon: <LocalConvenienceStoreOutlinedIcon /> },
    { id: "مطاعم قريبة", label: "مطاعم قريبة", icon: <RestaurantMenuIcon /> },
    { id: "غرفة خادمة", label: "غرفة خادمة", icon: <Woman2Icon /> },
    { id: "مدرسة قريبة", label: "مدرسة قريبة", icon: <BusinessIcon /> },
    { id: "مدخل خاص", label: "مدخل خاص", icon: <SensorDoorOutlinedIcon /> },
    { id: "موقف خاص", label: "موقف خاص", icon: <LocalParkingOutlinedIcon /> },
    { id: "كاميرات مراقبة", label: "كاميرات مراقبة", icon: <VideocamIcon /> },
    { id: "مصعد", label: "مصعد", icon: <ElevatorIcon /> },
    { id: "مستشفى قريب", label: "مستشفى قريب", icon: <LocalHospitalIcon /> },
    { id: "تموينات قريب", label: "تموينات قريب", icon: <StoreIcon /> },
    { id: "مركز تسوق قريب", label: "مركز تسوق قريب", icon: <LocalGroceryStoreIcon /> },
    { id: "خدمات صيانة", label: "خدمات صيانة", icon: <ManageAccountsIcon /> },
    { id: "خدمات تنظيف", label: "خدمات تنظيف", icon: <CleaningServicesIcon /> },
  ];

  const city = {
    "الرياض": [
      "الصحافة",
      "الياسمين",
      "العقيق",
      "النخيل",
      "الملقا",
      "حطين",
      "الغدير",
      "النفل",
      "السويدي",
      "العريجاء",
      "البديعة",
      "المربع",
      "الملز",
      "البطحاء",
      "الديرة"
    ],
    "جدة": [
      "أبحر الشمالية",
      "المحمدية",
      "النعيم",
      "البساتين",
      "الشرفية",
      "مشرفة",
      "الصفا",
      "السامر",
      "البلد",
      "غليل",
      "النزلة اليمانية",
      "الكرنتينا"
    ],
    "مكة المكرمة": [
      "العزيزية",
      "الشوقية",
      "النوارية",
      "المسفلة",
      "جرول",
      "الشرائع",
      "الكعكية",
      "الحجون",
      "الزاهر",
      "الرصيفة"
    ],
    "المدينة المنورة": [
      "العوالي",
      "شوران",
      "قباء",
      "السيح",
      "بني معاوية",
      "الخالدية",
      "الجرف",
      "العزيزية",
      "الفتح",
      "الصالحية"
    ],
    "الدمام": [
      "الفاخرية",
      "الشاطئ الغربي",
      "الروضة",
      "الفيصلية",
      "الخليج",
      "النخيل",
      "العنود",
      "المزروعية",
      "أحد",
      "الراكة"
    ],
    "الأحساء": [
      "الهفوف",
      "المبرز",
      "العيون"
    ],
    "الطائف": [
      "شهار",
      "السحيلي",
      "الهدا",
      "الردف",
      "الفيصلية",
      "العقيق",
      "الوهيط"
    ],
    "تبوك": [
      "السليمانية",
      "الروضة",
      "الورود",
      "الصالحية",
      "النهضة",
      "الصناعية"
    ],
    "القصيم": [
      "بريدة",
      "عنيزة",
      "الرس",
      "الزلفي",
    ],
    "جازان": [
      "الشامية",
      "السويس",
      "الشاطئ",
      "الروضة",
      "حي المطار",
      "مخطط 5",
      "المنطقة الصناعية"
    ],
    "الخبر": [
      "العقربية",
      "الخبر الشمالية",
      "الخبر الجنوبية",
      "الخزامى",
      "الحزام الذهبي",
      "البندرية",
      "الخبر العليا",
      "الدوحة الشمالية",
      "الدوحة الجنوبية"
    ]
  }
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
        garages: '',
        latitude: '',
        longitude: '',
        wifi: '',
        internet: '',
        size: '',
        floor: '',
        facade: '',
        a3dimage: '',
        nearbyServices: [],
        video: '',
        ageforbuild: '',
        payment: '',
        paymentWay: '',
        address: '',
        owner: user._id,

    })
    const {createProperty , isLoading} = usePropertiesStore();
    const [license , setLicense] = useState()

    useEffect(() => {
      if(user){
        setLicense(user.license)
      }
    }, [user])
    
    
    console.log(license)
    const navigate = useNavigate()
    async function handelAddProperty(){
      if (property.payment == 'ايجار'){ setProperty({...property, paymentWay:'',})}
        await createProperty(property)
        // navigate(`/propertyDetails/${property._id}`)
        toast.success('تم اضافة العقار بنجاح')
        handleClose()
    }
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const [selectedCity, setSelectedCity] = useState("");
    const [neighborhoods, setNeighborhoods] = useState([]);
    const [selectedNeighborhood, setSelectedNeighborhood] = useState("");
  // التعامل مع اختيار المدينة
  const handleCityChange = (event) => {
    const citys = event.target.value;
    setSelectedCity(citys);
    setProperty({...property, location: citys})
    setNeighborhoods(city[citys] || []); // جلب الأحياء للمدينة المحددة
    setSelectedNeighborhood(""); // إعادة تعيين الحي
  };
  console.log(selectedNeighborhood)


  
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


    // for url coordinates
    const [url, setUrl] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
  
    const handleExtract = async () => {
      setError("");
      setLoading(true);
  
      if (!url) {
        setError("يجب إدخال رابط Google Maps");
        setLoading(false);
        return;
      }
  
      try {
        const response = await axios.get("/api/urltst", {
          params: { url },
        });
  
        const { lat, lng } = response.data;
        setProperty({
          ...property,
          latitude: lat,
          longitude: lng,
        })
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setError("لم يتم العثور على إحداثيات في الرابط المُدخل.");
        } else {
          console.log(err.message);
          setError("حدث خطأ أثناء استخراج الإحداثيات.");
        }
      } finally {
        setLoading(false);
      }
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
<Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
    مراجعة المعلومات
  </Typography>

  <Grid container spacing={2}>
    <Grid item xs={12} sm={6} md={4}>
      <Typography>
        <strong>الاسم:</strong> {property.title}
      </Typography>
    </Grid>

    <Grid item xs={12} sm={6} md={4}>
      <Typography>
        <strong>السعر:</strong> {property.price} ريال
      </Typography>
    </Grid>

    <Grid item xs={12} sm={6} md={4}>
      <Typography>
        <strong>الوصف:</strong> {property.description}
      </Typography>
    </Grid>

    <Grid item xs={12} sm={6} md={4}>
      <Typography>
        <strong>النوع:</strong> {property.type}
      </Typography>
    </Grid>

    <Grid item xs={12} sm={6} md={4}>
      <Typography>
        <strong>عدد الغرف:</strong> {property.rooms}
      </Typography>
    </Grid>

    <Grid item xs={12} sm={6} md={4}>
      <Typography>
        <strong>عدد الحمامات:</strong> {property.bathrooms}
      </Typography>
    </Grid>

    <Grid item xs={12} sm={6} md={4}>
      <Typography>
        <strong>عدد غرف المعيشة:</strong> {property.livingrooms}
      </Typography>
    </Grid>

    <Grid item xs={12} sm={6} md={4}>
      <Typography>
        <strong>الجراج:</strong> {property.garages}
      </Typography>
    </Grid>

    <Grid item xs={12} sm={6} md={4}>
      <Typography>
        <strong>الموقع:</strong> {property.location}
      </Typography>
    </Grid>

    <Grid item xs={12} sm={6} md={4}>
      <Typography>
        <strong>خط العرض:</strong> {property.latitude}
      </Typography>
    </Grid>

    <Grid item xs={12} sm={6} md={4}>
      <Typography>
        <strong>خط الطول:</strong> {property.longitude}
      </Typography>
    </Grid>

    <Grid item xs={12} sm={6} md={4}>
      <Typography>
        <strong>واي فاي:</strong> {property.wifi ? "متوفر" : "غير متوفر"}
      </Typography>
    </Grid>

    <Grid item xs={12} sm={6} md={4}>
      <Typography>
        <strong>المساحة:</strong> {property.size} م²
      </Typography>
    </Grid>

    <Grid item xs={12} sm={6} md={4}>
      <Typography>
        <strong>إنترنت:</strong> {property.internet ? "متوفر" : "غير متوفر"}
      </Typography>
    </Grid>

    <Grid item xs={12} sm={6} md={4}>
      <Typography>
        <strong>الدور:</strong> {property.floor}
      </Typography>
    </Grid>

    <Grid item xs={12} sm={6} md={4}>
      <Typography>
        <strong>الواجهة:</strong> {property.facade}
      </Typography>
    </Grid>

    <Grid item xs={12} sm={6} md={4}>
      <Typography>
        <strong>الخدمات القريبة:</strong> {property.nearbyServices}
      </Typography>
    </Grid>

    <Grid item xs={12} sm={6} md={4}>
      <Typography>
        <strong>عمر البناء:</strong> {property.ageforbuild} سنة
      </Typography>
    </Grid>
  </Grid>
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
            <Button disabled={isLoading} onClick={handelAddProperty}> {isLoading ? <CircularProgress /> : ' إضافة العقار'}</Button>
          </Box>
        </React.Fragment>
      ) : activeStep === 0 ? (
        <React.Fragment>
          <div style={{display:'flex' , flexDirection:'column' , alignItems:'center' , direction:'rtl' }}>
        <Typography variant="h6" sx={{ mt: 2 , mb: 2 }}>
            إضافة معلومات الرخصة
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
            <Typography>
            رخصة فال للإعلان
          </Typography>
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
            <Typography>
            رخصة فال للمعلن
          </Typography>
              <TextField
                type="number"
                required
                value={license}
                disabled
              />
            </Grid>
          </Grid>
          </div>
          
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
            <Button onClick={() => {
              if(property.adLicense){
                if(property.adLicense <= 0){toast.error('رقم الرخصة يجب أن تكون أكبر من الصفر')}else{handleNext()}}else{toast.error('الرجاء ادخال الرخصة')}
            }}>
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
            <Typography>
             نوع العقار
          </Typography>

                            <FormControl sx={{ width: 150 }}>
                <Select
                  labelId="demo-simple-select-label"
                  value={property.title} // تأكد من ربط هذه القيمة
                  onChange={(e) =>
                    setProperty({
                      ...property,
                      title: e.target.value,
                    })
                  }
                  placeholder="نوع العقار"
                >
                  <MenuItem value={"شقة"}>شقة</MenuItem>
                  <MenuItem value={"بيت"}>بيت</MenuItem>
                  <MenuItem value={"فيلا"}>فيلا</MenuItem>
                  <MenuItem value={"دوبلوكس"}>دوبلوكس</MenuItem>
                  <MenuItem value={"استوديو"}>استوديو</MenuItem>
                  <MenuItem value={"استراحة"}>استراحة</MenuItem>
                  <MenuItem value={"غرفة"}>غرفة</MenuItem>
                  <MenuItem value={"شاليه"}>شاليه</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
            <Typography>
            الوصف
          </Typography>
              <TextField
              multiline
              maxRows={5}
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
            <Typography>
            نوع العرض
          </Typography>
              <FormControl sx={{ width: 100 }}>
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
            <Typography>
            السعر
          </Typography>
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
          {  property.type == 'ايجار' ?         
            <Grid item xs={12} sm={6}>
                      <Typography>
                      الدفع
                    </Typography>
                    <FormControl sx={{ width: 150 }}>
                <Select
                  labelId="demo-simple-select-label"
                  value={property.payment} // تأكد من ربط هذه القيمة
                  onChange={(e) =>
                    setProperty({
                      ...property,
                      payment: e.target.value,
                    })
                  }
                >
                  <MenuItem value={"سنوي"}>سنوي</MenuItem>
                  <MenuItem value={"شهري"}>شهري</MenuItem>
                </Select>
              </FormControl>
                      </Grid> :''
                      }
                      {  property.payment == 'سنوي' ?         
            <Grid item xs={12} sm={6}>
                      <Typography>
                      الدفعات
                    </Typography>
                    <FormControl sx={{ width: 150 }}>
                <Select
                  labelId="demo-simple-select-label"
                  value={property.paymentWay} // تأكد من ربط هذه القيمة
                  onChange={(e) =>
                    setProperty({
                      ...property,
                      paymentWay: e.target.value,
                    })
                  }
                >
                  <MenuItem value={"دفعة واحدة"}>دفعة واحدة</MenuItem>
                  <MenuItem value={"نصف سنوي"}>نصف سنوي</MenuItem>
                  <MenuItem value={"ربع سنوي"}>ربع سنوي</MenuItem>
                </Select>
              </FormControl>
                      </Grid> :''
                      }
          </Grid>

  {/* مساحة وعدد الغرف */}
  <Typography variant="h6" sx={{ mt: 2 }}>
            المساحة وعدد الغرف
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
            <Typography>
            عدد الغرف
          </Typography>
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
            <Typography>
            عدد الكراجات
          </Typography>
              <TextField
                type="number"
                value={property.garages}
                onChange={(e) =>
                  setProperty({
                    ...property,
                    garages: e.target.value,
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
            <Typography>
            دورات المياه
          </Typography>
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
            <Typography>
            عدد الصالات
          </Typography>
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
            <Typography>
            المساحة (م²)
          </Typography>
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
            <Typography>
            عمر العقار (سنوات)
          </Typography>
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
          <Box component="form" noValidate autoComplete="off" marginTop={3}>
        <TextField
          label="رابط Google Maps"
          variant="outlined"
          fullWidth
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          error={!!error}
          helperText={error}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: "20px" }}
          onClick={handleExtract}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "استخراج الإحداثيات"}
        </Button>
      </Box>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
            <Typography>
            خط العرض
          </Typography>
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
            <Typography>
            خط الطول
          </Typography>
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
            <Typography>
            المدينة 
          </Typography>
              {/* <TextField
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
              /> */}
      <FormControl fullWidth sx={{ marginBottom: 2 , width:130 }}>
        <Select
          labelId="city-select-label"
          value={selectedCity}
          onChange={handleCityChange}
        >
          {Object.keys(city).map((city) => (
            <MenuItem key={city} value={city}>
              {city}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
            </Grid>
            <Grid item xs={12}>
            <Typography>
            الحي 
          </Typography>

          <FormControl fullWidth disabled={!selectedCity} sx={{ width: 130 }}>
        <Select
          labelId="neighborhood-select-label"
          value={selectedNeighborhood}
          onChange={(e) => {
            setSelectedNeighborhood(e.target.value)
            setProperty({...property, address: e.target.value})
          }}
        >
          {neighborhoods.map((neighborhood) => (
            <MenuItem key={neighborhood} value={neighborhood}>
              {neighborhood}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
            </Grid>
          </Grid>

      {/* خيارات إضافية */}
      <Typography variant="h6" sx={{ mt: 2 }}>
            خيارات إضافية
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
            <Typography>
            تغطية الانترنت 
          </Typography>
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
            <Typography>
              يوجد انترنت؟
          </Typography>
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
                  value={property.internet} // تأكد من ربط هذه القيمة
                  onChange={(e) =>
                    setProperty({
                      ...property,
                      internet: e.target.value,
                    })
                  }
                >
                  <MenuItem value={true}>نعم</MenuItem>
                  <MenuItem value={false}>لا</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
            <Typography>
            الواجهة 
          </Typography>
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
            <Typography>
            الدور 
          </Typography>
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
        <Button onClick={() => {
          if(!property.title){
            toast.error('الرجاء ادخال عنوان العقار')
            }else if(!property.price ){
              toast.error('الرجاء ادخال سعر العقار')
          }else if(property.price < 0 ){
            toast.error('الرجاء ادخال رقمًا موحبًا لسعر العقار ')
          }else if(!property.location){
            toast.error('الرجاء ادخال موقع العقار')
          }else if(!property.type){
            toast.error('الرجاء ادخال نوع العقار')
          }else if(property.rooms < 0){
              toast.error('القيمة الرقمية يجب ان تكون موجبة')
            }else if(property.bathrooms < 0){
              toast.error('القيمة الرقمية يجب ان تكون موجبة')
            }else if(property.livingrooms < 0 ){
              toast.error('القيمة الرقمية يجب ان تكون موجبة')
            }else if(property.garage < 0 ){
              toast.error('القيمة الرقمية يجب ان تكون موجبة')
            }else if(property.size < 0){
              toast.error('القيمة الرقمية يجب ان تكون موجبة')
            }else if(property.floor < 0){
              toast.error('القيمة الرقمية يجب ان تكون موجبة')
            }else if( property.latitude < 0 ){
              toast.error('القيمة الرقمية يجب ان تكون موجبة')
            }else if( property.longitude < 0 ){
              toast.error('القيمة الرقمية يجب ان تكون موجبة')
            }else if(!property.size){
              toast.error('يرجى تحديد حجم العقار')
            }else if(!property.ageforbuild){
              toast.error('يرجى تحديد عمر العقار')
            }else if(property.nearbyServices.length == 0){
              toast.error('يرجى تحديد خدمات ومميزات العقار')
            }else{handleNext()}

            
          
        }}>
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
            <Box>
              <Typography>نموذج ثلاثي الابعاد:</Typography>
              <TextField
                value={property.a3dimage}
                onChange={(e) =>
                  setProperty({ ...property, a3dimage: e.target.value })
                }
                required
                placeholder="أدخل الرابط الخاص بالنموذج"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <ThreeDRotationIcon />
                    </InputAdornment>
                  ),
                }}
              />
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