import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllTestimonials, deleteTestimonial } from "../api/testimonialApi";
import PageNavbar from "../components/PageNavbar";

function TestimonialsAdmin() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this testimonial?")) return;
    try {
      await deleteTestimonial(id);
      setTestimonials(testimonials.filter((t) => t._id !== id));
    } catch (error) {
      console.error("Failed to delete testimonial", error);
      alert("Failed to delete testimonial");
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
      <PageNavbar title="Testimonials Dashboard" />
      
      <div className="flex-grow bg-[#F8FAFC]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-[#0F172A] sm:text-4xl">
                Testimonials <span className="text-[#C9A227]">Management</span>
              </h1>
              <p className="mt-3 text-lg text-[#6B7280]">
                Curate and manage your client success stories.
              </p>
            </div>
            <Link
              to="/create-testimonials"
              className="rounded-xl bg-[#1D4ED8] px-8 py-3.5 text-sm font-bold uppercase tracking-widest text-white shadow-xl shadow-blue-500/20 transition-all hover:bg-blue-700 hover:scale-105 active:scale-95"
            >
              + New Testimonial
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.length === 0 ? (
              <div className="col-span-full flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-gray-200 bg-white p-20 text-center">
                <div className="mb-4 text-gray-300">
                  <svg className="mx-auto h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#0F172A]">No testimonials yet</h3>
                <p className="mt-2 text-[#6B7280]">Start collecting feedback to showcase your expertise.</p>
              </div>
            ) : (
              testimonials.map((t) => (
                <div key={t._id} className="group relative overflow-hidden rounded-3xl bg-white p-6 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/5 hover:-translate-y-1">
                  <div className="mb-6 flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="relative h-14 w-14 overflow-hidden rounded-full ring-2 ring-[#C9A227]/10 transition-all group-hover:ring-[#C9A227]/30">
                        <img 
                          src={t.image_url} 
                          alt={t.client_name} 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#0F172A]">{t.client_name}</h4>
                        <div className="flex text-xs text-yellow-500">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={i < t.rating ? "text-yellow-500" : "text-gray-200"}>★</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-8 min-h-[80px]">
                    <p className="text-sm italic leading-relaxed text-[#6B7280]">
                      "{t.text}"
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-gray-50 pt-4">
                    <button
                      onClick={() => navigate(`/edit-testimonial/${t._id}`)}
                      className="text-xs font-bold uppercase tracking-widest text-[#1D4ED8] transition-colors hover:text-blue-700"
                    >
                      Edit Post
                    </button>
                    <button
                      onClick={() => handleDelete(t._id)}
                      className="rounded-full bg-red-50 p-2 text-red-500 transition-all hover:bg-red-500 hover:text-white"
                      title="Delete Testimonial"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

    </div>
  );
}

export default TestimonialsAdmin;
