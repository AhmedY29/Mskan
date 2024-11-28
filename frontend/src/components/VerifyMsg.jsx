import { IconButton } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import ClearIcon from '@mui/icons-material/Clear';


export default function VerifyMsg(){
    const [close , setClose] = useState(false)
    return(
        <div style={{display: close == true ? 'none' :'flex' , justifyContent:'center' , backgroundColor:'yellow'}}>
            <IconButton size="large" color="black" onClick={() => setClose(true)}>
                <ClearIcon fontSize="inherit" />
            </IconButton>
            <p> لتتمكن من اضافة عقار والمزيد من الخدمات فعل حسابك عبر<Link style={{color:'black'}} to={'/verifyEmail'}> الضغط هنا </Link></p>
        </div>
    );
}