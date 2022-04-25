import { Router } from "express";
import {
  deleteProperty,
  getPropertys,
  postPropertys,
  updateProperty,
} from "./propertyController.js";

const router = Router();

router.get("/", getPropertys);
router.post("/upload", postPropertys);
router.delete("/delete/:id", deleteProperty);
router.put("/update/:id", updateProperty);

export default router;
