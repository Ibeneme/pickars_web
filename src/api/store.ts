import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./slices/adminSlice";
import dashboardSlice from "./slices/dashboardSlice";
import staffSlice from "./slices/staffSlice";

export const store = configureStore({
    reducer: {
        admin: adminReducer,
        dashboard: dashboardSlice,
        staff: staffSlice
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;