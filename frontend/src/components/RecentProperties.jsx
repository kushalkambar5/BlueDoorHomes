import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getProperties } from "../api/propertyApi";
import PropertyCard from "./PropertyCard";
import { useAuth } from "@clerk/react";
import { useUserContext } from "../context/UserContext";

function RecentProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isSignedIn } = useAuth();
  const { role } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecentProperties = async () => {
      try {
        const response = await getProperties({ limit: 5 });
        const recent = response.data || [];
        
        // Ensure mediaList exists
        const processed = recent.map((p) => {
          if ((!p.mediaList || p.mediaList.length === 0) && p.media_ids && p.media_ids.length > 0) {
            return {
              ...p,
              mediaList: p.media_ids.map((url, idx) => ({
                _id: `old-${idx}`,
                url: typeof url === 'string' ? url : url.url,
                type: "image",
              }))
            };
          }
          return p;
        });

        setProperties(processed);
      } catch (error) {
        console.error("Failed to fetch recent properties", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecentProperties();
  }, []);

  if (loading) return null;
  if (properties.length === 0) return null;

  return (
    <section className="py-20 bg-white overflow-hidden border-t border-gray-100">
      <div className="container mx-auto px-4 mb-12 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h2 className="text-4xl font-bold text-[#0F172A] mb-4 underline decoration-[#C9A227] decoration-4 underline-offset-8">
            Newest Properties
          </h2>
          <p className="text-gray-600 max-w-2xl">
            Check out the latest additions to our exclusive portfolio.
          </p>
        </div>
        <Link 
          to="/properties" 
          className="text-cta font-bold hover:text-blue-800 transition-colors flex items-center gap-2 group"
        >
          See All Properties <span className="text-xl transform transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </div>

      <div className="relative group">
        <div className="flex animate-scroll-props hover:pause-animation">
          {[...properties, ...properties, ...properties, ...properties].map((p, index) => (
            <div 
              key={`${p._id}-${index}`}
              className="flex-shrink-0 w-80 md:w-96 mx-4 pb-8 pt-4 pointer-events-auto"
            >
              <PropertyCard 
                property={p} 
                isSignedIn={isSignedIn} 
                role={role} 
                handleDelete={() => {}} 
                navigate={navigate}
              />
            </div>
          ))}
        </div>

        <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent pointer-events-none z-10"></div>
        <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent pointer-events-none z-10"></div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scrollProps {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-384px * ${properties.length} - 32px * ${properties.length})); }
        }
        .animate-scroll-props {
          animation: scrollProps 50s linear infinite;
          width: max-content;
        }
        .pause-animation {
          animation-play-state: paused;
        }
      `}} />
    </section>
  );
}

export default RecentProperties;
