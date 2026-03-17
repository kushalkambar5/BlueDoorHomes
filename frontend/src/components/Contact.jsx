import React, { useState } from "react";
import { createLead } from "../api/leadApi";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    budget: "",
    message: ""
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await createLead({
        ...formData,
        property_id: null, // General inquiry from home page
      });
      alert("Thank you for your message. Our team will get back to you shortly.");
      setFormData({ name: "", phone: "", budget: "", message: "" });
    } catch (error) {
      console.error("Failed to submit inquiry", error);
      alert("Failed to submit inquiry. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-20 sm:py-32 bg-white overflow-hidden">
      {/* Decorative background blurs */}
      <div className="absolute top-0 left-[-10%] w-96 h-96 bg-[#1D4ED8]/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 right-[-10%] w-96 h-96 bg-[#C9A227]/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-32 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-[#0F172A]/5 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center md:w-2/3 lg:w-1/2 mx-auto mb-16">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-[#C9A227] mb-3">
            Get In Touch
          </h2>
          <h3 className="text-3xl font-bold tracking-tight text-[#0F172A] sm:text-4xl md:text-5xl mb-4">
            Let's Discuss Your Dream Property
          </h3>
          <p className="text-[#6B7280] text-lg">
            Whether you have a question about a listing or want to schedule a viewing, our premier agents are ready to help.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col lg:flex-row border border-gray-100">
          
          {/* Contact Info Side */}
          <div className="lg:w-2/5 bg-[#0F172A] text-white p-10 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#1D4ED8]/20 rounded-full transform -translate-x-1/2 translate-y-1/2 filter blur-2xl"></div>

            <div className="relative z-10">
              <h4 className="text-2xl font-bold mb-8">Contact Information</h4>
              <p className="text-gray-300 mb-10 leading-relaxed font-light">
                Fill out the form and our Team will get back to you within 24 hours.
              </p>

              <div className="space-y-8">
                <div className="flex items-start">
                  <span className="flex-shrink-0 bg-white/10 p-3 rounded-lg text-[#C9A227] mr-4">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wider text-gray-400">Phone</p>
                    <a href={`tel:+91${import.meta.env.VITE_PHONENO}`} className="text-lg hover:text-[#C9A227] transition-colors">+91 {import.meta.env.VITE_PHONENO}</a>
                  </div>
                </div>

                <div className="flex items-start">
                  <span className="flex-shrink-0 bg-white/10 p-3 rounded-lg text-[#C9A227] mr-4">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wider text-gray-400">Email</p>
                    <a href={`mailto:${import.meta.env.VITE_EMAILADDRESS}`} className="text-lg hover:text-[#C9A227] transition-colors break-all">{import.meta.env.VITE_EMAILADDRESS}</a>
                  </div>
                </div>

                <div className="flex items-start">
                  <span className="flex-shrink-0 bg-white/10 p-3 rounded-lg text-[#C9A227] mr-4">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wider text-gray-400">Office</p>
                    <p className="text-lg">123 Premium Estate Blvd,<br/>Luxury District, XYZ 40001</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links (Optional, placed at bottom) */}
            <div className="mt-16 flex gap-4">
              <a 
                href="https://www.facebook.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="h-10 w-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#C9A227] hover:text-[#0F172A] transition-all duration-300"
              >
                <span className="sr-only">Facebook</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
              </a>
              <a 
                href="https://www.instagram.com/kushal.kambar.5/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="h-10 w-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#C9A227] hover:text-[#0F172A] transition-all duration-300"
              >
                <span className="sr-only">Instagram</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
              </a>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:w-3/5 p-10 lg:p-14">
            <h4 className="text-2xl font-bold text-[#0F172A] mb-8">Send a Message</h4>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-text-primary mb-1">First & Last Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-cta/20 focus:border-cta outline-none transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-text-primary mb-1">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-cta/20 focus:border-cta outline-none transition-all"
                    placeholder="Your Phone Number"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="budget" className="block text-sm font-semibold text-text-primary mb-1">Your Budget (₹)</label>
                <input
                  type="number"
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-cta/20 focus:border-cta outline-none transition-all"
                  placeholder="Enter your budget"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-text-primary mb-1">Brief Description</label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-cta/20 focus:border-cta outline-none transition-all resize-none"
                  placeholder="I'm interested in..."
                ></textarea>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center justify-center w-full sm:w-auto rounded-md bg-[#1D4ED8] px-8 py-3.5 text-sm font-semibold text-white shadow-md hover:bg-blue-800 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-50 disabled:transform-none"
                >
                  {submitting ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
