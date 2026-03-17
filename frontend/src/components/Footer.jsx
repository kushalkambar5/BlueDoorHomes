import { useAuth, SignInButton, SignUpButton, UserButton } from "@clerk/react";
import { Link } from "react-router-dom";

function Footer() {
  const { isSignedIn } = useAuth();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0F172A] border-t border-white/10 relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Brand & Phone */}
          <div className="flex flex-col space-y-4">
            <div className="text-xl font-extrabold tracking-tight">
              <span className="text-[#1D4ED8]">Blue</span>
              <span className="text-white">Door</span>
              <span className="text-[#C9A227]">Homes</span>
            </div>
            <div className="text-white/40 text-sm leading-relaxed">
              Find your dream home with premium real estate listings, expert
              guidance, and trusted service.
            </div>
            <div className="mt-2 flex items-center gap-2">
              <span className="text-[#6B7280] text-sm">Call Now:</span>
              <a
                href={`tel:+91${import.meta.env.VITE_PHONENO}`}
                className="text-lg font-black text-[#C9A227] transition-all hover:text-white"
              >
                +91 {import.meta.env.VITE_PHONENO}
              </a>
            </div>
          </div>

          {/* Contact & Links */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#F8FAFC]">
              Reach Out
            </h3>
            <div className="flex flex-col space-y-3">
              <Link
                to="/property/inquiry/-"
                className="w-fit text-sm font-black uppercase tracking-widest text-[#1D4ED8] transition-all hover:text-white"
              >
                Request Enquiry &rarr;
              </Link>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-[#6B7280]">Contact:</span>
                <a
                  href={`mailto:${import.meta.env.VITE_EMAILADDRESS}`}
                  className="text-[#F8FAFC] hover:text-[#C9A227] transition-colors"
                >
                  {import.meta.env.VITE_EMAILADDRESS}
                </a>
              </div>
            </div>
          </div>

          {/* Account & Auth */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#F8FAFC]">
              My Account
            </h3>
            <div className="text-sm text-[#6B7280] mb-2">
              Sign in to manage your properties and preferences.
            </div>

            {!isSignedIn && (
              <div className="flex items-center gap-3">
                <SignInButton mode="modal">
                  <button className="rounded-lg border border-[#C9A227]/50 px-5 py-2 text-sm font-bold text-[#C9A227] transition-all hover:bg-[#C9A227] hover:text-[#0F172A] active:scale-95">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="rounded-lg bg-[#1D4ED8] px-5 py-2 text-sm font-bold text-white shadow-lg shadow-blue-500/10 transition-all hover:bg-blue-700 active:scale-95">
                    Sign Up
                  </button>
                </SignUpButton>
              </div>
            )}

            {isSignedIn && (
              <div className="flex items-center gap-3">
                <UserButton afterSignOutUrl="/" />
                <span className="text-sm font-medium text-[#F8FAFC]">
                  Dashboard Access
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-[#6B7280] pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-[#6B7280]">
            &copy; {currentYear} BlueDoorHomes. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6 text-sm text-[#6B7280]">
            <span>Designed with Custom Palette</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
