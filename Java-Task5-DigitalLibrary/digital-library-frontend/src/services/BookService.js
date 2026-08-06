import axios from "axios";

const API_URL = "http://localhost:8080/books";

export const getBooks = () => axios.get(API_URL);

export const getBookById = (id) =>
  axios.get(`${API_URL}/${id}`);

export const addBook = (book) =>
  axios.post(API_URL, book);

export const updateBook = (id, book) =>
  axios.put(`${API_URL}/${id}`, book);

export const deleteBook = (id) =>
  axios.delete(`${API_URL}/${id}`);

export const searchBooks = (keyword) =>
  axios.get(`${API_URL}/search?keyword=${keyword}`);

export const filterByCategory = (category) =>
  axios.get(`${API_URL}/category/${category}`);