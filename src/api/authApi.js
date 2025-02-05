import axios from "./axiosInstance";

// Register user baru
export const registerUser = async (userData) => {
  return axios.post("/api/auth/register", userData);
};

// Login user
export const loginUser = async (credentials) => {
  return axios.post("/api/auth/login", credentials);
};
