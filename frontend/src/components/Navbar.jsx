import { useState, useEffect } from "react";
import { useAuth } from "@clerk/react";
import { Link, useLocation } from "react-router-dom";
import { UserButton } from "@clerk/react";
import AddProperty from "../pages/AddProperty";
import { HashLink } from "react-router-hash-link";

function Navbar() {
  const { isSignedIn } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-[#F8FAFC] bg-[#0F172A] px-4 py-3 shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-bold tracking-wide text-[#F8FAFC] transition-colors hover:text-[#C9A227]"
        >
          BlueDoorHomes
        </Link>

        {/* Desktop Main Links */}
        <div className="hidden items-center gap-6 md:flex">
          <Link
            to="/"
            className="text-sm font-medium text-[#F8FAFC] transition-colors hover:text-[#C9A227]"
          >
            Home
          </Link>
          <Link
            to="/properties"
            className="text-sm font-medium text-[#F8FAFC] transition-colors hover:text-[#C9A227]"
          >
            Properties
          </Link>
          <HashLink
            smooth
            to="/#about"
            className="text-sm font-medium text-[#F8FAFC] transition-colors hover:text-[#C9A227]"
          >
            About Us
          </HashLink>
          <HashLink
            smooth
            to="/#testimonials"
            className="text-sm font-medium text-[#F8FAFC] transition-colors hover:text-[#C9A227]"
          >
            Testimonials
          </HashLink>
          <HashLink
            smooth
            to="/#contact"
            className="text-sm font-medium text-[#F8FAFC] transition-colors hover:text-[#C9A227]"
          >
            Contact
          </HashLink>
        </div>

        {/* Desktop CTA Buttons & Auth */}
        <div className="hidden items-center gap-4 md:flex">
          <a
            href="tel:+919999999999"
            className="text-sm font-medium text-[#C9A227] transition-colors hover:text-white"
          >
            Call Now
          </a>
          <Link
            to="/enquiry"
            className="rounded-md bg-[#1D4ED8] px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-800"
          >
            Request Enquiry
          </Link>

          {isSignedIn && (
            <div className="flex items-center gap-3 border-l border-[#6B7280] pl-4">
              {/* Note: In a real app AddProperty might be a link, but this matches the existing structure */}
              <div className="text-sm font-medium text-[#F8FAFC] transition-colors hover:text-[#C9A227]">
                <AddProperty />
              </div>
              <UserButton afterSignOutUrl="/" />
            </div>
          )}
        </div>

        {/* Mobile Hamburger Menu Toggle */}
        <div className="flex items-center md:hidden">
          {isSignedIn && (
            <div className="mr-4 mt-1">
              <UserButton afterSignOutUrl="/" />
            </div>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-[#F8FAFC] hover:text-[#C9A227] focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="mt-3 flex flex-col space-y-3 pb-3 border-t border-[#6B7280] pt-3 md:hidden">
          <Link
            to="/"
            className="block text-sm font-medium text-[#F8FAFC] hover:text-[#C9A227]"
          >
            Home
          </Link>
          <Link
            to="/properties"
            className="block text-sm font-medium text-[#F8FAFC] hover:text-[#C9A227]"
          >
            Properties
          </Link>
          <HashLink
            smooth
            to="/#about"
            className="block text-sm font-medium text-[#F8FAFC] hover:text-[#C9A227]"
          >
            About Us
          </HashLink>
          <HashLink
            smooth
            to="/#testimonials"
            className="block text-sm font-medium text-[#F8FAFC] hover:text-[#C9A227]"
          >
            Testimonials
          </HashLink>
          <HashLink
            smooth
            to="/#contact"
            className="block text-sm font-medium text-[#F8FAFC] hover:text-[#C9A227]"
          >
            Contact
          </HashLink>

          <div className="mt-4 flex flex-col space-y-3 pt-4 border-t border-[#6B7280]">
            <a
              href="tel:+919999999999"
              className="text-sm font-medium text-[#C9A227]"
            >
              Call Now: +91 99999 99999
            </a>
            <Link
              to="/enquiry"
              className="inline-block w-fit rounded-md bg-[#1D4ED8] px-4 py-2 text-sm font-semibold text-white shadow-sm"
            >
              Request Enquiry
            </Link>

            {isSignedIn && (
              <div className="mt-2 text-sm font-medium text-[#F8FAFC]">
                <AddProperty />
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
