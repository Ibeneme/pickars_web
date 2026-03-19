import axios from "axios";

const API_BASE_URL = "http://localhost:5200/api/v1/admin";

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor to add Admin JWT to headers
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("adminToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;