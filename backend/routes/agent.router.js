import express from "express";
import { addAgent, addEmpToAgent, deleteAgent, editAgent, editEmpInAgent, getAgent, getAgents, removeEmpFromAgent } from "../controllers/agent.controller.js";
import { verifyToken } from "../middlware/verifyToken.js";

const router = express.Router();

router.get('/agents', getAgents);
router.get('/agent/:name', getAgent);

router.post("/agents", verifyToken, addAgent);


router.put("/agents/:id", verifyToken ,editAgent);

router.delete("/agents/:id", verifyToken ,deleteAgent);


router.post("/agents/:id/employees", verifyToken , addEmpToAgent);


router.put("/agents/:agentId/employees/:employeeId", verifyToken , editEmpInAgent);

router.delete("/agents/:agentId/employees/:employeeId", verifyToken , removeEmpFromAgent);

export default router;
