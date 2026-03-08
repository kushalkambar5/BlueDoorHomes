import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL || "http://localhost:5000",
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => Promise.reject(err.response?.data || err),
);

export default axiosInstance;
