import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Box, Typography, Avatar, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { useAuthStore } from '../store/authStore';
import Loading from '../components/Loading';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAgentStore } from '../store/agentStore';
import { useEffect } from 'react';

const EditAgent = ({close}) => {
    const {user} = useAuthStore();
    const {agent , getAgent , isLoading , editAgent } = useAgentStore();
    const [selectedRegions, setSelectedRegions] = useState([]);
    const [agentEdit, setAgentEdit] = useState({
    name: agent.name||'',
    avatar: agent?.avatar || '',
    license: agent.license || '',
    location: agent.location || '',
    description: agent.description || '',
  });

  useEffect(() => {
    setSelectedRegions(agentEdit.location)
  }, [isLoading])

  useEffect(() => {
    setAgentEdit({...agentEdit , location: selectedRegions})
  }, [isLoading,selectedRegions])
  

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
  
  
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  // التعامل مع التغييرات في الحقول
  const handleChange = (e) => {
    setAgentEdit({ ...agentEdit, [e.target.name]: e.target.value });
  };

  // إرسال البيانات المُحدثة
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      // await axios.put(`/api/auth/user/${user._id}`, agentEdit);
      await editAgent(agent._id , agentEdit )
      await getAgent(agentEdit.name)
      close()
      toast.success('تم تعديل بيانات الشركة بنجاح')
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('حدث خطا في تعديل البيانات حاول لاحقًا')
    } finally {
      setLoading(false);
    }

    if(isLoading){
        <Loading/>
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
  sx={{
    maxWidth: 600,
    margin: "auto",
    mt: 4,
    p: 3,
    border: "1px solid #ddd",
    borderRadius: 2,
  }}>
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
                  setAgentEdit({
                    ...agentEdit,
                    avatar: reader.result,
                  });
                };
                reader.readAsDataURL(file);
              }
            }}
          />
        </Button>
        {agentEdit.avatar && (
          <Avatar
            src={agentEdit.avatar}
            alt={agentEdit.name}
            sx={{ mt: 2, width: 70, height: 70 }}
          />
        )}
      </Box>

      {/* الاسم */}
      <TextField
        label="الاسم"
        name="name"
        fullWidth
        value={agentEdit.name}
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
        value={agentEdit.description}
        onChange={handleChange}
        required
      />

      {/* رخصة المنشأة */}
      <TextField
        label="رخصة المنشأة"
        name="license"
        fullWidth
        value={agentEdit.license}
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
          {loading ? <CircularProgress size={24} /> : "تحديث"}
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

    </Container>
  );
};

export default EditAgent;
