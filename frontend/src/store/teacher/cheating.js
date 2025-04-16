import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    cheatingReports: [], 
    isLoading: false,
    error: null,
};

export const reportCheating = createAsyncThunk(
    "teacher/reportCheating",
    async (formData, { rejectWithValue }) => {
        try {
            const token = sessionStorage.getItem("token");
            if (!token) {
                throw new Error("Token not found in sessionStorage");
            }

            const response = await axios.post(
                "http://localhost:8000/api/teacher/report-cheating",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                    withCredentials: true,
                }
            );
            return response.data;
        } catch (error) {
            console.error("Axios Error:", error.response?.data);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const fetchAllCheatingReports = createAsyncThunk(
    "teacher/fetchAllCheatingReports",
    async (_, { rejectWithValue }) => {
        try {
            const token = sessionStorage.getItem("token");
            if (!token) {
                throw new Error("Token not found in sessionStorage");
            }

            const response = await axios.get(
                "http://localhost:8000/api/teacher/cheating-reports",
                {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true,
                }
            );
            return response.data.data; 
        } catch (error) {
            console.error("Axios Error:", error.response?.data);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const cheatingSlice = createSlice({
    name: "cheating",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Handle reportCheating
            .addCase(reportCheating.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(reportCheating.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cheatingReports.push(action.payload); // Add the new report to the list
            })
            .addCase(reportCheating.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload?.message || "Error reporting cheating";
            })

            // Handle fetchAllCheatingReports
            .addCase(fetchAllCheatingReports.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchAllCheatingReports.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cheatingReports = action.payload; // Set the fetched reports
            })
            .addCase(fetchAllCheatingReports.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload?.message || "Error fetching cheating reports";
            });
    },
});

export default cheatingSlice.reducer;