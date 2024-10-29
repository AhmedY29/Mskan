import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import "../style.css";

import SearchBar from "./SearchBar";

export default function Hero() {
  return (
    <>
      <div
        style={{
          height: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "80px",
        }}
        className="hero-img"
      >
        <Container
          fixed
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div className="text-hero">
            <h1
            >
              مسكن مثالي لك ولعائلتك بانتظارك: اكتشف الخيارات المتنوعة لدينا!
            </h1>
          </div>
          <div style={{display:'flex' , justifyContent:'center'}}>
            <SearchBar />
          </div>
        </Container>
      </div>
      <Divider />
    </>
  );
}
