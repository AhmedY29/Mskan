import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Link } from "react-router-dom";
import { usePropertiesStore } from "../store/propertiesStore.js";
import L from 'leaflet';
const customIcon = new L.Icon({
  iconUrl: 'https://www.svgrepo.com/show/312483/location-indicator-red.svg', // استبدل هذا بالرابط الصحيح للأيقونة
  iconSize: [50, 65], // حجم الأيقونة
  iconAnchor: [12, 41], // نقطة الربط في الأيقونة
  popupAnchor: [13, -25], // نقطة الربط للنافذة المنبثقة
});
function Maps() {
  const {properties} = usePropertiesStore()
  console.log(properties);
  return (
    <MapContainer
      style={{ height: "100%", borderRadius: "20px", width: "100%" }}
      center={[23.638890100395102, 45.41319855857876]}
      zoom={5}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution="&copy; Maskn"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

{properties && properties.map((item) => (
        <Marker position={[item.latitude, item.longitude]} key={item._id} icon={customIcon}>
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
              <Link to={`/propertyDetails/${item._id}`}>{item.title}</Link>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <span>{item.rooms}غرفة</span>
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

