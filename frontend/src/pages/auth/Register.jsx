import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import CommonForm from "../../components/comman/Form";
import { registerStudent, registerTeacher } from "../../store/auth/index";

const AuthRegister = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'student', // Default role
        registrationNumber: '', // For students
        class: '', // For students
        department: '', // For teachers
    });

    const onSubmit = (event) => {
        event.preventDefault();
        // console.log('Form Data:', formData);
    
        if (formData.role === 'student') {
            dispatch(registerStudent(formData))
                .unwrap() // Use unwrap() to get the payload directly
                .then((response) => {
                    console.log('Student Registration Response:', response);
    
                    if (response.success) {
                        alert('Registration successful! Please login.');
                        navigate('/auth/login'); // Redirect to login page
                    } 
                    else {
                        alert('Registration failed. Please try again.');
                    }
                })
                .catch((error) => {
                    console.error('Registration Error:', error);
                });
        } else if (formData.role === 'teacher') {
            dispatch(registerTeacher(formData))
                .unwrap()
                .then((response) => {
                    console.log('Teacher Registration Response:', response);
    
                    if (response.success) {
                        alert('Registration successful! Please login.');
                        navigate('/auth/login'); // Redirect to login page
                    } else {
                        alert('Registration failed. Please try again.');
                    }
                })
                .catch((error) => {
                    console.error('Registration Error:', error);
                });
        } else {
            console.error('Invalid role selected');
        }
    };
    

    const formControls = [
        { name: 'name', label: 'Name', type: 'text', placeholder: 'Enter your name', componentType: 'input' },
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
            ],
        },
        { name: 'registrationNumber', label: 'Registration Number', type: 'text', placeholder: 'Enter your registration number', componentType: 'input' }, // For students
        { name: 'class', label: 'Class', type: 'text', placeholder: 'Enter your class', componentType: 'input' }, // For students
        { name: 'department', label: 'Department', type: 'text', placeholder: 'Enter your department', componentType: 'input' }, // For teachers
    ];

    return (
        <div className="mx-auto w-full max-w-md space-y-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight">Create new account</h1>
                <p className="mt-2">
                    Already have an account?{" "}
                    <a className="font-medium text-blue-600 hover:underline" href="/auth/login">
                        Login
                    </a>
                </p>
            </div>
            <CommonForm
                formControls={formControls}
                formData={formData}
                setFormData={setFormData}
                onSubmit={onSubmit}
                buttonText="Sign Up"
            />
        </div>
    );
};

export default AuthRegister;