import React, { useState } from 'react';
import { TextField, Button, Container, Box, Typography } from '@mui/material';
import axios from 'axios';
import { useAuthStore } from '../store/authStore'; // إذا كنت تستخدم Zustand أو أي State Manager آخر
import toast from 'react-hot-toast';
import { Navigate, useNavigate } from 'react-router-dom';

const ChangePass = ({close}) => {
    const navigate = useNavigate();
  const { user } = useAuthStore(); // جلب بيانات المستخدم من الـ Store
  const [form, setForm] = useState({
    userId: user._id,
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.newPassword !== form.confirmNewPassword) {
      toast.error('كلمتا المرور الجديدتان غير متطابقتين.');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.put('/api/auth/changePass', form);
      toast.success(response.data.message);
        close()
      
      setForm({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      });
    } catch (error) {
      toast.error(error.response?.data?.message || 'حدث خطأ ما.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={4} p={3} borderRadius={2} boxShadow={3} bgcolor="white">
        <Typography variant="h5" mb={3}>
          تغيير كلمة المرور
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="كلمة المرور الحالية"
            name="currentPassword"
            type="password"
            value={form.currentPassword}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="كلمة المرور الجديدة"
            name="newPassword"
            type="password"
            value={form.newPassword}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="تأكيد كلمة المرور الجديدة"
            name="confirmNewPassword"
            type="password"
            value={form.confirmNewPassword}
            onChange={handleChange}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? 'جاري التحديث...' : 'تغيير كلمة المرور'}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default ChangePass;
