import axiosInstance from "./axiosInstance";

const API_URL = "/api/v1/cloudinary";

export const getUploadSignature = async () => {
  const response = await axiosInstance.get(API_URL + "/signature");
  return response.data;
};