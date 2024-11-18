import Container from "@mui/material/Container";
import PropertyDetailsPhotos from "../components/PropertyDetailsPhotos.jsx";


// icons
import PropertyDetailsText from "../components/PropertyDetailsText.jsx";
import { usePropertiesStore } from "../store/propertiesStore.js";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { CircularProgress } from "@mui/material";
import { useState } from "react";

export default function PropertyDetails() {
  const { property, getProperty , isLoading } = usePropertiesStore();

  const { id } = useParams();
  useEffect(() => {
   getProperty(id);
  }, [getProperty]);
  useEffect(() => {
    if (isLoading == false) {
      const timer = setTimeout(() => {
        let a = 0
      }, 4000); // الانتظار لمدة ثانيتين

      return () => clearTimeout(timer); // تنظيف المؤقت عند إلغاء التركيب
    } else {
      let a = 2// إذا كان المستخدم مصدقًا وموثقًا، لا تحتاج إلى الانتظار
    }
  }, [isLoading]);

  if (isLoading) {
    return <div style={{display:'flex', justifyContent:"center" , height:'90vh' , alignItems: "center"}}>
      <CircularProgress />
      <p style={{marginRight:'5px'}}> جاري التحميل... </p>
      </div>;
  }
  console.log("property:", property);
  return (
    <>
      <Container fixed className="container">
        <div className="split-content" style={{ display: "flex", marginTop: "45px"  }}>
          <PropertyDetailsPhotos property={property} />
          <PropertyDetailsText property={property}/>
        </div>
      </Container>
    </>
  );
}
