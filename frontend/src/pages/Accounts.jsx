import {
    Avatar,
    Button,
    Card,
    CardContent,
    Container,
    Divider,
    Stack,
    TextField,
    Typography,
  } from "@mui/material";
  import { useParams } from "react-router-dom";
  import {  useEffect, useState } from "react";
  import Loading from "../components/Loading";
import axios from "axios";
import { usePropertiesStore } from "../store/propertiesStore";
import CardProperties from "../components/CardProperties";
import Grid from "@mui/material/Grid2";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
  
  export default function Accounts() {
    // const [ isLoading , setIsLoading ] = useState(true);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const {getProperties , isLoading , properties} = usePropertiesStore();
 
    const [ user , setUser ] = useState({
        name: '',
        avatar: '',
        _id: '',
        phoneNumber: '',
        license: '',
        address: '',
        createdAt: ''
    });
      const {name} = useParams();
      console.log(name);

      
      useEffect(() => {
        const fetchSavedProperties = async () => {
          try {
            // setIsLoading(true);
            const response = await axios.get(`/api/auth/profile/${name}`);
            // setIsLoading(false);
            console.log(response.data.user)
            setUser(response.data.user)
          } catch (error) {
            console.error('Error fetching saved properties:', error);
          }
        };
        
        fetchSavedProperties();
      }, [name]);
      
      
        
    
        useEffect(() => {
          getProperties();
        }, [getProperties]);
    
        useEffect(() => {
          const filterProperties = () => {
            return properties.filter((property) => {
              // تحقق من أن العقار يحتوي على المالك المطلوب
              console.log('ss\\d' , property.owner )
    
              return property.owner._id === user._id;
            });
          };
      
          setFilteredProperties(filterProperties());
          console.log('ss' , filteredProperties)
        }, [user._id, properties]);

      console.log('usersa',user)
      if(isLoading){return<Loading/>}
    return (
      <>
        <Container fixed>
          <h1>الملف الشخصي لـ {user.name}</h1>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Avatar
              sx={{ width: 70, height: 70 }}
              alt={user.name}
              src={user.avatar}
            />
            <Typography variant="h6" component="div">
              {" "}
              {user.name}
            </Typography>
            <Typography variant="p" component="div">
              مسوق فرد
            </Typography>
            <Grid
              container
              spacing={{ xs: 2, md: 4 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
              sx={{ marginTop: "20px" ,width: '100%' }}
            >
              {user.phoneNumber && <Grid size={{ xs: 2, sm: 4, md: 4 }}> رقم الجوال : {user.phoneNumber}</Grid>}
              {user.license && <Grid size={{ xs: 2, sm: 4, md: 4 }}> رخصة فال: {user.license}</Grid>}
              {user.address &&<Grid size={{ xs: 2, sm: 4, md: 4 }}>العنوان: {user.address}</Grid>}
              <Grid size={{ xs: 2, sm: 4, md: 4 }}> تاريخ الانضمام: {new Date(user.createdAt).toLocaleDateString('ar-EG', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                })}</Grid>
            </Grid>
          </div>
          <div style={{display:'flex' , justifyContent:'center'}}>
          <Button onClick={()=>{window.open(`tel:${user.phoneNumber}`, "_blank");}} sx={{ marginLeft: "5px" }} variant="outlined">
              اتصال
            </Button>
            <Button onClick={()=>{window.open(`https://wa.me/${user.phoneNumber}`, "_blank");}} variant="outlined">
            <WhatsAppIcon style={{marginLeft:'2px', color:'green'}}/>
                مراسلة</Button>
            </div>
          <Divider sx={{marginTop:'25px' , marginBottom:'10px'}} />
          <Typography variant="h6" component="div">
            العقارات الخاصة بـ {user.name}
          </Typography>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {
                filteredProperties.map((property) => {
                    return <CardProperties key={property._id} displaySwitch={'list'} property={property} />;
                })
            }
            </Grid>
        </Container>
      </>
    );
  }
  