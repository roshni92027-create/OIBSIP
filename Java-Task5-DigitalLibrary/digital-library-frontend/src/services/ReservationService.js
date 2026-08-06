import axios from "axios";

const API_URL = "http://localhost:8080/reservations";

export const reserveBook = (bookId, userId) => {
  return axios.post(
    `${API_URL}/reserve?bookId=${bookId}&userId=${userId}`
  );
};

export const getReservations = () => {
  return axios.get(API_URL);
};

export const cancelReservation = (id) => {
  return axios.put(`${API_URL}/cancel/${id}`);
};