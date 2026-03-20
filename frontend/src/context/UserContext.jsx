import React, { createContext, useContext } from "react";
import { useUser } from "@clerk/react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { isLoaded, isSignedIn, user } = useUser();
  const role = isSignedIn ? (user?.publicMetadata?.role || "user") : null;

  return (
    <UserContext.Provider value={{ role, isLoaded, isSignedIn, user }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};

export default UserContext;
