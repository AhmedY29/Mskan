import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Autocomplete } from "@mui/material"; // استيراد Autocomplete
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
        {/* حقل الموقع مع قائمة المدن */}
        {/* <Autocomplete
          freeSolo
          options={saudiCities}
          value={query.location}
          onChange={(e, newValue) => handleChange("location", newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="الموقع"
              variant="outlined"
              sx={{ width: "200px" }}
            />
          )}
        /> */}

<TextField
          label="الموقع"
          variant="outlined"
          value={query.location}
          autoFocus
          onChange={(e) => handleChange("location", e.target.value)}
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
              sx={{ width: "150px" }}
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
              sx={{ width: "150px" }}
            />
          )}
        />

        {/* زر فتح الحقول الإضافية */}
        <Button variant="contained" color="primary" onClick={handleOpenDialog}>
          جميع الفلاتر
        </Button>
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
