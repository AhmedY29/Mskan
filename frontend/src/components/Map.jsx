import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Link } from "react-router-dom";
import { usePropertiesStore } from "../store/propertiesStore.js";
import L from "leaflet";
import { useState, useEffect } from "react";
import Loading from "./Loading.jsx";

const customIcon = new L.Icon({
  iconUrl: "https://www.svgrepo.com/show/312483/location-indicator-red.svg",
  iconSize: [50, 65],
  iconAnchor: [25, 65],
  popupAnchor: [0, -55],
});

// مكون لتحديث مركز الخريطة
function MapUpdater({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom); // تحديث مركز الخريطة والتكبير
  }, [center, zoom, map]);
  return null;
}

function Maps({ city }) {
  const { properties, isLoading } = usePropertiesStore();
  
  const cityLocations = {
    الرياض: { lat: 24.717346936016177, lng: 46.68801514943679, zoom: 10 },
    جدة: { lat: 21.523125264382465, lng: 39.17129992366116, zoom: 10 },
    "مكة المكرمة": { lat: 21.420594403712332, lng: 39.81566510501155, zoom: 10 },
    "المدينة المنورة": { lat: 24.46240720365138, lng: 39.60967036214532, zoom: 10 },
    القصيم: { lat: 26.18968123616505, lng: 43.83547840910354, zoom: 10 },
    الخبر: { lat: 26.26196598480146, lng: 50.163011696994054, zoom: 11 },
  };

  const defaultLocation = { lat: 23.638890100395102, lng: 45.41319855857876, zoom: 5 };

  const [zoomInCity, setZoomInCity] = useState(defaultLocation);
  // const [mouseover, setMouseover] = useState();
  // const [filteredProperties, setFilteredProperties] = useState([]);
  // const [unfilteredProperties, setUnfilteredProperties] = useState([]);

  useEffect(() => {
    setZoomInCity(cityLocations[city] || defaultLocation);
  }, [city]);

  // useEffect(() => {
  //   setMouseover()
  //   const filtered = properties
  //   setUnfilteredProperties(properties.filter(property => !filtered.includes(property)));
  // }, [city]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <MapContainer
      style={{ height: "100%", borderRadius: "20px", width: "100%" }}
      center={[zoomInCity.lat, zoomInCity.lng]}
      zoom={zoomInCity.zoom}
      scrollWheelZoom={true}
    >
      {/* مكون لتحديث الخريطة */}
      <MapUpdater center={[zoomInCity.lat, zoomInCity.lng]} zoom={zoomInCity.zoom} />

      <TileLayer
        attribution="&copy; Maskn"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {properties &&
        properties.map((item) => (
          <Marker
            position={[item.latitude, item.longitude]}
            key={item._id}
            icon={customIcon}
          >
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
                  <span>{item.rooms} غرفة</span>
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
