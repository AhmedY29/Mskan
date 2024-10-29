import Container from "@mui/material/Container";
import PropertyDetailsPhotos from "../components/PropertyDetailsPhotos.jsx";


// icons
import PropertyDetailsText from "../components/PropertyDetailsText.jsx";

export default function PropertyDetails() {
  return (
    <>
      <Container fixed className="container">
        <div className="split-content" style={{ display: "flex", marginTop: "45px"  }}>
          <PropertyDetailsPhotos />
          <PropertyDetailsText/>
        </div>
      </Container>
    </>
  );
}
