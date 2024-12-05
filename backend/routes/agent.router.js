import express from "express";
import { addAgent, addEmpToAgent, deleteAgent, editAgent, editEmpInAgent, getAgent, getAgents, removeEmpFromAgent } from "../controllers/agent.controller.js";
import { verifyToken } from "../middlware/verifyToken.js";

const router = express.Router();

router.get('/agents', getAgents);
router.get('/agent/:name', getAgent);
// =====================
// إضافة وكيل جديد
// =====================
router.post("/agents", verifyToken, addAgent);

// =====================
// تعديل وكيل موجود
// =====================
router.put("/agents/:id", verifyToken ,editAgent);

// =====================
// حذف وكيل
// =====================
router.delete("/agents/:id", verifyToken ,deleteAgent);

// =====================
// إضافة موظف إلى وكيل
// =====================
router.post("/agents/:id/employees", verifyToken , addEmpToAgent);

// =====================
// تعديل موظف في وكيل
// =====================
router.put("/agents/:agentId/employees/:employeeId", verifyToken , editEmpInAgent);

// =====================
// حذف موظف من وكيل
// =====================
router.delete("/agents/:agentId/employees/:employeeId", verifyToken , removeEmpFromAgent);

export default router;
