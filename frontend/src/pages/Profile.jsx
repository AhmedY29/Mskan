import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Dialog,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
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
      location: "",
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

    const [selectedRegions, setSelectedRegions] = useState([]);

    // قائمة المناطق
    const saudiRegions = [
      "الرياض",
      "مكة المكرمة",
      "المدينة المنورة",
      "القصيم",
      "المنطقة الشرقية",
      "عسير",
      "تبوك",
      "حائل",
      "الحدود الشمالية",
      "جازان",
      "نجران",
      "الباحة",
      "الجوف",
    ];
  
    // دالة تحديث المناطق المختارة
    const handleChangeAddress = (event) => {
      const {
        target: { value },
      } = event;
      setSelectedRegions(typeof value === "string" ? value.split(",") : value);
    };
    
    useEffect(() => {
      setFormData({...formData , location: selectedRegions})
    }, [selectedRegions])
    
    console.log(selectedRegions)
    console.log(formData)
    

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
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {/* رفع الصورة */}
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Button variant="outlined" component="label" sx={{ mt: 1 }}>
          رفع الصورة الشخصية
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
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

      {/* الاسم */}
      <TextField
        label="الاسم"
        name="name"
        fullWidth
        value={formData.name}
        onChange={handleChange}
        required
      />

      {/* العناوين */}
      <FormControl sx={{maxWidth:'240px'}}>
        <InputLabel id="multi-select-label">اختر المناطق</InputLabel>
        <Select
          labelId="multi-select-label"
          id="multi-select"
          multiple
          value={selectedRegions}
          onChange={handleChangeAddress}
        >
          {saudiRegions.map((region) => (
            <MenuItem key={region} value={region}>
              {region}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* عرض قائمة المناطق المختارة */}
      {selectedRegions.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <strong>المناطق المختارة:</strong>
          <ul>
            {selectedRegions.map((region) => (
              <li key={region}>{region}</li>
            ))}
          </ul>
        </Box>
      )}

      {/* نبذة عن الشركة */}
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

      {/* رخصة المنشأة */}
      <TextField
        label="رخصة المنشأة"
        name="license"
        fullWidth
        value={formData.license}
        onChange={handleChange}
        required
      />

      {/* الأزرار */}
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={loading}
          sx={{ px: 4 }}
        >
          {loading ? <CircularProgress size={24} /> : "إضافة"}
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => setOpen(false)}
          sx={{ px: 4 }}
        >
          إلغاء
        </Button>
      </Box>
    </Box>
  </form>
</Box>

        </Dialog>
      </Container>
    </>
  );
}
