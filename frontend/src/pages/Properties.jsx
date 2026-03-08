import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getProperties, deleteProperty } from "../api/propertyApi";
import { useAuth } from "@clerk/react";
import PageNavbar from "../components/PageNavbar";

function Properties() {
  const { isSignedIn } = useAuth();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const response = await getProperties();
      setProperties(response.data || []);
    } catch (error) {
      console.error("Failed to fetch properties", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      try {
        await deleteProperty(id);
        alert("Property deleted successfully");
        fetchProperties(); // Refresh list after deletion
      } catch (error) {
        console.error("Failed to delete property", error);
        alert("Error deleting property");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <PageNavbar title="Properties Listing" />
      <div className="container mx-auto px-4 py-8 max-w-7xl flex-grow bg-white my-8 rounded-xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-8 border-b border-gray-200 pb-4">
          <h1 className="text-3xl font-bold text-primary">
            Properties Listing
          </h1>
          {isSignedIn && (
            <Link
              to="/create-property"
              className="bg-cta hover:bg-blue-800 text-white font-semibold py-2 px-6 rounded-md shadow-md transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg flex items-center gap-2"
            >
              <span>+ Add New Property</span>
            </Link>
          )}
        </div>

        {properties.length === 0 ? (
          <div className="text-center py-16 bg-white shadow-sm rounded-xl border border-gray-100">
            <p className="text-text-secondary text-lg mb-4">
              No properties uploaded yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <div
                key={property._id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100 flex flex-col"
              >
                {/* Image Thumbnail */}
                <div className="h-48 bg-gray-200 relative">
                  {property.media_ids && property.media_ids.length > 0 ? (
                    <img
                      src={property.media_ids[0].url || property.media_ids[0]} // depending on if it's populated or not
                      alt={property.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/400x300?text=No+Image";
                      }}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      No Image Available
                    </div>
                  )}
                  {/* Status Badge */}
                  <div
                    className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white ${
                      property.status === "available"
                        ? "bg-green-500"
                        : property.status === "sold"
                          ? "bg-red-500"
                          : "bg-yellow-500"
                    }`}
                  >
                    {property.status}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex items-center justify-between mb-2 mt-4 border-b border-gray-100 pb-3">
                    <h2
                      className="text-xl font-bold text-text-primary line-clamp-1 group-hover:text-cta transition-colors"
                      title={property.title}
                    >
                      {property.title}
                    </h2>
                    <span className="text-accent font-bold ml-3 text-xl shrink-0">
                      ${property.price?.toLocaleString()}
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

                  {/* Actions */}
                  {isSignedIn && (
                    <div className="flex justify-between items-center mt-2 gap-3 pt-4 border-t border-gray-100">
                      <button
                        onClick={() =>
                          navigate(`/update-property/${property._id}`)
                        }
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
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Properties;
