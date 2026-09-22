import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { trackInstance } from "../axiosInstance";

// 1. Thunk for Deleting Account
export const deleteAccount = createAsyncThunk(
    "auth/deleteAccount",
    async (phoneNumber: string, { rejectWithValue }) => {
        try {
            console.log("--> Deleting account for phone number:", phoneNumber);

            // Matches router.delete("/delete-account") mounted under /api/auth
            const response = await trackInstance.delete("/auth/delete-account", {
                data: { phoneNumber }
            });

            console.log("--> Delete account response received:", response.data);
            return response.data;
        } catch (error) {
            console.error("--> Delete account error caught:", error);
            if (axios.isAxiosError(error) && error.response) {
                return rejectWithValue(
                    error.response.data?.message || "Failed to delete account"
                );
            }
            return rejectWithValue("An unexpected error occurred while deleting account");
        }
    }
);

// 2. State Interface
interface AuthState {
    isDeleting: boolean;
    deleteSuccess: boolean;
    deleteError: string | null;
}

const initialState: AuthState = {
    isDeleting: false,
    deleteSuccess: false,
    deleteError: null,
};

// 3. Slice Definition
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        resetAuthState: (state) => {
            console.log("--> Resetting auth delete state");
            state.isDeleting = false;
            state.deleteSuccess = false;
            state.deleteError = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(deleteAccount.pending, (state) => {
                console.log("--> deleteAccount.pending: Deletion process started...");
                state.isDeleting = true;
                state.deleteSuccess = false;
                state.deleteError = null;
            })
            .addCase(deleteAccount.fulfilled, (state, action) => {
                console.log("--> deleteAccount.fulfilled: Successfully deleted account!", action.payload);
                state.isDeleting = false;
                state.deleteSuccess = true;
                state.deleteError = null;
            })
            .addCase(deleteAccount.rejected, (state, action) => {
                console.log("--> deleteAccount.rejected: Account deletion failed.", action.payload);
                state.isDeleting = false;
                state.deleteSuccess = false;
                state.deleteError = action.payload as string;
            });
    }
});

export const { resetAuthState } = authSlice.actions;
export default authSlice.reducer;