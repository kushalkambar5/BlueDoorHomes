import express from "express";
import {
  createProperty,
  deleteProperty,
  getPropertyById,
  getProperties,
  updateProperty,
  deletePropertyMedia,
} from "../controllers/propertyController.js";
const router = express.Router();
import roleBasedAccess from "../middlewares/userAuth.js";

router.get("/test", (req, res) => res.json({ message: "Router is working" }));
router.post("/", roleBasedAccess("admin"), createProperty);
router.put("/:id", roleBasedAccess("admin"), updateProperty);
router.delete(
  "/:propertyId/media/:mediaId",
  roleBasedAccess("admin"),
  deletePropertyMedia,
);
router.delete("/:id", roleBasedAccess("admin"), deleteProperty);
router.get("/:id", getPropertyById);
router.get("/", getProperties);

export default router;
