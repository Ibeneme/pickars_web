import axios from "axios";

const API_BASE_URL = "http://localhost:5200/api/v1/admin";
const API_BASE_URL_TRACK = "http://localhost:5200/api/";

// 1. Admin instance (Authenticated)
const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: { "Content-Type": "application/json" },
});

// 2. Tracking/Manual instance (Public/General)
export const trackInstance = axios.create({
    baseURL: API_BASE_URL_TRACK,
    headers: { "Content-Type": "application/json" },
});

// Auth Interceptor for Admin
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("adminToken");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export default axiosInstance;