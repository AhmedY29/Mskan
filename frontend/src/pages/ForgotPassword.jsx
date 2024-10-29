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

import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuthStore } from "../store/authStore.js";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  const { isLoading , forgotPassword } = useAuthStore();

  async function handleSubmit(e){
    e.preventDefault();
    setIsSubmitted(true);
    await forgotPassword(email)
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
            {!isSubmitted ? (  
                          <div>
              <Typography sx={{display:'flex' , justifyContent:'center' , marginBottom:'5px'}} variant="h5" component={"div"}>
                 نسيت كلمة المرور
              </Typography>
              <Divider />
              <Typography sx={{marginTop:'10px' , marginBottom:'10px'}} variant="p" component={"div"}>
                أدخل عنوان البريد الالكتروني، سوف تتلقى رابط لـ إعادة كلمة المرور.
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
                    placeholder="البريد الالكتروني"
                    value={email}
                    required
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailOutlinedIcon />
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
                      ارسال رابط اعادة كلمة المرور
                    </Button>
                </div>
              </form>
            </div>) : (
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
            )}

          
        </CardContent>
      </Card>
    </div>
  );
}
