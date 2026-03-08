import { Webhook } from "svix";
import User from "../models/userModel.js";

export const clerkWebhook = async (req, res) => {
  console.log("-----------------------------------------");
  console.log("➡️ Webhook endpoint hit!");

  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    console.error("❌ Missing WEBHOOK_SECRET in .env");
    return res
      .status(500)
      .json({ success: false, message: "Missing Webhook Secret" });
  }

  const headers = req.headers;
  const payload = req.body;
  console.log(
    "📦 Payload received, size:",
    payload ? payload.length : "undefined",
  );

  const svix_id = headers["svix-id"];
  const svix_timestamp = headers["svix-timestamp"];
  const svix_signature = headers["svix-signature"];

  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error("❌ Missing Svix headers!");
    return res.status(400).json({
      success: false,
      message: "Error occurred -- no svix headers",
    });
  }

  const wh = new Webhook(WEBHOOK_SECRET);

  let evt;
  try {
    evt = wh.verify(payload, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err) {
    console.error("Error verifying webhook:", err.message);
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  const eventType = evt.type;
  console.log(`✅ Webhook verified! Event Type: ${eventType}`);

  if (eventType === "user.created") {
    const { id, email_addresses, first_name, last_name } = evt.data;
    const name = `${first_name || ""} ${last_name || ""}`.trim();
    const email =
      email_addresses && email_addresses.length > 0
        ? email_addresses[0].email_address
        : "";

    console.log(
      `👤 Processing new user: ${id} | Name: ${name} | Email: ${email}`,
    );

    try {
      const existingUser = await User.findOne({ clerkId: id });
      if (!existingUser) {
        await User.create({
          clerkId: id,
          name: name || "Unknown User",
          email: email,
        });
        console.log(`🎉 Clerk User ${id} successfully saved to MongoDB.`);
      } else {
        console.log(`⚠️ User ${id} already exists in DB!`);
      }
    } catch (error) {
      console.error("❌ Error creating user from webhook:", error);
      return res
        .status(500)
        .json({
          success: false,
          message: "Error Storing User",
          error: error.message,
        });
    }
  } else if (eventType === "user.updated") {
    const { id, email_addresses, first_name, last_name } = evt.data;
    const name = `${first_name || ""} ${last_name || ""}`.trim();
    const email =
      email_addresses && email_addresses.length > 0
        ? email_addresses[0].email_address
        : "";

    try {
      await User.findOneAndUpdate(
        { clerkId: id },
        { name: name || "Unknown User", email: email },
        { new: true },
      );
      console.log(`Clerk User ${id} updated in MongoDB.`);
    } catch (error) {
      console.error("Error updating user from webhook:", error);
    }
  } else if (eventType === "user.deleted") {
    const { id } = evt.data;
    try {
      await User.findOneAndDelete({ clerkId: id });
      console.log(`Clerk User ${id} deleted from MongoDB.`);
    } catch (error) {
      console.error("Error deleting user from webhook:", error);
    }
  }

  return res.status(200).json({
    success: true,
    message: "Webhook processed",
  });
};
