import { getUploadSignature } from "../api/cloudinaryApi";

export const uploadToCloudinary = async (file) => {

  const sigRes = await getUploadSignature()
  const { timestamp, signature, apiKey, cloudName } = sigRes

  const resourceType = file.type.startsWith("video") ? "video" : "image"

  const formData = new FormData()

  formData.append("file", file)
  formData.append("api_key", apiKey)
  formData.append("timestamp", timestamp)
  formData.append("signature", signature)

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`,
    {
      method: "POST",
      body: formData
    }
  )

  const data = await res.json()

  return {
    url: data.secure_url,
    public_id: data.public_id,
    type: resourceType
  }
}