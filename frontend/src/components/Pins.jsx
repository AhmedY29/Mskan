import { Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Link } from "react-router-dom";

 function Pins({ item }){
    console.log('item',item);
    return(
        <div style={{ direction: "ltr" }}>
        <Marker position={[item.latitude , item.longitude]}>
          <Popup>
            <div style={{ display: "flex", gap: "20px" }}>
              <img
                style={{
                  width: "64px",
                  height: "48px",
                  objectFit: "cover",
                  borderRadius: "5px",
                }}
                src={item.mainPhoto}
              />
              <Link to={`propertyDetails/${item._id}`}>{item.title}</Link>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <span>غرفة{item.rooms} </span>
                <b>{item.price} ريال</b>
              </div>
            </div>
          </Popup>
        </Marker>
      </div>
    
    );
}
export default Pins;