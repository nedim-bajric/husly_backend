import { Router } from "express";
import { login, postAdmin } from "./adminController.js";

const router = Router();

router.post("/", login);
router.post("/reg", postAdmin);

export default router;
