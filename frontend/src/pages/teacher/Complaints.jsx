import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchAllComplaints,
    revealIdentityVote,
} from "../../store/teacher/complaint.js";

const Complaints = () => {
    const dispatch = useDispatch();
    const { complaints, isLoading, error } = useSelector(
        (state) => state.complaintApplication
      );
      

    useEffect(() => {
        dispatch(fetchAllComplaints());
    }, [dispatch]);

    const handleRevealVote = (complaintId) => {
        const complaintType = "general"; // or get dynamically if needed
        dispatch(revealIdentityVote({ complaintId, complaintType })).then(() => {
            dispatch(fetchAllComplaints());
        });    
    };
    
    

    if (isLoading) return <div className="p-4 text-gray-700">Loading complaints...</div>;
    if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

    if (!complaints || complaints.length === 0) {
        return <div className="p-4 text-gray-500">No complaints found.</div>;
    }

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Approved Complaints</h2>
            <div className="grid gap-4">
                {complaints.map((complaint) => (
                    <div
                        key={complaint._id}
                        className="border p-4 rounded-lg shadow-sm bg-white"
                    >
                        <p className="mb-2 text-gray-800 whitespace-pre-wrap">
                            {complaint.complaintText}
                        </p>

                        <div className="text-sm text-gray-600 space-y-1">
                            <p>
                                <strong>Status:</strong> {complaint.status}
                            </p>
                            <p>
                                <strong>Submitted At:</strong>{" "}
                                {new Date(complaint.createdAt).toLocaleString()}
                            </p>
                            <p>
                                <strong>Moderation Remarks:</strong>{" "}
                                {complaint.moderationRemarks || "N/A"}
                            </p>
                            <p>
                                <strong>Student:</strong>{" "}
                                {complaint.isAnonymous
                                    ? "Anonymous"
                                    : `${complaint.student?.name || "N/A"} (${complaint.student?.registrationNumber || "N/A"})`}
                            </p>
                        </div>

                        {!complaint.isIdentityRevealed && (
                            <button
                                onClick={() => handleRevealVote(complaint._id,"complaint")}
                                className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                Vote to Reveal Identity
                            </button>
                        )}

                        {complaint.isIdentityRevealed && (
                            <p className="mt-3 text-green-600 font-semibold">
                                ✅ Identity Revealed
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Complaints;
