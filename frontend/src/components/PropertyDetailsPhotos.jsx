import { useState } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Maps from "../components/Map.jsx";

// icons
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import IosShareOutlinedIcon from "@mui/icons-material/IosShareOutlined";
import ThreeDRotationIcon from "@mui/icons-material/ThreeDRotation";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";

import PhotoDialog from "./PhotoDialog";
import MapDetails from "./MapDetails.jsx";
import {
  Avatar,
  CircularProgress,
  Dialog,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { usePropertiesStore } from "../store/propertiesStore.js";
import { useAuthStore } from "../store/authStore.js";
import { useEffect } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
export default function PropertyDetailsPhotos({ property }) {
  const { id } = useParams();
  const { isLoading, deleteProperty } = usePropertiesStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isAuther, setIsAuther] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsAuther(user._id == property.owner._id);
    }, 1500);
  }, [user, property]);

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

  const [open, setOpen] = useState(false);
  const [open3d, setOpen3d] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleClick3d() {
    setOpen3d(true);
  }

  function handleClose3d() {
    setOpen3d(false);
  }

  return (
    <>
      <div style={{ flex: "2" }}>
        <div style={{ cursor: "pointer" }} onClick={handleClickOpen}>
          <img
            className="img-property"
            src={property.mainPhoto}
            alt="Property Photo"
            width={477}
            height={483}
            style={{ borderRadius: "16px", objectFit: "cover" }}
          />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {property.images?.map((img) => {
              return (
                <img
                  src={img}
                  alt="Property Photo"
                  width={150}
                  height={90}
                  style={{ borderRadius: "16px", objectFit: "cover" }}
                />
              );
            })}
            {/* <img
            src={"https://images.bayut.sa/thumbnails/4092407-800x600.webp"}
            alt="Property Photo"
            width={150}
            height={90}
            style={{ borderRadius: "16px" , objectFit:'cover' }}
          />
          <img
            src={"https://images.bayut.sa/thumbnails/4092408-800x600.webp"}
            alt="Property Photo"
            width={150}
            height={90}
            style={{ borderRadius: "16px" , objectFit:'cover' }}
          />
          <img
            src={"https://images.bayut.sa/thumbnails/4092409-800x600.webp"}
            alt="Property Photo"
            width={150}
            height={90}
            style={{ borderRadius: "16px", objectFit:'cover' }}
          /> */}
          </div>
        </div>
        <div style={{ marginTop: "20px" }}>
          <Button
            sx={{ marginLeft: "10px" }}
            variant="outlined"
            color="primary"
            onClick={() => setIsBookmark(isBookmarked)}
            startIcon={marks(isBookmarked)}
          >
            حفظ
          </Button>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<IosShareOutlinedIcon />}
          >
            مشاركة
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => handleClick3d()}
            startIcon={<ThreeDRotationIcon />}
          />
          {isAuther ? (
            // <Button
            // variant="outlined"
            // color="error"
            // onClick={() => handleClick3d()}
            // startIcon={<DeleteOutlineIcon />}
            <IconButton size="large" color="error">
              <DeleteOutlineIcon
                fontSize="inherit"
                onClick={() => {
                  deleteProperty(id);
                  return navigate("/"), toast.success("تم حذف العقار بنجاح");
                }}
              />
            </IconButton>
          ) : (
            ""
          )}
          {isAuther ? (
            <IconButton size="large" color="primary">
              <Link to={`/updateProperty/${id}`}>
                <ModeEditOutlineOutlinedIcon fontSize="inherit" />
              </Link>
            </IconButton>
          ) : (
            //   <Button
            //   variant="outlined"
            //   color="primary"
            //   onClick={() => handleClick3d()}
            //   startIcon={<ModeEditOutlineOutlinedIcon />}
            // />
            ""
          )}
        </div>
        <Card sx={{ minWidth: 275 }}>
          <CardContent style={{ display: "flex" }}>
            <div style={{ flex: "2" }}>
              <Typography
                gutterBottom
                sx={{ color: "text.secondary", fontSize: 14 }}
              >
                <Avatar
                  sx={{ width: 70, height: 70 }}
                  alt={property.owner?.name}
                  src={property.owner?.avatar}
                />
                {/* <img
                  src={property.owner.avatar}
                  alt=""
                  width={60}
                  height={60}
                /> */}
              </Typography>
            </div>
            <div style={{ flex: "3" }}>
              <Typography variant="h6" component="div">
                مكتب مسكنكم للخدمات العقارية
              </Typography>
              <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                المعلن : {property.owner?.name}
              </Typography>
              {/* <Typography variant="body2">
            well meaning and kindly.
            <br />
            {'"a benevolent smile"'}
          </Typography> */}
            </div>
          </CardContent>
          <CardActions sx={{ display: "flex", justifyContent: "center" }}>
            <Button sx={{ marginLeft: "5px" }} variant="outlined">
              اتصال
            </Button>
            <Button variant="outlined">مراسلة</Button>
          </CardActions>
        </Card>
        <div
          style={{ height: "400px", marginTop: "25px", marginBottom: "60px" }}
        >
          <Typography variant="h6">الخريطة</Typography>

          {!isLoading ? (
            <MapDetails
              log={property.longitude || 0}
              lat={property.latitude || 0}
            />
          ) : (
            ""
          )}
        </div>
      </div>
      <PhotoDialog open={open} handleCloseClick={handleClose} property={property}  />
      <Dialog open={open3d} onClose={handleClose3d} maxWidth="md">
        <iframe
          style={{ padding: "12px" }}
          src="https://www.zillow.com/view-3d-home/833510a2-abe4-441a-9e55-0971e16c098b?setAttribution=mls&wl=true&utm_source=dashboard"
          height="650"
          width="700"
          frameborder="0"
          allowfullscreen
        ></iframe>
      </Dialog>
    </>
  );
}
