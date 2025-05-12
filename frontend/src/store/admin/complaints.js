import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading : false,
    complaintList : [],
    error : null
}

const backendURL = import.meta.env.VITE_BACKEND_URI

export const fetchAllComplaints = createAsyncThunk(
    "admin/fetchAllComplaints",
    async (_, { rejectWithValue }) => {
        try {
            const token = sessionStorage.getItem("token");
            if (!token) throw new Error("Token not found");
    
            const response = await axios.get(
            `${backendURL}/api/admin/pending-complaints`,
            {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
            }
            );
            return response.data; // Only return the array
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const approveComplaint = createAsyncThunk(
    "admin/approveComplaint",
    async ({ id, moderationRemark }, { rejectWithValue }) => {
        try {
            const token = sessionStorage.getItem("token");
            if (!token) throw new Error("Token not found");
    
            const response = await axios.put(
                `${backendURL}/api/admin/moderate-complaint/${id}`,
                {
                    status: "approved",
                    moderationRemarks: moderationRemark,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true,
                }
            );
    
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const rejectComplaint = createAsyncThunk(
    "admin/rejectComplaint",
    async ({ id, moderationRemark }, { rejectWithValue }) => {
        try {
            const token = sessionStorage.getItem("token");
            if (!token) throw new Error("Token not found");
    
            const response = await axios.put(
            `${backendURL}/api/admin/reject-complaint/${id}`,
            {
                moderationRemarks: moderationRemark,
            },
            {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
            }
            );
    
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const complaintSlice = createSlice({
    name: "complaintSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchAllComplaints.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(fetchAllComplaints.fulfilled, (state, action) => {
            state.isLoading = false;
            state.complaintList = action.payload?.data; 
        })
        .addCase(fetchAllComplaints.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload?.message || "Error fetching complaints";
        });
    },
});

export default complaintSlice.reducer;