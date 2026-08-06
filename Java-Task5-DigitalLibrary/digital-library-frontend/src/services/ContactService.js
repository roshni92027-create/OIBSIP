import axios from "axios";

const API = "http://localhost:8080/contacts";

// Send Contact Message
export const sendMessage = (data) => {
    return axios.post(API, data);
};

// Get All Messages
export const getMessages = () => {
    return axios.get(API);
};

// Delete Message
export const deleteMessage = (id) => {
    return axios.delete(`${API}/${id}`);
};