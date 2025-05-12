import React, { useEffect, useState } from 'react';
import { Check, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUnverifyStudents, fetchAllUnverifyTeacher, verifyStudent, verifyTeacher } from '../../store/admin/verifyAccount';

const AccountVerification = () => {
    const dispatch = useDispatch();

    const studentList = useSelector((state) => state.verify?.studentList) || [];
    const teacherList = useSelector((state) => state.verify?.teacherList) || [];

    const handleVerifyStudent = (id) => {
        // Add your API call to verify the user
        dispatch(verifyStudent(id))
        // console.log("Verifying", id);
    };

    const handleVerifyTeacher = (id) => {
        // Add your API call to verify the user
        dispatch(verifyTeacher(id))
        console.log("Verifying", id);
    };

    // const handleReject = (id, role) => {
    //     // Add your API call to reject the user
    //     console.log("Rejecting", id, role);
    // };

    useEffect(() => {
        dispatch(fetchAllUnverifyStudents());
        dispatch(fetchAllUnverifyTeacher());
    }, [dispatch]);

    console.log(teacherList, 'student');

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Account Verification</h1>

            {/* Teacher Section */}
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Unverified Teachers</h2>
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-10">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {teacherList.map((teacher) => (
                            <tr key={teacher._id}>
                                <td className="px-6 py-4 whitespace-nowrap">{teacher.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{teacher.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{teacher.department}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                        {teacher.isVerified ? "Verified" : "Pending"}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    {!teacher.isVerified && (
                                        <div className="flex space-x-2">
                                            <button onClick={() => handleVerifyTeacher(teacher._id)} className="text-green-600 hover:text-green-900">
                                                <Check size={20} />
                                            </button>
                                            {/* <button onClick={() => handleReject(teacher._id, 'teacher')} className="text-red-600 hover:text-red-900">
                                                <X size={20} />
                                            </button> */}
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Student Section */}
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Unverified Students</h2>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reg. No</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {studentList.map((student) => (
                            <tr key={student._id}>
                                <td className="px-6 py-4 whitespace-nowrap">{student.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{student.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{student.class}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{student.registrationNumber}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                        {student.isVerified ? "Verified" : "Pending"}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    {!student.isVerified && (
                                        <div className="flex space-x-2">
                                            <button onClick={() => handleVerifyStudent(student._id)} className="text-green-600 hover:text-green-900">
                                                <Check size={20} />
                                            </button>
                                            {/* <button onClick={() => handleReject(student._id, 'student')} className="text-red-600 hover:text-red-900">
                                                <X size={20} />
                                            </button> */}
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AccountVerification;
