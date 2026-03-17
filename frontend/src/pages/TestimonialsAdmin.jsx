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
      <PageNavbar title="Manage Testimonials" />

      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary">Testimonials</h1>
            <p className="text-text-secondary">View and manage all client testimonials</p>
          </div>
          <Link
            to="/create-testimonials"
            className="bg-cta hover:bg-blue-800 text-white font-bold py-2.5 px-6 rounded-xl shadow-md transition-all duration-300 transform hover:-translate-y-1"
          >
            + Add Testimonial
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase tracking-wider">Client</th>
                  <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase tracking-wider">Testimonial</th>
                  <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase tracking-wider">Rating</th>
                  <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {testimonials.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-12 text-center text-gray-500 italic">
                      No testimonials found. Add one to get started!
                    </td>
                  </tr>
                ) : (
                  testimonials.map((t) => (
                    <tr key={t._id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img 
                            src={t.image_url} 
                            alt={t.client_name} 
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <span className="font-semibold text-text-primary">{t.client_name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 max-w-xs md:max-w-md">
                        <p className="text-sm text-text-secondary line-clamp-2 italic">"{t.text}"</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex text-yellow-500">
                          {[...Array(t.rating)].map((_, i) => (
                            <span key={i}>★</span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => navigate(`/edit-testimonial/${t._id}`)}
                            className="text-primary hover:text-cta font-semibold text-sm transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(t._id)}
                            className="text-red-500 hover:text-red-700 font-semibold text-sm transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestimonialsAdmin;
