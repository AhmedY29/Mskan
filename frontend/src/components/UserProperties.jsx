import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
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
import { Link, useNavigate } from "react-router-dom";
import { usePropertiesStore } from "../store/propertiesStore";
import { useEffect } from "react";
import Loading from "./Loading";
import toast from "react-hot-toast";

export default function UserProperties({user}){
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [propertyId, setPropertyId] = useState("");
  const [filteredProperties, setFilteredProperties] = useState([]);
  const {getProperties , isLoading , properties , deleteProperty} = usePropertiesStore();
    const [searchQuery, setSearchQuery] = useState({
      owner: user._id
    });

    const navigate = useNavigate()
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
    function handleOpenDelete(id) {
        setOpenDelete(true);
        setPropertyId(id)
      console.log('IN FUNC',propertyId)


    }
    function handleCloseDelete() {
        setOpenDelete(false);
    }
    console.log(propertyId)
    async function handleDelete() {
        await  deleteProperty(propertyId);
        return navigate("/"), toast.success("تم حذف العقار بنجاح")
    }

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
            <Link key={property._id} style={{textDecoration:'none' , color:"black"}} to={`/propertyDetails/${property._id}`} >
            <Card title={'الانتقال الى صفحة العقار'} sx={{ display: 'flex' ,marginTop:'10px' , marginBottom:'10px', justifyContent:'space-between', alignItems:'center' }}>
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
               <Typography component="div" variant="p" color="text.secondary">
               {property.type}
               </Typography>
           <Typography component="div" variant="p" color="text.secondary">
               {new Date(property.createdAt).toLocaleDateString("ar-EG", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",})}
               </Typography>
           <CardActions>
            <Button variant="text" color="primary" onClick={() => navigate(`/updateProperty/${property._id}`)}>
              تعديل
            </Button>
            <Button variant="text" color="error" onClick={()=>handleOpenDelete(property._id)}>
              حذف
            </Button>
           </CardActions>
        <Divider sx={{marginTop:'20px' , marginBottom:'20px'}} />
         </Card>
         </Link>
          ))
          
         
          }
        </React.Fragment>
          

            </CardContent>
            <Dialog open={openDelete} onClose={handleCloseDelete} sx={{direction:'rtl'}}>
      <DialogTitle id="alert-dialog-title">
          هل انت متأكد من حذف العقار؟
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ملاحظة في حال الحذف لن تتمكن من اعادة العقار مرة اخرى!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete}>لا</Button>
          <Button onClick={handleDelete} >
            نعم
          </Button>
        </DialogActions>
      </Dialog>
        </>
    );
}