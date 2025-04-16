import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    reports: [],
    isLoading: false,
    error: null,
}; 

export const fetchAllHealthReports = createAsyncThunk(
    "health/fetchAllHealthReports",
    async (_, { rejectWithValue }) => {
        try {
            const token = sessionStorage.getItem("token");
            // console.log("Token from sessionStorage:", token);
            if (!token) {
                throw new Error("Token not found in sessionStorage");
            }

            const response = await axios.get("http://localhost:8000/api/doctor/health-reports", {
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

export const approveHealthReport = createAsyncThunk(
    "health/approveHealthReport",
    async (reportId, { rejectWithValue }) => {
        try {
            const token = sessionStorage.getItem("token"); 
            if (!token) {
                throw new Error("Token not found in sessionStorage");
            }
            const response = await axios.put(
                `http://localhost:8000/api/doctor/approve-health/${reportId}`,
                {},
                {
                    headers: { Authorization: `Bearer ${token}` }, 
                    withCredentials: true,
                }
            );
            return { reportId, message: response.data.message };
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const rejectHealthReport = createAsyncThunk(
    "health/rejectHealthReport",
    async (reportId, { rejectWithValue }) => {
        try {
            const token = sessionStorage.getItem("token"); 
            if (!token) {
                throw new Error("Token not found in sessionStorage");
            }

            const response = await axios.put(
                `http://localhost:8000/api/doctor/health-report/reject/${reportId}`,
                {},
                {
                    headers: { Authorization: `Bearer ${token}` }, 
                    withCredentials: true,
                }
            );
            return { reportId, message: response.data.message };
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const healthReportSlice = createSlice({
    name: "healthReports",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // 🔹 Fetch All Reports
            .addCase(fetchAllHealthReports.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchAllHealthReports.fulfilled, (state, action) => {
                state.isLoading = false;
                state.reports = action.payload; // Update this line
            })
            .addCase(fetchAllHealthReports.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload?.message || "Error fetching reports";
            })

            // 🔹 Approve Report
            .addCase(approveHealthReport.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(approveHealthReport.fulfilled, (state, action) => {
                state.isLoading = false;
                state.reports = state.reports.map((report) => // Update this line
                    report._id === action.payload.reportId
                        ? { ...report, status: "approved" }
                        : report
                );
            })
            .addCase(approveHealthReport.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload?.message || "Error approving report";
            })

            // 🔹 Reject Report
            .addCase(rejectHealthReport.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(rejectHealthReport.fulfilled, (state, action) => {
                state.isLoading = false;
                state.reports = state.reports.map((report) => // Update this line
                    report._id === action.payload.reportId
                        ? { ...report, status: "rejected" }
                        : report
                );
            })
            .addCase(rejectHealthReport.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload?.message || "Error rejecting report";
            });
    },
});

export default healthReportSlice.reducer;