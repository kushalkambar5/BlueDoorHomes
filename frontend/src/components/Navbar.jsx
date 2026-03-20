import { useState, useEffect } from "react";
import { useAuth } from "@clerk/react";
import { Link, useLocation } from "react-router-dom";
import { UserButton } from "@clerk/react";
import CreateProperty from "../pages/CreateProperty";
import { HashLink } from "react-router-hash-link";
import { useUserContext } from "../context/UserContext";

function Navbar() {
  const { isSignedIn } = useAuth();
  const { role } = useUserContext();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY && window.scrollY > 100) { 
          // scrolling down
          setIsVisible(false);
          setMobileMenuOpen(false);
        } else { 
          // scrolling up
          setIsVisible(true);
        }
        setLastScrollY(window.scrollY);
      }
    };

    window.addEventListener('scroll', controlNavbar);
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <nav className={`fixed top-0 z-50 w-full transition-all duration-300 border-b border-white/5 bg-[#0F172A]/90 backdrop-blur-md px-4 py-4 shadow-xl ${
      isVisible ? "translate-y-0" : "-translate-y-full"
    }`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        {/* Logo */}
        <Link
          to="/"
          className="shrink-0 text-xl font-extrabold tracking-tight text-white transition-all hover:text-[#C9A227]"
        >
          <span className="text-[#1D4ED8]">Blue</span>
          <span className="text-white">Door</span>
          <span className="text-[#C9A227]">Homes</span>
        </Link>

        {/* Desktop Main Links */}
        <div className="hidden items-center gap-x-4 lg:gap-x-6 xl:gap-x-8 md:flex">
          <Link
            to="/properties"
            className="whitespace-nowrap text-xs lg:text-sm font-bold uppercase tracking-widest text-white/70 transition-all hover:text-[#C9A227] hover:scale-105"
          >
            Properties
          </Link>
          <HashLink
            smooth
            to="/#about"
            className="whitespace-nowrap text-xs lg:text-sm font-bold uppercase tracking-widest text-white/70 transition-all hover:text-[#C9A227] hover:scale-105"
          >
            About Us
          </HashLink>
          <HashLink
            smooth
            to="/#testimonials"
            className="whitespace-nowrap text-xs lg:text-sm font-bold uppercase tracking-widest text-white/70 transition-all hover:text-[#C9A227] hover:scale-105"
          >
            Testimonials
          </HashLink>
          <HashLink
            smooth
            to="/#contact"
            className="whitespace-nowrap text-xs lg:text-sm font-bold uppercase tracking-widest text-white/70 transition-all hover:text-[#C9A227] hover:scale-105"
          >
            Contact
          </HashLink>
        </div>

        {/* Desktop CTA Buttons & Auth */}
        <div className="hidden items-center gap-x-3 lg:gap-x-4 md:flex">
          <a
            href={`tel:+91${import.meta.env.VITE_PHONENO}`}
            className="whitespace-nowrap text-[10px] lg:text-xs font-black tracking-tighter text-[#C9A227] transition-all hover:text-white hover:scale-110"
          >
            Call Now
          </a>
          <Link
            to="/property/inquiry/-"
            className="whitespace-nowrap rounded-full bg-[#1D4ED8] px-3 py-2 lg:px-5 lg:py-2.5 text-[10px] lg:text-xs font-black uppercase tracking-tighter text-white shadow-[0_10px_20px_rgba(29,78,216,0.2)] transition-all hover:bg-blue-700 hover:scale-105 active:scale-95"
          >
            Request Enquiry
          </Link>

          {isSignedIn && (
            <div className="flex items-center gap-x-2 lg:gap-x-3 border-l border-white/10 pl-3 lg:pl-4">
              {role === "admin" && (
                <div className="flex items-center gap-x-1.5 lg:gap-x-2">
                  <Link
                    to="/create-property"
                    className="whitespace-nowrap rounded-lg border border-[#C9A227]/40 px-2 py-1 lg:px-3 lg:py-1.5 text-[10px] lg:text-xs text-[#C9A227] font-bold tracking-tight transition-all duration-300 hover:bg-[#C9A227] hover:text-[#0F172A] hover:scale-105"
                  >
                    Add Properties
                  </Link>
                  <Link
                    to="/testimonials-admin"
                    className="whitespace-nowrap rounded-lg border border-[#C9A227]/40 px-2 py-1 lg:px-3 lg:py-1.5 text-[10px] lg:text-xs text-[#C9A227] font-bold tracking-tight transition-all duration-300 hover:bg-[#C9A227] hover:text-[#0F172A] hover:scale-105"
                  >
                    Testimonials
                  </Link>
                  <Link
                    to="/user-forms"
                    className="whitespace-nowrap rounded-lg border border-[#C9A227]/40 px-2 py-1 lg:px-3 lg:py-1.5 text-[10px] lg:text-xs text-[#C9A227] font-bold tracking-tight transition-all duration-300 hover:bg-[#C9A227] hover:text-[#0F172A] hover:scale-105"
                  >
                    Forms
                  </Link>
                </div>
              )}
              <div className="shrink-0">
                <UserButton afterSignOutUrl="/" />
              </div>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Menu Toggle */}
        <div className="flex items-center md:hidden">
          {isSignedIn && (
            <div className="mr-4 mt-1 flex items-center">
              {role === "admin" && (
                <div className="hidden sm:flex items-center gap-2 mr-3">
                  <Link
                    to="/create-property"
                    className="inline-block rounded-md border border-[#C9A227] px-3 py-1.5 text-[#C9A227] text-sm font-medium transition-all duration-200 hover:bg-[#C9A227] hover:text-[#0F172A]"
                  >
                    Add Properties
                  </Link>
                  <Link
                    to="/create-testimonials"
                    className="inline-block rounded-md border border-[#C9A227] px-3 py-1.5 text-[#C9A227] text-sm font-medium transition-all duration-200 hover:bg-[#C9A227] hover:text-[#0F172A]"
                  >
                    Add Testimonials
                  </Link>
                  <Link
                    to="/user-forms"
                    className="inline-block rounded-md border border-[#C9A227] px-3 py-1.5 text-[#C9A227] text-sm font-medium transition-all duration-200 hover:bg-[#C9A227] hover:text-[#0F172A]"
                  >
                    User Forms
                  </Link>
                </div>
              )}
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
              href={`tel:+91${import.meta.env.VITE_PHONENO}`}
              className="text-sm font-medium text-[#C9A227]"
            >
              Call Now: +91 {import.meta.env.VITE_PHONENO}
            </a>
            <Link
              to="/property/inquiry/-"
              className="inline-block w-fit rounded-md bg-[#1D4ED8] px-4 py-2 text-sm font-semibold text-white shadow-sm"
            >
              Request Enquiry
            </Link>

            {isSignedIn && role === "admin" && (
              <div className="mt-2 flex flex-col space-y-2 text-sm font-medium text-[#F8FAFC]">
                <Link
                  to="/create-property"
                  className="block w-fit rounded-md border border-[#C9A227] px-3 py-1.5 text-[#C9A227] transition-all duration-200 hover:bg-[#C9A227] hover:text-[#0F172A]"
                >
                  Add Properties
                </Link>
                <Link
                  to="/create-testimonials"
                  className="block w-fit rounded-md border border-[#C9A227] px-3 py-1.5 text-[#C9A227] transition-all duration-200 hover:bg-[#C9A227] hover:text-[#0F172A]"
                >
                  Add Testimonials
                </Link>
                <Link
                  to="/user-forms"
                  className="block w-fit rounded-md border border-[#C9A227] px-3 py-1.5 text-[#C9A227] transition-all duration-200 hover:bg-[#C9A227] hover:text-[#0F172A]"
                >
                  User Forms
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
