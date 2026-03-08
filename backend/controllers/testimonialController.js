import Testimonial from "../models/testimonial";
import handleAsyncError from "../middlewares/handleAsyncError";

export const createTestimonial = handleAsyncError(async (req, res) => {
    const { name, message, rating } = req.body;
    const testimonial = await Testimonial.create({ name, message, rating });
    res.status(201).json(testimonial);
});

export const getAllTestimonials = handleAsyncError(async (req, res) => {
    const testimonials = await Testimonial.find();
    res.status(200).json(testimonials);
});

export const getTestimonialById = handleAsyncError(async (req, res) => {
    const { id } = req.params;
    const testimonial = await Testimonial.findById(id);
    res.status(200).json(testimonial);
});

export const updateTestimonial = handleAsyncError(async (req, res) => {
    const { id } = req.params;
    const { name, message, rating } = req.body;
    const testimonial = await Testimonial.findByIdAndUpdate(id, { name, message, rating }, { new: true });
    res.status(200).json(testimonial);
});

export const deleteTestimonial = handleAsyncError(async (req, res) => {
    const { id } = req.params;
    await Testimonial.findByIdAndDelete(id);
    res.status(204).json({ message: "Testimonial deleted successfully" });
});