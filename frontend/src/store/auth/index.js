import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isAuthenticated: false,
    isLoading: false,
    user: null,
};

// Student Authentication
export const registerStudent = createAsyncThunk(
    "/auth/registerStudent",
    async (formData) => {
        const response = await axios.post(
            "http://localhost:8000/api/auth/register",
            formData,
            { withCredentials: true }
        );
        return response.data;
    }
);

export const loginStudent = createAsyncThunk(
    "/auth/loginStudent",
    async (formData) => {
        const response = await axios.post(
            "http://localhost:8000/api/auth/login",
            formData,
            { withCredentials: true }
        );
        return response.data;
    }
);

export const logoutStudent = createAsyncThunk(
    "/auth/logoutStudent",
    async () => {
        const response = await axios.post(
            "http://localhost:8000/api/auth/logout",
            {},
            { withCredentials: true }
        );
        return response.data;
    }
);

// Teacher Authentication
export const registerTeacher = createAsyncThunk(
    "/auth/registerTeacher",
    async (formData) => {
        const response = await axios.post(
            "http://localhost:8000/api/auth/teacher-register",
            formData,
            { withCredentials: true }
        );
        return response.data;
    }
);

export const loginTeacher = createAsyncThunk(
    "/auth/loginTeacher",
    async (formData) => {
        const response = await axios.post(
            "http://localhost:8000/api/auth/teacher-login",
            formData,
            { withCredentials: true }
        );
        return response.data;
    }
);

export const logoutTeacher = createAsyncThunk(
    "/auth/logoutTeacher",
    async () => {
        const response = await axios.post(
            "http://localhost:8000/api/auth/teacher-logout",
            {},
            { withCredentials: true }
        );
        return response.data;
    }
);

// Admin Authentication
export const loginAdmin = createAsyncThunk(
    "/auth/loginAdmin",
    async (formData) => {
        const response = await axios.post(
            "http://localhost:8000/api/auth/admin-login",
            formData,
            { withCredentials: true }
        );
        return response.data;
    }
);

export const logoutAdmin = createAsyncThunk(
    "/auth/logoutAdmin",
    async () => {
        const response = await axios.post(
            "http://localhost:8000/api/auth/admin-logout",
            {},
            { withCredentials: true }
        );
        // Directly dispatch the clearUser action here instead
        return response.data;
    }
);

// Role-Specific CheckAuth
export const checkAuth = createAsyncThunk(
    "/auth/checkAuth",
    async (_, { dispatch, getState }) => {
        const { auth } = getState();
        const role = auth.user?.role; // Get the user's role from the state

        let endpoint = "";
        switch (role) {
            case "student":
                endpoint = "http://localhost:8000/api/auth/check-auth-student";
                break;
            case "teacher":
                endpoint = "http://localhost:8000/api/auth/check-auth-teacher";
                break;
            case "admin":
                endpoint = "http://localhost:8000/api/auth/check-auth-admin";
                break;
            default:
                throw new Error("Invalid role");
        }

        try {
            const response = await axios.get(endpoint, {
                withCredentials: true,
                headers: {
                    "cache-control": "no-store, no-cache, must-revalidate, proxy-revalidate",
                    Expires: "0",
                },
            });

            if (!response.data.success) {
                dispatch(clearUser()); // Token invalid, clear user from Redux and sessionStorage
            }

            return response.data;

        } catch (error) {
            dispatch(clearUser()); // Token invalid, clear user from Redux and sessionStorage
            throw error; // Handle error as needed
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        clearUser: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            sessionStorage.removeItem("user");
        }
    },
    extraReducers: (builder) => {
        builder
            // Shared CheckAuth
            .addCase(checkAuth.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.success ? action.payload.user : null;
                state.isAuthenticated = action.payload.success;
            })
            .addCase(checkAuth.rejected, (state) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            })

            // Student Authentication
            .addCase(registerStudent.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.success ? action.payload.user : null;
                state.isAuthenticated = action.payload.success;
            })
            .addCase(loginStudent.fulfilled, (state, action) => {
                console.log("LoginStudent Payload:", action.payload);
            
                state.isLoading = false;
                
                if (action.payload.success && action.payload.user) {
                    state.isAuthenticated = true;
                    state.user = action.payload.user;
                    sessionStorage.setItem("user", JSON.stringify(action.payload.user));
                } else {
                    state.isAuthenticated = false;
                    state.user = null;
                    sessionStorage.removeItem("user");
                }
            })
            .addCase(loginStudent.rejected, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = false;
                state.user = null;
                console.error("Error in login:", action.error);
            })
            .addCase(logoutStudent.fulfilled, (state) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            })

            // Teacher Authentication
            .addCase(registerTeacher.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.success ? action.payload.user : null;
                state.isAuthenticated = action.payload.success;
            })
            .addCase(loginTeacher.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.success ? action.payload.user : null;
                state.isAuthenticated = action.payload.success;
            })
            .addCase(logoutTeacher.fulfilled, (state) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            })

            // Admin Authentication
            .addCase(loginAdmin.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginAdmin.fulfilled, (state, action) => {
                if (!action || !action.payload) {
                    console.error("Invalid action payload:", action);
                    return;
                }

                state.isLoading = false;
                
                if (action.payload.success && action.payload.user) {
                    state.isAuthenticated = true;
                    state.user = action.payload.user;
                    sessionStorage.setItem("user", JSON.stringify(action.payload.user));
                } else {
                    state.isAuthenticated = false;
                    state.user = null;
                    sessionStorage.removeItem("user");
                }
            })
            .addCase(loginAdmin.rejected, (state) => {
                state.isLoading = false;
                state.isAuthenticated = false;
                state.user = null;
                console.error("Error in login:", action.error);
            })
            .addCase(logoutAdmin.fulfilled, (state) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
                sessionStorage.removeItem("user");
            });
    },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
