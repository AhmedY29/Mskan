import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import AdvanceSearchBar from "../components/AdvanceSearchBar";
import Grid from "@mui/material/Grid2";
import CardProperties from "../components/CardProperties";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useState } from "react";
import Maps from "../components/Map.jsx";
import { useEffect } from "react";
import { usePropertiesStore } from "../store/propertiesStore.js";
import Loading from "../components/Loading.jsx";

export default function Properties() {
  const [displaySwitch, setDisplaySwitch] = useState("map");

  const handleChange = (event, newDisplaySwitch) => {
    if (newDisplaySwitch !== null) {
      setDisplaySwitch(newDisplaySwitch);
    }
  };

  const { properties, getProperties ,isLoading } = usePropertiesStore();
  useEffect(() => {
    getProperties();
  }, [getProperties]);

  if(isLoading) {
    return <Loading />
  }

  console.log("properties:", properties);
  return (
    <>
      <div style={{ direction: "rtl" }}>
        <Container fixed>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{ marginTop: 10, marginBottom: 10 }}
          >
            عقارات للبيع في الرياض
          </Typography>
          <AdvanceSearchBar />
        </Container>

        <Divider sx={{ marginBottom: "80px", marginTop: "80px" }} />

        <Container fixed>
          <div
            style={{
              display: "flex",
              marginBottom: "20px",
              marginTop: "20px",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h5" component="h2" gutterBottom>
              30 عقار
            </Typography>

            <ToggleButtonGroup
              color="primary"
              value={displaySwitch}
              exclusive
              onChange={handleChange}
              aria-label="Platform"
              sx={{ direction: "ltr" }}
            >
              <ToggleButton value="map">الخريطة</ToggleButton>
              <ToggleButton value="list">قائمة</ToggleButton>
            </ToggleButtonGroup>
          </div>

          <div style={{ display: "flex" }}>
            <div style={{ flex: "2" }}>
              <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
              >

                {
                isLoading ? <Loading/> : 
                properties?.map((property) => (
                  // <Link key={property.id} to={'/propertyDetails/'} style={{width:'47%' , display:'flex'}}>
                  <CardProperties
                    key={property._id}
                    displaySwitch={displaySwitch}
                    title={property.title}
                    image={property.mainPhoto}
                    price={property.price}
                    location={property.location}
                    bedrooms={property.rooms}
                    bathrooms={property.bathrooms}
                    livingrooms={property.livingrooms}
                    agentphoto={property.owner.avatar}
                    id={property._id}
                  />
                ))}
              </Grid>
            </div>
            <div
              style={{
                flex: "2",
                display: displaySwitch == "list" ? "none" : "block",
                height: "500px",
                position: "sticky",
                top: "0px",
              }}
            >
              <Maps />
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
