import express from "express";
import {
  createTestimonial,
  deleteTestimonial,
  getAllTestimonials,
  getTestimonialById,
  updateTestimonial,
} from "../controllers/testimonialController";
import roleBasedAccess from "../middlewares/userAuth";

const router = express.Router();

router.post("/", roleBasedAccess("admin"), createTestimonial);
router.get("/", getAllTestimonials);
router.get("/:id", roleBasedAccess("admin"), getTestimonialById);
router.put("/:id", roleBasedAccess("admin"), updateTestimonial);
router.delete("/:id", roleBasedAccess("admin"), deleteTestimonial);

export default router;
