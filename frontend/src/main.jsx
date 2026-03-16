import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ClerkProvider } from "@clerk/react";
import { BrowserRouter, Router, Routes } from 'react-router-dom'
import { UserProvider } from "./context/UserContext.jsx";

const clerkPublicKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider publishableKey={clerkPublicKey}>
      <UserProvider>
        <App />
      </UserProvider>
    </ClerkProvider>
  </StrictMode>,
);
