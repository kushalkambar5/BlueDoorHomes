import { useEffect } from "react";
import { useAuth } from "@clerk/react";
import axiosInstance from "./axiosInstance";

export const useAxios = () => {
  const { getToken } = useAuth();

  useEffect(() => {
    const requestIntercept = axiosInstance.interceptors.request.use(
      async (config) => {
        try {
          const token = await getToken();
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        } catch (error) {
          console.error("Error getting Clerk token:", error);
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestIntercept);
    };
  }, [getToken]);

  return axiosInstance;
};

export default useAxios;
