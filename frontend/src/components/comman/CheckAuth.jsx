import { Navigate, useLocation } from "react-router-dom";

const CheckAuth = ({ isAuthenticated, user, children }) => {
    const location = useLocation();
    // console.log(location)

    // Redirect unauthenticated users to login if they try to access protected routes
    if (!isAuthenticated && !location.pathname.includes('/auth')) {
        return <Navigate to="/auth/login" />;
    }

    // Redirect authenticated users to their dashboard if they try to access login/register
    if (isAuthenticated && location.pathname.includes('/auth')) {
        switch (user?.role) {
            case 'admin':
                return <Navigate to="/admin/dashboard" />;
            case 'teacher':
                return <Navigate to="/teacher/dashboard" />;
            case 'student':
                return <Navigate to="/student/dashboard" />;
            case 'doctor':
                return <Navigate to="/doctor/dashboard" />;
            default:
                return <Navigate to="/" />;
        }
    }

    // Prevent users from accessing other roles' dashboards
    const rolePath = `/${user?.role}`; // e.g., /admin, /teacher, /student, /doctor
    if (isAuthenticated && !location.pathname.startsWith(rolePath)) {
        switch (user?.role) {
            case 'admin':
                return <Navigate to="/admin/dashboard" />;
            case 'teacher':
                return <Navigate to="/teacher/dashboard" />;
            case 'student':
                return <Navigate to="/student/dashboard" />;
            case 'doctor':
                return <Navigate to="/doctor/dashboard" />;
            default:
                return <Navigate to="/" />;
        }
    }

    return <div>{children}</div>;
};

export default CheckAuth;
