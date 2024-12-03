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
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { usePropertiesStore } from "../store/propertiesStore.js";
import { useAuthStore } from "../store/authStore.js";
import { useEffect } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import XIcon from '@mui/icons-material/X';
import axios from "axios";

export default function PropertyDetailsPhotos({ property }) {
  const { id } = useParams();
  const { isLoading, deleteProperty } = usePropertiesStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isAuther, setIsAuther] = useState(false);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsAuther(user._id == property.owner._id);
    }, 1500);
  }, [user, property]);

  useEffect(() => {
    const checkWindowSize = () => {
      if(!isLoading){
      if (window.innerWidth <= 748) {
        setMobile(true);
      } else {
        setMobile(false);
      }}
    };



    // فحص الحجم عند التحميل
    checkWindowSize();
    window.addEventListener("resize", checkWindowSize);

    // تنظيف المستمع عند إزالة المكون
    return () => window.removeEventListener("resize", checkWindowSize);
  }, []);


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
  const [openDelete, setOpenDelete] = useState(false);
  const [open3d, setOpen3d] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const openshare = Boolean(anchorEl);
  const handleClickShare = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseShare = () => {
    setAnchorEl(null);
  };

  const websiteUrl = "https://maskn.site/propertyDetails/"+ property._id; // ضع رابط موقعك هنا
  const message = `فرصة لا تُفوت! 
- عنوان العقار: ${property.title} 
- الوصف: ${property.description} 
- لمزيد من التفاصيل، قم بزيارة الرابط: ${websiteUrl}`
  
  const handleShareWhatsapp = () => {

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleShareToX = () => {
    
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`;
    window.open(twitterUrl, "_blank");
  }

  const handleCopyLink = () => {
    
    // نسخ الرابط إلى الحافظة
    navigator.clipboard.writeText(websiteUrl)
      .then(() => {
        toast.success(" تم نسخ الرابط إلى الحافظة بنجاح!")
      })
  };


  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
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

  
  useEffect(() => {
    if (isLoading || !user) return; 
    const checkIfBookmarked = async () => {

        try {
            // إرسال طلب للتحقق إذا كان العقار محفوظًا
            const response = await axios.get(`/api/save/check/${property._id}`);
            setIsBookmarked(response.data.isSaved);
        } catch (error) {
            console.log("Error checking bookmark status", error);
        }
    };
    checkIfBookmarked();
}, [property._id]);

// تبديل الحفظ (أو إلغاء الحفظ)
const toggleBookmark = async () => {
    try {
      if(!property._id || !user){
        setIsBookmarked(false);
        return toast.error('يجب تسجيل الدخول لـ حفظ العقارات')
      }
        if (isBookmarked) {
            // إذا كان العقار محفوظًا، نحذفه
            await axios.delete(`/api/save/remove/${property._id}`);
            toast.success('تم ازالة العقار من المحفوظات بنجاح')
        } else {
            // إذا لم يكن العقار محفوظًا، نضيفه
            await axios.post(`/api/save/save/${property._id}`);
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
            {property.images?.slice(0,3).map((img) => {
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
          </div>
        </div>
        <div style={{ marginTop: "20px" }}>
          <Button
            sx={{ marginLeft: "10px" }}
            variant="outlined"
            color="primary"
            onClick={toggleBookmark}
            startIcon={marks(isBookmarked)}
          >
            حفظ
          </Button>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<IosShareOutlinedIcon style={{marginLeft:'9px'}} />}
            onClick={handleClickShare}
          >
            مشاركة
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={openshare}
            onClose={handleCloseShare}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleShareWhatsapp}>
            <WhatsAppIcon style={{marginLeft:'2px'}}/>
            مشاركة مع الوتساب
            </MenuItem>
            <MenuItem onClick={handleShareToX}>
            <XIcon style={{marginLeft:'2px'}}/>
            مشاركة مع اكس
            </MenuItem>
            <MenuItem onClick={handleCopyLink}>نسخ الرابط</MenuItem>
          </Menu>
          {
            property.a3dimage ? <Button
            variant="outlined"
            color="primary"
            onClick={() => handleClick3d()}
            startIcon={<ThreeDRotationIcon />}
          /> :''
          }
          
          {isAuther ? (
            // <Button
            // variant="outlined"
            // color="error"
            // onClick={() => handleClick3d()}
            // startIcon={<DeleteOutlineIcon />}
            <IconButton size="large" color="error" onClick={handleClickDelete}>
              <DeleteOutlineIcon
                fontSize="inherit"
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
              {property.owner?.name}
              </Typography>
              {/* <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                المعلن : {property.owner?.name}
              </Typography> */}
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
          src={property.a3dimage || ''}
          height={mobile ? '600' :"650"}
          width={mobile ? '330':"700"}
          frameborder="0"
          allowfullscreen
        ></iframe>
      </Dialog>
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
          <Button onClick={() =>{
                  deleteProperty(id);
                  return navigate("/"), toast.success("تم حذف العقار بنجاح")}} >
            نعم
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
