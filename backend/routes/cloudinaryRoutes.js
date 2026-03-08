import express from "express";
import { getUploadSignature } from "../controllers/cloudinaryController.js";
import roleBasedAccess from "../middlewares/userAuth.js";

const router = express.Router();

router.get("/signature", roleBasedAccess("admin"), getUploadSignature);

export default router;
