import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

export const insertCollege = (payload) => api.post(`/college`, payload);
export const getAllColleges = () => api.get(`/colleges`);
export const updateCollegeById = (id, payload) =>
  api.put(`/college/${id}`, payload);
export const deleteCollegeById = (id) => api.delete(`/college/${id}`);
export const getCollegeById = (id) => api.get(`/college/${id}`);

const apis = {
  insertCollege,
  getAllColleges,
  updateCollegeById,
  deleteCollegeById,
  getCollegeById,
};

export default apis;
