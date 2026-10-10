/**
 * Pickars Courier Limited – Investor Redux Slice (Supports Email & Phone Authentication)
 */

import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { trackInstance } from "../../axiosInstance";

interface InvestorState {
    investor: any | null;
    token: string | null;
    isAuthenticated: boolean;

    // Financial & Operational Data
    rideStats: any | null;
    paidAndEndedRides: any[];
    expenses: any[];
    expenseSummary: { total: number; count: number } | null;
    financialSummary: any | null;

    // UI State
    loading: boolean;
    error: string | null;
    successMessage: string | null;
}

const getStoredInvestor = () => {
    try {
        const item = Cookies.get("investorProfile");
        return item ? JSON.parse(item) : null;
    } catch {
        return null;
    }
};

const initialState: InvestorState = {
    investor: getStoredInvestor(),
    token: Cookies.get("investorToken") || null,
    isAuthenticated: !!Cookies.get("investorToken"),
    rideStats: null,
    paidAndEndedRides: [],
    expenses: [],
    expenseSummary: null,
    financialSummary: null,
    loading: false,
    error: null,
    successMessage: null,
};

// --- ASYNC THUNKS: AUTH & PROFILE ---

export const createAccount = createAsyncThunk(
    "investor/createAccount",
    async (payload: any, { rejectWithValue }) => {
        console.log("🚀 [createAccount] Dispatching request with payload:", payload);
        try {
            const response = await trackInstance.post("/v1/auth/investors/create-account", payload);
            console.log("✅ [createAccount] Success response:", response.data);
            return response.data;
        } catch (error) {
            console.error("❌ [createAccount] Error encountered:", error);
            if (axios.isAxiosError(error)) return rejectWithValue(error.response?.data.message);
            return rejectWithValue("Failed to create account");
        }
    }
);

export const loginInvestor = createAsyncThunk(
    "investor/login",
    async (payload: { identifier: string }, { rejectWithValue }) => {
        console.log("🚀 [loginInvestor] Dispatching request with payload:", payload);
        try {
            const response = await trackInstance.post("/v1/auth/investors/login", payload);
            console.log("✅ [loginInvestor] Success response:", response.data);
            return response.data;
        } catch (error) {
            console.error("❌ [loginInvestor] Error encountered:", error);
            if (axios.isAxiosError(error)) return rejectWithValue(error.response?.data.message);
            return rejectWithValue("Failed to send login OTP");
        }
    }
);

export const verifyOtp = createAsyncThunk(
    "investor/verifyOtp",
    async (payload: { identifier: string; otp: string }, { rejectWithValue }) => {
        console.log("🚀 [verifyOtp] Dispatching request with payload:", payload);
        try {
            const response = await trackInstance.post("/v1/auth/investors/verify-otp", payload);
            console.log("✅ [verifyOtp] Success response:", response.data);
            if (response.data.token) {
                Cookies.set("investorToken", response.data.token, { expires: 7 });
                console.log("🍪 [verifyOtp] investorToken saved to cookies successfully.");
            }
            if (response.data.investor) {
                Cookies.set("investorProfile", JSON.stringify(response.data.investor), { expires: 7 });
                console.log("🍪 [verifyOtp] investorProfile saved to cookies successfully.");
            }
            return response.data;
        } catch (error) {
            console.error("❌ [verifyOtp] Error encountered:", error);
            if (axios.isAxiosError(error)) return rejectWithValue(error.response?.data.message);
            return rejectWithValue("OTP verification failed");
        }
    }
);

export const resendOtp = createAsyncThunk(
    "investor/resendOtp",
    async (payload: { identifier: string }, { rejectWithValue }) => {
        console.log("🚀 [resendOtp] Dispatching request with payload:", payload);
        try {
            const response = await trackInstance.post("/v1/auth/investors/resend-otp", payload);
            console.log("✅ [resendOtp] Success response:", response.data);
            return response.data;
        } catch (error) {
            console.error("❌ [resendOtp] Error encountered:", error);
            if (axios.isAxiosError(error)) return rejectWithValue(error.response?.data.message);
            return rejectWithValue("Failed to resend OTP");
        }
    }
);

