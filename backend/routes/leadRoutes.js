import express from "express";
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
router.put("/:id", roleBasedAccess("admin"), updateLead);
router.delete("/:id", roleBasedAccess("admin"), deleteLead);
router.get("/:id", roleBasedAccess("admin"), getLeadById);
router.get("/", roleBasedAccess("admin"), getLeads);

export default router;
