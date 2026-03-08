import axiosInstance from "./axiosInstance";

const API_URL = "/api/v1/testimonials";

export const createTestimonial = async (testimonialData) => {
  const response = await axiosInstance.post(API_URL, testimonialData);
  return response.data;
};

export const getTestimonials = async (params) => {
  const response = await axiosInstance.get(API_URL, { params });
  return response.data;
};

export const getTestimonialById = async (id) => {
  const response = await axiosInstance.get(`${API_URL}/${id}`);
  return response.data;
};

export const updateTestimonial = async (id, testimonialData) => {
  const response = await axiosInstance.put(`${API_URL}/${id}`, testimonialData);
  return response.data;
};

export const deleteTestimonial = async (id) => {
  const response = await axiosInstance.delete(`${API_URL}/${id}`);
  return response.data;
};
