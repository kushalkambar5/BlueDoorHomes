import React, { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getProperties, deleteProperty } from "../api/propertyApi";
import { useAuth } from "@clerk/react";
import PageNavbar from "../components/PageNavbar";
import { useUserContext } from "../context/UserContext";
import PropertyCard from "../components/PropertyCard";

const PROPERTY_TYPES = [
  { value: "all", label: "All", icon: "🏘️" },
  { value: "house", label: "House", icon: "🏠" },
  { value: "apartment", label: "Apartment", icon: "🏢" },
  { value: "commercial", label: "Commercial", icon: "🏪" },
  { value: "land", label: "Land", icon: "🌍" },
];

const ITEMS_PER_PAGE = 10;

function Properties() {
  const { isSignedIn } = useAuth();
  const { role } = useUserContext();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const response = await getProperties();
      // Ensure mediaList exists for each property for the slideshow
      const processedProperties = (response.data || []).map((p) => {
        // Fallback for older properties where media might be strings in media_ids
        if ((!p.mediaList || p.mediaList.length === 0) && p.media_ids && p.media_ids.length > 0) {
          return {
            ...p,
            mediaList: p.media_ids.map((url, idx) => ({
              _id: `old-${idx}`,
              url: typeof url === 'string' ? url : url.url, // cover both cases
              type: "image", // assume image for old ones
            }))
          };
        }
        return p;
      });
      setProperties(processedProperties);
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

  // Reset to page 1 when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedType]);

  // Filtered properties based on selected type
  const filteredProperties = useMemo(() => {
    if (selectedType === "all") return properties;
    return properties.filter(
      (p) => p.property_type?.toLowerCase() === selectedType
    );
  }, [properties, selectedType]);

  // Pagination
  const totalPages = Math.ceil(filteredProperties.length / ITEMS_PER_PAGE);
  const paginatedProperties = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProperties.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProperties, currentPage]);

  // Count per type for badge display
  const typeCounts = useMemo(() => {
    const counts = { all: properties.length };
    PROPERTY_TYPES.forEach(({ value }) => {
      if (value !== "all") {
        counts[value] = properties.filter(
          (p) => p.property_type?.toLowerCase() === value
        ).length;
      }
    });
    return counts;
  }, [properties]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <PageNavbar title="Properties Listing" />
      <div className="container mx-auto px-4 py-8 max-w-7xl flex-grow bg-white my-4 sm:my-8 rounded-xl shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 border-b border-gray-200 pb-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-primary">
            Properties Listing
          </h1>
          {isSignedIn && role === "admin" && (
            <Link
              to="/create-property"
              className="bg-cta hover:bg-blue-800 text-white font-semibold py-2 px-6 rounded-md shadow-md transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg flex items-center gap-2"
            >
              <span>+ Add New Property</span>
            </Link>
          )}
        </div>

        {/* Filter Bar */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {PROPERTY_TYPES.map(({ value, label, icon }) => (
              <button
                key={value}
                onClick={() => { setSelectedType(value); setCurrentPage(1); }}
                className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold border transition-all duration-200 cursor-pointer ${
                  selectedType === value
                    ? "bg-cta text-white border-cta shadow-md shadow-cta/25 scale-105"
                    : "bg-white text-text-secondary border-gray-200 hover:border-cta/40 hover:text-cta hover:bg-cta/5"
                }`}
              >
                <span className="text-base">{icon}</span>
                <span>{label}</span>
                <span
                  className={`ml-1 text-xs font-bold px-2 py-0.5 rounded-full ${
                    selectedType === value
                      ? "bg-white/20 text-white"
                      : "bg-gray-100 text-text-secondary"
                  }`}
                >
                  {typeCounts[value] || 0}
                </span>
              </button>
            ))}
          </div>
        </div>

        {filteredProperties.length === 0 ? (
          <div className="text-center py-16 bg-white shadow-sm rounded-xl border border-gray-100">
            <p className="text-4xl mb-4">🔍</p>
            <p className="text-text-secondary text-lg mb-2">
              {selectedType === "all"
                ? "No properties uploaded yet."
                : `No ${selectedType} properties found.`}
            </p>
            {selectedType !== "all" && (
              <button
                onClick={() => setSelectedType("all")}
                className="mt-3 text-cta hover:underline font-semibold text-sm"
              >
                Clear filter & show all
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedProperties.map((property) => (
                <PropertyCard
                  key={property._id}
                  property={property}
                  isSignedIn={isSignedIn}
                  role={role}
                  handleDelete={handleDelete}
                  navigate={navigate}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-wrap items-center justify-center gap-2 mt-8 sm:mt-10 pt-6 border-t border-gray-100">
                <button
                  onClick={() => { setCurrentPage((p) => Math.max(1, p - 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold border border-gray-200 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-cta hover:text-white hover:border-cta"
                >
                  ← Prev
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => { setCurrentPage(page); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg text-xs sm:text-sm font-bold transition-all duration-200 ${
                      currentPage === page
                        ? "bg-cta text-white shadow-md shadow-cta/25"
                        : "border border-gray-200 text-text-secondary hover:bg-cta/10 hover:text-cta hover:border-cta/30"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => { setCurrentPage((p) => Math.min(totalPages, p + 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold border border-gray-200 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-cta hover:text-white hover:border-cta"
                >
                  Next →
                </button>
              </div>
            )}

            {/* Results summary */}
            <p className="text-center text-xs text-text-secondary mt-4">
              Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(currentPage * ITEMS_PER_PAGE, filteredProperties.length)} of {filteredProperties.length} properties
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default Properties;
