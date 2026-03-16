import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "@clerk/react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { isSignedIn, getToken } = useAuth();
  const [dbUser, setDbUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!isSignedIn) {
        setDbUser(null);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const token = await getToken();
        if (!token) return;

        const response = await axios.get(`${API_URL}/api/v1/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          console.log("Fetched User Data from Backend:", response.data.user);
          setDbUser(response.data.user);
        }
      } catch (err) {
        console.error("Failed to fetch user data:", err);
        setError(err.message || "Failed to fetch user data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [isSignedIn, getToken]);

  const value = {
    dbUser,
    role: dbUser?.role || "user",
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
