import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { createElection, fetchAllElections } from '../../store/admin/election';
import { useDispatch, useSelector } from 'react-redux'

const AdminElection = () => {
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        title: "",
        date: "",
        startTime: "",
        endTime: "",
        positions: "", // multiline string, split by `\n` when submitting
        rules: "",
        candidates: [
          { name: "", email: "", position: "" }
        ],
    });  

    const [selectedElection, setSelectedElection] = useState(null);
    const [showModal1, setShowModal1] = useState(false);

    const handleViewDetails = (election) => {
        setSelectedElection(election);
        setShowModal1(true);
    };
    
    const closeModal = () => {
        setSelectedElection(null);
        setShowModal1(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (
            !formData.title ||
            !formData.date ||
            !formData.startTime ||
            !formData.endTime ||
            !formData.rules ||
            !formData.positions ||
            !formData.candidates.length
        ) {
            alert("Please fill in all required fields.");
            return;
        }

        const formattedPositions = formData.positions
        .split("\n")
        .map((pos) => pos.trim())
        .filter(Boolean);

        const formattedCandidates = formData.candidates.map((c) => ({
            name: c.name.trim(),
            email: c.email.trim(),
            position: c.position.trim(),
        }));

        const payload = {
            title: formData.title,
            date: formData.date,
            startTime: formData.startTime,
            endTime: formData.endTime,
            rules: formData.rules,
            positions: formattedPositions,
            candidates: formattedCandidates,
        };
    
        try {
            await dispatch(createElection(payload)).unwrap(); // wait for success
            setShowModal(false);
            setFormData({
                title: "",
                date: "",
                startTime: "",
                endTime: "",
                rules: "",
                positions: "",
                candidates: [], // reset to empty array
            });
        } catch (err) {
            console.error("Failed to create election:", err);
            alert(err.message || "Failed to create election");
        }
    };

    const electionList = useSelector((state) => state.elections?.electionList) || [];

    useEffect(() => {
        dispatch(fetchAllElections());
    }, [dispatch])

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Elections</h1>
                <button
                onClick={() => setShowModal(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-600 transition-colors"
                >
                <Plus size={20} className="mr-2" />
                Create Election
                </button>
            </div>

        {/* Elections List */}
            <div className="grid gap-6">
                {electionList.map((election) => (
                <div key={election._id} className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{election.title}</h3>
                    <p className="text-gray-600 mb-1"><strong>Date:</strong> {new Date(election.date).toLocaleDateString()}</p>
                    <p className="text-gray-600 mb-1"><strong>Start Time:</strong> {election.startTime}</p>
                    <p className="text-gray-600 mb-3"><strong>End Time:</strong> {election.endTime}</p>
                    <div>
                    <h4 className="font-medium text-gray-700 mb-2">Positions:</h4>
                    <ul className="list-disc list-inside mb-4">
                        {election.positions.map((position, index) => (
                        <li key={index} className="text-gray-600">{position}</li>
                        ))}
                    </ul>
                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                        onClick={() => handleViewDetails(election)}
                    >
                        View Details
                    </button>
                    </div>
                </div>
                ))}
            </div>

            {showModal1 && selectedElection && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50 overflow-auto py-10">
                    <div className="bg-white w-full max-w-3xl rounded-lg shadow-lg p-6 relative">
                        <button
                        className="absolute top-3 right-3 text-gray-600 hover:text-black text-xl"
                        onClick={closeModal}
                        >
                        &times;
                        </button>
                        <h2 className="text-2xl font-bold mb-2">{selectedElection.title}</h2>
                        <p className="text-gray-700 mb-2"><strong>Date:</strong> {new Date(selectedElection.date).toLocaleDateString()}</p>
                        <p className="text-gray-700 mb-2"><strong>Start Time:</strong> {selectedElection.startTime}</p>
                        <p className="text-gray-700 mb-2"><strong>End Time:</strong> {selectedElection.endTime}</p>
                        <p className="text-gray-700 mb-4 whitespace-pre-line"><strong>Rules:</strong> {selectedElection.rules}</p>

                        <h3 className="text-xl font-semibold mb-2">Candidates</h3>
                        <table className="w-full text-left border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                            <th className="border p-2">Name</th>
                            <th className="border p-2">Email</th>
                            <th className="border p-2">Position</th>
                            <th className="border p-2">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedElection.candidates.map((candidate) => (
                            <tr key={candidate._id}>
                                <td className="border p-2">{candidate.name}</td>
                                <td className="border p-2">{candidate.email}</td>
                                <td className="border p-2">{candidate.position}</td>
                                <td className="border p-2 capitalize">{candidate.status}</td>
                            </tr>
                            ))}
                        </tbody>
                        </table>
                    </div>
                </div>
            )}

        {/* Create Election Modal */}
        {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-auto">
                <div className="bg-white rounded-lg p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Election</h2>
                <form onSubmit={handleSubmit}>
                    {/* Title */}
                    <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Title</label>
                    <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full p-2 border rounded-lg"
                        required
                    />
                    </div>

                    {/* Date */}
                    <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Date</label>
                    <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full p-2 border rounded-lg"
                        required
                    />
                    </div>

                    {/* Start and End Time */}
                    <div className="mb-4 grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700 mb-2">Start Time</label>
                        <input
                        type="time"
                        value={formData.startTime}
                        onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                        className="w-full p-2 border rounded-lg"
                        required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-2">End Time</label>
                        <input
                        type="time"
                        value={formData.endTime}
                        onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                        className="w-full p-2 border rounded-lg"
                        required
                        />
                    </div>
                    </div>

                    {/* Positions */}
                    <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Positions (one per line)</label>
                    <textarea
                        value={formData.positions}
                        onChange={(e) => setFormData({ ...formData, positions: e.target.value })}
                        className="w-full p-2 border rounded-lg"
                        rows={3}
                        required
                    />
                    </div>

                    {/* Rules */}
                    <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Rules</label>
                    <textarea
                        value={formData.rules}
                        onChange={(e) => setFormData({ ...formData, rules: e.target.value })}
                        className="w-full p-2 border rounded-lg"
                        rows={3}
                        required
                    />
                    </div>

                    {/* Candidates */}
                    <div className="mb-6">
                    <label className="block text-gray-700 mb-2">Candidates</label>
                    {formData.candidates.map((candidate, index) => (
                        <div key={index} className="mb-4 border p-4 rounded-lg relative">
                        <div className="mb-2">
                            <label className="block text-gray-600 mb-1">Name</label>
                            <input
                            type="text"
                            value={candidate.name}
                            onChange={(e) => {
                                const updated = [...formData.candidates];
                                updated[index].name = e.target.value;
                                setFormData({ ...formData, candidates: updated });
                            }}
                            className="w-full p-2 border rounded-lg"
                            required
                            />
                        </div>
                        <div className="mb-2">
                            <label className="block text-gray-600 mb-1">Email</label>
                            <input
                            type="email"
                            value={candidate.email}
                            onChange={(e) => {
                                const updated = [...formData.candidates];
                                updated[index].email = e.target.value;
                                setFormData({ ...formData, candidates: updated });
                            }}
                            className="w-full p-2 border rounded-lg"
                            required
                            />
                        </div>
                        <div className="mb-2">
                            <label className="block text-gray-600 mb-1">Position</label>
                            <input
                            type="text"
                            value={candidate.position}
                            onChange={(e) => {
                                const updated = [...formData.candidates];
                                updated[index].position = e.target.value;
                                setFormData({ ...formData, candidates: updated });
                            }}
                            className="w-full p-2 border rounded-lg"
                            required
                            />
                        </div>
                        <button
                            type="button"
                            onClick={() => {
                            const updated = formData.candidates.filter((_, i) => i !== index);
                            setFormData({ ...formData, candidates: updated });
                            }}
                            className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                        >
                            Remove
                        </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() =>
                        setFormData({
                            ...formData,
                            candidates: [
                            ...formData.candidates,
                            { name: "", email: "", position: "" },
                            ],
                        })
                        }
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    >
                        + Add Candidate
                    </button>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-4 mt-4">
                    <button
                        type="button"
                        onClick={() => setShowModal(false)}
                        className="px-4 py-2 text-gray-600 hover:text-gray-800"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                        Create
                    </button>
                    </div>
                </form>
                </div>
            </div>
        )}
        </div>
    );
};

export default AdminElection;

