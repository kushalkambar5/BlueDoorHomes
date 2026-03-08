import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserButton, useAuth } from "@clerk/react";

function PageNavbar({ title }) {
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-[#F8FAFC] bg-[#0F172A] px-4 py-3 shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Left: Branding & Back Button */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="text-[#F8FAFC] hover:text-[#C9A227] transition-colors flex items-center gap-1.5 font-medium text-sm border border-transparent hover:border-[#C9A227] px-2 py-1 rounded"
          >
            <span>&larr;</span> Back
          </button>
          <div className="h-6 w-px bg-[#6B7280] hidden sm:block"></div>
          <Link
            to="/"
            className="hidden sm:block text-xl font-bold tracking-wide text-[#F8FAFC] transition-colors hover:text-[#C9A227]"
          >
            BlueDoorHomes
          </Link>
        </div>

        {/* Center: Title (Optional) */}
        {title && (
          <h1 className="text-[#F8FAFC] font-semibold text-lg absolute left-1/2 transform -translate-x-1/2 hidden md:block">
            {title}
          </h1>
        )}

        {/* Right: Auth & Links */}
        <div className="flex items-center gap-3">
          <Link
            to="/properties"
            className="text-sm font-medium text-[#F8FAFC] transition-colors hover:text-[#C9A227] hidden sm:block"
          >
            Properties
          </Link>
          {isSignedIn && (
            <div className="border-l border-[#6B7280] pl-3 ml-1 flex items-center gap-3">
              <Link
                to="/create-property"
                className="hidden sm:block rounded-md border border-[#C9A227] px-3 py-1.5 text-sm text-[#C9A227] transition-all duration-200 hover:bg-[#C9A227] hover:text-[#0F172A]"
              >
                Create Property
              </Link>
              <UserButton afterSignOutUrl="/" />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default PageNavbar;
