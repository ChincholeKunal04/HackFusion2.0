import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    leaveReports: [],
    approvedHealthReports: [], 
    isLoading: false,
    error: null,
};

export const fetchAllLeaveReports = createAsyncThunk(
    "teacher/fetchAllLeaveReports",
    async (_, { rejectWithValue }) => {
        try {
            const token = sessionStorage.getItem("token");
            if (!token) {
                throw new Error("Token not found in sessionStorage");
            }

            const response = await axios.get("http://localhost:8000/api/teacher/leave-reports", {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
            });
            return response.data.data; 
        } catch (error) {
            console.error("Axios Error:", error.response?.data);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const fetchAllApprovedHealthReports = createAsyncThunk(
    "teacher/fetchAllApprovedHealthReports",
    async (_, { rejectWithValue }) => {
        try {
            const token = sessionStorage.getItem("token");
            if (!token) {
                throw new Error("Token not found in sessionStorage");
            }

            const response = await axios.get("http://localhost:8000/api/teacher/approved-health-reports", {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
            });
            return response.data.data; 
        } catch (error) {
            console.error("Axios Error:", error.response?.data);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const teacherReportSlice = createSlice({
    name: "teacherReports",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            
            .addCase(fetchAllLeaveReports.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchAllLeaveReports.fulfilled, (state, action) => {
                state.isLoading = false;
                state.leaveReports = action.payload; 
            })
            .addCase(fetchAllLeaveReports.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload?.message || "Error fetching leave reports";
            })

            
            .addCase(fetchAllApprovedHealthReports.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchAllApprovedHealthReports.fulfilled, (state, action) => {
                state.isLoading = false;
                state.approvedHealthReports = action.payload; 
            })
            .addCase(fetchAllApprovedHealthReports.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload?.message || "Error fetching approved health reports";
            });
    },
});

export default teacherReportSlice.reducer;