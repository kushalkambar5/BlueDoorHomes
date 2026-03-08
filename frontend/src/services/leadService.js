import axiosInstance from "./axiosInstance";

const API_URL = "/api/v1/leads";

export const createLead = async (leadData) => {
  const response = await axiosInstance.post(API_URL, leadData);
  return response.data;
};

export const getLeads = async (params) => {
  const response = await axiosInstance.get(API_URL, { params });
  return response.data;
};

export const getLeadById = async (id) => {
  const response = await axiosInstance.get(`${API_URL}/${id}`);
  return response.data;
};

export const updateLead = async (id, leadData) => {
  const response = await axiosInstance.put(`${API_URL}/${id}`, leadData);
  return response.data;
};

export const deleteLead = async (id) => {
  const response = await axiosInstance.delete(`${API_URL}/${id}`);
  return response.data;
};
