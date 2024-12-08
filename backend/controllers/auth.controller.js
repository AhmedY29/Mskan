import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import crypto from "crypto";
import { generateTokenAndCookie } from "../utils/generateTokenAndSetCookie.js";
import { sendResetEmail, sendResetEmailSuccess, sendVerificationEmail, sendWelcomeEmail } from "../mailtrap/emails.js";
import cloudinary from "../config/cloudinary.js";

export const register = async (req, res) => {
  const { name, email, password} = req.body;

  try {
    if (!email || !name || !password) {
      throw new Error("يجب عليك ملئ جميه الحقول");
    }
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res
        .status(400)
        .json({ success: false, message: "البريد الالكتروني موجود بالفعل" });
    }
    const userExists = await User.findOne({ name });
    if (userExists) {
      return res
        .status(400)
        .json({ success: false, message: "اسم المستخدم موجود بالفعل" });
    }

    const hashPassword = await bcryptjs.hash(password, 10);
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    const user = new User({
      name,
      email,
      password: hashPassword,
      verificationToken,
      verificationTokenExpired: Date.now() + 24 * 60 * 60 * 1000 //24 hours
    });

    await user.save();
    generateTokenAndCookie(res , user._id);
    await sendVerificationEmail(user.email , verificationToken)

    res.status(201).json({
        success: true,
        message: "User registered successfully",
        user:{
            ...user._doc,
            password:undefined,
        }
    })
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  const { code } = req.body;
  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpired: { $gt: Date.now() }
    })
    if (!user){
      return res.status(400).json({success: false , message:'Invalid or expired verification code'})
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpired = undefined;
    await user.save();
    res.status(200).json({success:true, message:"Email verified successfully", user:{
      ...user._doc,
      password:undefined,
    }});
    await sendWelcomeEmail(user.email, user.name)
  } catch (error) {
    
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email}).populate('agent_Id')
    if(!user){
      return res.status(400).json({success: false, message:'Invalid email or password'})
    }
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if(!isPasswordValid){
      return res.status(400).json({success: false, message:'Invalid email or password'})
    }

    generateTokenAndCookie(res, user._id)
    res.status(200).json({success: true, message:'Logged in successful', user:{
      ...user._doc,
      password:undefined,
    }})
  } catch (error) {
    console.log('Error in Login', error)
    res.status(400).json({success: false, message:error.message});
  }
};

export const logout = async (req, res) => {
  res.clearCookie('token');
  res.status(200).json({success: true, message:'Logged out successful'});
};

export const forgotPassword = async (req, res) =>{
  const { email } = req.body
  try {
    const user = await User.findOne({ email});
    if(!user){
      return res.status(400).json({success: false, message:'email not found'})
    }

    const resetToken = crypto.randomBytes(16).toString("hex");
    const resetTokenExpired = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpired = resetTokenExpired;
    await user.save();

    await sendResetEmail(user.email, `${process.env.CLIENT_URL}/resetPassword/${resetToken}`);
    res.status(200).json({success: true, message:'Reset password link sent successfully'})
  } catch (error) {
    console.log("Error in reset password", error);
    res.status(400).json({success: false, message: error.message});
  }
};

export const resetPassword = async (req, res) => {
  try {
    const {token} = req.params;
    const { newPassword } = req.body;
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpired: { $gt: Date.now() }
    });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid or expired reset password token' });
    }
    const hashedPassword = await bcryptjs.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpired = undefined;
    await user.save();
    await sendResetEmailSuccess(user.email);
    res.status(200).json({ success: true, message: 'Password reset successful' });
  } catch (error) {
    console.log("Error in reset password", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const checkAuth = async (req , res) =>{
  try {
    const user = await User.findById(req.userId).populate('agent_Id').select('-password');
    if(!user){
      return res.status(401).json({success: false, message:'User not found'})
    }
    res.status(200).json({success: true, user })
  } catch (error) {
    console.log('Error in checkAuth', error)
    res.status(400).json({success: false, message: error.message});
    
  }
}
export const getUser = async (req , res) =>{
    const {name} = req.params
  try {
    
    const user = await User.findOne({name}).select('-password');

  //   if (loggedInUserId != user._id) {

  //     return res.status(403).json({
  //         success: false,
  //         message: "غير مصرح لك بالوصول إلى بيانات هذا الحساب"
  //     });
  // }
    if(!user){
      return res.status(401).json({success: false, message:'الحساب غير موجود'})
    }
    res.status(200).json({success: true, user })
  } catch (error) {
    res.status(400).json({success: false, message: error.message});
    
  }
}

export const getEditUser = async (req, res) => {
 
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
}

export const editUser = async (req, res) => {
  const updates = req.body; // البيانات المُحدثة تأتي من الطلب
  let avatarUrl = "";

  if (updates.avatar) {
      const avatarPhotoResult = await cloudinary.uploader.upload(updates.avatar, {
        folder: updates.name,
      });
      avatarUrl = avatarPhotoResult.secure_url;
    }

  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, {...updates, avatar: avatarUrl}, { new: true, runValidators: true });
    if (!updatedUser) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
}

export const changePass = async (req, res) => {
  try {
    const form = req.body;
    // التحقق من صحة البيانات
    if (!form.userId || !form.currentPassword || !form.newPassword) {
      return res.status(400).json({ message: 'يرجى تعبئة جميع الحقول.' });
    }

    // جلب المستخدم من قاعدة البيانات
    const user = await User.findById(form.userId);
    if (!user) {
      return res.status(404).json({ message: 'المستخدم غير موجود.' });
    }

    // التحقق من كلمة المرور الحالية
    const isMatch = await bcryptjs.compare(form.currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'كلمة المرور الحالية غير صحيحة.' });
    }

    // تحديث كلمة المرور الجديدة
    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(form.newPassword, salt);
    await user.save();

    res.status(200).json({ message: 'تم تغيير كلمة المرور بنجاح.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'حدث خطأ في الخادم.' });
  }
};