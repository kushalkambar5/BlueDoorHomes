import mongoose from "mongoose";

const leadActivitySchema = new mongoose.Schema(
  {
    lead_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lead",
    },
    action: {
      type: String,
      enum: ["status_change"],
      default:"status_change"
    },
    from_status: {
      type: String,
      required: true,
    },
    to_status: {
      type: String,
      required: true,
    },
    note: {
      type: String,
      required: true,
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("LeadActivity", leadActivitySchema);
