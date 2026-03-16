import express from "express";
import { getUserProfile } from "../controllers/userController.js";
import { requireAuth } from "@clerk/express";

const router = express.Router();

router.get("/me", requireAuth(), getUserProfile);

export default router;
