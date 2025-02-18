import React from 'react';

const CommonForm = ({ formControls, formData, setFormData, onSubmit, buttonText }) => {
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    // Determine if the selected role is "student" or "teacher"
    const isStudent = formData.role === 'student';
    const isTeacher = formData.role === 'teacher';

    return (
        <form onSubmit={onSubmit} className="space-y-4 border p-6 rounded-lg shadow-md">
            {formControls.map((control) => {
                // Conditionally render fields based on the selected role
                if (control.name === 'registrationNumber' && !isStudent) return null;
                if (control.name === 'class' && !isStudent) return null;
                if (control.name === 'department' && !isTeacher) return null;

                return (
                    <div key={control.name} className="flex flex-col gap-1">
                        <label className="font-medium">{control.label}</label>
                        {control.componentType === 'input' && (
                            <input
                                type={control.type}
                                name={control.name}
                                placeholder={control.placeholder}
                                value={formData[control.name] || ''}
                                onChange={handleChange}
                                className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        )}
                        {control.componentType === 'select' && (
                            <select
                                name={control.name}
                                value={formData[control.name] || ''}
                                onChange={handleChange}
                                className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">{control.placeholder}</option>
                                {control.options?.map((option) => (
                                    <option key={option.id} value={option.id}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>
                );
            })}
            <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                {buttonText}
            </button>
        </form>
    );
};

export default CommonForm;