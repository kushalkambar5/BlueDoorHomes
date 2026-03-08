import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/react";

function Footer() {
  return (
    <footer>

      <div>Call Now: +91XXXXXXXXXX</div>

      <div>
        <a href="/enquiry">Request Enquiry</a>
      </div>

      <div>
        Contact: contact@bluedoorhomes.com
      </div>

      <SignedOut>
        <div>
          <SignInButton />
          <SignUpButton />
        </div>
      </SignedOut>

      <SignedIn>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>

    </footer>
  );
}

export default Footer;