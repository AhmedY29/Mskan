import {
    Button,
    CardContent,
    TextField,
    Typography,
  } from "@mui/material";
  import Grid from "@mui/material/Grid2";

export default function UserProfile({user}){

    return(
        <>
                        <CardContent style={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="h6" component="div" sx={{marginBottom:'40px'}}>
                المعلومات الشخصية
              </Typography>
              <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
              >
                  <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                  <TextField id="outlined-basic" label="الاسم" value={user.name} variant="outlined" size="small" />

                  </Grid>
                  <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                  <TextField
                id="outlined-basic"
                label="الايميل"
                variant="outlined"
                value={user.email}
              />
                  </Grid>
                  <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                  <TextField
                id="outlined-basic"
                label="رقم الجوال"
                value={user.phoneNumber || ""}
                variant="outlined"
              />
                  </Grid>
                  <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                  <TextField
                id="outlined-basic"
                label="العنوان"
                value={user.address || ""}
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
                value={user.license || ""}
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