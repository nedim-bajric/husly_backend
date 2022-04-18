import { Router } from "express";
import { getAgents, postAgents } from "./agentController.js";

const router = Router();

router.get("/", getAgents);
router.post("/upload", postAgents);

export default router;
