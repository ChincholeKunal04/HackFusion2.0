import {  Routes, Route, Router } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { checkAuth, setUser } from "./store/auth/index";
import CheckAuth from "./components/comman/CheckAuth";
import AuthLayout from "./components/auth/Layout";
import AuthLogin from "./pages/auth/Login";
import AuthRegister from "./pages/auth/Register";
import AdminLayout from "./components/admin/Layout";
import TeacherLayout from "./components/teacher/Layout";
import StudentLayout from "./components/student/Layout";
import DoctorLayout from "./components/Doctor/Layout";
import AdminDashboard from "./pages/admin/Dashboard";
import TeacherDashboard from "./pages/teacher/Dashboard";
import StudentDashboard from "./pages/student/DashBoard";
import DoctorDashboard from "./pages/doctor/Dashboard";
import NotFound from "./pages/unauth/Index";
import { useEffect } from "react";

function App() {
    const { isAuthenticated, user, isLoading } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        const storedUser = sessionStorage.getItem("user");
        if (storedUser && !isAuthenticated) {
            dispatch(setUser(JSON.parse(storedUser))); // Restore user state
        } else if (!storedUser && !isAuthenticated) {
            dispatch(checkAuth()); // Verify token if no user is in sessionStorage
        }
    }, [isAuthenticated, dispatch]);

    console.log("isAuthenticated:", isAuthenticated);
    console.log("user:", user ? user : "No user");

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        // <Router>
            <Routes>
                {/* Public Routes */}
                <Route
                    path="/auth"
                    element={
                        <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                            <AuthLayout />
                         </CheckAuth> 
                    }
                >
                    <Route path="login" element={<AuthLogin />} />
                    <Route path="register" element={<AuthRegister />} />
                </Route>

                {/* Protected Routes */}
                <Route
                    path="/admin/*"
                    element={
                        <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                            <AdminLayout />
                        </CheckAuth>
                    }
                >
                    <Route path="dashboard" element={<AdminDashboard />} />
                </Route>

                <Route
                    path="/teacher/*"
                    element={
                        <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                            <TeacherLayout />
                        </CheckAuth>
                    }
                >
                    <Route path="dashboard" element={<TeacherDashboard />} />
                </Route>

                <Route
                    path="/student/*"
                    element={
                        <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                            <StudentLayout />
                        </CheckAuth>
                    }
                >
                    <Route path="dashboard" element={<StudentDashboard />} />
                </Route>

                <Route
                    path="/doctor/*"
                    element={
                        <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                            <DoctorLayout />
                        </CheckAuth>
                    }
                >
                    <Route path="dashboard" element={<DoctorDashboard />} />
                </Route>

                {/* Fallback Route */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        // {/* </Router> */}
    );
}

export default App;
