import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Dialog,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Grid from '@mui/material/Grid2'
import UserProfile from "../components/UserProfile";
import UserProperties from "../components/UserProperties";
import UserSave from "../components/UserSave";
import UserChat from "../components/UserChat";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import {  useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";
import Loading from "../components/Loading";
import axios from "axios";
import toast from "react-hot-toast";
import { useAgentStore } from "../store/agentStore";

export default function Profile() {
    const [displayName, setDisplayName] =useState('personal');
    const [open, setOpen] =useState(false);
    const [loading, setLoading] =useState(false);
    const {addAgent} =useAgentStore();
    const [formData, setFormData] = useState({
      name: "",
      address: "",
      description: "",
      license: "",
      avatar:'',
    });
  
    // التعامل مع تغيير البيانات
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    // التعامل مع الإرسال
    const handleSubmit = (e) => {
      e.preventDefault();
      try {
        setLoading(true);
        addAgent(formData);
        toast.success(`تم انشاء شركة عقارية بـ اسم ${formData.name}`)
      } catch (error) {
        console.error('Error updating user:', error);
        toast.error('حدث خطا في تعديل البيانات حاول لاحقًا')
      } finally {
        setLoading(false);
        setOpen(false); 
      }
    };
    const {name} = useParams()
    const navigate = useNavigate()
    
    const { isLoading , user } = useAuthStore();

    useEffect(() => {
      if (user.name !== name ){
        navigate(`/profile/${user.name}`)
      }
    }, [user , name])
    

    if(isLoading){<Loading/>}
  return (
    <>
      <Container fixed>
        <h1>الملف الشخصي</h1>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Avatar
            sx={{ width: 70, height: 70 }}
            alt={user.name}
            src={user.avatar || ''}
          />
          <Typography variant="h6" component="div">
            {" "}
            {user.name}
          </Typography>
          <Typography variant="p" component="div">
            {user.agent_Id ? 'عضو في شركة' : 'مسوق فرد'}
          </Typography>
          <Button onClick={() => setOpen(true)} variant="text">التحويل الى حساب منشأة</Button>
          <Stack
            sx={{
              marginTop: "30px",
              border: "1px solid black ",
              borderRadius: "10px",
              display: "flex",
              justifyContent: "space-between",
              width: "85%",
            }}
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={2}
          >
            <Button onClick={()=> setDisplayName('personal')}>المعلومات الشخصية</Button>
            <Button onClick={()=> setDisplayName('list')}>العقارات </Button>
            <Button onClick={()=> setDisplayName('save')}>العقارات المحفوظة</Button>
            {/* <Button onClick={()=> setDisplayName('chat')}>المحادثات</Button> */}
          </Stack>

          <Card
            sx={{
              minWidth: 275,
              backgroundColor: "#F6F6F6",
              marginTop: "30px",
              width: "85%",
            }}
          >
                
            

            {
                displayName == 'list' ? <UserProperties user={user}/> : displayName == 'save' ? <UserSave/> : displayName == 'chat' ? <UserChat/> : <UserProfile user={user}/>
            }
            
          </Card>
        </div>
        <Dialog open={open}>
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
                  {/* الاسم */}
                  <Grid item xs={12}>
                  <Box sx={{display:'flex' , justifyContent:'center'}}>
                        <Button
                        variant="outlined"
                        component="label"
                        sx={{ mt: 1 }}
                      >
                        رفع الصورة الشخصية
                        <input
                          type="file"
                          accept="image/*"
                          hidden
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              // التأكد من نوع الملف وحجمه
                              if (file.size > 2 * 1024 * 1024) {
                                toast.error("حجم الصورة يجب أن يكون أقل من 2 ميجابايت");
                                return;
                              }

                              const reader = new FileReader();
                              reader.onload = () => {
                                setFormData({
                                  ...formData,
                                  avatar: reader.result,
                                });
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                      </Button>
                      {formData.avatar && (
                        <Avatar
                          src={formData.avatar}
                          alt={formData.name}
                          sx={{ mt: 2, width: 70, height: 70 }}
                        />
                      )}
                      </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="الاسم"
                      name="name"
                      fullWidth
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </Grid>

                  {/* العناوين */}
                  <Grid item xs={12}>
                    <TextField
                      label="العناوين"
                      name="address"
                      fullWidth
                      value={formData.address}
                      onChange={handleChange}
                      required
                    />
                  </Grid>

                  {/* نبذة عن الشركة */}
                  <Grid item xs={12}>
                    <TextField
                      label="نبذة عن الشركة"
                      name="description"
                      fullWidth
                      multiline
                      rows={4}
                      value={formData.description}
                      onChange={handleChange}
                      required
                    />
                  </Grid>

                  {/* رخصة المنشأة */}
                  <Grid item xs={12}>
                    <TextField
                      label="رخصة المنشأة"
                      name="license"
                      fullWidth
                      value={formData.license}
                      onChange={handleChange}
                      required
                    />
                  </Grid>

                  {/* الأزرار */}
                  <Grid item xs={12} display="flex" justifyContent="space-between">
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={loading}
                      sx={{ px: 4 }}
                    >
                      {loading ? <CircularProgress/> :'إضافة'}
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => setOpen(false)}
                      sx={{ px: 4 }}
                    >
                      إلغاء
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Box>
        </Dialog>
      </Container>
    </>
  );
}
