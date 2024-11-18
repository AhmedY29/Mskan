import express from "express";
import { createProperty, deleteProperty, getProperties, getProperty, updateProperty } from "../controllers/property.controller.js";
import { verifyToken } from "../middlware/verifyToken.js";


const router = express.Router();

router.get('/property', getProperties )
router.post('/property', createProperty )

router.delete('/property/:propertyId',deleteProperty )
router.put('/property/:propertyId', updateProperty )
router.get('/property/:propertyId', getProperty )

export default router;



