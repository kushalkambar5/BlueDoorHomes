import { useAuth } from "@clerk/react";
import { Link } from "react-router-dom";
import { UserButton } from "@clerk/react";

function Navbar() {
  const { isSignedIn } = useAuth();

  return (
    <nav className="navbar">

      {/* Logo */}
      <Link to="/" className="logo">BlueDoorHomes</Link>

      {/* Main Links */}
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/properties">Properties</Link>
        <Link to="/#">About Us</Link>
        <Link to="/testimonials">Testimonials</Link>
        <Link to="/contact">Contact</Link>
      </div>

      {/* CTA Buttons */}
      <div className="nav-actions">
        <a href="tel:+919999999999">Call Now</a>
        <Link to="/enquiry">Request Enquiry</Link>

        {isSignedIn ? (
          <UserButton afterSignOutUrl="/" />
        ) : (
          <Link to="/sign-in">Sign In</Link>
        )}
      </div>

    </nav>
  );
}

export default Navbar;