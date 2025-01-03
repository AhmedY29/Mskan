import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Pins from "./Pins.jsx";
import { Link } from "react-router-dom";
import { usePropertiesStore } from "../store/propertiesStore.js";
import L from 'leaflet';
const customIcon = new L.Icon({
  iconUrl: 'https://www.svgrepo.com/show/312483/location-indicator-red.svg', // استبدل هذا بالرابط الصحيح للأيقونة
  iconSize: [50, 65], // حجم الأيقونة
  iconAnchor: [12, 41], // نقطة الربط في الأيقونة
  popupAnchor: [13, -25], // نقطة الربط للنافذة المنبثقة
});
function MapDetails({log , lat}) {
  const {properties} = usePropertiesStore()
  console.log(properties);
  return (
    <MapContainer
      style={{ height: "100%", borderRadius: "20px", width: "100%"}}
      center={[lat, log]}
      zoom={18}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution="&copy; Maskn"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

        <Marker position={[lat, log]}icon={customIcon}>
        </Marker>
    </MapContainer>
  );
}

export default MapDetails;

