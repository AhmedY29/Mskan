import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import Divider from "@mui/material/Divider";

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
import GarageOutlinedIcon from "@mui/icons-material/GarageOutlined";
import BorderAllOutlinedIcon from "@mui/icons-material/BorderAllOutlined";
import BedOutlinedIcon from "@mui/icons-material/BedOutlined";

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


export default function PropertyDetailsText({property}) {
  if (!property.nearbyServices) {
    return (
      <Grid container justifyContent="center" alignItems="center" style={{ minHeight: "100px" }}>
        <Loading />
      </Grid>
    );
  }
  const price = new Intl.NumberFormat().format(property.price);
  const matchedServices = services.filter(service => property.nearbyServices.includes(service.id));
  return (
    <>
      <div className="right-side" style={{ flex: "3", marginRight: "45px" }}>
        {/* For Title and Price */}
        <Card sx={{ minWidth: 275, backgroundColor: "#F6F6F6" }}>
          <CardContent style={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="h6" component="div">
              فيلا للبيع في {property.location} 
              {property.title}
            </Typography>
            <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
              {property.location}
            </Typography>
            <Typography
              sx={{ marginBottom: "10px" }}
              variant="h6"
              component="div"
            >
              {price}
               ريال
            </Typography>
            <Divider />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "10px",
              }}
            >
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "5px",
                }}
                variant="p"
                component="div"
              >
                <BedOutlinedIcon />
                {property.rooms}
                 غرف نوم
              </Typography>
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "5px",
                }}
                variant="p"
                component="div"
              >
                <BathtubOutlinedIcon />
                {property.bathrooms}
                 دورات مياة
              </Typography>
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "5px",
                }}
                variant="p"
                component="div"
              >
                <GarageOutlinedIcon />
                {property.garages}
                مدخل سيارة
              </Typography>
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "5px",
                }}
                variant="p"
                component="div"
              >
                <BorderAllOutlinedIcon />
                {property.size}
                (م²)
              </Typography>
            </div>
          </CardContent>
        </Card>
        {/* For Description */}
        <Card
          sx={{
            minWidth: 275,
            backgroundColor: "#F6F6F6",
            marginTop: "30px",
          }}
        >
          <CardContent style={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="h6" component="div">
              الوصف
            </Typography>
            <Typography sx={{ color: "text.secondary", mb: 1.5, mr: 1.5 }}>
              {property.description}
            </Typography>
          </CardContent>
        </Card>
        {/* For Future and Serves */}
        <Card
          sx={{
            minWidth: 275,
            backgroundColor: "#F6F6F6",
            marginTop: "30px",
          }}
        >
          <CardContent style={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="h6" component="div">
              المزايا والخدمات
            </Typography>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
              sx={{ marginTop: "10px" }}
            >
              {matchedServices.map(service => (
        <Grid 
          key={service.id} 
          size={{ xs: 2, sm: 4, md: 4 }}
          sx={{ display: 'flex'}}
        >
          {service.icon}
          <span>{service.label}</span>
        </Grid>
              ))}
              {/* <Grid sx={{display:'flex'}} size={{ xs: 2, sm: 4, md: 4 }}>
                <Woman2Icon />
                غرفة خادمة
              </Grid>
              <Grid sx={{display:'flex'}} size={{ xs: 2, sm: 4, md: 4 }}>
                <SensorDoorOutlinedIcon />
                مدخل خاص
              </Grid>
              <Grid sx={{display:'flex'}} size={{ xs: 2, sm: 4, md: 4 }}>
                <MosqueIcon />
                مسجد قريب
              </Grid>
              <Grid  sx={{display:'flex'}} size={{ xs: 2, sm: 4, md: 4 }}>
                <RestaurantMenuIcon />
                مطاعم قريبة
              </Grid>
              <Grid sx={{display:'flex'}} size={{ xs: 2, sm: 4, md: 4 }}>
                <BusinessIcon />
                مدارس قريبة
              </Grid>
              <Grid  sx={{display:'flex'}} size={{ xs: 2, sm: 4, md: 4 }}>
                <LocalParkingOutlinedIcon />
                مواقف سيارات 5
              </Grid> */}
            </Grid>
          </CardContent>
        </Card>
        {/* For Details  */}
        <Card
          sx={{
            minWidth: 275,
            backgroundColor: "#F6F6F6",
            marginTop: "30px",
          }}
        >
          <CardContent style={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="h6" component="div">
              التفاصيل
            </Typography>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
              sx={{ marginTop: "10px" }}
            >
              <Grid size={{ xs: 2, sm: 4, md: 4 }}>نوع العقار : فيلا</Grid>
              <Grid size={{ xs: 2, sm: 4, md: 4 }}>حالة البناء: جاهز</Grid>
              <Grid size={{ xs: 2, sm: 4, md: 4 }}>التأثيث: مفروش</Grid>
              <Grid size={{ xs: 2, sm: 4, md: 4 }}>نوع العرض: بيع</Grid>
              <Grid size={{ xs: 2, sm: 4, md: 4 }}>عمر العقار: جديد</Grid>
              <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                تاريخ العرض: 8 اكتوبر 2024
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
