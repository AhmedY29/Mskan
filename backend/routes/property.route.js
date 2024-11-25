import express from "express";
import {
  createProperty,
  deleteProperty,
  getProperties,
  getProperty,
  updateProperty,
} from "../controllers/property.controller.js";
import { verifyToken } from "../middlware/verifyToken.js";
import { URL } from "url";
import axios from "axios";

const router = express.Router();

router.get("/property", getProperties);
router.post("/property", createProperty);

router.delete("/property/:propertyId", deleteProperty);
router.put("/property/:propertyId", updateProperty);
router.get("/property/:propertyId", getProperty);
router.get("/urltst", async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).send("يجب توفير رابط Google Maps");
  }

  try {
    let finalUrl = url;

    // التحقق من أن الرابط مختصر (goo.gl أو maps.app.goo.gl)
    if (url.includes("goo.gl") || url.includes("maps.app.goo.gl")) {
      // توسيع الرابط المختصر باستخدام axios
      const response = await axios.get(url);
      finalUrl = response.request.res.responseUrl;
      console.log("Expanded URL:", finalUrl); // طباعة الرابط المتوسع
    }

    // إنشاء كائن URL من الرابط المتوسع
    const parsedUrl = new URL(finalUrl);

    // التحقق من أن الرابط هو رابط من Google Maps
    if (!parsedUrl.hostname.includes("google.com")) {
      return res.status(400).send("الرابط يجب أن يكون من Google Maps");
    }

    // استخدام تعبير منتظم لاستخراج الإحداثيات من الرابط
    const match = parsedUrl.href.match(
      /[-+]?[0-9]*\.?[0-9]+,[\s]*[-+]?[0-9]*\.?[0-9]+/
    );

    if (match) {
      // فصل الإحداثيات
      const coordinates = match[0].split(",");
      const lat = coordinates[0].trim().replace("+", ""); // إزالة علامة +
      const lng = coordinates[1].trim().replace("+", "");

      console.log("Coordinates extracted:", { lat, lng });
      return res.status(200).json({ lat, lng }); // إرسال الإحداثيات كاستجابة JSON
    } else {
      return res.status(404).send("لم يتم العثور على الإحداثيات");
    }
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).send("حدث خطأ أثناء معالجة الرابط");
  }
});
export default router;
