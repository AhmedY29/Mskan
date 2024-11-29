import express from 'express';
import { checkSave, getSavedProperties, removeProperty, saveProperty } from '../controllers/saveProperty.controller.js';
import { verifyToken } from '../middlware/verifyToken.js';

const router = express.Router();

// حفظ العقار في المحفوظات
router.get('/getsaved', verifyToken, getSavedProperties);
router.get('/check/:propertyId', verifyToken, checkSave);
router.post('/save/:propertyId', verifyToken, saveProperty);
router.delete('/remove/:propertyId', verifyToken, removeProperty);

export default router;