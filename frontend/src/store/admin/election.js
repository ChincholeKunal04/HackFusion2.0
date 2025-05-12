import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading : false,
    electionList : [],
    error : null
}

const backendURL = import.meta.env.VITE_BACKEND_URI

export const createElection = createAsyncThunk(
    "admin/createElection",
    async (formData, { rejectWithValue }) => {
        try {
            const token = sessionStorage.getItem("token");
            if (!token) {
            throw new Error("Token not found in sessionStorage");
            }
    
            // Convert positions from string to array (if needed)
            const formattedPositions =
            typeof formData.positions === "string"
                ? formData.positions.split("\n").map((pos) => pos.trim()).filter(Boolean)
                : formData.positions;
    
            const payload = {
            title: formData.title,
            date: formData.date,
            startTime: formData.startTime,
            endTime: formData.endTime,
            positions: formattedPositions,
            rules: formData.rules,
            candidates: formData.candidates,
            };
    
            const response = await axios.post(
            `${backendURL}/api/admin/create-election`,
            payload,
            {
                headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                },
                withCredentials: true,
            }
            );
    
            return response.data;
        } catch (error) {
            console.error("Election Creation Error:", error.response?.data || error.message);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const fetchAllElections = createAsyncThunk(
    "election/fetchAllElections",
    async (_, { rejectWithValue }) => {
        try {
            const token = sessionStorage.getItem("token");
            if (!token) throw new Error("No token found");

            const response = await axios.get(`${backendURL}/api/admin/all-elections`, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
            });

            return response.data.elections;
        } catch (error) {
            console.error("Error fetching elections:", error.response?.data || error.message);
            return rejectWithValue(error.response?.data || { message: error.message });
        }
    }
);

const electionSlice = createSlice({
    name : 'electionSlice',
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder
        .addCase(createElection.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(createElection.fulfilled, (state) => {
            state.isLoading = false;
        })
        .addCase(createElection.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload?.message || "Failed to create election";
        })
        .addCase(fetchAllElections.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(fetchAllElections.fulfilled, (state, action) => {
            state.isLoading = false;
            state.electionList = action.payload;
        })
        .addCase(fetchAllElections.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload?.message || "Error fetching elections";
        });
    }
})

export default electionSlice.reducer;