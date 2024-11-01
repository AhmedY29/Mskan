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
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuthStore } from "../store/authStore.js";

export default function Auth() {
  const [displays, setDisplays] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { register, error, isLoading , login , user } = useAuthStore();

  async function handleRegister(e) {
    e.preventDefault();
    
    try {
      await register( email, password , name);
      navigate("/verifyEmail");
    } catch (error) {
      console.log(error);
    }

  }

  async function handleLogin(e){
    e.preventDefault();
      await login(email, password)
    if(!user.isVerified === false) {
      navigate("/verifyEmail");
    }
    // login(email, password);
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
      <Card>
        <CardContent>
          {displays === "login" ? (
            <div>
              <Typography variant="h5" component={"div"}>
                تسجيل الدخول
              </Typography>
              <Divider />
              <form onSubmit={handleLogin}>
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
                  <TextField
                    sx={{ marginTop: "5px" }}
                    type="password"
                    placeholder="كلمة المرور"
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
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
                  <Button onClick={() => navigate('/forgotPassword')} variant="text" size="small" sx={{ width: "112px" }}>
                    نسيت كلمة المرور؟
                  </Button>
                  {error && <p style={{color:'red'}}>{error}</p>}
                    <Button
                    type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      sx={{ marginTop: "20px" }}
                    >
                      تسجيل الدخول
                    </Button>
                </div>
              </form>
              <Typography variant="h6">
                لا تمتلك حساب؟
                <Button
                  variant="text"
                  color="primary"
                  size="small"
                  onClick={() => {setDisplays("register")
                     setPassword("")}}
                >
                  سجل الان
                </Button>
              </Typography>
            </div>
          ) : (
            <div>
              <Typography variant="h5" component={"div"}>
                تسجيل جديد
              </Typography>
              <Divider />
              <form onSubmit={handleRegister}>
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
                    placeholder="الاسم"
                    value={name}
                    required
                    onChange={(e) => setName(e.target.value)}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonOutlineOutlinedIcon />
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                  <TextField
                    sx={{ marginTop: "5px" }}
                    id="input-with-icon-textfield"
                    placeholder="البريد الالكتروني"
                    value={email}
                    type="email"
                    required
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
                  <TextField
                    sx={{ marginTop: "5px" }}
                    type="password"
                    placeholder="كلمة المرور"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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

                  {error && <p style={{color:'red'}}>{error}</p>}
                  <Button
                  type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{ marginTop: "20px" }}
                  >
                    التسجيل
                  </Button>
                </div>
              </form>
              <Typography variant="h6">
                هل لديك حساب بالفعل؟
                <Button
                  variant="text"
                  color="primary"
                  size="small"
                  sx={{ marginLeft: "10px" }}
                  onClick={() => {setDisplays("login")
                    setConfirmPassword("");
                    setPassword("");
                  }}
                >
                  سجل الدحول الان
                </Button>
                <br />
                <br />
              </Typography>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
