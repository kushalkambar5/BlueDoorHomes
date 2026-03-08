import express from "express";
import {
  createProperty,
  deleteProperty,
  getPropertyById,
  getProperties,
  updateProperty,
} from "../controllers/propertyController.js";
const router = express.Router();
import roleBasedAccess from "../middlewares/userAuth.js";

router.post("/", roleBasedAccess("admin"), createProperty);
router.put("/:id", roleBasedAccess("admin"), updateProperty);
router.delete("/:id", roleBasedAccess("admin"), deleteProperty);
router.get("/:id", getPropertyById);
router.get("/", getProperties);

export default router;
