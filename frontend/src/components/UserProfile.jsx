import {
    Button,
    CardContent,
    Dialog,
    TextField,
    Typography,
  } from "@mui/material";
  import Grid from "@mui/material/Grid2";
import { useState } from "react";
import EditUser from "../pages/EditUser";
import ChangePass from "./ChangePass";

export default function UserProfile({user}){

  const [openEdit, setOpenEdit] = useState(false);

  const handleOpenEdit = () => {
    setOpenEdit(true);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };
  const [openChangePass, setOpenChangePass] = useState(false);

  const handleOpenChangePass = () => {
    setOpenChangePass(true);
  };
  const handleCloseChangePass = () => {
    setOpenChangePass(false);
  };

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

              <Button onClick={handleOpenEdit} variant="contained" color="primary" size="medium"> 
                تعديل البيانات
              </Button>
              <Button onClick={handleOpenChangePass} variant="contained" color="primary" size="medium"> 
                 تغيير كلمة المرور
              </Button>
              </div>
            </CardContent>

            <Dialog
            open={openEdit}
            onClose={handleCloseEdit}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
        <EditUser close={handleCloseEdit}/>
      </Dialog>
            <Dialog
            open={openChangePass}
            onClose={handleCloseChangePass}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
        <ChangePass close={handleCloseChangePass}/>
      </Dialog>
        </>
    );
}