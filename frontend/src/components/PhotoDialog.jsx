import { useState } from "react";
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
export default function PhotoDialog({open , handleCloseClick}){

    const [displays, setDisplays] = useState('images');
  
    const handleDisplays = (event, newDisplays) => {
      if (newDisplays !== null) {
        setDisplays(newDisplays);
      }
    };

    function handleClose(){
        handleCloseClick()
        setCurrentImage(0);
    }
    const [openPhoto, setOpenPhoto] = useState(false);
    const [currentImage, setCurrentImage] = useState(0);
    const [displayChange, setDisplayChange] = useState('Photos');

    function handleImageClick(id){
        setOpenPhoto(true);
        setCurrentImage(id);
    }
    function handleCloseOpen(){
        setOpenPhoto(false);
    }

    return(
        <>
        {/* <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
      >
        <DialogTitle id="alert-dialog-title">
        <ToggleButtonGroup
        color="primary"
        value={displays}
        exclusive
        onChange={handleDisplays}
        aria-label="text alignment"
        sx={{direction:'ltr' , display:'flex'}}
      >
        <ToggleButton onClick={()=> setDisplayChange('3D')} sx={{width:'100%'}} value="map" aria-label="centered">
          3D صور
        </ToggleButton>
        <ToggleButton onClick={()=> setDisplayChange('Photos')} sx={{width:'100%'}} value="images" aria-label="left aligned">
          الصور
        </ToggleButton>
      </ToggleButtonGroup>
        </DialogTitle>
      {
        displayChange ==  'Photos' ?  <ImageList sx={{ width: 700, height: 650 , margin:'15px' }} cols={2} >
        {itemData.map((item) => (
          <ImageListItem key={item.id} sx={{cursor:'pointer' , overflow:'none' }} onClick={()=>handleImageClick(item.id)}>
            <img
              srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList> : displayChange == '3D' ? <iframe style={{padding:'12px'}} src="https://www.zillow.com/view-3d-home/833510a2-abe4-441a-9e55-0971e16c098b?setAttribution=mls&wl=true&utm_source=dashboard" height="650" width="700" frameborder="0" allowfullscreen></iframe> : ''
      }

      </Dialog> */}
      {/* ddddd */}
      
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth='md'
        sx={{height:'900px'}}
      >

        <div className="arrows" style={{display: currentImage == itemData.length -1  ? 'none' : 'flex' , paddingLeft:'200px'}} onClick={()=> setCurrentImage(currentImage+1)} >
            <ArrowForwardIosIcon sx={{fontSize:'100px'}}/>
        </div>
          <img
          style={{objectFit:'cover'}}
            src={itemData[currentImage].img}
          />
                  <div className="arrows" style={{left:'0px' , display: currentImage === 0 ? 'none' : 'flex' , paddingRight:'200px'}}  onClick={()=> setCurrentImage(currentImage-1)}> 
                  <ArrowBackIosNewIcon sx={{fontSize:'100px'}}/>
        </div>
        {/* ddd */}
      </Dialog>
      
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
  