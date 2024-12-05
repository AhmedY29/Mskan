import {
    Button,
    CardContent,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    Typography,
  } from "@mui/material";
  import Grid from "@mui/material/Grid2";
import { useState } from "react";
import EditUser from "../pages/EditUser";
import ChangePass from "./ChangePass";
import axios from "axios";

export default function AgentProfile({agent}){

  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleOpenEdit = () => {
    setOpenEdit(true);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };
  const handleOpenDelete = () => {
    setOpenDelete(true);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };
  const [openChangePass, setOpenChangePass] = useState(false);

  const handleRemoveAgent = async () => {
    await axios.delete(`/api/agent/agents/${id}`);
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
                  <TextField id="outlined-basic" label="الاسم" value={agent.name} variant="outlined" size="small" />

                  </Grid>
                  <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                  <TextField
                id="outlined-basic"
                label="العنوان"
                value={agent.address || ""}
                variant="outlined"
              />
                  </Grid>
                 
                  <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                  <TextField
                id="outlined-basic"
                label="رقم رخصة فال"
                value={agent.license || ""}
                variant="outlined"
              />
                  </Grid>
                  <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                  <TextField
                id="outlined-basic"
                label="نبذة عن الشركة"
                value={agent.description || ""}
                variant="outlined"
              />
                  </Grid>
              </Grid>
              <div style={{display:'flex', justifyContent:'center', marginTop:'20px'}}>

              <Button onClick={handleOpenEdit} variant="contained" color="primary" size="medium"> 
                تعديل البيانات
              </Button>
              <Button sx={{marginRight:'20px'}} onClick={handleOpenDelete} variant="contained" color="error" size="medium"> 
                   حذف ملف الشركة
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
      <Dialog open={openDelete} onClose={handleCloseDelete} sx={{direction:'rtl'}}>
      <DialogTitle id="alert-dialog-title">
          هل انت متأكد من حذف ملف الشركة؟
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ملاحظة في حال الحذف لن تتمكن من اعادة ملف الشركة مرة اخرى!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete}>لا</Button>
          <Button onClick={() =>{
                  handleRemoveAgent();
                  return navigate("/"), toast.success("تم حذف ملف الشركة بنجاح")}} >
            نعم
          </Button>
        </DialogActions>
      </Dialog>
        </>
    );
}