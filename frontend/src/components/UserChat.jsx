import {
  Avatar,
  Badge,
  Button,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Divider from "@mui/material/Divider";
import { useState } from "react";
import CardActions from "@mui/material/CardActions";
// icons
import BedOutlinedIcon from "@mui/icons-material/BedOutlined";
import BathtubOutlinedIcon from "@mui/icons-material/BathtubOutlined";
import ChairOutlinedIcon from "@mui/icons-material/ChairOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import IconButton from "@mui/material/IconButton";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import { Link } from "react-router-dom";

export default function UserChat() {
  return (
    <>
      <CardContent style={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="h6" component="div" sx={{ marginBottom: "40px" }}>
          المحادثات
        </Typography>
        <div style={{ display: "flex" }}>
          <div style={{ flex: "2", overflowY: "scroll" , height:'500px' , marginLeft:'10px', width:'20%' }}>
            <Card
              sx={{
                padding: "3px",
                paddingBottom: "3px",
                marginBottom: "5px",
              }}
            >
              <CardContent sx={{ display: "flex", alignItems: "center" }}>
              <Badge color="primary" variant="dot">
                <Avatar
                  sx={{ width: 50, height: 50, marginLeft: "10px" }}
                  alt="Ahmed"
                  src="/static/images/avatar/1.jpg"
                />
        </Badge>

                <Typography>Ahmed</Typography>
              </CardContent>
            </Card>
          </div>
          <div style={{ flex: "3" , height:'500px' }}>
            <Card>
                <CardContent sx={{display:'flex' , alignItems:'center'}}>
                <Avatar
                  sx={{ width: 50, height: 50, marginLeft: "10px" }}
                  alt="Ahmed"
                  src="/static/images/avatar/1.jpg"
                />
                    <Typography>Ahmed</Typography>
                </CardContent>
            </Card>
            <Card>
                <CardContent sx={{height:'260px'}}>
                    <Typography sx={{textAlign:'center'}} variant="h6" component="div">
                      لاتوجد رسائل
                    </Typography>
                </CardContent>
            </Card>
            <Card>
                <CardContent sx={{ display: "flex", flexDirection: "column" }}>
                  <TextField
                    fullWidth
                    placeholder="اكتب رسالتك هنا..."
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ marginTop: "10px" }}
                  >
                    ارسل
                  </Button>
                </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </>
  );
}
