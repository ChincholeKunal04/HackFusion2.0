import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginStudent, loginTeacher, loginAdmin, loginDoctor} from "../../store/auth/index";
import CommonForm from "../../components/comman/Form";


const AuthLogin = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        role: 'student', // Default role
    });

    const onSubmit = (event) => {
        event.preventDefault();
        console.log(formData)
        // Determine which action to dispatch based on the selected role
        if (formData.role === 'student') {
            dispatch(loginStudent(formData)); // Call loginStudent action
        } else if (formData.role === 'teacher') {
            dispatch(loginTeacher(formData)); // Call loginTeacher action
        } else if (formData.role === 'admin') {
            dispatch(loginAdmin(formData)); // Call loginAdmin action
        } else if (formData.role === 'doctor') {
            dispatch(loginDoctor(formData)); // Call loginDoctor action
        } else {
            console.error('Invalid role selected');
        }
    };

    const formControls = [
        { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter your email', componentType: 'input' },
        { name: 'password', label: 'Password', type: 'password', placeholder: 'Enter your password', componentType: 'input' },
        {
            name: 'role',
            label: 'Role',
            componentType: 'select',
            placeholder: 'Select your role',
            options: [
                { id: 'student', label: 'Student' },
                { id: 'teacher', label: 'Teacher' },
                { id: 'admin', label: 'Admin' },
                { id: 'doctor', label: 'Doctor' },
            ],
        },
    ];

    return (
        <div className="mx-auto w-full max-w-md space-y-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight">Login to your account</h1>
                <p className="mt-2">
                    Don't have an account?{" "}
                    <a className="font-medium text-blue-600 hover:underline" href="/auth/register">
                        Register
                    </a>
                </p>
            </div>
            <CommonForm
                formControls={formControls}
                formData={formData}
                setFormData={setFormData}
                onSubmit={onSubmit}
                buttonText="Login"
            />
        </div>
    );
};

export default AuthLogin;