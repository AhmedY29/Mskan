import { Box, Button, Dialog, DialogContent, DialogTitle, Step, StepLabel, Stepper, TextField, Typography } from "@mui/material";
import * as React from 'react';
import { usePropertiesStore } from "../store/propertiesStore.js";
import toast from "react-hot-toast";
import User from "../../../backend/models/user.model.js";
import { useAuthStore } from "../store/authStore.js";


const steps = ['إضافة الرخص', 'إضافة المعلومات للعقار', 'إضافة الصور'];

export default function AddProperty({open , handleClose1} ){

    const handleClose = ()=> {
        handleClose1()
    }
    const {user} = useAuthStore()
    const [property, setProperty] = React.useState({
        title: '',
        description: '',
        images: [],
        adLicense: '',
        location: '',
        price: '',
        type: '',
        mainPhoto: '',
        rooms: '',
        bathrooms: '',
        livingrooms: '',
        garage: '',
        latitude: '',
        longitude: '',
        wifi: '',
        internet: false,
        size: '',
        floor: '',
        facade: '',
        a3dimage: '',
        nearbyServices: [],
        video: '',
        ageforbuild: '',
        owner: user._id,

    })
    const {createProperty} = usePropertiesStore();

    async function handelAddProperty(){
        await createProperty(property)
        toast.success('تم اضافة العقار بنجاح')
        handleClose()
    }
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
  

  
    const isStepSkipped = (step) => {
      return skipped.has(step);
    };
  
    const handleNext = () => {
      let newSkipped = skipped;
      if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
      }
  
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
  

  
    return(
        <>
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="md"
        fullWidth={true}
        sx={{direction: 'ltr'}}
      >
        <DialogTitle id="alert-dialog-title" sx={{display:'flex', justifyContent:'center'}}>
          اضافة عقار جديد
        </DialogTitle>
        <DialogContent>
            
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            مراجعة المعلومات
          </Typography>
          <Typography sx={{ mt: 2, mb: 1 }}>
            الاسم : {property.title}
          </Typography>
          <Typography sx={{ mt: 2, mb: 1 }}>
            السعر : {property.price}
          </Typography>
          <Typography sx={{ mt: 2, mb: 1 }}>
            الوصف : {property.description}
          </Typography>
          <Typography sx={{ mt: 2, mb: 1 }}>
            النوع : {property.type}
          </Typography>
          <Typography sx={{ mt: 2, mb: 1 }}>
            النوع : {property.rooms}
          </Typography>
          <Typography sx={{ mt: 2, mb: 1 }}>
            النوع : {property.bathrooms}
          </Typography>
          <Typography sx={{ mt: 2, mb: 1 }}>
            النوع : {property.livingrooms}
          </Typography>
          <Typography sx={{ mt: 2, mb: 1 }}>
            النوع : {property.garage}
          </Typography>
          <Typography sx={{ mt: 2, mb: 1 }}>
            النوع : {property.location}
          </Typography>
          <Typography sx={{ mt: 2, mb: 1 }}>
            خط العرض : {property.latitude}
          </Typography>
          <Typography sx={{ mt: 2, mb: 1 }}>
            خط الطول : {property.longitude}
          </Typography>
          <Typography sx={{ mt: 2, mb: 1 }}>
            النوع : {property.wifi}
          </Typography>
          <Typography sx={{ mt: 2, mb: 1 }}>
            النوع : {property.size}
          </Typography>
          <Typography sx={{ mt: 2, mb: 1 }}>
            النوع : {property.internet}
          </Typography>
          <Typography sx={{ mt: 2, mb: 1 }}>
            النوع : {property.floor}
          </Typography>
          <Typography sx={{ mt: 2, mb: 1 }}>
            النوع : {property.facade}
          </Typography>
          <Typography sx={{ mt: 2, mb: 1 }}>
            النوع : {property.nearbyServices}
          </Typography>
          <Typography sx={{ mt: 2, mb: 1 }}>
            النوع : {property.ageforbuild}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handelAddProperty}>  إضافة العقار</Button>
          </Box>
        </React.Fragment>
      ) : activeStep === 0 ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>إضافة معلومات الرخصة</Typography>
          <TextField type="number" value={property.adLicense} onChange={(e) => setProperty({...property , adLicense:e.target.value})} required placeholder=" رخصة فال للإعلان" />
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              الرجوع
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleNext}>
            التالي
            </Button>
          </Box>
        </React.Fragment>
      ): activeStep === 1 ?         <React.Fragment>
      <Typography sx={{ mt: 2, mb: 1 }}>إضافة معلومات العقار</Typography>
      
      <TextField value={property.title} onChange={(e) => setProperty({...property ,title:e.target.value})} required placeholder="الاسم" />
      <TextField type="number" value={property.price} onChange={(e) => setProperty({...property ,price: e.target.value})} required placeholder="السعر" />
      <TextField value={property.description} onChange={(e) => setProperty({...property ,description:e.target.value})} required placeholder="الوصف" />
      <TextField value={property.type} onChange={(e) => setProperty({...property ,type:e.target.value})} required placeholder="النوع" />
      <TextField type="number" value={property.rooms} onChange={(e) => setProperty({...property ,rooms:e.target.value})} required placeholder="الغرف" />
      <TextField type="number" value={property.bathrooms} onChange={(e) => setProperty({...property ,bathrooms:e.target.value})} required placeholder="دورات المياة" />
      <TextField type="number" value={property.livingrooms} onChange={(e) => setProperty({...property ,livingrooms:e.target.value})} required placeholder=" الصالات" />
      <TextField value={property.location} onChange={(e) => setProperty({...property ,location:e.target.value})} required placeholder="الموقع" />
      <TextField type="number" value={property.latitude} onChange={(e) => setProperty({...property ,latitude:e.target.value})} required placeholder="خط العرض" />
      <TextField type="number" value={property.longitude} onChange={(e) => setProperty({...property ,longitude:e.target.value})} required placeholder="حط الطول" />
      <TextField type="number" value={property.garage} onChange={(e) => setProperty({...property ,garage:e.target.value})} required placeholder="كراج" />
      <TextField value={property.wifi} onChange={(e) => setProperty({...property ,wifi:e.target.value})} required placeholder="تغطية الانترنت" />
      <TextField type="number" value={property.size} onChange={(e) => setProperty({...property ,size:e.target.value})} required placeholder="المساحة" />
      <TextField value={property.internet} onChange={(e) => setProperty({...property ,internet:e.target.value})} required placeholder="يوجد انترنت؟" />
      <TextField type="number" value={property.floor} onChange={(e) => setProperty({...property ,floor:e.target.value})} required placeholder="الدور" />
      <TextField value={property.facade} onChange={(e) => setProperty({...property ,facade:e.target.value})} required placeholder="الواجهة" />
      <TextField value={property.nearbyServices} onChange={(e) => setProperty({...property ,nearbyServices:e.target.value})} required placeholder="الخدمات القريبة" />
      <TextField type="number" value={property.ageforbuild} onChange={(e) => setProperty({...property ,ageforbuild:e.target.value})} required placeholder="عمر العقار" />
      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
        <Button
          color="inherit"
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{ mr: 1 }}
        >
          الرجوع
        </Button>
        <Box sx={{ flex: '1 1 auto' }} />
        <Button onClick={handleNext}>
        التالي
        </Button>
      </Box>
    </React.Fragment> : activeStep === 2 ?         <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}> إضافة الصور</Typography>
          <TextField value={property.mainPhoto} onChange={(e) => setProperty({...property ,mainPhoto:e.target.value})} required placeholder="الصورة الاساسية" />
          <TextField value={property.images} onChange={(e) => setProperty({...property ,images:e.target.value})} required placeholder="الصور" />
          <TextField value={property.a3dimage} onChange={(e) => setProperty({...property ,a3dimage:e.target.value})} required placeholder=" رابط النموذج ثلاثي الابعاد" />
          <TextField value={property.video} onChange={(e) => setProperty({...property ,video:e.target.value})} required placeholder=" رابط النموذج ثلاثي الابعاد" />
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              الرجوع
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleNext}>
            التالي
            </Button>
          </Box>
        </React.Fragment> :'' }
    </Box>
        </DialogContent>
      </Dialog>
        </>
    )
}