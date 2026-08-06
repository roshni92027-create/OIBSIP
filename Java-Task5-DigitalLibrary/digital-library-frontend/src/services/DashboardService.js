import axios from "axios";

const API_URL = "http://localhost:8080/dashboard";

export const getDashboard = () => {
  return axios.get(API_URL);
};