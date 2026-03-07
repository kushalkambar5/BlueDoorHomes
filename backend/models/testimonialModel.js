import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema(
  {
    client_name: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    image_url: {
      type: String,
      required: true,
    },
    property_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
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

export default mongoose.model("Testimonial", testimonialSchema);
