import express from "express";
import { requireAuth } from "@clerk/express";
import {
  createLead,
  updateLead,
  deleteLead,
  getLeadById,
  getLeads,
} from "../controllers/leadContoller";
const router = express.Router();
import roleBasedAccess from "../middlewares/userAuth";

router.post("/", createLead);
router.put("/:id", requireAuth(), roleBasedAccess("admin"), updateLead);
router.delete("/:id", requireAuth(), roleBasedAccess("admin"), deleteLead);
router.get("/:id", requireAuth(), roleBasedAccess("admin"), getLeadById);
router.get("/", requireAuth(), roleBasedAccess("admin"), getLeads);

export default router;
