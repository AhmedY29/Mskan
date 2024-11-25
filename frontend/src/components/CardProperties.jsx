import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { useState } from "react";
import Grid from "@mui/material/Grid2";
import Avatar from "@mui/material"



// icons
import BedOutlinedIcon from "@mui/icons-material/BedOutlined";
import BathtubOutlinedIcon from "@mui/icons-material/BathtubOutlined";
import ChairOutlinedIcon from "@mui/icons-material/ChairOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import IconButton from "@mui/material/IconButton";
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";
export default function CardProperties({ displaySwitch , property }) {
    const [isBookmarked, setIsBookmarked] = useState(false);
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
  return (
    <>
    <Grid className="cards-properties"
          size={{ xs: 2, sm: 4, md: 4 }}
          sx={{ width: displaySwitch == 'map' ? "47% !important" : '' }}
                >
      <Card sx={{ maxWidth: 310, width: "100%" }}>
      <Link to={'/propertyDetails/' + property._id}>
        <CardMedia sx={{ height: 150 }} image={property.mainPhoto} title={property.title} />
        </Link>
        <IconButton aria-label="delete" sx={{position:'relative' , bottom:'150px'}} onClick={()=>setIsBookmark(isBookmarked)}>
          {/* <BookmarkBorderOutlinedIcon sx={{border:'1px white solid' , borderRadius:'50%'}}/> */}
          {marks(isBookmarked)}
        </IconButton>
        <Link to={'/propertyDetails/' + property._id} style={{textDecoration:'none' , color:'black'}}>
        <CardContent sx={{paddingTop:0}}>
          <div style={{ display: "flex" }}>
            <div style={{ flex: "2" }}>
              <Typography gutterBottom variant="h5" component="div">
                {property.title}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                <LocationOnOutlinedIcon fontSize="small" />
                {property.location}
              </Typography>
              <div className="Icons">
                <Typography
                  className="icon-number"
                  variant="body2"
                  sx={{ color: "text.secondary" }}
                >
                  <BedOutlinedIcon /> {property.rooms}
                </Typography>
                <Divider orientation="vertical" variant="middle" flexItem />
                <Typography
                  className="icon-number"
                  variant="body2"
                  sx={{ color: "text.secondary" }}
                >
                  <BathtubOutlinedIcon /> {property.bathrooms}
                </Typography>
                <Divider orientation="vertical" variant="middle" flexItem />
                <Typography
                  className="icon-number"
                  variant="body2"
                  sx={{ color: "text.secondary" }}
                >
                  <ChairOutlinedIcon /> {property.livingrooms}
                </Typography>
              </div>
            </div>
            <div
              style={{ flex: "2", alignContent: "center", textAlign: "left" }}
            >
              <Typography variant="h6" sx={{ color: "text.secondary" }}>
                {property.price} ريال {property.type == 'ايجار' ? '/شهري' : ''}
              </Typography>
                <Avatar
                  sx={{ width: 60, height: 60 }}
                  alt={property.owner?.name}
                  src={property.owner?.avatar}
                />
            </div>
          </div>
        </CardContent>
        </Link>
      </Card>
      </Grid>
    </>
  );
}
