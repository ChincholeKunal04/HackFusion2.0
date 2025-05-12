import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    complaints: [], // For storing complaints
    isLoading: false,
    error: null,
};

const backendURL = import.meta.env.VITE_BACKEND_URI

export const fetchAllComplaints = createAsyncThunk(
    "teacher/fetchAllComplaints",
    async (_, { rejectWithValue }) => {
        try {
            const token = sessionStorage.getItem("token");
            if (!token) {
                throw new Error("Token not found in sessionStorage");
            }

            const response = await axios.get(`${backendURL}/api/teacher/complaints`, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
            });
            return response.data.data; // Assuming the response contains a `data` field
        } catch (error) {
            console.error("Axios Error:", error.response?.data);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const revealIdentityVote = createAsyncThunk(
    "teacher/revealIdentityVote",
    async (complaintId, { rejectWithValue }) => {
        try {
            const token = sessionStorage.getItem("token");
            if (!token) {
                throw new Error("Token not found in sessionStorage");
            }

            const response = await axios.put(
                `${backendURL}/api/teacher/reveal-identity/${complaintId}`,
                {},
                {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true,
                }
            );
            return { complaintId, message: response.data.message };
        } catch (error) {
            console.error("Axios Error:", error.response?.data);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const complaintSlice = createSlice({
    name: "complaints",
    initialState,
    reducers: {}, 
    extraReducers: (builder) => {
        builder

            .addCase(fetchAllComplaints.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchAllComplaints.fulfilled, (state, action) => {
                state.loading = false;
                // Normalize the student field
                state.complaints = action.payload.map((complaint) => ({
                    ...complaint,
                    student: {
                        name: complaint.isAnonymous ? "Anonymous" : complaint.student.name,
                        registrationNumber: complaint.isAnonymous ? "N/A" : complaint.student.registrationNumber,
                    },
                }));
            })
            .addCase(fetchAllComplaints.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload?.message || "Error fetching complaints";
            })

            .addCase(revealIdentityVote.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(revealIdentityVote.fulfilled, (state, action) => {
                state.isLoading = false;
                state.complaints = state.complaints.map((complaint) =>
                    complaint._id === action.payload.complaintId
                        ? { ...complaint, isIdentityRevealed: true }
                        : complaint
                );
            })
            .addCase(revealIdentityVote.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload?.message || "Error revealing identity";
            });
    },
});

export default complaintSlice.reducer;