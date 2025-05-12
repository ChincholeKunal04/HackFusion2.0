import React, { useEffect, useState } from 'react';
import { Check, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { approveComplaint, fetchAllComplaints, rejectComplaint } from '../../store/admin/complaints';

const AdminComplaints = () => {

    const dispatch = useDispatch();
    const complaintList = useSelector((state) => state.complaints?.complaintList) || [];

    const [selectedComplaintId, setSelectedComplaintId] = useState(null);
    const [actionType, setActionType] = useState(null); 
    const [moderationRemark, setModerationRemark] = useState("");
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        dispatch(fetchAllComplaints());
    }, [dispatch])

    const openModal = (id, type) => {
        setSelectedComplaintId(id);
        setActionType(type);
        setModerationRemark("");
        setShowModal(true);
    };

    const handleSubmit = () => {
        if (!moderationRemark.trim()) return alert("Please enter a moderation remark");
    
        if (actionType === "approve") {
          dispatch(approveComplaint({ id: selectedComplaintId, moderationRemark }));
        } else if (actionType === "reject") {
          dispatch(rejectComplaint({ id: selectedComplaintId, moderationRemark }));
        }
    
        setShowModal(false);
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Anonymous Complaints</h1>

            <div className="grid gap-6">
                {complaintList.map((complaint) => (
                <div key={complaint._id} className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex justify-between items-start mb-4">
                    <div>
                        <p className="text-gray-600 text-sm mb-2">
                        Submitted on {new Date(complaint.createdAt).toLocaleDateString()}
                        </p>
                        <p className="text-gray-800">{complaint.complaintText}</p>
                    </div>
                    <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full
                        ${complaint.status === "approved" ? "bg-green-100 text-green-800" :
                        complaint.status === "rejected" ? "bg-red-100 text-red-800" :
                        "bg-yellow-100 text-yellow-800"}`}
                    >
                        {complaint.status.charAt(0).toUpperCase() + complaint.status.slice(1)}
                    </span>
                    </div>

                    {complaint.status === "pending" && (
                    <div className="flex justify-end space-x-4">
                        <button
                        onClick={() => openModal(complaint._id, "approve")}
                        className="flex items-center px-3 py-1 text-green-600 hover:text-green-800 transition-colors"
                        >
                        <Check size={16} className="mr-1" />
                        Approve
                        </button>
                        <button
                        onClick={() => openModal(complaint._id, "reject")}
                        className="flex items-center px-3 py-1 text-red-600 hover:text-red-800 transition-colors"
                        >
                        <X size={16} className="mr-1" />
                        Reject
                        </button>
                    </div>
                    )}
                </div>
                ))}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                    <h2 className="text-xl font-semibold mb-4">
                    {actionType === "approve" ? "Approve Complaint" : "Reject Complaint"}
                    </h2>
                    <textarea
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                    placeholder="Enter moderation remarks..."
                    value={moderationRemark}
                    onChange={(e) => setModerationRemark(e.target.value)}
                    ></textarea>
                    <div className="flex justify-end space-x-4">
                    <button
                        onClick={() => setShowModal(false)}
                        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className={`px-4 py-2 text-white rounded ${actionType === "approve" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}`}
                    >
                        Confirm
                    </button>
                    </div>
                </div>
                </div>
            )}
        </div>
    );
};

export default AdminComplaints;

