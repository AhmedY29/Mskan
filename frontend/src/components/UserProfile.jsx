import {
    Button,
    CardContent,
    TextField,
    Typography,
  } from "@mui/material";
  import Grid from "@mui/material/Grid2";

export default function UserProfile(){

    return(
        <>
                        <CardContent style={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="h6" component="div" sx={{marginBottom:'40px'}}>
                المعلومات الشخصية
              </Typography>
              {/* <Typography sx={{ color: "text.secondary", mb: 1.5, mr: 1.5 }}>
                  مرحبًا بكم في هذه الفيلا ذات 4 غرف نوم المثيرة الموجودة في
                  الحي النابض بالحياة في البيان في الرياض. تقدم هذه الفيلا مساحة
                  معيشة واسعة ومريحة، مثالية للعائلات التي تبحث عن منزل جديد.
                  تشمل الميزات الرئيسية لهذا الممتلكات 4 غرف نوم و4 دورات مياة،
                  بالإضافة لمجموعة من وسائل الراحة مثل الكهرباء وإمدادات المياه
                  ونظام الصرف الصحي. لا تفوت هذه الفرصة لامتلاك فيلا جميلة في
                  موقع متميز. اتصل بنا الآن لمزيد من التفاصيل!
                </Typography> */}





              <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
              >
                  <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                  <TextField id="outlined-basic" label="الاسم" variant="outlined" size="small" />

                  </Grid>
                  <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                  <TextField
                id="outlined-basic"
                label="الايميل"
                variant="outlined"
              />
                  </Grid>
                  <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                  <TextField
                id="outlined-basic"
                label="رقم الجوال"
                variant="outlined"
              />
                  </Grid>
                  <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                  <TextField
                id="outlined-basic"
                label="العنوان"
                variant="outlined"
              />
                  </Grid>
                  <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                  <TextField
                id="outlined-basic"
                label="كلمة المرور"
                variant="outlined"
              />
                  </Grid>
                  <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                  <TextField
                id="outlined-basic"
                label="رقم رخصة فال"
                variant="outlined"
              />
                  </Grid>
              </Grid>
              <div style={{display:'flex', justifyContent:'center', marginTop:'20px'}}>

              <Button variant="contained" color="primary" size="medium"> 
                حفظ
              </Button>
              </div>
            </CardContent>
        </>
    );
}