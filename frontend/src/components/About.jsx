import React from "react";
import { Link } from "react-router-dom";

function About() {
  return (
    <section id="about" className="overflow-hidden bg-[#F8FAFC] py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:gap-x-16 lg:items-center">
          {/* Content Side */}
          <div className="flex flex-col justify-center max-w-2xl">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-[#C9A227] mb-3">
              About <span className="text-[#1D4ED8]">Blue</span>Door<span className="text-[#C9A227]">Homes</span>
            </h2>
            <h3 className="text-3xl font-bold tracking-tight text-[#0F172A] sm:text-4xl md:text-5xl mb-6 leading-tight">
              Building Trust, <br />
              Delivering <span className="text-[#1D4ED8]">Excellence.</span>
            </h3>
            
            <p className="text-lg leading-relaxed text-[#6B7280] mb-6">
              At BlueDoorHomes, we believe that finding your dream property should be an exciting and seamless journey. With years of experience and a deep understanding of the premium real estate market, we connect visionary buyers with exceptional properties.
            </p>
            <p className="text-lg leading-relaxed text-[#6B7280] mb-10">
              Our curated portfolio features exclusive lands, luxury homes, and prime commercial spaces. Whether you're a first-time homebuyer, a seasoned investor, or seeking the perfect commercial plot, our dedicated team is committed to providing expert guidance and personalized service every step of the way.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/properties"
                className="inline-flex justify-center items-center rounded-md bg-[#1D4ED8] px-8 py-3.5 text-sm font-semibold text-white shadow-md hover:bg-blue-800 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Explore Properties
              </Link>
              <div className="flex items-center gap-4 px-4 py-2 border-l-4 border-[#C9A227] bg-white rounded-r-md shadow-sm">
                <div>
                  <div className="text-2xl font-bold text-[#0F172A]">10+</div>
                  <div className="text-xs font-medium text-[#6B7280] uppercase tracking-wider">Years Experience</div>
                </div>
              </div>
            </div>
          </div>

          {/* Image Showcase Side */}
          <div className="relative h-full min-h-[500px] lg:min-h-full rounded-2xl">
            {/* Background design element */}
            <div className="absolute -inset-4 rounded-3xl bg-[#0F172A]/5 transform rotate-3 z-0 hidden md:block"></div>
            
            <div className="relative z-10 grid grid-cols-2 gap-4 h-full">
              {/* Tall Image */}
              <div className="col-span-1 h-[110%] mt-[-5%] overflow-hidden rounded-2xl shadow-xl transform transition-transform duration-700 hover:scale-[1.02]">
                <img 
                  src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Modern Luxury Home Exterior" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Two Stacked Images */}
              <div className="col-span-1 grid grid-rows-2 gap-4 h-full">
                <div className="row-span-1 overflow-hidden rounded-2xl shadow-lg transform transition-transform duration-700 hover:scale-[1.02]">
                  <img 
                    src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Premium Interior Design" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="row-span-1 overflow-hidden rounded-2xl shadow-lg transform transition-transform duration-700 hover:scale-[1.02]">
                  <img 
                    src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Lush Countryside Land" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;