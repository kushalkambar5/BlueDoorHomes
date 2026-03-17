import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getProperties, deleteProperty } from "../api/propertyApi";
import { useAuth } from "@clerk/react";
import PageNavbar from "../components/PageNavbar";
import { useUserContext } from "../context/UserContext";
import PropertyCard from "../components/PropertyCard";

function Properties() {
  const { isSignedIn } = useAuth();
  const { role } = useUserContext();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
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
      <div className="container mx-auto px-4 py-8 max-w-7xl flex-grow bg-white my-8 rounded-xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-8 border-b border-gray-200 pb-4">
          <h1 className="text-3xl font-bold text-primary">
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

        {properties.length === 0 ? (
          <div className="text-center py-16 bg-white shadow-sm rounded-xl border border-gray-100">
            <p className="text-text-secondary text-lg mb-4">
              No properties uploaded yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
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
        )}
      </div>
    </div>
  );
}

export default Properties;
