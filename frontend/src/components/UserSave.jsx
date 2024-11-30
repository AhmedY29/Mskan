import { Button, CardContent, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Divider from "@mui/material/Divider";
import { useState } from "react";

// icons
import BedOutlinedIcon from "@mui/icons-material/BedOutlined";
import BathtubOutlinedIcon from "@mui/icons-material/BathtubOutlined";
import ChairOutlinedIcon from "@mui/icons-material/ChairOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import IconButton from "@mui/material/IconButton";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import { Link } from "react-router-dom";
import axios from "axios";
import CardProperties from "./CardProperties";
import { useEffect } from "react";
import Loading from "./Loading";
import toast from "react-hot-toast";

export default function UserSave() {
  const [savedProperties, setSavedProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchSavedProperties = async () => {
      try {
        setIsLoading(true)
        const response = await axios.get('/api/save/getsaved');
        const properties = response.data.savedProperties.filter(item => item.propertyId).map(item => item.propertyId);
        console.log(properties)
        setSavedProperties(properties);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching saved properties:', error);
        setIsLoading(false);
      }
    };
    
    fetchSavedProperties();
  }, []);

  console.log('sssssa',savedProperties)

  return (
    <>
      <CardContent style={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="h6" component="div" sx={{ marginBottom: "40px" }}>
          العقارات المحفوظة
        </Typography>
        <Typography  component="div" sx={{ marginBottom: "40px" }}>
          {savedProperties.length} عقار
        </Typography>

        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {isLoading ? <Loading/> :
            savedProperties?.map((item) => (
             <CardProperties key={item._id} displaySwitch={'list'} property={item} />
            ))
          }
        </Grid>
      </CardContent>
    </>
  );
}
