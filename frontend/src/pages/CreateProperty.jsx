import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createProperty } from "../api/propertyApi";
import { uploadToCloudinary } from "../services/uploadToCloudinary";
import PageNavbar from "../components/PageNavbar";

function CreateProperty() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    price_per_sqft: "",
    area_sqft: "",
    property_type: "house",
    status: "available",
    tags: "",
    brochure_url: "",
  });
  const [location, setLocation] = useState({
    city: "",
    locality: "",
    address: "",
    googleMapsLink: "",
  });
  const [mediaFiles, setMediaFiles] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLocationChange = (e) => {
    setLocation({ ...location, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setMediaFiles(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // 1. Upload media to cloudinary
      const uploadedMedia = [];
      for (const file of mediaFiles) {
        const result = await uploadToCloudinary(file);
        uploadedMedia.push({
          url: result.url,
          public_id: result.public_id,
          type: result.type,
        });
      }

      // 2. Prepare payload
      const tagsArray = formData.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      const payload = {
        ...formData,
        price: Number(formData.price),
        price_per_sqft: Number(formData.price_per_sqft),
        area_sqft: formData.area_sqft, // Keep as string e.g "40*50ft"
        location: {
          city: location.city,
          locality: location.locality,
          address: location.address,
          googleMapsLink: location.googleMapsLink,
        },
        tags: tagsArray,
        media: uploadedMedia,
      };

      // 3. Call API
      await createProperty(payload);
      alert("Property created successfully!");
      navigate("/properties");
    } catch (error) {
      console.error(error);
      alert("Error creating property: " + (error.message || "Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <PageNavbar title="Create New Property" />
      <div className="max-w-4xl w-full mx-auto p-6 bg-white shadow-sm rounded-xl my-8 border border-gray-100">
        <div className="mb-6 pb-4 border-b border-gray-100">
          <h1 className="text-2xl font-bold text-primary">
            Property Information
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-1">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-cta focus:ring-cta focus:ring-1 outline-none p-2.5 border transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-1">
                Property Type
              </label>
              <select
                name="property_type"
                value={formData.property_type}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-cta focus:ring-cta focus:ring-1 outline-none p-2.5 border transition-all"
              >
                <option value="house">House</option>
                <option value="apartment">Apartment</option>
                <option value="commercial">Commercial</option>
                <option value="land">Land</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-text-primary mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-cta focus:ring-cta focus:ring-1 outline-none p-2.5 border transition-all"
            />
          </div>

          {/* Pricing & Area */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-1">
                Price
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-cta focus:ring-cta focus:ring-1 outline-none p-2.5 border transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-1">
                Price/sqft
              </label>
              <input
                type="number"
                name="price_per_sqft"
                value={formData.price_per_sqft}
                onChange={handleChange}
                required
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-cta focus:ring-cta focus:ring-1 outline-none p-2.5 border transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-1">
                Area (e.g., 40*50ft)
              </label>
              <input
                type="text"
                name="area_sqft"
                value={formData.area_sqft}
                onChange={handleChange}
                placeholder="40*50ft or 2000 sqft"
                required
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-cta focus:ring-cta focus:ring-1 outline-none p-2.5 border transition-all"
              />
            </div>
          </div>

          {/* Location Info */}
          <div className="bg-background p-5 rounded-lg border border-gray-100">
            <h2 className="text-lg font-bold text-primary mb-4 pb-2 border-b border-gray-200">
              Location Settings
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-text-primary mb-1">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={location.city}
                  onChange={handleLocationChange}
                  required
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-cta focus:ring-cta focus:ring-1 outline-none p-2.5 border transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-text-primary mb-1">
                  Locality
                </label>
                <input
                  type="text"
                  name="locality"
                  value={location.locality}
                  onChange={handleLocationChange}
                  required
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-cta focus:ring-cta focus:ring-1 outline-none p-2.5 border transition-all"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-text-primary mb-1">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={location.address}
                  onChange={handleLocationChange}
                  required
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-cta focus:ring-cta focus:ring-1 outline-none p-2.5 border transition-all"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-text-primary mb-1">
                  Google Maps Embed Code{" "}
                  <span className="text-text-secondary font-normal">
                    (Optional)
                  </span>
                </label>
                <input
                  type="text"
                  name="googleMapsLink"
                  value={location.googleMapsLink}
                  onChange={handleLocationChange}
                  placeholder='<iframe src="https://www.google.com/maps/embed?pb=..." width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-cta focus:ring-cta focus:ring-1 outline-none p-2.5 border transition-all bg-white"
                />
              </div>
            </div>
          </div>

          {/* Other Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-1">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-cta focus:ring-cta focus:ring-1 outline-none p-2.5 border transition-all"
              >
                <option value="available">Available</option>
                <option value="sold">Sold</option>
                <option value="negotiation">Negotiation</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-1">
                Tags
              </label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="Luxury, Sea View"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-cta focus:ring-cta focus:ring-1 outline-none p-2.5 border transition-all placeholder:text-gray-400"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-1">
                Brochure URL
              </label>
              <input
                type="url"
                name="brochure_url"
                value={formData.brochure_url}
                onChange={handleChange}
                required
                placeholder="https://..."
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-cta focus:ring-cta focus:ring-1 outline-none p-2.5 border transition-all placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Media Upload */}
          <div className="mt-8">
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 text-sm font-medium border-dashed border-gray-300 rounded-lg cursor-pointer bg-background hover:bg-gray-100 transition-colors">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-3 text-text-secondary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  ></path>
                </svg>
                <p className="mb-2 text-sm text-text-secondary">
                  <span className="font-bold text-cta">Click to upload</span> or
                  drag and drop
                </p>
                <p className="text-xs text-text-secondary">
                  Images (PNG, JPG) or Videos (MP4)
                </p>
              </div>
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                accept="image/*,video/*"
                className="hidden"
              />
            </label>
            {mediaFiles.length > 0 && (
              <div className="mt-3 flex items-center gap-2">
                <span className="flex items-center justify-center bg-accent text-primary text-xs font-bold px-2 py-1 rounded-full">
                  {mediaFiles.length}
                </span>
                <span className="text-sm font-medium text-text-primary">
                  files selected.
                </span>
              </div>
            )}
          </div>

          {/* Submit */}
          <div className="pt-6 border-t mt-6">
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center py-3.5 px-4 border border-transparent rounded-md shadow-md text-sm font-bold text-white transition-all transform ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-cta hover:bg-blue-800 hover:-translate-y-0.5 hover:shadow-lg"
              }`}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Creating Property...
                </span>
              ) : (
                "Publish Property"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateProperty;
