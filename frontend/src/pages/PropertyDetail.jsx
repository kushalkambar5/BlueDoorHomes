import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getPropertyById } from "../api/propertyApi";
import PageNavbar from "../components/PageNavbar";
import Footer from "../components/Footer";

function PropertyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeMedia, setActiveMedia] = useState(0);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await getPropertyById(id);
        setProperty(response.data);
      } catch (error) {
        console.error("Error fetching property:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cta"></div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Property not found</h2>
        <Link to="/properties" className="text-cta hover:underline font-semibold">
          Back to Properties
        </Link>
      </div>
    );
  }

  const { mediaList = [] } = property;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <PageNavbar title={property.title} />
      
      <main className="container mx-auto px-4 py-8 max-w-7xl flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Gallery & Description */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Gallery */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="relative aspect-video bg-gray-200">
                {mediaList.length > 0 ? (
                  mediaList[activeMedia].type === "video" ? (
                    <video 
                      src={mediaList[activeMedia].url} 
                      controls 
                      className="w-full h-full object-contain bg-black"
                    />
                  ) : (
                    <img 
                      src={mediaList[activeMedia].url} 
                      alt={property.title} 
                      className="w-full h-full object-cover"
                    />
                  )
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    No Media Available
                  </div>
                )}
                
                {/* Status Badge */}
                <div className={`absolute top-6 right-6 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-white shadow-lg ${
                  property.status === "available" ? "bg-green-500" : 
                  property.status === "sold" ? "bg-red-500" : "bg-yellow-500"
                }`}>
                  {property.status}
                </div>
              </div>
              
              {/* Thumbnails */}
              {mediaList.length > 1 && (
                <div className="p-4 flex gap-3 overflow-x-auto">
                  {mediaList.map((m, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveMedia(idx)}
                      className={`relative w-24 h-16 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                        activeMedia === idx ? "border-cta shadow-md" : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                    >
                      {m.type === "video" ? (
                        <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                          <span className="text-[10px] text-white font-bold">VIDEO</span>
                        </div>
                      ) : (
                        <img src={m.url} alt="" className="w-full h-full object-cover" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Description */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-primary mb-4 border-b pb-4">About this property</h2>
              <p className="text-text-secondary leading-relaxed whitespace-pre-wrap">
                {property.description}
              </p>
              
              {property.tags && property.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-8">
                  {property.tags.map((tag, i) => (
                    <span key={i} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
            
            {/* Map */}
            {property.location?.googleMapsLink && (
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold text-primary mb-6">Location</h2>
                <div 
                  className="rounded-xl overflow-hidden shadow-inner bg-gray-100 aspect-video lg:aspect-[21/9]"
                  dangerouslySetInnerHTML={{ __html: property.location.googleMapsLink }}
                />
                <p className="mt-4 text-text-secondary flex items-center gap-2">
                   <span className="text-accent">📍</span> {property.location.address}
                </p>
              </div>
            )}
          </div>

          {/* Right Column: Pricing & Quick Actions */}
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="mb-6">
                <span className="text-text-secondary text-sm font-semibold uppercase tracking-widest block mb-1">Price</span>
                <h2 className="text-4xl font-extrabold text-cta">
                  ₹{property.price?.toLocaleString()}
                </h2>
                <p className="text-text-secondary text-sm mt-1">
                  ₹{property.price_per_sqft?.toLocaleString()} / sqft
                </p>
              </div>

              <div className="space-y-4 py-6 border-y border-gray-100 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">Property Type</span>
                  <span className="font-bold text-primary capitalize">{property.property_type}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">Total Area</span>
                  <span className="font-bold text-primary">{property.area_sqft}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">Location</span>
                  <span className="font-bold text-primary">{property.location?.city}</span>
                </div>
              </div>

              <div className="space-y-3">
                <button 
                  onClick={() => navigate(`/property/inquiry/${property._id}`)}
                  className="w-full bg-cta hover:bg-blue-800 text-white font-bold py-4 rounded-xl shadow-md transition-all duration-300 transform hover:-translate-y-1"
                >
                  Request a Inquiry for this property
                </button>
                {property.brochure_url && ( // Conditionally render brochure link if URL exists
                  <a
                    href={property.brochure_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-white text-text-primary border border-gray-200 font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 transition-all active:scale-95"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    Download Brochure
                  </a>
                )}
                <Link
                  to="/properties"
                  className="w-full bg-white text-text-primary border border-gray-200 font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 transition-all active:scale-95"
                >
                  Back to All Listings
                </Link>
              </div>
            </div>
            
            {/* Contact Card Shortcut? */}
            <div className="bg-primary text-white p-8 rounded-2xl shadow-lg relative overflow-hidden group">
               <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
               <h3 className="text-xl font-bold mb-3 relative z-10">Interested?</h3>
               <p className="text-white/80 text-sm mb-6 relative z-10">Contact us today to schedule a viewing or for more details about this property.</p>
               <Link 
                 to={`/property/inquiry/${property._id}`}
                 className="bg-white text-primary px-6 py-2.5 rounded-lg font-bold text-sm inline-block relative z-10 hover:bg-white/90 transition-colors"
               >
                 Request a Inquiry for this property
               </Link>
            </div>
          </div>

        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default PropertyDetail;
