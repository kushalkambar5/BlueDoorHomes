import "dotenv/config";
import express from "express";
import errorMiddleware from "./middlewares/error.js";
const app = express();
import { clerkMiddleware } from "@clerk/express";
import leadRoutes from "./routes/leadRoutes.js";
import propertyRoutes from "./routes/propertyRoutes.js";
import cloudinaryRoutes from "./routes/cloudinaryRoutes.js";
import webhookRoutes from "./routes/webhookRoutes.js";
import cors from "cors";

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  }),
);

// Webhook route MUST be before express.json() because Svix requires the raw request body
app.use(
  "/api/v1/webhooks",
  express.raw({ type: "application/json" }),
  webhookRoutes,
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(clerkMiddleware());

app.use("/api/v1/properties", propertyRoutes);
app.use("/api/v1/leads", leadRoutes);
app.use("/api/v1/cloudinary", cloudinaryRoutes);

app.use(errorMiddleware);

export default app;
