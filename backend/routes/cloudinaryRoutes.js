import express from "express";
import { getUploadSignature } from "../controllers/cloudinaryController.js";
import { requireAuth } from "@clerk/express";
import roleBasedAccess from "../middlewares/userAuth.js";

const router = express.Router();

router.get(
  "/signature",
  requireAuth(),
  roleBasedAccess("admin"),
  getUploadSignature,
);

export default router;
