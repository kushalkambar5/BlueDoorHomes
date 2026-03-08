import User from "../models/userModel.js";
import HandleError from "../utils/handleError.js";
import handleAsyncError from "./handleAsyncError.js";

const roleBasedAccess = (...roles) => {
  return handleAsyncError(async (req, res, next) => {

    const clerkId = req.auth?.userId;

    if (!clerkId) {
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
          403
        )
      );
    }

    req.user = user; // attach user to request if needed

    next();
  });
};

export default roleBasedAccess;