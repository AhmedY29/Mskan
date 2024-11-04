import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Pins from "./Pins.jsx";
import { Link } from "react-router-dom";
import { usePropertiesStore } from "../store/propertiesStore.js";

function Maps() {
  const {properties} = usePropertiesStore()
  console.log(properties);
  return (
    <MapContainer
      style={{ height: "100%", borderRadius: "20px", width: "100%" }}
      center={[23.638890100395102, 45.41319855857876]}
      zoom={5}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution="&copy; Maskn"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

{properties && properties.map((item) => (
        <Marker position={[item.latitude, item.longitude]} key={item._id}>
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
                alt={item.title}
              />
              <Link to={`/${item._id}`}>{item.title}</Link>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <span>{item.rooms} room</span>
                <b>{item.price} ريال</b>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default Maps;

