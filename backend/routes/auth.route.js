import express from 'express';
import { login, logout, register , verifyEmail, forgotPassword,resetPassword, checkAuth, getUser, editUser, getEditUser, changePass} from '../controllers/auth.controller.js';
import { verifyToken } from '../middlware/verifyToken.js';

const router = express.Router();

router.get('/checkAuth', verifyToken , checkAuth);
router.get('/profile/:name', getUser);
router.post('/register', register )
router.post('/verifyEmail', verifyEmail )
router.post('/logout', logout )
router.post('/login', login )
router.post('/forgotPassword', forgotPassword )
router.post('/resetPassword/:token', resetPassword )
router.get('/user/:id', getEditUser);
router.put('/changePass', verifyToken, changePass);
  // تحديث بيانات المستخدم
  router.put('/user/:id', editUser);
// router.post('/login', createProperty )


export default router;