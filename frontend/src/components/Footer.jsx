import { useAuth, SignInButton, SignUpButton, UserButton } from "@clerk/react";

function Footer() {
  const { isSignedIn } = useAuth();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0F172A] border-t border-[#6B7280]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Brand & Phone */}
          <div className="flex flex-col space-y-4">
            <span className="text-xl font-bold tracking-wide text-[#F8FAFC]">
              BlueDoorHomes
            </span>
            <div className="text-[#6B7280] text-sm leading-relaxed">
              Find your dream home with premium real estate listings, expert
              guidance, and trusted service.
            </div>
            <div className="mt-2 flex items-center gap-2">
              <span className="text-[#6B7280] text-sm">Call Now:</span>
              <a
                href="tel:+91XXXXXXXXXX"
                className="text-base font-medium text-[#C9A227] hover:underline"
              >
                +91 XXXXXXXXXX
              </a>
            </div>
          </div>

          {/* Contact & Links */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#F8FAFC]">
              Reach Out
            </h3>
            <div className="flex flex-col space-y-3">
              <a
                href="/enquiry"
                className="w-fit text-sm font-medium text-[#1D4ED8] hover:text-white transition-colors"
              >
                Request Enquiry &rarr;
              </a>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-[#6B7280]">Contact:</span>
                <a
                  href="mailto:contact@bluedoorhomes.com"
                  className="text-[#F8FAFC] hover:text-[#C9A227] transition-colors"
                >
                  contact@bluedoorhomes.com
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
                  <button className="rounded-md border border-[#C9A227] px-4 py-2 text-sm font-medium text-[#C9A227] hover:bg-[#C9A227] hover:text-[#0F172A] transition-colors">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="rounded-md bg-[#1D4ED8] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-800 transition-colors">
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
