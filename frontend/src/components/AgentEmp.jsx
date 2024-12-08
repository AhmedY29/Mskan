import { Box, Button, CardActions, CardContent, Dialog, DialogActions, DialogTitle, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Divider from "@mui/material/Divider";
import { useState } from "react";

// icons
import BedOutlinedIcon from "@mui/icons-material/BedOutlined";
import BathtubOutlinedIcon from "@mui/icons-material/BathtubOutlined";
import ChairOutlinedIcon from "@mui/icons-material/ChairOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import IconButton from "@mui/material/IconButton";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import CardProperties from "./CardProperties";
import { useEffect } from "react";
import Loading from "./Loading";
import toast from "react-hot-toast";
import { useAgentStore } from "../store/agentStore";
import { useAuthStore } from "../store/authStore";

export default function AgentEmp({}) {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [nameEmp, setNameEmp] = useState('');
  const [openAdd, setOpenAdd] = useState(false);
  const {deleteEmpFromAgent , editEmpOnAgent , isLoading , agent , error , addEmpToAgent , getAgent } =useAgentStore();
  const {user} =useAuthStore();
  const {name} = useParams()

  const handleOpenAdd = () =>{
    setOpenAdd(true);
  }
  const handelCloseAdd = () =>{
    setOpenAdd(false);
  }
  const handleOpenEdit = () =>{
    setOpenEdit(true);
  }
  const handelCloseEdit = () =>{
    setOpenEdit(false);
  }
  // TO DO: 3dlh

  useEffect(() => {
    getAgent(name)
  }, [getAgent])
  

  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null); // لتخزين قيمة usera._id

  // لفتح الديالوج وتخزين usera._id
  const handleOpenDelete = (employeeId) => {
    setSelectedEmployeeId(employeeId);
    setOpenDelete(true);
  };

  // لإغلاق الديالوج
  const handleCloseDelete = () => {
    setOpenDelete(false);
    setSelectedEmployeeId(null); // إعادة تعيين القيمة بعد الإغلاق
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('name', nameEmp);
      await addEmpToAgent(agent._id , nameEmp);
      toast.success(`تم اضافة الموظف ${nameEmp} بنجاح`);
      setOpenAdd(false)
    } catch (err) {
      toast.error(err, error)
    }
  };

  const navigate = useNavigate();
    
  console.log('sssssa',agent)

  if(isLoading){
    return <Loading />
  }

  return (
    <>
      <CardContent style={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="h6" component="div" sx={{ marginBottom: "40px" }}>
          العقارات المحفوظة
        </Typography>

        <Button variant="text" onClick={handleOpenAdd}  >اضافة موظف جديد</Button>
        {/* <Typography  component="div" sx={{ marginBottom: "40px" }}>
          {savedProperties.length} عقار
        </Typography>

        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {isLoading ? <Loading/> :
            savedProperties?.map((item) => (
             <CardProperties key={item._id} displaySwitch={'list'} property={item} />
            ))
          }
        </Grid> */}
        {
            agent.employees.map((usera) =>{
                return (
                     <Card key={usera._id} sx={{ display: 'flex' ,marginTop:'10px' , marginBottom:'10px', justifyContent:'space-between' }}>
                      <CardMedia
                       component="img"
                       sx={{ width: 70 }}
                       image={usera.userId.avatar}
                       alt={usera.name}
                     />
                     <Box sx={{ display: 'flex', flexDirection: 'column' }}>

                       <CardContent sx={{ flex: '1 0 auto' }}>
                         <Typography component="div" variant="h5">
                         {usera.userId.name}
                         </Typography>

                       </CardContent>
                     </Box>
                     <Typography
                           variant="subtitle1"
                           component="div"
                           sx={{ color: 'text.secondary' , display: 'flex' , alignItems: 'center' }}
                         >
                           {usera.role == 'owner' ? 'المالك' : user.role == 'employee' ? 'موظف' : ''}
                         </Typography>
                     <CardActions>
                      <Button variant="text" color="primary" onClick={handleOpenEdit}>
                        تعديل
                      </Button>
                      <Button variant="text" color="error" onClick={() => {handleOpenDelete(usera._id)}}>
                        حذف
                      </Button>
                     </CardActions>
                  <Divider sx={{marginTop:'20px' , marginBottom:'20px'}} />
                   </Card>
                )
            })
        }
        
      </CardContent>
      <Dialog open={openDelete} onClose={handleCloseDelete} sx={{direction:'rtl'}}>
      <DialogTitle id="alert-dialog-title">
          هل انت متأكد من حذف الموظف؟
        </DialogTitle>

        <DialogActions>
          <Button onClick={handleCloseDelete}>لا</Button>
          <Button disabled={isLoading} onClick={() =>{
                  deleteEmpFromAgent(user.agent_Id._id, selectedEmployeeId); // تمرير selectedEmployeeId للحذف
                  toast.success('تم حذف الموظف بنجاح');
                  handleCloseDelete();}} >
            نعم
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openAdd}>
            <Box
              sx={{
                maxWidth: 600,
                margin: "auto",
                mt: 4,
                p: 3,
                border: "1px solid #ddd",
                borderRadius: 2,
              }}
            >
              <Typography variant="h5" align="center" gutterBottom>
                التحويل إلى حساب منشأة
              </Typography>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      label="الاسم"
                      name="name"
                      fullWidth
                      value={nameEmp}
                      onChange={(e) => setNameEmp(e.target.value)}
                      required
                    />
                  </Grid>

                  <Grid item xs={12} display="flex" justifyContent="space-between">
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={isLoading}
                      sx={{ px: 4 }}
                    >
                      {isLoading ? <CircularProgress/> :'إضافة'}
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={handelCloseAdd}
                      sx={{ px: 4 }}
                    >
                      إلغاء
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Box>
        </Dialog>
    </>
  );
}
