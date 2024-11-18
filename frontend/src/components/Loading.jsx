import { CircularProgress } from "@mui/material";

export default function Loading(){
    return(
        <>
    <div style={{display:'flex', justifyContent:"center" , height:'90vh' , alignItems: "center"}}>
    <CircularProgress />
    <p style={{marginRight:'5px'}}> جاري التحميل... </p>
    </div>;
        </>
    )
}