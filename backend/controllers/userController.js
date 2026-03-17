import User from "../models/userModel.js";
import HandleError from "../utils/handleError.js";
import handleAsyncError from "../middlewares/handleAsyncError.js";
import { getAuth } from "@clerk/express";

/**
 * @desc    Get current user profile
 * @route   GET /api/v1/users/me
 * @access  Private
 */
export const getUserProfile = handleAsyncError(async (req, res, next) => {
  const auth = getAuth(req);
  const clerkId = auth?.userId;
  if (!clerkId) {
    console.error("❌ Unauthorized: clerkId is missing from req.auth");
    return next(new HandleError("Unauthorized", 401));
  }

  const user = await User.findOne({ clerkId });

  if (!user) {
    console.error(`❌ User not found in DB for clerkId: ${clerkId}`);
    return next(new HandleError("User not found", 404));
  }

  res.status(200).json({
    success: true,
    user,
  });
});
