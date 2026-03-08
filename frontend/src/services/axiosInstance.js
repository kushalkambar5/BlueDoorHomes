import axios from "axios";
import dotenv from "dotenv"
dotenv.config()

const axiosInstance = axios.create({
  baseURL: process.env.VITE_BACKEND_API_URL,
  withCredentials: true
});

axiosInstance.interceptors.response.use(
  res => res,
  err => Promise.reject(err.response?.data || err)
);

export default axiosInstance;
