import axios from "axios";
import Cookies from "js-cookie";

const API_BASE_URL = `https://pickurps-server.onrender.com/api/v1/admin/`;
const API_BASE_URL_TRACK = `https://pickurps-server.onrender.com/api/`;

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: { "Content-Type": "application/json" },
});


export const trackInstance = axios.create({
    baseURL: API_BASE_URL_TRACK,
    headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.request.use((config) => {
    const token = Cookies.get("adminToken");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default axiosInstance;