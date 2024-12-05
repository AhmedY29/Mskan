import { useState } from "react";
import * as React from "react";
import Container from "@mui/material/Container";

import "../style.css";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { InputAdornment, List, ListItem, ListItemText, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { useNavigate } from "react-router-dom";

const types = ["الكل" ,"بيع", "ايجار" ];

export default function SearchBar() {

  const [query, setQuery] = useState({
    type: "الكل",
    location: "",
    minPrice: "",
    maxPrice: "",
    rooms: "",
    bathrooms: "",
    minArea: "",
    maxArea: "",
  });

  function switchType(value) {
    setQuery((prev) => ({ ...prev, type: value }));
    console.log(query);
  }

  const navigate = useNavigate();
  
  function handleSearch() {
    navigate("/properties", { state: query }); // نقل الكويري إلى صفحة Properties
  }
  return (
    <>
      <Container fixed>
        {types.map((type) => (
          <Button
            key={type}
            variant="contained"
            className="btn-type"
            sx={{
              height: "30px",
              boxShadow: "none !important",
              backgroundColor: query.type == type ? "" : "rgb(153 157 161)",
            }}
            onClick={() => switchType(type)}
          >
            {type}
          </Button>
        ))}

        <Card
          sx={{
            display: "flex",
            justifyContent: "center",
            borderTopRightRadius: 0,
          }}
        >
          <CardContent>
            <form onSubmit={handleSearch}>
              <TextField
                className="text-field"
                sx={{ textAlign: "right", direction: "rtl" }}
                id="outlined-basic"
                placeholder="أدخل الموقع"
                variant="outlined"
                value={query.location}
                onChange={(e) => setQuery({...query , location:e.target.value})}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationOnOutlinedIcon />
                      </InputAdornment>
                    ),
                  },
                }}
              />

              {/* <IconButton aria-label="delete" size="small">
                  <SearchOutlinedIcon/>
                </IconButton> */}
              <Button
                variant="contained"
                sx={{
                  height: "55px",
                  fontSize: "20px",
                  marginRight: "10px",
                }}
                type="submit"
              >
                بحث
              </Button>
            </form>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
