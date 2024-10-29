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

export default function UserSave() {
  const [isBookmarked, setIsBookmarked] = useState(true);
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
      <CardContent style={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="h6" component="div" sx={{ marginBottom: "40px" }}>
          العقارات المحفوظة
        </Typography>

        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Grid className="cards-properties" sx={{width:'47%'}} size={{ xs: 2, sm: 4, md: 4 }}>
            <Card sx={{ maxWidth: 310, width: "100%" }}>
              <Link to={"/propertyDetails/"}>
                <CardMedia
                  sx={{ height: 150 }}
                  image={
                    "https://images.bayut.sa/thumbnails/4117731-800x600.webp"
                  }
                  title={"333"}
                />
              </Link>
              <IconButton
                aria-label="delete"
                sx={{ position: "relative", bottom: "150px" }}
                onClick={() => setIsBookmark(isBookmarked)}
              >
                {/* <BookmarkBorderOutlinedIcon sx={{border:'1px white solid' , borderRadius:'50%'}}/> */}
                {marks(isBookmarked)}
              </IconButton>
              <Link
                to={"/propertyDetails/"}
                style={{ textDecoration: "none", color: "black" }}
              >
                <CardContent sx={{ paddingTop: 0 }}>
                  <div style={{ display: "flex" }}>
                    <div style={{ flex: "2" }}>
                      <Typography gutterBottom variant="h5" component="div">
                        شقة
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
                        <LocationOnOutlinedIcon fontSize="small" />
                        الرياض
                      </Typography>
                      <div className="Icons">
                        <Typography
                          className="icon-number"
                          variant="body2"
                          sx={{ color: "text.secondary" }}
                        >
                          <BedOutlinedIcon /> 3
                        </Typography>
                        <Divider
                          orientation="vertical"
                          variant="middle"
                          flexItem
                        />
                        <Typography
                          className="icon-number"
                          variant="body2"
                          sx={{ color: "text.secondary" }}
                        >
                          <BathtubOutlinedIcon /> 2
                        </Typography>
                        <Divider
                          orientation="vertical"
                          variant="middle"
                          flexItem
                        />
                        <Typography
                          className="icon-number"
                          variant="body2"
                          sx={{ color: "text.secondary" }}
                        >
                          <ChairOutlinedIcon /> 1
                        </Typography>
                      </div>
                    </div>
                    <div
                      style={{
                        flex: "2",
                        alignContent: "center",
                        textAlign: "left",
                      }}
                    >
                      <Typography variant="h6" sx={{ color: "text.secondary" }}>
                        1212 ريال/شهري
                      </Typography>
                      <img
                        style={{ marginTop: "5px" }}
                        srcSet="https://images.bayut.sa/thumbnails/4132304-240x180.webp"
                        alt=""
                        width={60}
                        height={60}
                      />
                    </div>
                  </div>
                </CardContent>
              </Link>
            </Card>
          </Grid>
          <Grid className="cards-properties" size={{ xs: 2, sm: 4, md: 4 }}>
            <Card sx={{ maxWidth: 310, width: "100%" }}>
              <Link to={"/propertyDetails/"}>
                <CardMedia
                  sx={{ height: 150 }}
                  image={
                    "https://images.bayut.sa/thumbnails/4117731-800x600.webp"
                  }
                  title={"333"}
                />
              </Link>
              <IconButton
                aria-label="delete"
                sx={{ position: "relative", bottom: "150px" }}
                onClick={() => setIsBookmark(isBookmarked)}
              >
                {/* <BookmarkBorderOutlinedIcon sx={{border:'1px white solid' , borderRadius:'50%'}}/> */}
                {marks(isBookmarked)}
              </IconButton>
              <Link
                to={"/propertyDetails/"}
                style={{ textDecoration: "none", color: "black" }}
              >
                <CardContent sx={{ paddingTop: 0 }}>
                  <div style={{ display: "flex" }}>
                    <div style={{ flex: "2" }}>
                      <Typography gutterBottom variant="h5" component="div">
                        شقة
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
                        <LocationOnOutlinedIcon fontSize="small" />
                        الرياض
                      </Typography>
                      <div className="Icons">
                        <Typography
                          className="icon-number"
                          variant="body2"
                          sx={{ color: "text.secondary" }}
                        >
                          <BedOutlinedIcon /> 3
                        </Typography>
                        <Divider
                          orientation="vertical"
                          variant="middle"
                          flexItem
                        />
                        <Typography
                          className="icon-number"
                          variant="body2"
                          sx={{ color: "text.secondary" }}
                        >
                          <BathtubOutlinedIcon /> 2
                        </Typography>
                        <Divider
                          orientation="vertical"
                          variant="middle"
                          flexItem
                        />
                        <Typography
                          className="icon-number"
                          variant="body2"
                          sx={{ color: "text.secondary" }}
                        >
                          <ChairOutlinedIcon /> 1
                        </Typography>
                      </div>
                    </div>
                    <div
                      style={{
                        flex: "2",
                        alignContent: "center",
                        textAlign: "left",
                      }}
                    >
                      <Typography variant="h6" sx={{ color: "text.secondary" }}>
                        1212 ريال/شهري
                      </Typography>
                      <img
                        style={{ marginTop: "5px" }}
                        srcSet="https://images.bayut.sa/thumbnails/4132304-240x180.webp"
                        alt=""
                        width={60}
                        height={60}
                      />
                    </div>
                  </div>
                </CardContent>
              </Link>
            </Card>
          </Grid>
          <Grid className="cards-properties" size={{ xs: 2, sm: 4, md: 4 }}>
            <Card sx={{ maxWidth: 310, width: "100%" }}>
              <Link to={"/propertyDetails/"}>
                <CardMedia
                  sx={{ height: 150 }}
                  image={
                    "https://images.bayut.sa/thumbnails/4117731-800x600.webp"
                  }
                  title={"333"}
                />
              </Link>
              <IconButton
                aria-label="delete"
                sx={{ position: "relative", bottom: "150px" }}
                onClick={() => setIsBookmark(isBookmarked)}
              >
                {/* <BookmarkBorderOutlinedIcon sx={{border:'1px white solid' , borderRadius:'50%'}}/> */}
                {marks(isBookmarked)}
              </IconButton>
              <Link
                to={"/propertyDetails/"}
                style={{ textDecoration: "none", color: "black" }}
              >
                <CardContent sx={{ paddingTop: 0 }}>
                  <div style={{ display: "flex" }}>
                    <div style={{ flex: "2" }}>
                      <Typography gutterBottom variant="h5" component="div">
                        شقة
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
                        <LocationOnOutlinedIcon fontSize="small" />
                        الرياض
                      </Typography>
                      <div className="Icons">
                        <Typography
                          className="icon-number"
                          variant="body2"
                          sx={{ color: "text.secondary" }}
                        >
                          <BedOutlinedIcon /> 3
                        </Typography>
                        <Divider
                          orientation="vertical"
                          variant="middle"
                          flexItem
                        />
                        <Typography
                          className="icon-number"
                          variant="body2"
                          sx={{ color: "text.secondary" }}
                        >
                          <BathtubOutlinedIcon /> 2
                        </Typography>
                        <Divider
                          orientation="vertical"
                          variant="middle"
                          flexItem
                        />
                        <Typography
                          className="icon-number"
                          variant="body2"
                          sx={{ color: "text.secondary" }}
                        >
                          <ChairOutlinedIcon /> 1
                        </Typography>
                      </div>
                    </div>
                    <div
                      style={{
                        flex: "2",
                        alignContent: "center",
                        textAlign: "left",
                      }}
                    >
                      <Typography variant="h6" sx={{ color: "text.secondary" }}>
                        1212 ريال/شهري
                      </Typography>
                      <img
                        style={{ marginTop: "5px" }}
                        srcSet="https://images.bayut.sa/thumbnails/4132304-240x180.webp"
                        alt=""
                        width={60}
                        height={60}
                      />
                    </div>
                  </div>
                </CardContent>
              </Link>
            </Card>
          </Grid>
          <Grid className="cards-properties" size={{ xs: 2, sm: 4, md: 4 }}>
            <Card sx={{ maxWidth: 310, width: "100%" }}>
              <Link to={"/propertyDetails/"}>
                <CardMedia
                  sx={{ height: 150 }}
                  image={
                    "https://images.bayut.sa/thumbnails/4117731-800x600.webp"
                  }
                  title={"333"}
                />
              </Link>
              <IconButton
                aria-label="delete"
                sx={{ position: "relative", bottom: "150px" }}
                onClick={() => setIsBookmark(isBookmarked)}
              >
                {/* <BookmarkBorderOutlinedIcon sx={{border:'1px white solid' , borderRadius:'50%'}}/> */}
                {marks(isBookmarked)}
              </IconButton>
              <Link
                to={"/propertyDetails/"}
                style={{ textDecoration: "none", color: "black" }}
              >
                <CardContent sx={{ paddingTop: 0 }}>
                  <div style={{ display: "flex" }}>
                    <div style={{ flex: "2" }}>
                      <Typography gutterBottom variant="h5" component="div">
                        شقة
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
                        <LocationOnOutlinedIcon fontSize="small" />
                        الرياض
                      </Typography>
                      <div className="Icons">
                        <Typography
                          className="icon-number"
                          variant="body2"
                          sx={{ color: "text.secondary" }}
                        >
                          <BedOutlinedIcon /> 3
                        </Typography>
                        <Divider
                          orientation="vertical"
                          variant="middle"
                          flexItem
                        />
                        <Typography
                          className="icon-number"
                          variant="body2"
                          sx={{ color: "text.secondary" }}
                        >
                          <BathtubOutlinedIcon /> 2
                        </Typography>
                        <Divider
                          orientation="vertical"
                          variant="middle"
                          flexItem
                        />
                        <Typography
                          className="icon-number"
                          variant="body2"
                          sx={{ color: "text.secondary" }}
                        >
                          <ChairOutlinedIcon /> 1
                        </Typography>
                      </div>
                    </div>
                    <div
                      style={{
                        flex: "2",
                        alignContent: "center",
                        textAlign: "left",
                      }}
                    >
                      <Typography variant="h6" sx={{ color: "text.secondary" }}>
                        1212 ريال/شهري
                      </Typography>
                      <img
                        style={{ marginTop: "5px" }}
                        srcSet="https://images.bayut.sa/thumbnails/4132304-240x180.webp"
                        alt=""
                        width={60}
                        height={60}
                      />
                    </div>
                  </div>
                </CardContent>
              </Link>
            </Card>
          </Grid>
        </Grid>
      </CardContent>
    </>
  );
}