export const fetchInvestorProfile = createAsyncThunk(
    "investor/fetchProfile",
    async (identifier: string, { rejectWithValue }) => {
        console.log("🚀 [fetchInvestorProfile] Fetching profile for identifier:", identifier);
        try {
            const response = await trackInstance.get(`/v1/auth/investors/profile/${identifier}`);
            console.log("✅ [fetchInvestorProfile] Success response:", response.data);
            if (response.data.investor) {
                Cookies.set("investorProfile", JSON.stringify(response.data.investor), { expires: 7 });
            }
            return response.data.investor;
        } catch (error) {
            console.error("❌ [fetchInvestorProfile] Error encountered:", error);
            if (axios.isAxiosError(error)) return rejectWithValue(error.response?.data.message);
            return rejectWithValue("Failed to fetch profile");
        }
    }
);

// --- ASYNC THUNKS: FINANCIALS & OPERATIONS ---

export const fetchRideStats = createAsyncThunk(
    "investor/fetchRideStats",
    async (_, { rejectWithValue }) => {
        console.log("🚀 [fetchRideStats] Fetching ride statistics...");
        try {
            const response = await trackInstance.get("/v1/auth/investors/ride-stats");
            console.log("✅ [fetchRideStats] Success response:", response.data);
            return response.data.data;
        } catch (error) {
            console.error("❌ [fetchRideStats] Error encountered:", error);
            if (axios.isAxiosError(error)) return rejectWithValue(error.response?.data.message);
            return rejectWithValue("Failed to fetch ride stats");
        }
    }
);

export const fetchPaidAndEndedRides = createAsyncThunk(
    "investor/fetchPaidAndEndedRides",
    async (_, { rejectWithValue }) => {
        console.log("🚀 [fetchPaidAndEndedRides] Fetching paid and ended rides history...");
        try {
            const response = await trackInstance.get("/v1/auth/investors/get-paid-end-ended-rides-stats");
            console.log("✅ [fetchPaidAndEndedRides] Success response:", response.data);
            return response.data.data;
        } catch (error) {
            console.error("❌ [fetchPaidAndEndedRides] Error encountered:", error);
            if (axios.isAxiosError(error)) return rejectWithValue(error.response?.data.message);
            return rejectWithValue("Failed to fetch paid rides history");
        }
    }
);

export const fetchCompanyExpenses = createAsyncThunk(
    "investor/fetchExpenses",
    async (params: { year: string | number; month?: string | number }, { rejectWithValue }) => {
        console.log("🚀 [fetchCompanyExpenses] Fetching expenses with params:", params);
        try {
            const response = await trackInstance.get("/v1/auth/investors/expenses", { params });
            console.log("✅ [fetchCompanyExpenses] Success response:", response.data);
            return response.data;
        } catch (error) {
            console.error("❌ [fetchCompanyExpenses] Error encountered:", error);
            if (axios.isAxiosError(error)) return rejectWithValue(error.response?.data.message);
            return rejectWithValue("Failed to fetch company expenses");
        }
    }
);

export const addCompanyExpense = createAsyncThunk(
    "investor/addExpense",
    async (payload: any, { rejectWithValue }) => {
        console.log("🚀 [addCompanyExpense] Adding expense with payload:", payload);
        try {
            const response = await trackInstance.post("/v1/auth/investors/expenses", payload);
            console.log("✅ [addCompanyExpense] Success response:", response.data);
            return response.data.data;
        } catch (error) {
            console.error("❌ [addCompanyExpense] Error encountered:", error);
            if (axios.isAxiosError(error)) return rejectWithValue(error.response?.data.message);
            return rejectWithValue("Failed to add expense");
        }
    }
);

export const updateCompanyExpense = createAsyncThunk(
    "investor/updateExpense",
    async (payload: any, { rejectWithValue }) => {
        console.log("🚀 [updateCompanyExpense] Updating expense with payload:", payload);
        try {
            const response = await trackInstance.put("/v1/auth/investors/expenses", payload);
            console.log("✅ [updateCompanyExpense] Success response:", response.data);
            return response.data.data;
        } catch (error) {
            console.error("❌ [updateCompanyExpense] Error encountered:", error);
            if (axios.isAxiosError(error)) return rejectWithValue(error.response?.data.message);
            return rejectWithValue("Failed to update expense");
        }
    }
);

export const deleteCompanyExpense = createAsyncThunk(
    "investor/deleteExpense",
    async (expenseId: string, { rejectWithValue }) => {
        console.log("🚀 [deleteCompanyExpense] Deleting expense ID:", expenseId);
        try {
            const response = await trackInstance.delete("/v1/auth/investors/expenses", { data: { expenseId } });
            console.log("✅ [deleteCompanyExpense] Success response:", response.data);
            return response.data.data;
        } catch (error) {
            console.error("❌ [deleteCompanyExpense] Error encountered:", error);
            if (axios.isAxiosError(error)) return rejectWithValue(error.response?.data.message);
            return rejectWithValue("Failed to delete expense");
        }
    }
);

