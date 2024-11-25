import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import '../style.css';


// icon
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CloseIcon from '@mui/icons-material/Close';
import { AppBar, Chip, IconButton, Toolbar } from "@mui/material";
import Loading from "./Loading";
import { usePropertiesStore } from "../store/propertiesStore";
export default function PhotoDialog({open , handleCloseClick , property}){

    const [displays, setDisplays] = useState('images');
  
    const handleDisplays = (event, newDisplays) => {
      if (newDisplays !== null) {
        setDisplays(newDisplays);
      }
    };
console.log('ssssssss',property)

    function handleClose(){
        handleCloseClick()
        setCurrentImage(0);
    }
    const [openPhoto, setOpenPhoto] = useState(false);
    const [currentImage, setCurrentImage] = useState(0);
    const [displayChange, setDisplayChange] = useState('Photos');

    const [imagesLoaded, setImagesLoaded] = useState(false);  // حالة لمعرفة ما إذا تم تحميل الصور
    const [loadedImagesCount, setLoadedImagesCount] = useState(0);  // عدد الصور المحملة
  
    // التحقق من أن property.images موجودة
    if (!property || !property.images || property.images.length === 0) {
      return "";
    }
  
    // وظيفة لتحديث حالة التحميل
    const handleImageLoad = () => {
      setLoadedImagesCount(prevCount => prevCount + 1); // زيادة العداد عند تحميل صورة
    };
  
    // التأكد من تحميل جميع الصور
    useEffect(() => {
      if (loadedImagesCount === property.images.length) {
        setImagesLoaded(true);  // إذا تم تحميل جميع الصور
      }
    }, [loadedImagesCount, property.images.length]);  // إعادة الحساب عندما يتغير العداد أو عدد الصور
    
    const mergedImages = property?.mainPhoto 
    ? [  property.mainPhoto , ...property.images ] // دمج الصورة الرئيسية مع باقي الصور
    : property.images || [];

    console.log(mergedImages)
    
    function handleImageClick(id){
        setOpenPhoto(true);
        setCurrentImage(id);
    }
    function handleCloseOpen(){
        setOpenPhoto(false);
    }

    return(
        <>
        
      <Dialog
        open={open}
        onClose={handleClose}
        fullScreen
        sx={{}}  
      >
          <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            

          </Toolbar>
        </AppBar>
        <div className="arrows" style={{display: currentImage == mergedImages.length -1  ? 'none' : 'flex' , paddingLeft:'200px'}} onClick={()=> setCurrentImage(currentImage+1)} >
            <ArrowForwardIosIcon sx={{fontSize:'100px',  color:"black",zIndex:'1'}}/>
        </div>
        <div style={{display:'flex', justifyContent:'center'}}>
          <img className="imgs"
          style={{position:'absolute', top:'125px' , width:'640px', height:'500px', objectFit:'contain'}}
            src={mergedImages[currentImage]}
          />
          <Chip label={`${mergedImages.length}/${currentImage+1} `} sx={{marginTop:'5px', position:'absolute' , bottom:'30px'}}/>
          </div>
                  <div className="arrows" style={{left:'0px' , display: currentImage === 0 ? 'none' : 'flex' , paddingRight:'200px'}}  onClick={()=> setCurrentImage(currentImage-1)}> 
                  <ArrowBackIosNewIcon sx={{fontSize:'100px' , color:"black" ,zIndex:'1' }}/>
        </div>
        
      </Dialog>
      
      {/* <Container fixed 
        open={open}
        onClose={handleClose}
        style={{height:'100vh', width:'100vw', display: open ? 'flex' : 'none' , position:'absolute' , justifyContent: 'center' ,backgroundColor:'#eee', overflow:'hidden'}}
      >

        <div className="arrows" style={{display: currentImage == itemData.length -1  ? 'none' : 'flex' , paddingLeft:'200px' , right:'0px'}} onClick={()=> setCurrentImage(currentImage+1)} >
            <ArrowForwardIosIcon sx={{fontSize:'100px'}}/>
        </div>
          <img
          style={{margin:"80px"}}
            src={itemData[currentImage].img}
          />
                  <div className="arrows" style={{left:'0px' , display: currentImage === 0 ? 'none' : 'flex' , paddingRight:'200px', left:'30px'}}  onClick={()=> setCurrentImage(currentImage-1)}> 
                  <ArrowBackIosNewIcon sx={{fontSize:'100px'}}/>
        </div>
      </Container> */}
        </>
    )
}

const itemData = [
    {
        id: 0,
      img: 'https://images.bayut.sa/thumbnails/4092406-800x600.webp',
    },
    {
        id: 1,
      img: 'https://images.bayut.sa/thumbnails/4092407-800x600.webp',
    },
    {
        id: 2,
      img: 'https://images.bayut.sa/thumbnails/4092408-800x600.webp',
    },
    {
        id: 3,
      img: 'https://images.bayut.sa/thumbnails/4092409-800x600.webp',
    },
    {
        id: 4,
      img: 'https://images.bayut.sa/thumbnails/4092410-800x600.webp',
    },
    {
        id: 5,
      img: 'https://images.bayut.sa/thumbnails/4092411-800x600.webp',
    },
    {
        id: 6,
      img: 'https://images.bayut.sa/thumbnails/4092412-800x600.webp',
    },
    {
        id: 7,
      img: 'https://images.bayut.sa/thumbnails/4092413-800x600.webp',
    },
    {
        id: 8,
      img: 'https://images.bayut.sa/thumbnails/4092414-800x600.webp',
    },
    {
        id: 9,
      img: 'https://images.bayut.sa/thumbnails/4092415-800x600.webp',
    },
    {
        id:10,
      img: 'https://images.bayut.sa/thumbnails/4092416-800x600.webp',
    },
    {
        id: 11,
      img: 'https://images.bayut.sa/thumbnails/4092417-800x600.webp',
    },
    {
        id: 12,
      img: 'https://images.bayut.sa/thumbnails/4092418-800x600.webp',
    },
    {
        id: 13,
      img: 'https://images.bayut.sa/thumbnails/4092419-800x600.webp',
    },
    {
        id: 14,
      img: 'https://images.bayut.sa/thumbnails/4092420-800x600.webp',
    },
    {
        id: 15,
      img: 'https://images.bayut.sa/thumbnails/4092421-800x600.webp',
    },

  ];
  