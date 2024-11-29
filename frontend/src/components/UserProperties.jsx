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
import { usePropertiesStore } from "../store/propertiesStore";
import { useEffect } from "react";
import Loading from "./Loading";

export default function UserProperties({user}){
    const [isBookmarked, setIsBookmarked] = useState(false);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const {getProperties , isLoading , properties} = usePropertiesStore();
    const [searchQuery, setSearchQuery] = useState({
      owner: user._id
    });
    var formattedDate;
    var price;

    useEffect(() => {
      getProperties();
    }, [getProperties]);

    useEffect(() => {
      const filterProperties = () => {
        return properties.filter((property) => {
          // تحقق من أن العقار يحتوي على المالك المطلوب
          console.log('ss\\d' , property.owner )

          return property.owner._id === searchQuery.owner;
        });
      };
  
      setFilteredProperties(filterProperties());
      console.log('ss' , filteredProperties)
      console.log('ss\\' , searchQuery)
    }, [searchQuery.owner, properties]);
  
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

    if(isLoading){
      return <Loading/>
    }

    return(
        <>
                        <CardContent style={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="h6" component="div" sx={{marginBottom:'40px'}}>
                 العقارات
              </Typography>


<React.Fragment>
      
          {filteredProperties.map((property) => (
            <React.Fragment key={property._id}>
              <TableRow
                sx={{
                  "& > *": { borderBottom: "unset" },
                  backgroundColor: "white",
                }}
              >
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
                  <img
                    src={property.mainPhoto}
                    alt=""
                    height={"70px"}
                    width={"70px"}
                    style={{ borderRadius: "10px" }}
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  {property.title}
                </TableCell>
                <TableCell align="right">{property.type}</TableCell>
                <TableCell align="right">{property.address}</TableCell>
                <TableCell align="right">{
                           price = new Intl.NumberFormat('en-US').format(property.price)
                  }</TableCell>
                <TableCell align="right">{property.ageforbuild}</TableCell>
                <TableCell align="right">{
                                 formattedDate = new Date(property.createdAt).toLocaleDateString('ar-EG', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                })
                            }</TableCell>
                <TableCell align="right">
                  <Button>تعديل</Button>
                </TableCell>
                <TableCell align="right">
                  <Button color="red">حذف</Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  style={{ paddingBottom: 0, paddingTop: 0 }}
                  colSpan={6}
                >
                  <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box sx={{ margin: 1 }}>
                      <Typography
                        sx={{ textAlign: "right" }}
                        variant="h6"
                        gutterBottom
                        component="div"
                      >
                        التفاصيل
                      </Typography>
                      <Table
                        size="small"
                        aria-label="purchases"
                        sx={{ backgroundColor: "white" }}
                      >
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
                              {property.title}
                            </TableCell>
                            <TableCell>{property.type}</TableCell>
                            <TableCell align="right">
                              {property.location}
                            </TableCell>
                            <TableCell align="right">
                              {price = new Intl.NumberFormat('en-US').format(property.price)}
                            </TableCell>
                            <TableCell align="right">
                              {
                                 formattedDate = new Date(property.createdAt).toLocaleDateString('ar-EG', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                })
                            }
                            </TableCell>
                            <TableCell align="right">
                              {property.views}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </Box>
                  </Collapse>
                </TableCell>
              </TableRow>
            </React.Fragment>
          ))
          
         
          }
        </React.Fragment>
          

            </CardContent>
        </>
    );
}