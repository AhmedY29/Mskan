import express from "express";
import { createProperty, deleteProperty, getProperties, updateProperties } from "../controllers/property.controller.js";


const router = express.Router();

router.get('/property', getProperties )
router.post('/property', createProperty )

router.delete('/property/:propertyId',deleteProperty )
router.put('/property/:propertyId', updateProperties )

export default router;



