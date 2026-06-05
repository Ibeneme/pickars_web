import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "../axiosInstance";

// --- EXISTING THUNKS ---

export const createManualRide = createAsyncThunk("ride/createManualRide", async (rideData: any, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post("/manual-ride-tracking/create", rideData);
        return response.data.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) return rejectWithValue(error.response.data.message);
        return rejectWithValue("Failed to create ride");
    }
});

export const getAllManualRides = createAsyncThunk("ride/getAllManualRides", async (_, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get("/manual-ride-tracking/get-all");
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) return rejectWithValue(error.response.data.message);
        return rejectWithValue("Failed to fetch rides");
    }
});

export const getManualRide = createAsyncThunk("ride/getManualRide", async (trackingId: string, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`/manual-ride-tracking/${trackingId}`);
        return response.data.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) return rejectWithValue(error.response.data.message);
        return rejectWithValue("Failed to fetch ride");
    }
});

export const updateRideStatus = createAsyncThunk(
    "ride/updateRideStatus",
    async ({ id, action, riderId }: { id: string, action: string, riderId?: string }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.patch(`/manual-ride-tracking/update-status/${id}`, { action, riderId });
            return response.data.data; // Returns updated ride object
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) return rejectWithValue(error.response.data.message);
            return rejectWithValue("Failed to update ride status");
        }
    }
);


// --- MISSING THUNKS ADDED BELOW ---

export const getRidesByCustomerPhone = createAsyncThunk("ride/getRidesByPhone", async (phoneNumber: string, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`/manual-ride-tracking/user/rides/${phoneNumber}`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) return rejectWithValue(error.response.data.message);
        return rejectWithValue("Failed to fetch customer rides");
    }
});

export const deleteRideRequest = createAsyncThunk("ride/deleteRide", async (id: string, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.delete(`/manual-ride-tracking/delete/${id}`);
        return { id, message: response.data.message };
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) return rejectWithValue(error.response.data.message);
        return rejectWithValue("Failed to delete ride");
    }
});

export const deleteUserByPhoneNumber = createAsyncThunk("ride/deleteUser", async (phoneNumber: string, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.delete(`/manual-ride-tracking/user/${phoneNumber}`);
        return { phoneNumber, message: response.data.message };
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) return rejectWithValue(error.response.data.message);
        return rejectWithValue("Failed to delete user");
    }
});

// --- SLICE ---

interface ManualRideState {
    currentRide: any | null;
    allRides: any[];
    rideCount: number;
    loading: boolean;
    error: string | null;
}

const initialState: ManualRideState = {
    currentRide: null,
    allRides: [],
    rideCount: 0,
    loading: false,
    error: null,
};

const manualRideSlice = createSlice({
    name: "manualRide",
    initialState,
    reducers: {
        clearRideState: (state) => {
            state.currentRide = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Create
            .addCase(createManualRide.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(createManualRide.fulfilled, (state, action) => { state.loading = false; state.currentRide = action.payload; })
            .addCase(createManualRide.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; })


            // ... inside extraReducers builder ...
            .addCase(updateRideStatus.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateRideStatus.fulfilled, (state, action) => {
                state.loading = false;
                state.currentRide = action.payload; // Updates the ride with new status/data

                // Also update the ride in allRides if it exists there
                const index = state.allRides.findIndex(ride => ride._id === action.payload._id);
                if (index !== -1) {
                    state.allRides[index] = action.payload;
                }
            })
            .addCase(updateRideStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Get All
            .addCase(getAllManualRides.fulfilled, (state, action) => { state.allRides = action.payload.data; state.rideCount = action.payload.count; })

            // Get By ID / Phone
            .addCase(getManualRide.fulfilled, (state, action) => { state.currentRide = action.payload; })
            .addCase(getRidesByCustomerPhone.fulfilled, (state, action) => { state.allRides = action.payload.data; state.rideCount = action.payload.count; })

            // Delete Ride
            .addCase(deleteRideRequest.fulfilled, (state, action) => {
                state.allRides = state.allRides.filter(ride => ride._id !== action.payload.id);
                state.rideCount -= 1;
            })

            // Delete User
            .addCase(deleteUserByPhoneNumber.pending, (state) => { state.loading = true; })
            .addCase(deleteUserByPhoneNumber.fulfilled, (state) => { state.loading = false; })
            .addCase(deleteUserByPhoneNumber.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; });
    },
});

export const { clearRideState } = manualRideSlice.actions;
export default manualRideSlice.reducer;