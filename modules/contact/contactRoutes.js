import { Router } from "express";
import { sendEmail } from "./contactController.js";

const router = Router();

router.post("/", sendEmail);

export default router;
