import { generateSignature } from "../utils/cloudinarySignature.js"

export const getUploadSignature = (req, res) => {

  const { timestamp, signature } = generateSignature()

  res.json({
    timestamp,
    signature,
    apiKey: process.env.CLOUDINARY_API_KEY,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME
  })
}