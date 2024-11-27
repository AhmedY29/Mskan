import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Container,
  FormControl,
  InputAdornment,
  InputLabel,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

import Grid from "@mui/material/Grid2";

import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PriceCheckOutlinedIcon from "@mui/icons-material/PriceCheckOutlined";
import BathtubOutlinedIcon from "@mui/icons-material/BathtubOutlined";
import WeekendOutlinedIcon from "@mui/icons-material/WeekendOutlined";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import WifiOutlinedIcon from "@mui/icons-material/WifiOutlined";

import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import SquareFootOutlinedIcon from "@mui/icons-material/SquareFootOutlined";
import HistoryEduOutlinedIcon from "@mui/icons-material/HistoryEduOutlined";
import LocalConvenienceStoreOutlinedIcon from "@mui/icons-material/LocalConvenienceStoreOutlined";
import { useAuthStore } from "../store/authStore";
import { usePropertiesStore } from "../store/propertiesStore";
import Loading from "../components/Loading";

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
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

export default function Update() {
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
  const { user } = useAuthStore();
  const { property, getProperty , isLoading , updateProperty } = usePropertiesStore();

  const { propertyId } = useParams();
  useEffect(() => {
   getProperty(propertyId);
  }, [ propertyId,getProperty]);





  const [updatedProperty, setUpdatedProperty] = useState({
    title: property.title,
    description: property.description,
    images: property.images,
    adLicense: property.adLicense,
    location: property.location,
    price: property.price,
    type: property.type,
    mainPhoto: property.mainPhoto,
    rooms: property.rooms,
    bathrooms: property.bathrooms,
    livingrooms: property.livingrooms,
    garages: property.garages,
    latitude: property.latitude,
    longitude: property.longitude,
    wifi: property.wifi,
    internet: property.internet,
    size: property.size,
    floor: property.floor,
    facade: property.facade,
    a3dimage: property.a3dimage,
    nearbyServices: [property.nearbyServices],
    video: property.video,
    ageforbuild: property.ageforbuild,
    imagesToDelete: []
  });

  console.log('list',property)
  console.log('values',updatedProperty)
  const navigate = useNavigate();
  const handleUpdateProperty = async (e) => {
    e.preventDefault();
    // const dataToUpdate = { ...updatedProperty }; // نسخ البيانات
    // delete dataToUpdate.imagesToDelete; 
    await updateProperty(propertyId, updatedProperty);
    toast.success("تم تحديث العقار بنجاح")
    navigate(`/properties`); // إعادة التوجيه إلى صفحة العقارات بعد التحديث
};

  useEffect(() => {
    if (property) {
      setUpdatedProperty({
        title: property.title || "",
        description: property.description || "",
        images: property.images || [],
        adLicense: property.adLicense || "",
        location: property.location || "",
        price: property.price || 0,
        type: property.type || "",
        mainPhoto: property.mainPhoto || "",
        rooms: property.rooms || 0,
        bathrooms: property.bathrooms || 0,
        livingrooms: property.livingrooms || 0,
        garages: property.garages || 0,
        latitude: property.latitude || 0,
        longitude: property.longitude || 0,
        wifi: property.wifi || false,
        internet: property.internet || false,
        size: property.size || 0,
        floor: property.floor || 0,
        facade: property.facade || "",
        a3dimage: property.a3dimage || "",
        nearbyServices: property.nearbyServices || [],
        video: property.video || "",
        ageforbuild: property.ageforbuild || 0,
        imagesToDelete: []
      });
    }
  }, [property]); 
   
  const handleServiceToggle = (serviceId) => {
    setUpdatedProperty((prev) => {
      const isSelected = prev.nearbyServices.includes(serviceId);
      return {
        ...prev,
        nearbyServices: isSelected
          ? prev.nearbyServices.filter((id) => id !== serviceId) // إزالة الخدمة إذا كانت محددة
          : [...prev.nearbyServices, serviceId], // إضافة الخدمة إذا لم تكن محددة
      };
    });
  };

  const handleDeleteImage = (image) => {
    // إضافة الصورة إلى قائمة الصور المحذوفة
    setUpdatedProperty({
      ...updatedProperty,
      imagesToDelete: [...updatedProperty.imagesToDelete, image],
      images: updatedProperty.images.filter((img) => img !== image),
    });
  };


  // const { createProperty } = usePropertiesStore();

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
          const response = await axios.get("http://localhost:5000/api/urltst", {
            params: { url },
          });
    
          const { lat, lng } = response.data;
          setUpdatedProperty({
            ...updatedProperty,
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

  if (isLoading) {
    return <Loading />;
  }


    return (
      <>
        <Container fixed>
          <form onSubmit={handleUpdateProperty}>
          <Typography variant="h6" sx={{ mt: 2 }}>
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
                value={updatedProperty.adLicense}
                onChange={(e) =>
                  setUpdatedProperty({
                    ...updatedProperty,
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
                value={updatedProperty.adLicense}
                onChange={(e) =>
                  setUpdatedProperty({
                    ...updatedProperty,
                    adLicense: e.target.value,
                  })
                }
                placeholder=" رخصة فال للمعلن"
              />
            </Grid>
          </Grid>

          {/* المعلومات العامة */}
          <Typography variant="h6" sx={{ mt: 2 }}>
            المعلومات العامة
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
            <Typography>
             الاسم
          </Typography>
              <TextField
                value={updatedProperty.title}
                onChange={(e) =>
                  setUpdatedProperty({
                    ...updatedProperty,
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
            <Typography>
             الوصف
          </Typography>
              <TextField
                value={updatedProperty.description}
                onChange={(e) =>
                  setUpdatedProperty({
                    ...updatedProperty,
                    description: e.target.value,
                  })
                }
                
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
              <FormControl sx={{ width: 100 }} required>
                <InputLabel id="demo-simple-select-label">نوع العرض</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  value={updatedProperty.type} // تأكد من ربط هذه القيمة
                  onChange={(e) =>
                    setUpdatedProperty({
                      ...updatedProperty,
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
                value={updatedProperty.price}
                onChange={(e) =>
                  setUpdatedProperty({
                    ...updatedProperty,
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
            <Typography>
             الغرف
          </Typography>
              <TextField
                type="number"
                value={updatedProperty.rooms}
                onChange={(e) =>
                  setUpdatedProperty({
                    ...updatedProperty,
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
                value={updatedProperty.garages}
                onChange={(e) =>
                  setUpdatedProperty({
                    ...updatedProperty,
                    garages: e.target.value,
                  })
                }
                
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
                value={updatedProperty.bathrooms}
                onChange={(e) =>
                  setUpdatedProperty({
                    ...updatedProperty,
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
                value={updatedProperty.livingrooms}
                onChange={(e) =>
                  setUpdatedProperty({
                    ...updatedProperty,
                    livingrooms: e.target.value,
                  })
                }
                
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
                value={updatedProperty.size}
                onChange={(e) =>
                  setUpdatedProperty({ ...updatedProperty, size: e.target.value })
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
                value={updatedProperty.ageforbuild}
                onChange={(e) =>
                  setUpdatedProperty({
                    ...updatedProperty,
                    ageforbuild: e.target.value,
                  })
                }
                
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
                value={updatedProperty.latitude}
                onChange={(e) =>
                  setUpdatedProperty({
                    ...updatedProperty,
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
                value={updatedProperty.longitude}
                onChange={(e) =>
                  setUpdatedProperty({
                    ...updatedProperty,
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
           الموقع
          </Typography>
              <TextField
                value={updatedProperty.location}
                onChange={(e) =>
                  setUpdatedProperty({
                    ...updatedProperty,
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
            <Typography>
             تغطية الانترنت
          </Typography>
              <TextField
                value={updatedProperty.wifi}
                onChange={(e) =>
                  setUpdatedProperty({ ...updatedProperty, wifi: e.target.value })
                }
                
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
                  value={updatedProperty.internet === true ? true : false} // تأكد من ربط هذه القيمة
                  onChange={(e) =>
                    setUpdatedProperty({
                      ...updatedProperty,
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
                  value={updatedProperty.facade} // تأكد من ربط هذه القيمة
                  onChange={(e) =>
                    setUpdatedProperty({
                      ...updatedProperty,
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
                value={updatedProperty.floor}
                onChange={(e) =>
                  setUpdatedProperty({
                    ...updatedProperty,
                    floor: e.target.value,
                  })
                }
                
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
                checked={updatedProperty.nearbyServices.includes(service.id)}
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
            setUpdatedProperty({
              ...updatedProperty,
              mainPhoto: reader.result,
            });
          };
          reader.readAsDataURL(file);
        }
      }}
    />
  </Button>
  {updatedProperty.mainPhoto && (
    <Box
      component="img"
      src={updatedProperty.mainPhoto}
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

            // بعد الانتهاء من قراءة جميع الصور الجديدة
            if (previewImages.length === files.length) {
              setUpdatedProperty((prev) => ({
                ...prev,
                images: [...(prev.images || []), ...previewImages], // دمج الصور الجديدة مع الصور القديمة
              }));
            }
          };
          reader.readAsDataURL(file);
        });
      }}
    />
  </Button>

  {/* عرض الصور */}
  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}>
    {updatedProperty.images?.map((image, index) => (
      <Box key={index} sx={{ position: "relative" }}>
        <Box
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
        <Button
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            bgcolor: "red",
            color: "white",
            minWidth: "25px",
            height: "25px",
            borderRadius: "50%",
          }}
          onClick={() => handleDeleteImage(image)}
        >
          X
        </Button>
      </Box>
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
            setUpdatedProperty({
              ...updatedProperty,
              video: reader.result,
            });
          };
          reader.readAsDataURL(file);
        }
      }}
    />
  </Button>
  {updatedProperty.video && (
    <Box sx={{ mb: 2 }}>
      <video
        src={updatedProperty.video}
        controls
        style={{ width: "100%", maxWidth: 300, borderRadius: 8 }}
      ></video>
      <Button
        onClick={() => setUpdatedProperty({ ...updatedProperty, video: null })}
        sx={{ mt: 1, bgcolor: "red", color: "white" }}
      >
        إزالة الفيديو
      </Button>
    </Box>
  )}
            </Box>
          </div>

           <div>
                <button type="submit">تحديث العقار</button>
            </div>
            </form>
        </Container>
      </>
    );
}
