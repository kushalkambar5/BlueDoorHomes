import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "@clerk/react";
import axiosInstance from "../api/axiosInstance";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { isLoaded, isSignedIn, getToken, userId } = useAuth();
  const [dbUser, setDbUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!isLoaded) return;
      
      if (!isSignedIn) {
        setDbUser(null);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const token = await getToken();
        if (!token) return;

        const response = await axiosInstance.get("/v1/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          setDbUser(response.data.user);
        }
      } catch (err) {
        console.error("Failed to fetch user data:", err);
        setError(err.response?.data?.message || err.message || "Failed to fetch user data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [isLoaded, isSignedIn, userId, getToken]);

  const value = {
    dbUser,
    role: isSignedIn ? (dbUser?.role || "user") : null,
    isLoading,
    error,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};

export default UserContext;
