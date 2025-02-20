import React, { useState } from "react";

const ComplaintSection = () => {
  const [complaints, setComplaints] = useState([]);
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (subject.trim() === "") return; // Only add if subject is provided

    const newComplaint = {
      id: complaints.length + 1,
      subject: subject,
      status: "Pending",
      date: new Date().toLocaleDateString(),
    };

    setComplaints([...complaints, newComplaint]);
    setSubject(""); // Clear the input fields after submission
    setDescription("");
  };

  return (
    <div className="p-6 bg-red-200 rounded-lg shadow-lg w-full max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-center">📢 Complaint Section</h2>

      {/* Complaint Form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Complaint Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />
        <textarea
          className="w-full mt-3 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Describe your complaint..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          type="submit"
          className="mt-3 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Submit Complaint
        </button>
      </form>

      {/* Complaint List */}
      <h3 className="text-lg font-semibold mb-3">📋 Your Complaints</h3>
      {complaints.length === 0 ? (
        <p className="text-gray-500">No complaints submitted yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Subject</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((complaint) => (
                <tr key={complaint.id} className="text-center">
                  <td className="border p-2">{complaint.subject}</td>
                  <td className="border p-2 text-yellow-500">{complaint.status}</td>
                  <td className="border p-2">{complaint.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ComplaintSection;
