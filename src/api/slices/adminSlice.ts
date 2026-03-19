import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";
import axios from "axios";


// 1️⃣ Action: Request OTP
export const requestAdminOtp = createAsyncThunk(
    "admin/requestOtp",
    async (email: string, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/login", { email });
            return response.data;
        } catch (error) {
            // Cast the error to handle Axios specific data
            if (axios.isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data.message || "Failed to send OTP");
            }
            return rejectWithValue("An unexpected error occurred");
        }
    }
);

// 2️⃣ Action: Verify OTP & Login
export const verifyAdminOtp = createAsyncThunk(
    "admin/verifyOtp",
    async ({ email, otp }: { email: string; otp: string }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/verify-otp", { email, otp });

            if (response.data.token) {
                localStorage.setItem("adminToken", response.data.token);
            }

            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data.message || "Invalid OTP");
            }
            return rejectWithValue("Verification failed");
        }
    }
);

interface AdminState {
    adminData: any;
    token: string | null;
    loading: boolean;
    error: string | any;
    otpSent: boolean;
}

const initialState: AdminState = {
    adminData: null,
    token: localStorage.getItem("adminToken"),
    loading: false,
    error: null,
    otpSent: false,
};

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        logoutAdmin: (state) => {
            state.adminData = null;
            state.token = null;
            state.otpSent = false;
            localStorage.removeItem("adminToken");
        },
        clearAdminError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(requestAdminOtp.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(requestAdminOtp.fulfilled, (state) => {
                state.loading = false;
                state.otpSent = true;
            })
            .addCase(requestAdminOtp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; // action.payload now contains the string message
            })
            .addCase(verifyAdminOtp.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(verifyAdminOtp.fulfilled, (state, action) => {
                state.loading = false;
                state.adminData = action.payload.admin;
                state.token = action.payload.token;
            })
            .addCase(verifyAdminOtp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logoutAdmin, clearAdminError } = adminSlice.actions;
export default adminSlice.reducer;