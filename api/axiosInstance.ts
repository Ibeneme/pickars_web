/**
 * Pickars Courier Limited – Axios Configuration with 30-Minute Idle Timeout
 * Place at: your-api-client-path/axiosInstance.ts (or corresponding location)
 */

import axios from "axios";
import Cookies from "js-cookie";

const API_BASE_URL = `https://pickurps-server.onrender.com/api/v1/admin/`;
const API_BASE_URL_TRACK = `https://pickurps-server.onrender.com/api/`;

const INACTIVITY_TIMEOUT = 30 * 60 * 1000; // 30 minutes in milliseconds
const LAST_ACTIVITY_KEY = "last_activity_time";

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: { "Content-Type": "application/json" },
});

export const trackInstance = axios.create({
    baseURL: API_BASE_URL_TRACK,
    headers: { "Content-Type": "application/json" },
});

// Function to handle automatic logout
function handleAutoLogout() {
    const token = Cookies.get("adminToken");
    if (token) {
        Cookies.remove("adminToken");
        Cookies.remove(LAST_ACTIVITY_KEY);
        // Redirect to login page (adjust the path if your sign-in route differs)
        window.location.href = "/investors/sign-in";
    }
}

// Function to reset or check activity timer
function updateLastActivity() {
    const token = Cookies.get("adminToken");
    if (!token) return;

    const now = Date.now().toString();
    Cookies.set(LAST_ACTIVITY_KEY, now, { expires: 1 }); // expires in 1 day max cookie lifespan
}

// Check session timeout status
function checkSessionTimeout() {
    const token = Cookies.get("adminToken");
    if (!token) return;

    const lastActivity = Cookies.get(LAST_ACTIVITY_KEY);
    if (lastActivity) {
        const elapsed = Date.now() - parseInt(lastActivity, 10);
        if (elapsed > INACTIVITY_TIMEOUT) {
            handleAutoLogout();
        }
    }
}

// Setup client-side activity listeners if running in a browser environment
if (typeof window !== "undefined") {
    // Initial timestamp setting on load if token exists
    if (Cookies.get("adminToken") && !Cookies.get(LAST_ACTIVITY_KEY)) {
        updateLastActivity();
    }

    // Events that count as user activity
    const activityEvents = ["mousemove", "keydown", "click", "scroll", "touchstart"];

    let throttleTimeout: NodeJS.Timeout | null = null;
    const handleUserActivity = () => {
        if (!throttleTimeout) {
            throttleTimeout = setTimeout(() => {
                updateLastActivity();
                throttleTimeout = null;
            }, 5000); // Throttle activity updates to once every 5 seconds for performance
        }
    };

    activityEvents.forEach((event) => {
        window.addEventListener(event, handleUserActivity);
    });

    // Periodic check every minute to catch timeout even if tab is left idle
    setInterval(checkSessionTimeout, 60 * 1000);
}

// Axios Request Interceptor
axiosInstance.interceptors.request.use((config) => {
    // Check timeout before letting any request through
    const lastActivity = Cookies.get(LAST_ACTIVITY_KEY);
    if (lastActivity) {
        const elapsed = Date.now() - parseInt(lastActivity, 10);
        if (elapsed > INACTIVITY_TIMEOUT) {
            handleAutoLogout();
            return Promise.reject(new Error("Session expired due to inactivity."));
        }
    }

    const token = Cookies.get("adminToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        updateLastActivity(); // Refresh activity timestamp on request
    }

    return config;
});

export default axiosInstance;