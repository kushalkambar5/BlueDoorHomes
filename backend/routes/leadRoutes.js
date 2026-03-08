import express from "express";
import { requireAuth } from "@clerk/express";
import {
  createLead,
  updateLead,
  deleteLead,
  getLeadById,
  getLeads,
} from "../controllers/leadController.js";
const router = express.Router();
import roleBasedAccess from "../middlewares/userAuth.js";

router.post("/", createLead);
router.put("/:id", roleBasedAccess("admin"), updateLead);
router.delete("/:id", roleBasedAccess("admin"), deleteLead);
router.get("/:id", roleBasedAccess("admin"), getLeadById);
router.get("/", roleBasedAccess("admin"), getLeads);

export default router;
