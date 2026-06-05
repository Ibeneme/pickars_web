import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { trackInstance } from "../../api/axiosInstance";
import axios from "axios";

// Thunk for initializing payment
export const initializePayment = createAsyncThunk(
    "payment/initialize",
    async (paymentData: { email: string; amount: number; callback_url: string }, { rejectWithValue }) => {
        try {
            const response = await trackInstance.post("/payment/create-paystack-payment", paymentData);
            return response.data; // { checkout_url, reference }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) return rejectWithValue(error.response.data.error);
            return rejectWithValue("Failed to initialize payment");
        }
    }
);

// Thunk for verifying payment
export const verifyPayment = createAsyncThunk(
    "payment/verify",
    async ({ orderID, reference }: { orderID: string; reference: string }, { rejectWithValue }) => {
        try {
            const response = await trackInstance.get(`/payment/verify-payment/${orderID}?reference=${reference}`);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) return rejectWithValue(error.response.data.error);
            return rejectWithValue("Payment verification failed");
        }
    }
);

interface PaymentState {
    checkoutUrl: string | null;
    reference: string | null;
    isVerifying: boolean;
    isPaid: boolean;
    error: string | null;
}

const initialState: PaymentState = {
    checkoutUrl: null,
    reference: null,
    isVerifying: false,
    isPaid: false,
    error: null,
};

const paymentSlice = createSlice({
    name: "payment",
    initialState,
    reducers: {
        resetPaymentState: (state) => {
            state.checkoutUrl = null;
            state.reference = null;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Initialize
            .addCase(initializePayment.fulfilled, (state, action) => {
                state.checkoutUrl = action.payload.checkout_url;
                state.reference = action.payload.reference;
            })
            // Verify
            .addCase(verifyPayment.pending, (state) => { state.isVerifying = true; })
            .addCase(verifyPayment.fulfilled, (state) => {
                state.isVerifying = false;
                state.isPaid = true;
            })
            .addCase(verifyPayment.rejected, (state, action) => {
                state.isVerifying = false;
                state.error = action.payload as string;
            });
    }
});

export const { resetPaymentState } = paymentSlice.actions;
export default paymentSlice.reducer;