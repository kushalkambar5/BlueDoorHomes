import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTestimonialById, updateTestimonial, deleteTestimonial } from "../api/testimonialApi";
import { getProperties } from "../api/propertyApi";
import PageNavbar from "../components/PageNavbar";
import useAxios from "../api/useAxios";

function EditTestimonial() {
  const { id } = useParams();
  const navigate = useNavigate();
  const api = useAxios();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    client_name: "",
    text: "",
    rating: 5,
    image_url: "",
    image_public_id: "",
    property_id: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [testimonialRes, propertiesRes] = await Promise.all([
          getTestimonialById(id),
          getProperties()
        ]);
        
        if (testimonialRes.success && testimonialRes.data) {
          setFormData(testimonialRes.data);
          setPreviewUrl(testimonialRes.data.image_url);
        }

        if (propertiesRes.success && propertiesRes.data) {
          setProperties(propertiesRes.data);
        }
      } catch (error) {
        console.error("Failed to fetch data", error);
        alert("Failed to load testimonial");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      let finalImageUrl = formData.image_url;
      let finalPublicId = formData.image_public_id;

      // 1. Upload new image if selected
      if (imageFile) {
        const sigRes = await api.get("/api/v1/cloudinary/signature");
        const { timestamp, signature } = sigRes.data;
        
        const uploadData = new FormData();
        uploadData.append("file", imageFile);
        uploadData.append("timestamp", timestamp);
        uploadData.append("signature", signature);
        uploadData.append("api_key", import.meta.env.VITE_CLOUDINARY_API_KEY || "975383774889771");

        const cloudRes = await fetch(
          `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "dye4bwzse"}/auto/upload`,
          { method: "POST", body: uploadData }
        );
        const cloudData = await cloudRes.json();
        
        if (!cloudRes.ok) throw new Error(cloudData.error?.message || "Cloudinary upload failed");

        finalImageUrl = cloudData.secure_url;
        finalPublicId = cloudData.public_id;
      }

      // 2. Prepare payload
      const payload = {
        ...formData,
        image_url: finalImageUrl,
        image_public_id: finalPublicId,
      };

      // 3. Update Testimonial
      await updateTestimonial(id, payload);
      alert("Testimonial updated successfully!");
      navigate("/testimonials-admin");
    } catch (error) {
      console.error("Failed to update testimonial", error);
      alert("Error: " + (error.message || "Failed to update testimonial"));
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this testimonial?")) return;
    try {
      await deleteTestimonial(id);
      alert("Testimonial deleted successfully!");
      navigate("/testimonials-admin");
    } catch (error) {
      console.error("Failed to delete testimonial", error);
      alert("Failed to delete testimonial");
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <PageNavbar title="Edit Testimonial" />
      
      <div className="container mx-auto px-4 py-8 max-w-2xl flex-grow">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-primary">Edit Testimonial</h2>
              <button
                type="button"
                onClick={handleDelete}
                className="text-red-500 hover:text-red-700 font-semibold text-sm"
              >
                Delete Testimonial
              </button>
            </div>

            <div className="flex flex-col items-center mb-6">
               <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center relative group cursor-pointer">
                  {previewUrl ? (
                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  )}
                  <input 
                    type="file" 
                    onChange={handleFileChange} 
                    accept="image/*" 
                    className="absolute inset-0 opacity-0 cursor-pointer" 
                  />
               </div>
               <p className="text-xs text-gray-500 mt-2 font-medium">Click to change client photo</p>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-1">
                Client Name
              </label>
              <input
                type="text"
                name="client_name"
                required
                value={formData.client_name}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-cta/20 focus:border-cta outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-text-primary mb-1">
                Testimonial Text
              </label>
              <textarea
                name="text"
                required
                rows="4"
                value={formData.text}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-cta/20 focus:border-cta outline-none transition-all resize-none"
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-text-primary mb-1">
                  Rating (1-5)
                </label>
                <input
                  type="number"
                  name="rating"
                  min="1"
                  max="5"
                  required
                  value={formData.rating}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-cta/20 focus:border-cta outline-none transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-text-primary mb-1">
                  Related Property (Optional)
                </label>
                <select
                  name="property_id"
                  value={formData.property_id || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-cta/20 focus:border-cta outline-none transition-all bg-white"
                >
                  <option value="">None</option>
                  {properties.map((prop) => (
                    <option key={prop._id} value={prop._id}>
                      {prop.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="pt-4 flex gap-4">
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 bg-cta hover:bg-blue-800 text-white font-bold py-3 rounded-xl shadow-md transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50"
              >
                {submitting ? "Updating..." : "Update Testimonial"}
              </button>
              <button
                type="button"
                onClick={() => navigate("/testimonials-admin")}
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

export default EditTestimonial;
