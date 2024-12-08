import {
    Avatar,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Divider,
    TextField,
  } from "@mui/material";
import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useState } from "react";



// icons
import BedOutlinedIcon from "@mui/icons-material/BedOutlined";
import BathtubOutlinedIcon from "@mui/icons-material/BathtubOutlined";
import ChairOutlinedIcon from "@mui/icons-material/ChairOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import { Link, useParams } from "react-router-dom";
import { usePropertiesStore } from "../store/propertiesStore";
import { useEffect } from "react";
import Loading from "./Loading";
import { useAgentStore } from "../store/agentStore";

export default function AgentProperties(){
    const [filteredProperties, setFilteredProperties] = useState([]);
    const { getProperties, isLoading, properties } = usePropertiesStore();
    const { getAgent, agent } = useAgentStore();
    const [open, setOpen] = useState(false);
  

    const {name} = useParams()
  
    // جلب العقارات عند تحميل الصفحة
    useEffect(() => {
      getProperties();
      getAgent(name)
    }, [getProperties , name]);
  
    // تصفية العقارات بناءً على agent_Id
    useEffect(() => {
      const filterProperties = () => {
        return properties.filter((property) => {
          // تحقق من أن agent_Id الخاص بالعقار يطابق agent_Id للوكيل الحالي
          console.log(property.owner.agent_Id);
          console.log(agent._id);
          if(!property.owner.agent_Id) return false
          return property.owner.agent_Id._id == agent._id;
        });
      };
  
      setFilteredProperties(filterProperties());
    }, [agent._id, properties]);
  
    // التنسيق
    const formatPrice = (price) => {
      return new Intl.NumberFormat("en-US").format(price);
    };
  
    const formatDate = (date) => {
      return new Date(date).toLocaleDateString("ar-EG", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    };

    console.log(filteredProperties)
  
    // عرض حالة التحميل
    if (isLoading) {
      return <Loading />;
    }
  

    return(
        <>
                        <CardContent style={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="h6" component="div" sx={{marginBottom:'40px'}}>
                 العقارات
              </Typography>


<React.Fragment>
      
          {filteredProperties.map((property) => (
                                 <Card key={property._id} sx={{ display: 'flex' ,marginTop:'10px' , marginBottom:'10px', justifyContent:'space-between', alignItems:'center' }}>
                                 <CardMedia
                                  component="img"
                                  sx={{ width: 70 , height: 72}}
                                  image={property.mainPhoto}
                                  alt={property.title}
                                />
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
           
                                  <CardContent sx={{ flex: '1 0 auto' }}>
                                    <Typography component="div" variant="h5">
                                    {property.title}
                                    </Typography>
           
                                  </CardContent>
                                </Box>
                                <Avatar
                                src={property.owner.avatar}
                                alt={property.owner.name}
                                />
                                <Typography
                                      variant="subtitle1"
                                      component="div"
                                      sx={{ color: 'text.secondary' , display: 'flex' , alignItems: 'center' }}
                                    >
                                      المعلن {property.owner.name}
                                    </Typography>
                                <CardActions>
                                 <Button variant="text" color="primary">
                                   تعديل
                                 </Button>
                                 <Button variant="text" color="error">
                                   حذف
                                 </Button>
                                </CardActions>
                             <Divider sx={{marginTop:'20px' , marginBottom:'20px'}} />
                              </Card>
          ))
          
         
          }
        </React.Fragment>
          

            </CardContent>
        </>
    );
}