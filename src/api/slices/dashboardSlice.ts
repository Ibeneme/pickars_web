import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";
import axios from "axios";

// --- INTERFACES ---

interface DashboardState {
    // Platform Stats
    stats: {
        users: number;
        riders: number;
        rides: number;
        completedRides: number;
        totalRevenue: number;
        totalRiderEarnings: number;
    } | null;
    chartData: {
        labels: string[];
        revenueData: number[];
        ridesData: number[];
    } | null;

    // Data Management
    users: any[];
    riders: any[];
    rides: any[];
    payments: any[];
    admins: any[];

    // Notifications & Marketing
    notificationHistory: any[];

    // UI State
    loading: boolean;
    error: string | null;
}

const initialState: DashboardState = {
    stats: null,
    chartData: null,
    users: [],
    riders: [],
    rides: [],
    payments: [],
    admins: [],
    notificationHistory: [],
    loading: false,
    error: null,
};

// --- ASYNC THUNKS (LOGISTICS & MANAGEMENT) ---

export const fetchDashboardStats = createAsyncThunk("dashboard/fetchStats", async (_, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get("/dashboard/stats");
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) return rejectWithValue(error.response?.data.message);
        return rejectWithValue("Failed to load statistics");
    }
});

export const fetchAllUsers = createAsyncThunk("dashboard/fetchUsers", async (_, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get("/dashboard/users");
        return response.data.users;
    } catch (error) {
        if (axios.isAxiosError(error)) return rejectWithValue(error.response?.data.message);
        return rejectWithValue("Failed to load users");
    }
});

export const fetchAllRiders = createAsyncThunk("dashboard/fetchRiders", async (_, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get("/dashboard/riders");
        return response.data.riders;
    } catch (error) {
        if (axios.isAxiosError(error)) return rejectWithValue(error.response?.data.message);
        return rejectWithValue("Failed to load riders");
    }
});

export const fetchAllRides = createAsyncThunk("dashboard/fetchRides", async (_, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get("/dashboard/rides");
        return response.data.rides;
    } catch (error) {
        if (axios.isAxiosError(error)) return rejectWithValue(error.response?.data.message);
        return rejectWithValue("Failed to load rides");
    }
});

export const fetchAllPayments = createAsyncThunk("dashboard/fetchPayments", async (_, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get("/dashboard/payments");
        return response.data.payments;
    } catch (error) {
        if (axios.isAxiosError(error)) return rejectWithValue(error.response?.data.message);
        return rejectWithValue("Failed to load payments");
    }
});

// --- ASYNC THUNKS (ADMIN & NOTIFICATIONS) ---

export const fetchAllAdmins = createAsyncThunk("dashboard/fetchAdmins", async (_, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get("/all-admins");
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) return rejectWithValue(error.response?.data.message);
        return rejectWithValue("Failed to load admin list");
    }
});

export const sendPushNotification = createAsyncThunk(
    "dashboard/sendPush",
    async (payload: { userId?: string, title: string, message: string, sendToAll: boolean }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/send", payload);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) return rejectWithValue(error.response?.data.message);
            return rejectWithValue("Failed to send notification");
        }
    }
);

export const fetchNotificationHistory = createAsyncThunk("dashboard/fetchNotificationHistory", async (_, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get("/history");
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) return rejectWithValue(error.response?.data.message);
        return rejectWithValue("Failed to load notification history");
    }
});

// --- THE SLICE ---

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {
        clearDashboardError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Logistics Success Cases
            .addCase(fetchDashboardStats.fulfilled, (state, action) => {
                state.loading = false;
                state.stats = action.payload.stats;
                state.chartData = action.payload.chartData;
            })
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchAllRiders.fulfilled, (state, action) => {
                state.loading = false;
                state.riders = action.payload;
            })
            .addCase(fetchAllRides.fulfilled, (state, action) => {
                state.loading = false;
                state.rides = action.payload;
            })
            .addCase(fetchAllPayments.fulfilled, (state, action) => {
                state.loading = false;
                state.payments = action.payload;
            })
            // Admin & Notification Success Cases
            .addCase(fetchAllAdmins.fulfilled, (state, action) => {
                state.loading = false;
                state.admins = action.payload;
            })
            .addCase(fetchNotificationHistory.fulfilled, (state, action) => {
                state.loading = false;
                state.notificationHistory = action.payload;
            })

            // Global Matchers for Pending & Rejected
            .addMatcher(
                (action) => action.type.endsWith("/pending"),
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )
            .addMatcher(
                (action) => action.type.endsWith("/rejected"),
                (state, action: PayloadAction<any>) => {
                    state.loading = false;
                    state.error = action.payload || "An unexpected error occurred";
                }
            );
    },
});

export const { clearDashboardError } = dashboardSlice.actions;
export default dashboardSlice.reducer;