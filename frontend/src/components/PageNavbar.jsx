import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserButton, useAuth } from "@clerk/react";
import { useUserContext } from "../context/UserContext";

function PageNavbar({ title }) {
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();
  const { role } = useUserContext();

  return (
    <nav className="sticky top-0 z-50 w-full transition-all duration-300 border-b border-white/5 bg-[#0F172A]/90 backdrop-blur-md px-4 py-4 shadow-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Left: Branding & Back Button */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="whitespace-nowrap text-white bg-white/5 hover:bg-[#C9A227] hover:text-[#0F172A] transition-all flex items-center gap-2 font-bold text-xs uppercase tracking-widest px-4 py-2 rounded-full border border-white/10 active:scale-95"
          >
            <span>&larr;</span> Back
          </button>
          <div className="h-6 w-px bg-[#6B7280] hidden sm:block"></div>
          <Link
            to="/"
            className="hidden sm:block whitespace-nowrap text-xl font-extrabold tracking-tight text-white transition-all hover:text-[#C9A227]"
          >
            <span className="text-[#1D4ED8]">Blue</span>
            <span className="text-white">Door</span>
            <span className="text-[#C9A227]">Homes</span>
          </Link>
        </div>

        {/* Center: Title (Optional) */}
        {title && (
          <h1 className="whitespace-nowrap text-[#F8FAFC] font-semibold text-lg absolute left-1/2 transform -translate-x-1/2 hidden md:block">
            {title}
          </h1>
        )}

        {/* Right: Auth & Links */}
        <div className="flex items-center gap-3">
          <Link
            to="/properties"
            className="whitespace-nowrap text-sm font-medium text-[#F8FAFC] transition-colors hover:text-[#C9A227] hidden sm:block"
          >
            Properties
          </Link>
          {isSignedIn && (
            <div className="border-l border-[#6B7280] pl-3 ml-1 flex items-center gap-3">
              {role === "admin" && (
                <Link
                  to="/create-property"
                  className="hidden sm:block rounded-lg border border-[#C9A227]/40 px-4 py-2 text-xs font-black uppercase tracking-wider text-[#C9A227] transition-all duration-300 hover:bg-[#C9A227] hover:text-[#0F172A] hover:scale-105"
                >
                  Create Property
                </Link>
              )}
              <UserButton afterSignOutUrl="/" />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default PageNavbar;
