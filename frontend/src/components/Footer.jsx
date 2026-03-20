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
            <div className="text-sm text-[#6B7280] mb-2 flex flex-col gap-1.5">
              <span>Sign in to manage your properties and preferences.</span>
              <span className="text-yellow-500/90 font-bold text-xs tracking-wider flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
                ONLY FOR ADMIN
              </span>
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
