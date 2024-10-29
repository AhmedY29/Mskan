
import { Geocoder } from '@mapbox/search-js-react';
import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import '../style.css';


const accessToken = "pk.eyJ1IjoiYWhtZWQyOTc3IiwiYSI6ImNtMmc0dmQyOTBlbmEycHBmbnFxcjRtbzcifQ.y97cAeETJnH9x2kpXDaAzA";

function Maps2() {
  const mapContainerRef = useRef();
  const mapInstanceRef = useRef();
  const [, setMapLoaded] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const rtlPluginInitialized = useRef(false); // متغير لتتبع حالة تهيئة الـ RTL

  useEffect(() => {
    mapboxgl.accessToken = accessToken;

    // تحقق مما إذا كان قد تم تهيئة الـ RTL
    if (!rtlPluginInitialized.current) {
      mapboxgl.setRTLTextPlugin(
        'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.3.0/mapbox-gl-rtl-text.js',
        null,
        true
      );
      rtlPluginInitialized.current = true; // تحديث الحالة بعد التهيئة
    }

    mapInstanceRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: [43.973052, 26.32851], // [lng, lat]
      zoom: 11,
      style: 'mapbox://styles/mapbox/streets-v12' ,// style URL
      language:'ar'

    });
    new mapboxgl.Marker({
      color:'red',
      scale:1
    })
    .setLngLat([43.973052, 26.32851])
    .addTo(mapInstanceRef.current);
    mapInstanceRef.current.on("load", () => {
      setMapLoaded(true);
    });

    return () => {
      mapInstanceRef.current.remove();
    };
  }, []);

  return (
    <div style={{ direction: 'rtl' }}> {/* إضافة direction: rtl هنا */}
      {/* Uncomment to use Geocoder */}
      {/* <Geocoder
        accessToken={accessToken}
        map={mapInstanceRef.current}
        mapboxgl={mapboxgl}
        value={inputValue}
        onChange={(d) => {
          setInputValue(d);
        }}
        marker
      /> */}
      <div id="map-container" ref={mapContainerRef} style={{ height: 500 }} />
    </div>
  );
}

export default Maps2;