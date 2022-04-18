import { Router } from "express";
import { getPropertys, postPropertys } from "./propertyController.js";

const router = Router();

router.get("/", getPropertys);
router.post("/upload", postPropertys);

export default router;
