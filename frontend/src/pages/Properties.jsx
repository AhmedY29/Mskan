import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import AdvanceSearchBar from "../components/AdvanceSearchBar";
import Grid from "@mui/material/Grid2";
import CardProperties from "../components/CardProperties";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useState, useEffect } from "react";
import Maps from "../components/Map.jsx";
import { usePropertiesStore } from "../store/propertiesStore.js";
import Loading from "../components/Loading.jsx";
import "../style.css";
import { useLocation } from "react-router-dom";
import { Button } from "@mui/material";

export default function Properties() {
  const [displaySwitch, setDisplaySwitch] = useState("map");
  const [mobile, setMobile] = useState(false);
  const [clean, setClean] = useState(false);
  const [searchQuery, setSearchQuery] = useState({});
  const [filteredProperties, setFilteredProperties] = useState([]);
  const { properties, getProperties, isLoading } = usePropertiesStore();
  const location = useLocation(); // للحصول على الكويري
  const query = location.state || {};

  // دالة لتحديث حالة البحث عند الكتابة في شريط البحث
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    if (Object.keys(query).length > 0) {
      setSearchQuery(query); // تعيين الكويري القادم كبحث نشط
    }
  }, [query]);

  // تطبيق التصفية بناءً على معايير البحث
  useEffect(() => {
    const filterProperties = () => {
      return properties.filter((property) => {
        // التصفية حسب الموقع
        if (searchQuery.location && !property.location.includes(searchQuery.location)) {
          return false;
        }

        // التصفية حسب السعر الأدنى
        if (searchQuery.minPrice && property.price < searchQuery.minPrice) {
          return false;
        }

        // التصفية حسب السعر الأعلى
        if (searchQuery.maxPrice && property.price > searchQuery.maxPrice) {
          return false;
        }

        // التصفية حسب عدد الغرف
        if (searchQuery.rooms && property.rooms !== parseInt(searchQuery.rooms)) {
          return false;
        }

        // التصفية حسب عدد الحمامات
        if (searchQuery.bathrooms && property.bathrooms !== parseInt(searchQuery.bathrooms)) {
          return false;
        }
        // التصفية حسب عدد الحمامات
        if (searchQuery.type && searchQuery.type !== "الكل" && !property.type.includes(searchQuery.type)) {
          return false;
        }

        return true;
      });
    };

    setFilteredProperties(filterProperties());
  }, [searchQuery, properties]);

  // التأكد من عرض العقارات بعد الجلب
  useEffect(() => {
    getProperties();
  }, [getProperties]);

  useEffect(() => {
    const checkWindowSize = () => {
      if(!isLoading){
      if (window.innerWidth <= 748) {
        setTimeout(() => {
          setDisplaySwitch('list')
        }, 500);
        setMobile(true);
      } else {
        setMobile(false);
      }}
    };



    // فحص الحجم عند التحميل
    checkWindowSize();
    window.addEventListener("resize", checkWindowSize);

    // تنظيف المستمع عند إزالة المكون
    return () => window.removeEventListener("resize", checkWindowSize);
  }, []);

  const handleChange = (event, newDisplaySwitch) => {
    if (newDisplaySwitch !== null) {
      setDisplaySwitch(newDisplaySwitch);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

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
            عقارات {query.type == 'بيع' ? 'للبيع' : query.type == 'ايجار' ? 'للإيجار' : ''} في {query.location || 'السعودية'}
          </Typography>

          {/* شريط البحث */}
          <AdvanceSearchBar onSearch={handleSearch} querya={query} />
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
              {
                filteredProperties.length + ' عقار '
              }
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

          <div className="propertyPage" style={{ display: "flex" }}>
            <div
              style={{
                flex: "2",
                display: mobile && displaySwitch === "map" ? "none" : "block",
              }}
            >
              <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
              >
                
                {filteredProperties?.map((property) => (
                  <CardProperties
                    key={property._id}
                    displaySwitch={displaySwitch}
                    property={property}
                  /> 
                ))
              }
              </Grid>
            </div>
            <div
              style={{
                flex: "2",
                display: displaySwitch === "list" ? "none" : "block",
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
