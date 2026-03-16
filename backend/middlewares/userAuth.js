import User from "../models/userModel.js";
import HandleError from "../utils/handleError.js";
import handleAsyncError from "./handleAsyncError.js";
import { requireAuth } from "@clerk/express";

const roleBasedAccess = (...roles) => {
  return [
    requireAuth(), // This ensures req.auth is populated and valid
    handleAsyncError(async (req, res, next) => {
      console.log("🔒 roleBasedAccess Middleware Trigerred");
      console.log(
        "➡️ req.headers.authorization:",
        req.headers.authorization ? "Present" : "Missing",
      );
      console.log("➡️ req.auth object:", JSON.stringify(req.auth));

      const clerkId = req.auth?.userId;
      console.log("➡️ Extracted clerkId:", clerkId);

      if (!clerkId) {
        console.log("❌ Unauthorized: clerkId is missing from req.auth");
        return next(new HandleError("Unauthorized", 401));
      }

      const user = await User.findOne({ clerkId });

      if (!user) {
        return next(new HandleError("User not found in database", 404));
      }

      if (!roles.includes(user.role)) {
        return next(
          new HandleError(
            `Role '${user.role}' is not allowed to access this resource`,
            403,
          ),
        );
      }

      req.user = user; // attach user to request if needed

      next();
    }),
  ];
};

export default roleBasedAccess;
