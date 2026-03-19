import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

interface StaffState {
    members: any[];
    loading: boolean;
    sendingPush: boolean;
    error: string | null;
    success: boolean;
}

export const fetchAllStaff = createAsyncThunk("staff/fetchAll", async (_, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get("/all");
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || "Failed to fetch staff");
    }
});

export const sendPushNotification = createAsyncThunk(
    "staff/sendPush",
    async (payload: { userId?: string; title: string; message: string; sendToAll: boolean }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/send", payload);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Push failed");
        }
    }
);

const staffSlice = createSlice({
    name: "staff",
    initialState: { members: [], loading: false, sendingPush: false, error: null, success: false } as StaffState,
    reducers: {
        resetStaffStatus: (state) => { state.error = null; state.success = false; }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllStaff.fulfilled, (state, action) => { state.members = action.payload; })
            .addCase(sendPushNotification.pending, (state) => { state.sendingPush = true; state.success = false; })
            .addCase(sendPushNotification.fulfilled, (state) => { state.sendingPush = false; state.success = true; })
            .addCase(sendPushNotification.rejected, (state, action) => {
                state.sendingPush = false;
                state.error = action.payload as string;
            });
    }
});

export const { resetStaffStatus } = staffSlice.actions;
export default staffSlice.reducer;