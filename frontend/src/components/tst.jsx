import React, { useState, useEffect } from "react";
import { Grid, Typography, ListItemButton, ListItemIcon, ListItemText, Checkbox } from "@mui/material";
import { Mosque as MosqueIcon, LocalConvenienceStoreOutlined as LocalConvenienceStoreOutlinedIcon, RestaurantMenu as RestaurantMenuIcon, Woman2 as Woman2Icon, Business as BusinessIcon, SensorDoorOutlined as SensorDoorOutlinedIcon, LocalParkingOutlined as LocalParkingOutlinedIcon, Videocam as VideocamIcon, Elevator as ElevatorIcon, LocalHospital as LocalHospitalIcon, Store as StoreIcon, LocalGroceryStore as LocalGroceryStoreIcon, ManageAccounts as ManageAccountsIcon, CleaningServices as CleaningServicesIcon } from "@mui/icons-material";
import { useParams } from "react-router-dom";

const PropertyForm = () => {
  const { propertyId} = useParams();
  // الحالة لتخزين البيانات المحدثة للعقار
  const [updateProperty, setUpdateProperty] = useState({
    title: "",
    description: "",
    mainPhoto: "",
    images: [],
    video: "",
    nearbyServices: [],  // الخدمات القريبة المختارة
    imagesToDelete: []
  });

  // محاكاة لجلب البيانات من API
  useEffect(() => {
    // مثال على كيفية جلب البيانات (تغيير الرابط بناءً على الـ API الفعلي)
    const fetchData = async () => {
      const response = await fetch(`/api/property/${propertyId}`); // استبدال هذا بالـ API الخاص بك
      const data = await response.json();
      if (data.success) {
        setUpdateProperty(data.data); // تحديث الـ state بالبيانات المستلمة من الـ API

      } else {
        console.error("Failed to fetch data:", data.msg);
      }
    };

    fetchData();
  }, []); // يتم استدعاء هذا عند تحميل المكون

  // عند تغيير حالة الخدمة (إضافة أو إزالة)
  const handleServiceToggle = (serviceId) => {
    const updatedServices = updateProperty.nearbyServices.includes(serviceId)
      ? updateProperty.nearbyServices.filter((id) => id !== serviceId)  // إزالة إذا كانت موجودة
      : [...updateProperty.nearbyServices, serviceId];  // إضافة إذا لم تكن موجودة

    setUpdateProperty({
      ...updateProperty,
      nearbyServices: updatedServices
    });
  };

  // قائمة الخدمات
  const services = [
    { id: "mosque", label: "مسجد قريب", icon: <MosqueIcon /> },
    { id: "park", label: "حديقة قريبة", icon: <LocalConvenienceStoreOutlinedIcon /> },
    { id: "restaurants", label: "مطاعم قريبة", icon: <RestaurantMenuIcon /> },
    { id: "maidRoom", label: "غرفة خادمة", icon: <Woman2Icon /> },
    { id: "school", label: "مدرسة قريبة", icon: <BusinessIcon /> },
    { id: "privateEntrance", label: "مدخل خاص", icon: <SensorDoorOutlinedIcon /> },
    { id: "privateParking", label: "موقف خاص", icon: <LocalParkingOutlinedIcon /> },
    { id: "securityCameras", label: "كاميرات مراقبة", icon: <VideocamIcon /> },
    { id: "elevator", label: "مصعد", icon: <ElevatorIcon /> },
    { id: "hospital", label: "مستشفى قريب", icon: <LocalHospitalIcon /> },
    { id: "grocery", label: "تموينات قريب", icon: <StoreIcon /> },
    { id: "shoppingCenter", label: "مركز تسوق قريب", icon: <LocalGroceryStoreIcon /> },
    { id: "maintenance", label: "خدمات صيانة", icon: <ManageAccountsIcon /> },
    { id: "cleaning", label: "خدمات تنظيف", icon: <CleaningServicesIcon /> }
  ];

  return (
    <div>
      <Typography variant="h6">الخدمات والمميزات</Typography>
      <Grid container spacing={2}>
        {services.map((service) => (
          <Grid item xs={12} sm={6} key={service.id}>
            <ListItemButton role={undefined} dense onClick={() => handleServiceToggle(service.id)}>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={updateProperty.nearbyServices.includes(service.id)}  // تحقق من إذا كانت الخدمة موجودة في الـ state
                  tabIndex={-1}
                  disableRipple
                />
              </ListItemIcon>
              {service.icon}
              <ListItemText primary={service.label} />
            </ListItemButton>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};



export default PropertyForm;
