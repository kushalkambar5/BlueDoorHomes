import express from "express";
import {
  createProperty,
  deleteProperty,
  getPropertyById,
  getProperties,
  updateProperty,
} from "../controllers/adminController";
const router = express.Router();
import roleBasedAccess from "../middlewares/userAuth";
import { requireAuth } from "@clerk/express";

router.post("/", requireAuth(), roleBasedAccess("admin"), createProperty);
router.put("/:id", requireAuth(), roleBasedAccess("admin"), updateProperty);
router.delete("/:id", requireAuth(), roleBasedAccess("admin"), deleteProperty);
router.get("/:id", getPropertyById);
router.get("/", getProperties);

export default router;
