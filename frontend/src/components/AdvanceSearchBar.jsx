import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Autocomplete } from "@mui/material"; // استيراد Autocomplete
import { useEffect } from "react";
import { useState } from "react";

export default function AdvanceSearchBar({ onSearch , querya }) {
  const [query, setQuery] = useState({
    location: querya.location,
    minPrice: querya.minPrice,
    maxPrice: querya.maxPrice,
    rooms: querya.rooms,
    bathrooms: querya.bathrooms,
    minArea: querya.minArea,
    maxArea: querya.maxArea,
    type: querya.type,
  });

  const [dialogOpen, setDialogOpen] = useState(false); // التحكم في فتح وإغلاق الـ Dialog

  // قائمة المدن السعودية
  const saudiCities = [
    "الرياض",
    "جدة",
    "مكة المكرمة",
    "المدينة المنورة",
    "الدمام",
    "الهفوف",
    "الطائف",
    "تبوك",
    "بريدة",
    "الخبر",
    "حائل",
    "نجران",
    "خميس مشيط",
    "أبها",
    "جازان",
    "ينبع",
    "عرعر",
    "الباحة",
    "سكاكا",
    "القطيف",
    "الجبيل",
    "الخرج",
    "المجمعة",
    "الزلفي",
    "رابغ",
    "بيشة",
    "صبيا",
    "محايل عسير",
    "القنفذة",
    "البكيرية",
    "الرس",
    "الحوطة",
    "وادي الدواسر",
    "الأفلاج",
    'القصيم',
  ];

  const [mobile, setMobile] = useState(false);

  
    useEffect(() => {
      const checkWindowSize = () => {
        if (window.innerWidth <= 748) {
          setMobile(true);
        } else {
          setMobile(false);
        }
      };
  
      // فحص الحجم عند التحميل
      checkWindowSize();
      window.addEventListener("resize", checkWindowSize);
  
      // تنظيف المستمع عند إزالة المكون
      return () => window.removeEventListener("resize", checkWindowSize);
    }, []);


  // تحديث حالة البحث عند تغيير المدخلات
  const handleChange = (field, value) => {
    const updatedQuery = { ...query, [field]: value };
    setQuery(updatedQuery);

    // تمرير القيم المحدثة إلى مكون Properties
    if (onSearch) {
      onSearch(updatedQuery);
    }
  };

  // فتح الـ Dialog
  const handleOpenDialog = () => {
    setDialogOpen(true);
  };
  const handleRestQuery = () => {
    const resetQuery = {
      title: '',
      location: '',
      minPrice: '',
      maxPrice: '',
      rooms: '',
      bathrooms: '',
      minArea: '',
      maxArea: '',
      type: '',
    };
    setQuery(resetQuery);
    onSearch(resetQuery);
  };

  // إغلاق الـ Dialog
  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  // تنفيذ البحث من داخل الـDialog
  const handleSearch = () => {
    if (onSearch) {
      onSearch(query);
    }
    setDialogOpen(false); // إغلاق الـDialog بعد الضغط على زر البحث
  };

  // التعامل مع ضغط زر "إيجار" أو "بيع"
  const handletypeClick = (type) => {
    handleChange("type", type); // تحديث قيمة type
  };

  return (
    <>


      {/* الفلاتر خارج الـ Dialog */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        {/* <div style={{display:'flex' , flexDirection:'column'}}> */}
        
        <Button
          variant={query.type === "ايجار" ? "contained" : "outlined"}
          color="primary"
          onClick={() => handletypeClick("ايجار")}
        >
          إيجار
        </Button>
        <Button
          variant={query.type === "بيع" ? "contained" : "outlined"}
          color="primary"
          onClick={() => handletypeClick("بيع")}
        >
          بيع
        </Button>
        <Button
          variant={query.type === "الكل" ? "contained" : "outlined"}
          color="primary"
          onClick={() => handletypeClick("")}
        >
          الكل
        </Button>
        {/* </div> */}

        {
          mobile ? <br /> :''
        }
        {/* حقل الموقع مع قائمة المدن */}

        <TextField
          label="الموقع"
          variant="outlined"
          value={query.location}
          onChange={(e) => handleChange("location", e.target.value)}
          sx={{ width: "150px" }}
        />
        { mobile == false ?
          <>
          <TextField
          label="نوع العقار"
          variant="outlined"
          value={query.title}
          onChange={(e) => handleChange("title", e.target.value)}
          sx={{ width: "150px" }}
        />
        {/* حقل السعر الأدنى */}
        <TextField
          label="السعر الأدنى"
          variant="outlined"
          type="number"
          value={query.minPrice}
          onChange={(e) => handleChange("minPrice", e.target.value)}
          sx={{ width: "150px" }}
        />

        {/* حقل السعر الأعلى */}
        <TextField
          label="السعر الأعلى"
          variant="outlined"
          type="number"
          value={query.maxPrice}
          onChange={(e) => handleChange("maxPrice", e.target.value)}
          sx={{ width: "150px" }}
        />


        <TextField
          label="الغرف"
          variant="outlined"
          type="number"
          value={query.rooms}
          onChange={(e) => handleChange("rooms", e.target.value)}
          sx={{ width: "150px" }}
        />
        </> :''
        }

        {/* زر فتح الحقول الإضافية */}
        <div style={{display:'flex' , flexDirection:'column'}}>
        <Button variant="contained" color="primary" onClick={handleOpenDialog}>
          جميع الفلاتر
        </Button>
        <Button sx={{marginTop:'7px'}} variant="outlined" color="primary" onClick={handleRestQuery}>
           اعادة تعيين
        </Button>
        </div>
      </div>

      {/* Dialog للخيارات الإضافية */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>تصفية البحث</DialogTitle>
        <DialogContent>
          {/* حقل الموقع مع قائمة المدن */}
          <Autocomplete
            freeSolo
            options={saudiCities}
            value={query.location}
            onChange={(e, newValue) => handleChange("location", newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="الموقع"
                variant="outlined"
                sx={{ marginBottom: "15px", width: "100%" }}
              />
            )}
          />

          {/* حقل السعر الأدنى */}
          <TextField
            label="السعر الأدنى"
            variant="outlined"
            type="number"
            value={query.minPrice}
            onChange={(e) => handleChange("minPrice", e.target.value)}
            sx={{ marginBottom: "15px", width: "100%" }}
          />

          {/* حقل السعر الأعلى */}
          <TextField
            label="السعر الأعلى"
            variant="outlined"
            type="number"
            value={query.maxPrice}
            onChange={(e) => handleChange("maxPrice", e.target.value)}
            sx={{ marginBottom: "15px", width: "100%" }}
          />

          {/* عدد الغرف */}
          <Autocomplete
            freeSolo
            options={["1", "2", "3", "4", "5"]}
            value={query.rooms}
            onChange={(e, newValue) => handleChange("rooms", newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="الغرف"
                variant="outlined"
                sx={{ marginBottom: "15px", width: "100%" }}
              />
            )}
          />

          {/* عدد الحمامات */}
          <Autocomplete
            freeSolo
            options={["1", "2", "3", "4", "5"]}
            value={query.bathrooms}
            onChange={(e, newValue) => handleChange("bathrooms", newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="الحمامات"
                variant="outlined"
                sx={{ marginBottom: "15px", width: "100%" }}
              />
            )}
          />

          {/* مساحة العقار */}
          <TextField
            label="المساحة الأدنى (م²)"
            variant="outlined"
            type="number"
            value={query.minArea}
            onChange={(e) => handleChange("minArea", e.target.value)}
            sx={{ marginBottom: "15px", width: "100%" }}
          />

          <TextField
            label="المساحة الأعلى (م²)"
            variant="outlined"
            type="number"
            value={query.maxArea}
            onChange={(e) => handleChange("maxArea", e.target.value)}
            sx={{ marginBottom: "15px", width: "100%" }}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            إلغاء
          </Button>
          <Button onClick={handleSearch} variant="contained" color="primary">
            بحث
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
