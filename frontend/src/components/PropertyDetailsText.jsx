import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import Divider from "@mui/material/Divider";

import IosShareOutlinedIcon from "@mui/icons-material/IosShareOutlined";
import LocalParkingOutlinedIcon from '@mui/icons-material/LocalParkingOutlined';
import Woman2Icon from '@mui/icons-material/Woman2';
import MosqueIcon from '@mui/icons-material/Mosque';
import BusinessIcon from '@mui/icons-material/Business';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import SensorDoorOutlinedIcon from '@mui/icons-material/SensorDoorOutlined';
import BedOutlinedIcon from "@mui/icons-material/BedOutlined";
import BathtubOutlinedIcon from "@mui/icons-material/BathtubOutlined";
import ChairOutlinedIcon from "@mui/icons-material/ChairOutlined";
import GarageOutlinedIcon from '@mui/icons-material/GarageOutlined';
import BorderAllOutlinedIcon from '@mui/icons-material/BorderAllOutlined';

export default function PropertyDetailsText() {
  return (
    <>
      <div className="right-side" style={{ flex: "3", marginRight: "45px" }}>
        {/* For Title and Price */}
        <Card sx={{ minWidth: 275, backgroundColor: "#F6F6F6" }}>
          <CardContent style={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="h6" component="div">
              فيلا للبيع في الرياض
            </Typography>
            <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
              الوادي، شمال الرياض، الرياض
            </Typography>
            <Typography
              sx={{ marginBottom: "10px" }}
              variant="h6"
              component="div"
            >
              5,000,000 ريال
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
                11 غرف نوم
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
                <BathtubOutlinedIcon />6 دورات مياة
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
                445م2
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
              فيلا دور أرضي تتكون من: 3 غرف نوم ماستر مع شقتين في كل شقة مجلس
              وصالة ومطبخ وغرفتين نوم بدورتين مياه المساحة: 445 متر مربع
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
              <Grid sx={{display:'flex'}} size={{ xs: 2, sm: 4, md: 4 }}>
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
              </Grid>
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
