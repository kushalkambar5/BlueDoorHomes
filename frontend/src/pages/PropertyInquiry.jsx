import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getPropertyById } from "../api/propertyApi";
import { createLead } from "../api/leadApi";
import PageNavbar from "../components/PageNavbar";

function PropertyInquiry() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    budget: "",
    message: "",
  });

  useEffect(() => {
    if (id === "-") {
      setLoading(false);
      return;
    }
    const fetchProperty = async () => {
      try {
        const response = await getPropertyById(id);
        setProperty(response.data);
      } catch (error) {
        console.error("Failed to fetch property details", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await createLead({
        ...formData,
        property_id: id === "-" ? null : id,
      });
      alert("Inquiry submitted successfully! We will contact you soon.");
      navigate(id === "-" ? "/" : `/property/${id}`);
    } catch (error) {
      console.error("Failed to submit inquiry", error);
      alert("Failed to submit inquiry. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!property && id !== "-") {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <PageNavbar title="Property Not Found" />
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Property Not Found</h2>
          <Link to="/properties" className="text-cta hover:underline">Back to Listings</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <PageNavbar title={id === "-" ? "General Inquiry" : `Inquiry: ${property.title}`} />
      
      <div className="container mx-auto px-4 py-8 max-w-2xl flex-grow">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Property Context Header */}
          {id !== "-" && property && (
            <div className="bg-primary/5 p-6 border-b border-gray-100 flex items-center gap-4">
              {property.mediaList && property.mediaList[0] && (
                <img 
                  src={property.mediaList[0].url} 
                  alt={property.title} 
                  className="w-20 h-20 object-cover rounded-lg shadow-sm"
                />
              )}
              <div>
                <h2 className="text-xl font-bold text-primary">{property.title}</h2>
                <p className="text-accent font-bold text-lg">₹{property.price?.toLocaleString()}</p>
                <p className="text-text-secondary text-sm">📍 {property.location?.city}, {property.location?.locality}</p>
              </div>
            </div>
          )}

          {id === "-" && (
             <div className="bg-primary/5 p-8 border-b border-gray-100 text-center">
                <h2 className="text-2xl font-bold text-primary">General Inquiry</h2>
                <p className="text-text-secondary mt-2">Tell us what you're looking for, and we'll help you find it.</p>
             </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <h3 className="text-lg font-bold text-text-primary mb-2">Request Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-text-primary mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-cta/20 focus:border-cta outline-none transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-text-primary mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Your Phone Number"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-cta/20 focus:border-cta outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-text-primary mb-1">
                Your Budget (₹)
              </label>
              <input
                type="number"
                name="budget"
                required
                value={formData.budget}
                onChange={handleChange}
                placeholder="Enter your budget"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-cta/20 focus:border-cta outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-text-primary mb-1">
                Message
              </label>
              <textarea
                name="message"
                required
                rows="4"
                value={formData.message}
                onChange={handleChange}
                placeholder="I am interested in this property. Please provide more details."
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-cta/20 focus:border-cta outline-none transition-all resize-none"
              ></textarea>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 bg-cta hover:bg-blue-800 text-white font-bold py-3 rounded-xl shadow-md transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:transform-none"
              >
                {submitting ? "Submitting..." : "Submit Inquiry"}
              </button>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex-1 bg-white hover:bg-gray-50 text-text-primary border border-gray-200 font-bold py-3 rounded-xl transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PropertyInquiry;
