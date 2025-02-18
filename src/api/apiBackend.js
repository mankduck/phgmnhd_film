import axios from "axios";

// Khai báo base URL từ biến môi trường
const API_BASE_URL = import.meta.env.VITE_API_URL + "/api/v1";

// Tạo một instance của axios
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Tạo object apiService
const apiService = {
    get: async (endpoint, params = {}) => {
        try {
            const response = await api.get(endpoint, { params });
            return response.data;
        } catch (error) {
            console.error("ERR: ", error.message);
            throw error;
        }
    },

    post: async (endpoint, data) => {
        try {
            const response = await api.post(endpoint, data);
            return response.data;
        } catch (error) {
            console.error("ERR: ", error);
            throw error;
        }
    },

    put: async (endpoint, data) => {
        try {
            const response = await api.put(endpoint, data);
            return response.data;
        } catch (error) {
            console.error("ERR: ", error);
            throw error;
        }
    },

    delete: async (endpoint) => {
        try {
            const response = await api.delete(endpoint);
            return response.data;
        } catch (error) {
            console.error("ERR: ", error);
            throw error;
        }
    },
};

export default apiService; // ✅ Xuất mặc định
