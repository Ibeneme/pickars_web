import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/api/axiosInstance";
import axios from "axios";
import Cookies from "js-cookie";

// Cookie name
const TOKEN_KEY = "adminToken";

// Helper: set cookie securely
const setTokenCookie = (token: string) => {
    Cookies.set(TOKEN_KEY, token, {
        expires: 1, // 1 day
        secure: process.env.NODE_ENV === "production", // only https in production
        sameSite: "strict",
    });
};

// Helper: remove cookie
const removeTokenCookie = () => {
    Cookies.remove(TOKEN_KEY);
};

// 1️⃣ Request OTP
export const requestAdminOtp = createAsyncThunk(
    "admin/requestOtp",
    async (email: string, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/login", { email });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return rejectWithValue(
                    error.response.data.message || "Failed to send OTP"
                );
            }
            return rejectWithValue("An unexpected error occurred");
        }
    }
);

// 2️⃣ Verify OTP & Login
export const verifyAdminOtp = createAsyncThunk(
    "admin/verifyOtp",
    async (
        { email, otp }: { email: string; otp: string },
        { rejectWithValue }
    ) => {
        try {
            const response = await axiosInstance.post("/verify-otp", { email, otp });

            if (response.data.token) {
                setTokenCookie(response.data.token); // ← store in cookie
            }

            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return rejectWithValue(
                    error.response.data.message || "Invalid OTP"
                );
            }
            return rejectWithValue("Verification failed");
        }
    }
);

interface AdminState {
    adminData: any;
    token: string | null;
    loading: boolean;
    error: string | null;
    otpSent: boolean;
}

const initialState: AdminState = {
    adminData: null,
    token: Cookies.get(TOKEN_KEY) || null, // ← read from cookie
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
            state.error = null;
            removeTokenCookie(); // ← clear cookie
        },
        clearAdminError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Request OTP
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
                state.error = action.payload as string;
            })

            // Verify OTP
            .addCase(verifyAdminOtp.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(verifyAdminOtp.fulfilled, (state, action) => {
                state.loading = false;
                state.adminData = action.payload.admin;
                state.token = action.payload.token;
                state.otpSent = false;
            })
            .addCase(verifyAdminOtp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { logoutAdmin, clearAdminError } = adminSlice.actions;
export default adminSlice.reducer;