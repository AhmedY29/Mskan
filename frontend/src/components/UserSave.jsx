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
  const [isBookmarked, setIsBookmarked] = useState(true);
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


  const toggleBookmark = async (id) => {
    try {
        if (isBookmarked) {
            // إذا كان العقار محفوظًا، نحذفه
            await axios.delete(`/api/save/remove/${id}`);
            toast.success('تم ازالة العقار من المحفوظات بنجاح')
        } else {
            // إذا لم يكن العقار محفوظًا، نضيفه
            await axios.post(`/api/save/save/${id}`);
            toast.success('تم اضافة العقار من المحفوظات بنجاح')
        }
        setIsBookmarked(!isBookmarked); // تحديث الحالة بعد الحفظ أو الإزالة
    } catch (error) {
        console.log("Error toggling bookmark", error);
    }
};
  function marks(isBookmarked) {
    return isBookmarked ? <BookmarkAddedIcon /> : <BookmarkBorderOutlinedIcon />;
}
  return (
    <>
      <CardContent style={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="h6" component="div" sx={{ marginBottom: "40px" }}>
          العقارات المحفوظة
        </Typography>

        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {isLoading ? <Loading/> :
            savedProperties?.map((item) => (
              <Grid item key={item._id} xs={4} sm={4} md={4}>
                <Card sx={{ maxWidth: 310, width: '100%' }}>
                  <Link to={`/propertyDetails/${item._id}`}>
                    <CardMedia sx={{ height: 150 }} image={item.mainPhoto} title={item.title} />
                  </Link>
                  <IconButton
                    aria-label="toggle bookmark"
                    sx={{ position: 'relative', bottom: '150px' }}
                    onClick={()=>toggleBookmark(item._id)}
                  >
                    {marks(isBookmarked)}
                  </IconButton>
                  <Link to={`/propertyDetails/${item._id}`} style={{ textDecoration: 'none', color: 'black' }}>
                    <CardContent sx={{ paddingTop: 0 }}>
                      <div style={{ display: 'flex' }}>
                        <div style={{ flex: '2' }}>
                          <Typography gutterBottom variant="h5" component="div">
                            {item.title}
                          </Typography>
                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {item.location}
                          </Typography>
                        </div>
                        <div style={{ flex: '2', textAlign: 'left' }}>
                          <Typography variant="h6" sx={{ color: 'text.secondary' }}>
                            {item.price} ريال/شهري
                          </Typography>
                        </div>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              </Grid>
            ))
          }
        </Grid>
      </CardContent>
    </>
  );
}
