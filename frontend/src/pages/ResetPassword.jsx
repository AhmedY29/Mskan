import * as React from "react";
import "../style.css";
import {
  Button,
  Card,
  CardContent,
  Divider,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useAuthStore } from "../store/authStore.js";
import toast from "react-hot-toast";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const { isLoading , resetPassword  , error , message} = useAuthStore();

  const {token} = useParams();

  async function handleSubmit(e){
    e.preventDefault();

    if(newPassword!==confirmPassword){
      return toast.error("كلمتا المرور غير متطابقتان");
    }
    try {
        await resetPassword(token , newPassword);
        toast.success("تم تحديث كلمة المرور بنجاح، سيتم اعادة توجيهك لصفحة الدخول ...")
        setTimeout(() => {
            navigate("/auth")
        }, 2000);
    } catch (error) {
        console.error(error);
        toast.error(error.message ||"حدث خطأ ما، حاول مجددا");
    }
  }
  return (
    <div
      className="hero-img"
      style={{
        direction: "rtl",
        height: "91vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card sx={{minWidth:450}}>
        <CardContent>
            <div>
              <Typography sx={{display:'flex' , justifyContent:'center' , marginBottom:'5px'}} variant="h5" component={"div"}>
                 إعادة كلمة المرور
              </Typography>
              <Divider />
              <Typography sx={{marginTop:'10px' , marginBottom:'10px'}} variant="p" component={"div"}>
                أدخل كلمة المرور الجديدة لـ حسابك.
              </Typography>
              <form onSubmit={handleSubmit}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: "10px",
                  }}
                >
                  <TextField
                    sx={{ marginTop: "5px" }}
                    id="input-with-icon-textfield"
                    placeholder="كلمة المرور"
                    value={newPassword}
                    required
                    type="password"
                    onChange={(e) => setNewPassword(e.target.value)}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockOutlinedIcon />
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                  <TextField
                    sx={{ marginTop: "5px" }}
                    id="input-with-icon-textfield"
                    placeholder="تأكيد كلمة المرور"
                    value={confirmPassword}
                    required
                    type="password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockOutlinedIcon />
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                  
                  {/* {error && <p style={{color:'red'}}>{error}</p>} */}
                    <Button
                    type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      sx={{ marginTop: "20px" }}
                    >
                         تحديث كلمة المرور الجديدة
                    </Button>
                </div>
              </form>
              </div>
            {/* </div>) : (
                <div>
                  <Typography sx={{display:'flex' , justifyContent:'center' , marginBottom:'5px'}} variant="h5" component={"div"}>
                    تمت إرسال رابط اعادة كلمة المرور بنجاح
                  </Typography>
                  <Divider />
                  <Typography sx={{marginTop:'10px' , marginBottom:'10px'}} variant="p" component={"div"}>

                    اذا كان الايميل: {email} <br/> موجودًا في قاعدة البيانات سوف تصلك رسالة على البريد الالكتروني لـ إعادة كلمة المرور.
                  </Typography>
                  <Link to="/auth" style={{textDecoration:'none'}}>
                  <div style={{display:'flex' , justifyContent:'center'}}>
                  <Button
                    variant="text"
                    color="primary"
                    size="large"
                    sx={{ marginTop: "20px"}}>
                        الرجوع الى صفحة الدخول
                    </Button>
                    </div>

                    </Link>
                  </div>
            )} */}

          
        </CardContent>
      </Card>
    </div>
  );
}
