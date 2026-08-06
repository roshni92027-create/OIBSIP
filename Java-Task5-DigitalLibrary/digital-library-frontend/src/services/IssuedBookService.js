import axios from "axios";

const API_URL = "http://localhost:8080/issued-books";

export const issueBook = (bookId, userId) => {
  return axios.post(
    `${API_URL}/issue?bookId=${bookId}&userId=${userId}`
  );
};

export const returnBook = (issueId) => {
  return axios.put(`${API_URL}/return/${issueId}`);
};

export const getIssuedBooks = () => {
  return axios.get(API_URL);
};

export const getIssuedBooksByStatus = (status) => {
  return axios.get(`${API_URL}/status/${status}`);
};

export const payFine = (issueId) => {
  return axios.put(`${API_URL}/pay-fine/${issueId}`);
};

// ✅ NEW
export const updateDueDate = (issueId, dueDate) => {
  return axios.put(
    `${API_URL}/due-date/${issueId}?dueDate=${dueDate}`
  );
};