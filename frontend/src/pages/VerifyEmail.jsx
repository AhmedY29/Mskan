import {  Button, Card, CardContent, Typography } from "@mui/material";
import * as React from "react";
import { useState } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../style.css";
import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";
export default function VerifyEmail() {
  const [code , setCode] = useState(["","","","","",""]);
  const [submit , setSubmit] = useState(true);
  const inputRefs = useRef([]);
  const navigate = useNavigate()

  const {verifyEmail , error ,isLoading}= useAuthStore();
  

  function handelChange(index, value) {
    const newCode = [...code];
    if(value.length > 1){
      const pastedCode = value.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) {
        newCode[i] = pastedCode[i] || "" ; 
      }
      setCode(newCode)
      const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
      const foucsIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5 ;
      inputRefs.current[foucsIndex].focus();
    }else{
      newCode[index] = value;
      setCode(newCode);
      if(value && index < 5){
        inputRefs.current[index + 1].focus();
      }
    }
  }
  function handelKeyDown(index, e) {
    if(e.key === 'Backspace' && !code[index] && index > 0){
      inputRefs.current[index - 1].focus();
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const verificationCode = code.join("");
    try {
      await verifyEmail(verificationCode)
      navigate("/")
      toast.success("تم تأكيد الحساب بنجاح")
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    if(code.every((digit) => digit!== "")){
      setSubmit(false)
    }else{
      setSubmit(true)
    }
  },[code])
  return (
    <div className="hero-img" style={{direction:'rtl',height: "91vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",}}>
      <Card>
        <CardContent>
          <Typography variant="h5" component="h2" sx={{marginBottom:'10px'}}>
            تأكيد البريد الالكتروني
          </Typography>
          <Typography sx={{marginBottom:'20px'}}>
            أدخل الرمز المكون من 6 ارقام المرسل لـ بريدك الالكتروني.
          </Typography>
          <form onSubmit={handleSubmit}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" ,direction:'ltr'}}>
            {code.map((digit, index) => (
              <input
                key={index}
                type="text"
                value={digit}
                // onChange={(e) => {
                //   setCode(prev => [...prev.slice(0, index), e.target.value,...prev.slice(index + 1)]);
                //   inputRefs.current[index].focus();
                // }}
                maxLength={6}
                ref={(el) => (inputRefs.current[index] = el)}
                onChange={(e) => handelChange(index , e.target.value)}
                onKeyDown={(e) => handelKeyDown(index , e)}
                style={{ width: "40px", margin: "0 5px" , textAlign: "center", fontSize: "20px", padding: "5px" }}
              />
            ))}
          </div>
            {error && <p style={{color:'red'}}>{error}</p>}
            <Button type="submit" sx={{width:'100%'}} variant="contained" disabled={submit} >
              تأكيد الحساب
            </Button>
            </form>
            
        </CardContent>
      </Card>
    </div>
  );
}
