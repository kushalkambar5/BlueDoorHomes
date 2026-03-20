import Testimonial from "../models/testimonialModel.js";
import handleAsyncError from "../middlewares/handleAsyncError.js";
import cloudinary from "../config/cloudinary.js";

export const createTestimonial = handleAsyncError(async (req, res) => {
    const { client_name, text, rating, image_url, image_public_id, property_id } = req.body;
    const testimonial = await Testimonial.create({ 
        client_name, 
        text, 
        rating, 
        image_url, 
        image_public_id,
        property_id: property_id || null 
    });
    res.status(201).json({ success: true, data: testimonial });
});

export const getAllTestimonials = handleAsyncError(async (req, res) => {
    const testimonials = await Testimonial.find();
    res.status(200).json({ success: true, data: testimonials });
});

export const getTestimonialById = handleAsyncError(async (req, res) => {
    const { id } = req.params;
    const testimonial = await Testimonial.findById(id);
    if (!testimonial) {
        return res.status(404).json({ success: false, message: "Testimonial not found" });
    }
    res.status(200).json({ success: true, data: testimonial });
});

export const updateTestimonial = handleAsyncError(async (req, res) => {
    const { id } = req.params;
    const { client_name, text, rating, image_url, image_public_id, property_id: rawPropertyId } = req.body;
    const property_id = rawPropertyId || null;
    
    const oldTestimonial = await Testimonial.findById(id);
    if (!oldTestimonial) {
        return res.status(404).json({ success: false, message: "Testimonial not found" });
    }

    if (oldTestimonial.image_public_id && oldTestimonial.image_public_id !== image_public_id) {
        try {
            await cloudinary.uploader.destroy(oldTestimonial.image_public_id);
        } catch (err) {
            console.error(`Failed to delete old testimonial image: ${oldTestimonial.image_public_id}`, err);
        }
    }

    const testimonial = await Testimonial.findByIdAndUpdate(
        id, 
        { client_name, text, rating, image_url, image_public_id, property_id }, 
        { new: true }
    );
    res.status(200).json({ success: true, data: testimonial });
});

export const deleteTestimonial = handleAsyncError(async (req, res) => {
    const { id } = req.params;
    const testimonial = await Testimonial.findById(id);
    if (!testimonial) {
        return res.status(404).json({ success: false, message: "Testimonial not found" });
    }

    if (testimonial.image_public_id) {
        try {
            await cloudinary.uploader.destroy(testimonial.image_public_id);
        } catch (err) {
            console.error(`Failed to delete testimonial image: ${testimonial.image_public_id}`, err);
        }
    }
    await testimonial.deleteOne();
    res.status(200).json({ success: true, message: "Testimonial deleted successfully" });
});