import { Navigate, useLocation } from "react-router-dom";

const CheckAuth = ({ isAuthenticated, user, children }) => {
    const location = useLocation();

    if(location.pathname === '/'){
        if(!isAuthenticated){
            return <Navigate to='/auth/login' />
        }
        else{
            switch (user?.role) {
                case 'admin':
                    return <Navigate to="/admin/dashboard" />;
                case 'teacher':
                    return <Navigate to="/teacher/dashboard" />;
                case 'student':
                    return <Navigate to="/studentdashboard" />;
                case 'doctor':
                    return <Navigate to="/doctor/dashboard" />;
                default:
                    return <Navigate to="/" />;
            }
        }
    }

    if(!isAuthenticated &&
        !(
            location.pathname.includes('/login') || 
            location.pathname.includes('/register')
        )
    ){
        return <Navigate to='/auth/login' />
    }

    if(isAuthenticated && 
        (
            location.pathname.includes('/login') ||
            location.pathname.includes('/register')
        )
    ){
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

    if(isAuthenticated && user?.role !== 'admin' && location.pathname.includes('admin')){
        return <Navigate to='/' />
    }

    if(isAuthenticated && user?.role !== 'teacher' && location.pathname.includes('teacher')){
        return <Navigate to='/' />
    }

    if(isAuthenticated && user?.role !== 'doctor' && location.pathname.includes('doctor')){
        return <Navigate to='/' />
    }

    if(isAuthenticated && user?.role !== 'student' && location.pathname.includes('student')){
        return <Navigate to='/' />
    }

    return <div>{children}</div>;
};

export default CheckAuth;
