import axiosInstance from "./axiosInstance";

const API_URL = "/api/v1/properties";

export const createProperty = async (propertyData) => {
  const response = await axiosInstance.post(API_URL, propertyData);
  return response.data;
};

export const getProperties = async (params) => {
  const response = await axiosInstance.get(API_URL, { params });
  return response.data;
};

export const getPropertyById = async (id) => {
  const response = await axiosInstance.get(`${API_URL}/${id}`);
  return response.data;
};

export const updateProperty = async (id, propertyData) => {
  const response = await axiosInstance.put(`${API_URL}/${id}`, propertyData);
  return response.data;
};

export const deleteProperty = async (id) => {
  const response = await axiosInstance.delete(`${API_URL}/${id}`);
  return response.data;
};
