import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const PropertyCard = ({ property, isSignedIn, role, handleDelete, navigate }) => {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const mediaList = property.mediaList || [];

  useEffect(() => {
    if (mediaList.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentMediaIndex((prev) => (prev + 1) % mediaList.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [mediaList.length]);

  const currentMedia = mediaList.length > 0 ? mediaList[currentMediaIndex] : null;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100 flex flex-col">
      {/* Image Thumbnail / Slideshow */}
      <Link
        to={`/property/${property._id}`}
        className="h-48 bg-gray-200 relative block overflow-hidden group"
      >
        {currentMedia ? (
          currentMedia.type === "video" ? (
            <video
              src={currentMedia.url}
              className="w-full h-full object-cover opacity-100"
              muted
              autoPlay
              loop
              playsInline
            />
          ) : (
            <img
              src={currentMedia.url}
              alt={property.title}
              className="w-full h-full object-cover opacity-100 transition-opacity duration-500"
              onError={(e) => {
                e.target.src =
                  "https://placehold.co/400x300?text=No+Image";
              }}
            />
          )
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            No Media Available
          </div>
        )}
        
        {/* Media Indicator Dot */}
        {mediaList.length > 1 && (
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5 z-20">
            {mediaList.map((_, idx) => (
              <div
                key={idx}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  currentMediaIndex === idx ? "bg-white scale-125" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        )}

        {/* Status Badge */}
        <div
          className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white shadow-sm z-10 ${
            property.status === "available"
              ? "bg-green-500"
              : property.status === "sold"
                ? "bg-red-500"
                : "bg-yellow-500"
          }`}
        >
          {property.status}
        </div>
      </Link>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2 mt-2 border-b border-gray-100 pb-3 gap-1 sm:gap-2">
          <Link to={`/property/${property._id}`}>
            <h2
              className="text-lg sm:text-xl font-bold text-text-primary line-clamp-1 hover:text-cta transition-colors"
              title={property.title}
            >
              {property.title}
            </h2>
          </Link>
          <span className="text-accent font-bold ml-0 sm:ml-3 text-lg sm:text-xl shrink-0">
            ₹{property.price?.toLocaleString()}
          </span>
        </div>

        <div className="text-sm text-text-secondary mb-5 flex items-center">
          <span className="mr-2 text-accent">📍</span>
          {property.location?.googleMapsLink ? (
            <a
              href={property.location.googleMapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="truncate hover:text-cta hover:underline transition-colors"
            >
              {property.location?.city}, {property.location?.locality}
            </a>
          ) : (
            <span className="truncate">
              {property.location?.city}, {property.location?.locality}
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 mt-auto mb-5 bg-gray-50 p-3 rounded-lg border border-gray-100">
          <div className="text-sm flex flex-col justify-center items-center">
            <span className="text-text-secondary text-[11px] font-semibold tracking-wider uppercase mb-1">
              Type
            </span>
            <span className="font-bold text-primary capitalize">
              {property.property_type}
            </span>
          </div>
          <div className="text-sm border-l border-gray-200 flex flex-col justify-center items-center">
            <span className="text-text-secondary text-[11px] font-semibold tracking-wider uppercase mb-1">
              Area
            </span>
            <span className="font-bold text-primary">
              {property.area_sqft}
            </span>
          </div>
        </div>

        <div className="mb-4">
          <Link
            to={`/property/${property._id}`}
            className="w-full bg-cta/10 text-cta hover:bg-cta hover:text-white border border-cta/20 py-2.5 rounded-md text-sm font-bold transition-all duration-200 flex justify-center items-center"
          >
            View Details
          </Link>
        </div>

        {/* Actions */}
        {isSignedIn && role === "admin" && (
          <div className="flex justify-between items-center gap-3 pt-4 border-t border-gray-100">
            <button
              onClick={() => navigate(`/update-property/${property._id}`)}
              className="flex-1 bg-white hover:bg-gray-50 text-text-primary border border-gray-200 py-2.5 rounded-md text-sm font-semibold transition-all duration-200 hover:shadow-sm"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(property._id)}
              className="flex-1 bg-red-50 hover:bg-red-500 text-red-600 hover:text-white border border-red-200 py-2.5 rounded-md text-sm font-semibold transition-all duration-200"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyCard;
