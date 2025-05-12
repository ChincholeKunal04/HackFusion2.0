import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const backendURL = import.meta.env.VITE_BACKEND_URI

const initialState = {
    isLoading : false,
    applicationList : [],
    applicationDetails : {},
    error : null
}

export const fetchAllPendingApplication = createAsyncThunk(
    "admin/fetchAllPendingApplication",
    async (_, { rejectWithValue }) => {
        try {
            const token = sessionStorage.getItem("token");
            if (!token) throw new Error("Token not found");
    
            const response = await axios.get(
            `${backendURL}/api/admin/applications`,
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

export const fetchSpecificApplication = createAsyncThunk(
    "admin/fetchSpecificApplication",
    async (id, { rejectWithValue }) => {
        try {
            const token = sessionStorage.getItem("token");
            if (!token) throw new Error("Token not found");
    
            const response = await axios.get(
            `${backendURL}/api/admin/application/${id}`,
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

export const reviewApplication = createAsyncThunk(
    "admin/reviewApplication",
    async ({ id, status, remark, adminId }, { rejectWithValue }) => {
        try {
            const token = sessionStorage.getItem("token");
            if (!token) throw new Error("Token not found");
    
            const response = await axios.put(
            `${backendURL}/api/admin/application/${id}`,
            {
                status,
                adminRemark: remark,
                adminId : adminId
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
  

const applicationSlice = createSlice({
    name: "applicationSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchAllPendingApplication.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(fetchAllPendingApplication.fulfilled, (state, action) => {
            state.isLoading = false;
            state.applicationList = action.payload?.data; 
        })
        .addCase(fetchAllPendingApplication.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload?.message || "Error fetching complaints";
        })
        .addCase(fetchSpecificApplication.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(fetchSpecificApplication.fulfilled, (state, action) => {
            state.isLoading = false;
            state.applicationDetails = action.payload?.data; 
        })
        .addCase(fetchSpecificApplication.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload?.message || "Error fetching complaints";
        });
    },
});

export default applicationSlice.reducer;