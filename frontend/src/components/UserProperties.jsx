import {
    Button,
    CardContent,
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
import { Link } from "react-router-dom";

export default function UserProperties(){
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
    const [open, setOpen] = React.useState(false);


    return(
        <>
                        <CardContent style={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="h6" component="div" sx={{marginBottom:'40px'}}>
                 العقارات
              </Typography>
              {/* <Typography sx={{ color: "text.secondary", mb: 1.5, mr: 1.5 }}>
                  مرحبًا بكم في هذه الفيلا ذات 4 غرف نوم المثيرة الموجودة في
                  الحي النابض بالحياة في البيان في الرياض. تقدم هذه الفيلا مساحة
                  معيشة واسعة ومريحة، مثالية للعائلات التي تبحث عن منزل جديد.
                  تشمل الميزات الرئيسية لهذا الممتلكات 4 غرف نوم و4 دورات مياة،
                  بالإضافة لمجموعة من وسائل الراحة مثل الكهرباء وإمدادات المياه
                  ونظام الصرف الصحي. لا تفوت هذه الفرصة لامتلاك فيلا جميلة في
                  موقع متميز. اتصل بنا الآن لمزيد من التفاصيل!
                </Typography> */}

<React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } , backgroundColor:'white'}}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          <img src="https://images.bayut.sa/thumbnails/4117731-800x600.webp" alt=""  height={'70px'} width={'70px'} style={{borderRadius:'10px'}}/>
        </TableCell>
        <TableCell component="th" scope="row">
          فيلا
        </TableCell>
        <TableCell align="right">بيع</TableCell>
        <TableCell align="right">الرياض</TableCell>
        <TableCell align="right">12000000</TableCell>
        <TableCell align="right">جديد</TableCell>
        <TableCell align="right">20/2/2024</TableCell>
        <TableCell align="right">
            <Button>تعديل</Button>
        </TableCell>
        <TableCell align="right">            <Button color="red">حذف</Button>
        </TableCell>
        
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography sx={{textAlign:'right'}} variant="h6" gutterBottom component="div">
                التفاصيل
              </Typography>
              <Table size="small" aria-label="purchases" sx={{backgroundColor:'white' }}>
                <TableHead>
                  <TableRow>
                    <TableCell>نوع العقار</TableCell>
                    <TableCell>نوع العرض</TableCell>
                    <TableCell align="right">المدينة</TableCell>
                    <TableCell align="right">السعر</TableCell>
                    <TableCell align="right">تاريخ العرض</TableCell>
                    <TableCell align="right">عدد المشاهدات</TableCell>

                  </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row">
                    فيلا
                      </TableCell>
                      <TableCell>بيع</TableCell>
                      <TableCell align="right">الرياض</TableCell>
                      
                      <TableCell align="right">
                        12000000
                      </TableCell>
                      <TableCell align="right">20/2/2024</TableCell>
                      <TableCell align="right">
                        800
                      </TableCell>
                    </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>

<React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } , backgroundColor:'white'}}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          <img src="https://images.bayut.sa/thumbnails/4117731-800x600.webp" alt=""  height={'70px'} width={'70px'} style={{borderRadius:'10px'}}/>
        </TableCell>
        <TableCell component="th" scope="row">
          فيلا
        </TableCell>
        <TableCell align="right">بيع</TableCell>
        <TableCell align="right">الرياض</TableCell>
        <TableCell align="right">12000000</TableCell>
        <TableCell align="right">جديد</TableCell>
        <TableCell align="right">20/2/2024</TableCell>
        <TableCell align="right">
            <Button>تعديل</Button>
        </TableCell>
        <TableCell align="right">            <Button color="red">حذف</Button>
        </TableCell>
        
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography sx={{textAlign:'right'}} variant="h6" gutterBottom component="div">
                التفاصيل
              </Typography>
              <Table size="small" aria-label="purchases" sx={{backgroundColor:'white' }}>
                <TableHead>
                  <TableRow>
                    <TableCell>نوع العقار</TableCell>
                    <TableCell>نوع العرض</TableCell>
                    <TableCell align="right">المدينة</TableCell>
                    <TableCell align="right">السعر</TableCell>
                    <TableCell align="right">تاريخ العرض</TableCell>
                    <TableCell align="right">عدد المشاهدات</TableCell>

                  </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row">
                    فيلا
                      </TableCell>
                      <TableCell>بيع</TableCell>
                      <TableCell align="right">الرياض</TableCell>
                      
                      <TableCell align="right">
                        12000000
                      </TableCell>
                      <TableCell align="right">20/2/2024</TableCell>
                      <TableCell align="right">
                        800
                      </TableCell>
                    </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>

<React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } , backgroundColor:'white'}}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          <img src="https://images.bayut.sa/thumbnails/4117731-800x600.webp" alt=""  height={'70px'} width={'70px'} style={{borderRadius:'10px'}}/>
        </TableCell>
        <TableCell component="th" scope="row">
          فيلا
        </TableCell>
        <TableCell align="right">بيع</TableCell>
        <TableCell align="right">الرياض</TableCell>
        <TableCell align="right">12000000</TableCell>
        <TableCell align="right">جديد</TableCell>
        <TableCell align="right">20/2/2024</TableCell>
        <TableCell align="right">
            <Button>تعديل</Button>
        </TableCell>
        <TableCell align="right">            <Button color="red">حذف</Button>
        </TableCell>
        
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography sx={{textAlign:'right'}} variant="h6" gutterBottom component="div">
                التفاصيل
              </Typography>
              <Table size="small" aria-label="purchases" sx={{backgroundColor:'white' }}>
                <TableHead>
                  <TableRow>
                    <TableCell>نوع العقار</TableCell>
                    <TableCell>نوع العرض</TableCell>
                    <TableCell align="right">المدينة</TableCell>
                    <TableCell align="right">السعر</TableCell>
                    <TableCell align="right">تاريخ العرض</TableCell>
                    <TableCell align="right">عدد المشاهدات</TableCell>

                  </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row">
                    فيلا
                      </TableCell>
                      <TableCell>بيع</TableCell>
                      <TableCell align="right">الرياض</TableCell>
                      
                      <TableCell align="right">
                        12000000
                      </TableCell>
                      <TableCell align="right">20/2/2024</TableCell>
                      <TableCell align="right">
                        800
                      </TableCell>
                    </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>

            </CardContent>
        </>
    );
}