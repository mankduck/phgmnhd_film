import axios from "axios";

// Khai báo base URL từ biến môi trường
const API_BASE_URL = import.meta.env.VITE_API_URL;


// Tạo một instance của axios
const apiBackend = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Hàm xử lý GET request
export const getData = async (endpoint, params = {}) => {
    try {
        const response = await api.get(endpoint, { params });
        return response.data;
    } catch (error) {
        console.error("Lỗi khi gọi API:", error);
        throw error;
    }
};

// Hàm xử lý POST request
export const postData = async (endpoint, data) => {
    try {
        const response = await api.post(endpoint, data);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi gọi API:", error);
        throw error;
    }
};

// Hàm xử lý PUT request
export const putData = async (endpoint, data) => {
    try {
        const response = await api.put(endpoint, data);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi gọi API:", error);
        throw error;
    }
};

// Hàm xử lý DELETE request
export const deleteData = async (endpoint) => {
    try {
        const response = await api.delete(endpoint);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi gọi API:", error);
        throw error;
    }
};

export default apiBackend;
