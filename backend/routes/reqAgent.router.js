import express from "express";
import { addReq, getAllReq, putReq } from "../controllers/reqAgent.controller.js";

const routes = express.Router();


routes.get('/reqAgent' , getAllReq)
routes.post('/reqAgent' , addReq)
routes.put('/reqAgent/:id' , putReq)


export default routes;