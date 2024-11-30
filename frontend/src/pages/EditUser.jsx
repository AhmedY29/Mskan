import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Box, Typography, Avatar } from '@mui/material';
import { useAuthStore } from '../store/authStore';
import Loading from '../components/Loading';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const EditUser = ({close}) => {
    const {user , isLoading } = useAuthStore();
    const [userEdit, setUserEdit] = useState({
    name: user.name||'',
    email: user.email ||'',
    phoneNumber: user.phoneNumber || '',
    avatar: user?.avatar || '',
    license: user.license || '',
    address: user.address || '',
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  // التعامل مع التغييرات في الحقول
  const handleChange = (e) => {
    setUserEdit({ ...userEdit, [e.target.name]: e.target.value });
  };

  // إرسال البيانات المُحدثة
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.put(`/api/auth/user/${user._id}`, userEdit);
      close()
      toast.success('تم تعديل بيانات الحساب بنجاح')
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
      <Box mt={4} p={3} borderRadius={2} boxShadow={3} bgcolor="white">
        <Typography variant="h5" mb={3}>
         تعديل بيانات الحساب  
        </Typography>
        {loading ? (
           <Loading/>
        ) : (
          <form onSubmit={handleSubmit}>

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
                      setUserEdit({
                        ...userEdit,
                        avatar: reader.result,
                      });
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </Button>
            {userEdit.avatar && (
              <Avatar
                src={userEdit.avatar}
                alt={userEdit.name}
                sx={{ mt: 2, width: 70, height: 70 }}
              />
            )}
            </Box>
            <TextField
              fullWidth
              margin="normal"
              label="اسم المستخدم"
              name="name"
              value={userEdit.name}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="البريد الالكتروني"
              name="email"
              type="email"
              value={userEdit.email}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="رقم  الجوال"
              name="phoneNumber"
              value={userEdit.phoneNumber}
              onChange={handleChange}
            />
            
            <TextField
              fullWidth
              margin="normal"
              label="رقم رخصة فال"
              name="license"
              value={userEdit.license}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="العنوان"
              name="address"
              value={userEdit.address}
              onChange={handleChange}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              disabled={loading}
            >
              حفظ 
            </Button>
          </form>
        )}
      </Box>
    </Container>
  );
};

export default EditUser;
