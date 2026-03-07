import express from "express";
import errorMiddleware from "./middlewares/error.js";
const app = express();
import { clerkMiddleware } from "@clerk/express";
import authRoutes from "./routes/authRoutes.js";
import leadRoutes from "./routes/leadRoutes.js";
import propertyRoutes from "./routes/propertyRoutes.js";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(clerkMiddleware());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/properties", propertyRoutes);
app.use("/api/v1/leads", leadRoutes);

app.use(errorMiddleware);

export default app;