export const addOtherEarning = createAsyncThunk(
    "investor/addEarning",
    async (payload: any, { rejectWithValue }) => {
        console.log("🚀 [addOtherEarning] Adding earning with payload:", payload);
        try {
            const response = await trackInstance.post("/v1/auth/investors/earnings", payload);
            console.log("✅ [addOtherEarning] Success response:", response.data);
            return response.data.data;
        } catch (error) {
            console.error("❌ [addOtherEarning] Error encountered:", error);
            if (axios.isAxiosError(error)) return rejectWithValue(error.response?.data.message);
            return rejectWithValue("Failed to add earning");
        }
    }
);

export const fetchFinancialSummary = createAsyncThunk(
    "investor/fetchFinancialSummary",
    async (payload: { year: number | string; month: number | string; investorId: string }, { rejectWithValue }) => {
        console.log("🚀 [fetchFinancialSummary] Fetching financial summary with payload:", payload);
        try {
            const response = await trackInstance.post("/v1/auth/investors/financial/financial-summary", payload);
            console.log("✅ [fetchFinancialSummary] Success response:", response.data);
            return response.data.data;
        } catch (error) {
            console.error("❌ [fetchFinancialSummary] Error encountered:", error);
            if (axios.isAxiosError(error)) return rejectWithValue(error.response?.data.message);
            return rejectWithValue("Failed to fetch financial summary");
        }
    }
);

// --- THE SLICE ---

const investorSlice = createSlice({
    name: "investor",
    initialState,
    reducers: {
        clearInvestorError: (state) => {
            state.error = null;
        },
        clearInvestorSuccess: (state) => {
            state.successMessage = null;
        },
        logoutInvestor: (state) => {
            console.log("🚪 [logoutInvestor] Logging out investor and clearing cookies.");
            state.investor = null;
            state.token = null;
            state.isAuthenticated = false;
            Cookies.remove("investorToken");
            Cookies.remove("investorProfile");
        },
    },
    extraReducers: (builder) => {
        builder
            // Create Account
            .addCase(createAccount.fulfilled, (state, action) => {
                state.loading = false;
                state.successMessage = action.payload.message;
            })
            // Login
            .addCase(loginInvestor.fulfilled, (state, action) => {
                state.loading = false;
                state.successMessage = action.payload.message;
            })
            // Verify OTP
            .addCase(verifyOtp.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.token = action.payload.token;
                state.investor = action.payload.investor;
                state.successMessage = action.payload.message;
            })
            // Resend OTP
            .addCase(resendOtp.fulfilled, (state, action) => {
                state.loading = false;
                state.successMessage = action.payload.message;
            })
            // Get Profile
            .addCase(fetchInvestorProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.investor = action.payload;
            })
            // Ride Stats
            .addCase(fetchRideStats.fulfilled, (state, action) => {
                state.loading = false;
                state.rideStats = action.payload;
            })
            // Paid & Ended Rides
            .addCase(fetchPaidAndEndedRides.fulfilled, (state, action) => {
                state.loading = false;
                state.paidAndEndedRides = action.payload;
            })
            // Expenses
            .addCase(fetchCompanyExpenses.fulfilled, (state, action) => {
                state.loading = false;
                state.expenses = action.payload.data;
                state.expenseSummary = action.payload.summary;
            })
            // Financial Summary
            .addCase(fetchFinancialSummary.fulfilled, (state, action) => {
                state.loading = false;
                state.financialSummary = action.payload;
            })

            // Global Pending Matcher
            .addMatcher(
                (action) => action.type.endsWith("/pending"),
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )
            // Global Rejected Matcher
            .addMatcher(
                (action) => action.type.endsWith("/rejected"),
                (state, action: PayloadAction<any>) => {
                    state.loading = false;
                    state.error = action.payload || "An unexpected error occurred";
                    console.warn("⚠️ [Global Rejected Matcher] Caught rejection:", action.payload);
                }
            );
    },
});

export const { clearInvestorError, clearInvestorSuccess, logoutInvestor } = investorSlice.actions;
export default investorSlice.reducer;