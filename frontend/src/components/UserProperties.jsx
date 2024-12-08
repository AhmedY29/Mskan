import {
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
import { Link } from "react-router-dom";
import { usePropertiesStore } from "../store/propertiesStore";
import { useEffect } from "react";
import Loading from "./Loading";

export default function UserProperties({user}){
    const [isBookmarked, setIsBookmarked] = useState(false);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const {getProperties , isLoading , properties} = usePropertiesStore();
    const [searchQuery, setSearchQuery] = useState({
      owner: user._id
    });
    var formattedDate;
    var price;

    useEffect(() => {
      getProperties();
    }, [getProperties]);

    useEffect(() => {
      const filterProperties = () => {
        return properties.filter((property) => {
          // تحقق من أن العقار يحتوي على المالك المطلوب
          console.log('ss\\d' , property.owner )

          return property.owner._id === searchQuery.owner;
        });
      };
  
      setFilteredProperties(filterProperties());
      console.log('ss' , filteredProperties)
      console.log('ss\\' , searchQuery)
    }, [searchQuery.owner, properties]);
  
    function marks(isBookmarked) {
        if (isBookmarked) {
            return <BookmarkAddedIcon />;
        } else {
            return <BookmarkBorderOutlinedIcon />;
        }
        // setIsBookmarked(!isBookmarked);
    }
    function setIsBookmark(isBookmarked) {
        setIsBookmarked(!isBookmarked);
    }
    const [open, setOpen] = React.useState(false);

    if(isLoading){
      return <Loading/>
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