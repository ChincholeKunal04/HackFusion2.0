import React, { useState, useEffect } from "react";
import { User, FileText, LogOut } from "lucide-react";
import { logoutDoctor } from "../../store/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAllHealthReports, approveHealthReport, rejectHealthReport } from "../../store/doctor";

function App() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const doctorName = useSelector((state) => state.auth.user?.name || "");
    const reports = useSelector((state) => state.doctor.reports || []);

    const [selectedReport, setSelectedReport] = useState(null);
    const [showProfile, setShowProfile] = useState(false);

    const handleLogout = () => {
        dispatch(logoutDoctor());
        navigate("/auth/login");
    };

    useEffect(() => {
        dispatch(fetchAllHealthReports());
    }, [dispatch]);

    const handleViewDetails = (report) => {
        setSelectedReport(report);
    };

    const handleDecision = (id, status) => {
        if (status === "approved") {
            dispatch(approveHealthReport(id));
        } else if (status === "rejected") {
            dispatch(rejectHealthReport(id));
        }
        setSelectedReport(null);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <div className="w-64 bg-white shadow-lg">
                <nav className="p-4">
                    <div className="space-y-2">
                        <a href="#" className="flex items-center space-x-3 px-4 py-3 bg-blue-50 text-blue-600 rounded-lg">
                            <FileText className="w-5 h-5" />
                            <span className="font-medium">Health Reports</span>
                        </a>
                    </div>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Top Navigation */}
                <header className="bg-white shadow-sm border-b px-8 py-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-3xl font-bold text-gray-800">Medical Reports</h2>
                        <div className="relative">
                            <button onClick={() => setShowProfile(!showProfile)} className="flex items-center space-x-3 hover:bg-gray-50 rounded-full p-2 transition">
                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                    <User className="w-6 h-6 text-blue-600" />
                                </div>
                                <span className="font-medium text-gray-700">{doctorName}</span>
                            </button>

                            {showProfile && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-2 z-50">
                                    <div className="px-4 py-2 border-b">
                                        <p className="text-sm text-gray-500">Logged in as</p>
                                        <p className="font-medium text-gray-900">{doctorName}</p>
                                    </div>
                                    <button className="w-full flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50" onClick={handleLogout}>
                                        <LogOut className="w-4 h-4" />
                                        <span>Logout</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                {/* Dashboard Content */}
                <div className="flex-1 p-8 space-y-8">
                    {/* Reports Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {reports.map((report) => (
                            <div key={report._id} className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">{report.student.name}</h3>
                                        <p className="text-sm text-gray-500">{report.student.registrationNumber}</p>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                        report.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                        report.status === 'approved' ? 'bg-green-100 text-green-800' :
                                        'bg-red-100 text-red-800'
                                    }`}>
                                        {report.status}
                                    </span>
                                </div>
                                <p className="text-gray-600 mb-4">Reason: {report.sicknessDetails}</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-500">{new Date(report.date).toLocaleDateString()}</span>
                                    <button onClick={() => handleViewDetails(report)} className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Report Details Modal */}
                    {selectedReport && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                    <div className="p-6 border-b">
                        <h2 className="text-2xl font-bold text-gray-900">Student Details</h2>
                    </div>
                    <div className="p-6 space-y-4">
                        <p><strong>Student Name:</strong> {selectedReport.student?.name || "N/A"}</p>
                        <p><strong>Registration Number:</strong> {selectedReport.student?.registrationNumber || "N/A"}</p>
                        <p><strong>Email:</strong> {selectedReport.student?.email || "N/A"}</p>
                        <p><strong>Reported By:</strong> {selectedReport.reportedBy?.name || "N/A"} ({selectedReport.reportedBy?.email || "N/A"})</p>
                        <p><strong>Reason:</strong> {selectedReport.sicknessDetails || "N/A"}</p>
                        <p><strong>Date:</strong> {selectedReport.date ? new Date(selectedReport.date).toLocaleDateString() : "N/A"}</p>
                    </div>
                    <div className="p-6 border-t bg-gray-50 flex justify-end space-x-4">
                        <button onClick={() => setSelectedReport(null)} className="px-4 py-2 text-gray-700 hover:text-gray-900">
                            Cancel
                        </button>
                        <button
                            onClick={() => handleDecision(selectedReport._id, "rejected")}
                            className={`px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 ${
                                selectedReport.status !== "pending" ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                            disabled={selectedReport.status !== "pending"}
                        >
                            Reject
                        </button>
                        <button
                            onClick={() => handleDecision(selectedReport._id, "approved")}
                            className={`px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 ${
                                selectedReport.status !== "pending" ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                            disabled={selectedReport.status !== "pending"}
                        >
                            Approve
                        </button>
                    </div>
                </div>
            </div>
        )}
                </div>
            </div>
        </div>
    );
}

export default App;
