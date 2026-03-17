import React, { useState, useEffect } from "react";
import { getAllTestimonials } from "../api/testimonialApi";

function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await getAllTestimonials();
        if (response.success && response.data) {
          setTestimonials(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch testimonials", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  if (loading) return null;
  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="py-20 bg-[#F8FAFC] overflow-hidden">
      <div className="container mx-auto px-4 mb-12 text-center">
        <h2 className="text-4xl font-bold text-[#0F172A] mb-4 underline decoration-[#C9A227] decoration-4 underline-offset-8">
          What Our Clients Say
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Experience the excellence of <span className="text-[#1D4ED8]">Blue</span>Door<span className="text-[#C9A227]">Homes</span> through the voices of those we've served.
        </p>
      </div>

      <div className="relative group">
        {/* Infinite Scroll Container */}
        <div className="flex animate-scroll hover:pause-animation">
          {[...testimonials, ...testimonials, ...testimonials, ...testimonials].map((t, index) => (
            <div 
              key={`${t._id}-${index}`}
              className="flex-shrink-0 w-80 md:w-96 mx-4 bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="flex items-center gap-4 mb-6">
                <img 
                  src={t.image_url} 
                  alt={t.client_name} 
                  className="w-16 h-16 rounded-full object-cover ring-2 ring-blue-100"
                />
                <div>
                  <h4 className="font-bold text-[#0F172A]">{t.client_name}</h4>
                  <div className="flex text-yellow-400 text-sm">
                    {[...Array(t.rating || 5)].map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 italic leading-relaxed">
                "{t.text}"
              </p>
            </div>
          ))}
        </div>

        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#F8FAFC] to-transparent pointer-events-none z-10"></div>
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#F8FAFC] to-transparent pointer-events-none z-10"></div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-384px * ${testimonials.length} - 32px * ${testimonials.length})); }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
          width: max-content;
        }
        .pause-animation {
          animation-play-state: paused;
        }
      `}} />
    </section>
  );
}

export default Testimonials;