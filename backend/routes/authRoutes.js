import { requireAuth } from "@clerk/express";
import { Router } from "express";

const router = Router();

router.get("/profile", requireAuth(), (req, res) => {
    res.json({
        message: "Authenticated",
        userId: req.auth.userId
    });
});

export default router;