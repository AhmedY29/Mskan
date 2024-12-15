import { Box, Button, CardActions, CardContent, Dialog, DialogActions, DialogTitle, Menu, MenuItem, TextField, Typography } from "@mui/material";
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
  const [error, setError] = useState('');
  const [nameEmpa, setNameEmpa] = useState('');
  const [openAdd, setOpenAdd] = useState(false);
  const {deleteEmpFromAgent , editEmpOnAgent , isLoading , agent , addEmpToAgent , getAgent } =useAgentStore();
  const {users , getUsers , user} =useAuthStore();
  const {name} = useParams()
  const [anchorEl, setAnchorEl] = useState(null);
  const openedit = Boolean(anchorEl);
  const handleClickEdit = (event , id) => {
    const roles = user.agent_Id.employees.map(emp => emp).filter(emp =>emp.userId == user._id).map(emp => emp.role == 'admin' || emp.role == 'owner')
    if(roles[0] != false){
      console.log(event , event.currentTarget)
      setSelectedEmployeeId(id)
      setAnchorEl(event.currentTarget);
    }else{
      toast.error('لاتوجد صلاحية')

    }
    console.log(roles)

  };
  const handleCloseEdit = () => {
    setAnchorEl(null);
  };

  const handelEditRole = async (roleUpdated) => {
    let roles
    console.log('handelEditRole', roleUpdated  , 'selected', selectedEmployeeId);
    const role = agent.employees.map(emp => emp).filter(emp => emp._id == selectedEmployeeId).map(emp =>emp.role)
    if(role == 'owner'){
      toast.error('لا توجد صلاحية');
      return;
    }else{
      if(roleUpdated == 'مشرف' )roles = 'admin';
      if(roleUpdated == 'موظف' )roles = 'employee';
      await editEmpOnAgent(agent._id , selectedEmployeeId , roles)
      await getAgent(name)
      toast.success('تم تعديل الصلاحية بنجاح');
      console.log('================================================================')
    }
    console.log('handelEditRole', role)
  }
  const handelId = (id) => {
    setSelectedEmployeeId(id);
    console.log('handelEditRole', selectedEmployeeId);
  }
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
  useEffect(() => {
    getUsers()
  }, [])

  console.log('users' , users)

  
  

  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null); 

  // لفتح الديالوج وتخزين usera._id
  const handleOpenDelete = (employeeId) => {
    setSelectedEmployeeId(employeeId);
    console.log('emp' , employeeId)
    const role = agent.employees.map(emp => emp).filter(emp => emp.userId._id == user._id).map(emp => emp.role)
    if(role == 'employee') {
     toast.error('لا توجد صلاحية')}else{
    setOpenDelete(true);
     }
  };

  // لإغلاق الديالوج
  const handleCloseDelete = () => {
    setOpenDelete(false);
    setSelectedEmployeeId(null);
  };

  useEffect(() => {
    const usersa =  users?.map(user => user).filter(user => {return user.name == nameEmp })
    setNameEmpa(usersa)
    console.log('usersa', usersa)
  },[nameEmp])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('')
    try {
      console.log('name', nameEmp);
      console.log('nameش', nameEmpa);
      console.log('nameشسسش', nameEmpa.map(user => user.agent_Id) == [undefined]);
      console.log('كم فيها', nameEmpa.map(user => user.agent_Id).length);
      console.log(' gggكم فيها', nameEmpa.map(user => user.agent_Id));
      console.log('شنو النتيجة ', nameEmpa.map(user => user.agent_Id)[0] != undefined);

      if(nameEmpa.length == 0){
        setError(`${nameEmp} غير موجود`)
        return toast.error(`${nameEmp} غير موجود`)
      }
      const isInAgent = nameEmpa.map(user => user.agent_Id)[0]
      if(isInAgent != undefined || isInAgent != null){
        setError(`${nameEmp}  لديه شركة`)
        return toast.error(`${nameEmp}  لديه شركة`)
      }
      const agent_Id = agent._id;
      const data = {
        agent_Id,
        name:nameEmp
      }
      console.log(data)
      await axios.post(`/api/reqAgent`, data)
      toast.success(`تم اضافة طلب للموظف ${nameEmp} بنجاح`);
      setOpenAdd(false)
    } catch (err) {
      toast.error(err, error)
    }
  };
  const handleDelete = async () => {
    try {
      await deleteEmpFromAgent(agent._id, selectedEmployeeId);
      toast.success('تم حذف الموظف بنجاح');
      handleCloseDelete();
      await getAgent(name)
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

        {user.agent_Id.employees.map(emp => emp).filter(emp =>emp.userId == user._id).map(emp => emp.role == 'admin' || emp.role == 'owner')[0] &&
          <Button variant="text" onClick={handleOpenAdd}  >اضافة موظف جديد</Button>}
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
            agent.employees?.map((usera) =>{
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
                           {usera.role == 'owner' ? 'المالك' : usera.role == 'admin' ? 'مشرف' : 'موظف'}
                         </Typography>
                     <CardActions>
                      <Button variant="text" color="primary" onClick={(e)=>{

                          handleClickEdit(e , usera._id)}
                        }>
                        تعديل
                      </Button>
                        <Menu
                          id="basic-menu"
                          anchorEl={anchorEl}
                          open={openedit}
                          onClose={handleCloseEdit}
                          MenuListProps={{
                            'aria-labelledby': 'basic-button',
                          }}
                        >
                          <MenuItem value={'مشرف'} onClick={()=>handelEditRole('مشرف')} >
                           مشرف
                          </MenuItem>
                          <MenuItem value={'موظف'} onClick={()=>handelEditRole('موظف')} >
                          موظف
                          </MenuItem>
                        </Menu>
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
          <Button disabled={isLoading} onClick={handleDelete} >
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
                   اضافة موظف جديد
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
                      error={!!error}
                      helperText={error}
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
