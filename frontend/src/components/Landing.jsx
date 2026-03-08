import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const BANNER_IMAGES = [
  "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/53610/large-home-residential-house-architecture-53610.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/208736/pexels-photo-208736.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
];

function Landing() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % BANNER_IMAGES.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-primary">
      {/* Background Slider */}
      {BANNER_IMAGES.map((imgUrl, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={imgUrl}
            alt={`Luxury Real Estate ${index + 1}`}
            className="w-full h-full object-cover"
          />
          {/* Dark Overlay for better text readability */}
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
      ))}

      {/* Hero Content Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center text-white pt-20">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 drop-shadow-lg">
          Welcome to <span className="text-accent">BlueDoorHomes</span>
        </h1>
        <p className="text-xl md:text-2xl font-light mb-10 max-w-3xl drop-shadow-md text-gray-200">
          Find your dream home with premium real estate listings, expert
          guidance, and trusted service. Redefining modern luxury living.
        </p>
      </div>

      {/* Bottom Middle Action Buttons */}
      <div className="absolute bottom-16 left-0 right-0 z-20 flex flex-col sm:flex-row items-center justify-center gap-4 px-4">
        <Link
          to="/properties"
          className="w-full sm:w-auto px-8 py-3.5 bg-cta hover:bg-blue-800 text-white font-bold rounded-full shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-center"
        >
          See Properties
        </Link>
        <button
          onClick={() => {
            // Replace with actual logic or link to contact section
            window.location.href = "mailto:enquiry@bluedoorhomes.com";
          }}
          className="w-full sm:w-auto px-8 py-3.5 bg-white text-primary hover:bg-gray-100 font-bold rounded-full shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-center"
        >
          Request Enquiry
        </button>
        <a
          href="tel:+1234567890"
          className="w-full sm:w-auto px-8 py-3.5 bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary font-bold rounded-full shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-center backdrop-blur-sm"
        >
          Call Now
        </a>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center gap-2">
        {BANNER_IMAGES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-accent scale-125"
                : "bg-white/50 hover:bg-white"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default Landing;
