import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading : false,
    studentList : [],
    teacherList : [],
    error : null
}

const backendURL = import.meta.env.VITE_BACKEND_URI

export const fetchAllUnverifyStudents = createAsyncThunk(
    "admin/fetchAllUnverifyStudents",
    async (_, { rejectWithValue }) => {
        try {
            const token = sessionStorage.getItem("token");
            if (!token) {
                throw new Error("Token not found in sessionStorage");
            }

            const response = await axios.get(
                `${backendURL}/api/admin/unverified-students`,
                {
                    headers: { Authorization: `Bearer ${token}` },
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

export const fetchAllUnverifyTeacher = createAsyncThunk(
    "admin/fetchAllUnverifyTeacher",
    async (_, { rejectWithValue }) => {
        try {
            const token = sessionStorage.getItem("token");
            if (!token) {
                throw new Error("Token not found in sessionStorage");
            }

            const response = await axios.get(
                `${backendURL}/api/admin/unverified-teachers`,
                {
                    headers: { Authorization: `Bearer ${token}` },
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

export const verifyStudent = createAsyncThunk(
    "admin/verifyStudent",
    async (id, { rejectWithValue }) => {
        try {
            const token = sessionStorage.getItem("token"); 
            if (!token) {
                throw new Error("Token not found in sessionStorage");
            }
            const response = await axios.put(
                `${backendURL}/api/admin/verify-student/${id}`,
                {},
                {
                    headers: { Authorization: `Bearer ${token}` }, 
                    withCredentials: true,
                }
            );
            return { message: response.data.message };
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const verifyTeacher = createAsyncThunk(
    "admin/verifyTeacher",
    async (id, { rejectWithValue }) => {
        try {
            const token = sessionStorage.getItem("token"); 
            if (!token) {
                throw new Error("Token not found in sessionStorage");
            }
            const response = await axios.put(
                `${backendURL}/api/admin/verify-teacher/${id}`,
                {},
                {
                    headers: { Authorization: `Bearer ${token}` }, 
                    withCredentials: true,
                }
            );
            return { message: response.data.message };
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const verifySlice = createSlice({
    name : 'verifyUser',
    initialState,
    reducer : {},
    extraReducers : (builder) => {
        builder
        .addCase(fetchAllUnverifyStudents.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(fetchAllUnverifyStudents.fulfilled, (state,action) => {
            state.isLoading = false;
            state.studentList = action.payload.students;
        })
        .addCase(fetchAllUnverifyStudents.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload?.message || "Error fetching student"
        })
        .addCase(fetchAllUnverifyTeacher.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(fetchAllUnverifyTeacher.fulfilled, (state,action) => {
            state.isLoading = false;
            state.teacherList = action.payload.teachers;
        })
        .addCase(fetchAllUnverifyTeacher.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload?.message || "Error fetching student"
        })
        .addCase(verifyStudent.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(verifyStudent.fulfilled, (state) => {
            state.isLoading = false;
        })
        .addCase(verifyTeacher.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(verifyTeacher.fulfilled, (state) => {
            state.isLoading = false;
        })
    }
})

export default verifySlice.reducer;