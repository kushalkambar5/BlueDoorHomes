import express from "express";
import { clerkWebhook } from "../controllers/webhookController.js";

const router = express.Router();

// The webhook controller expects req.body to be a raw Buffer,
// so we specify the raw body parser for this route directly in app.js
router.post("/clerk", clerkWebhook);

export default router;
