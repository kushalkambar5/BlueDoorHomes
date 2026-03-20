import { createClerkClient, requireAuth, getAuth } from "@clerk/express";
import HandleError from "../utils/handleError.js";
import handleAsyncError from "./handleAsyncError.js";

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

const roleBasedAccess = (...roles) => {
  return [
    requireAuth(),
    handleAsyncError(async (req, res, next) => {
      try {
        const auth = getAuth(req);
        const clerkId = auth?.userId;

        if (!clerkId) {
          return next(new HandleError("Unauthorized", 401));
        }

        const user = await clerkClient.users.getUser(clerkId);
        const role = user.publicMetadata?.role || "user";

        if (!roles.includes(role)) {
          return next(
            new HandleError(
              `Role '${role}' is not allowed to access this resource`,
              403,
            ),
          );
        }

        req.userRole = role;
        req.clerkUser = user;
        next();
      } catch (error) {
        console.error("RBAC middleware error:", error);
        return next(new HandleError("Authentication error", 500));
      }
    }),
  ];
};

export default roleBasedAccess;
