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
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AgentProfile({agent}){

  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const navigate = useNavigate()

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
    await axios.delete(`/api/agent/agents/${agent._id}`);
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
                  <Typography variant="p" component="div" >
                 الاسم:
                </Typography>
                  <Typography variant="p" component="div" sx={{marginBottom:'40px'}}>
                 {agent.name}
                </Typography>
                  </Grid>
                  <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                <Typography variant="p" component="div" >
                 رخصة فال:
                </Typography>
                <Typography variant="p" component="div" sx={{marginBottom:'40px'}}>
                 {agent.license}
                </Typography>
                  </Grid>
                  <Grid size={{ xs: 2, sm: 4, md: 4 }}>
              <Typography sx={{marginRight:'20px'}} variant="p" component="div">
                 مناطق العمل:
                </Typography>
              <Typography variant="p" component="div" sx={{marginBottom:'40px' , marginRight:'20px'}}>
                 {agent.location.map(location => `${location},`) || ""}
                </Typography>
                  </Grid>
                  <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                <Typography variant="p" component="div" >
                 رخصة فال:
                </Typography>
                <Typography variant="p" component="div" sx={{marginBottom:'40px'}}>
                 {agent.license || ""}
                </Typography>
                  </Grid>
                  <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                <Typography variant="p" component="div" >
                  نبذة عن الشركة:
                </Typography>
                <Typography variant="p" component="div" sx={{marginBottom:'40px'}}>
                 {agent.description || ""}
                </Typography>
                  </Grid>
                  <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                <Typography variant="p" component="div" >
                  تاريخ الانضمام:
                </Typography>
                <Typography variant="p" component="div" sx={{marginBottom:'40px'}}>
                 {new Date(agent.createdAt).toLocaleDateString("ar-EG", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",}) || ""}
                </Typography>
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