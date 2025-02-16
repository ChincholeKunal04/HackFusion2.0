import { useState } from "react";

const ApplicationApproval = () => {
  const [applicationType, setApplicationType] = useState("General");
  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ applicationType, eventName, description, file });
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-blue-100 shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-4">📄 Application</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Application Type Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Application Type</label>
          <select
            value={applicationType}
            onChange={(e) => setApplicationType(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="General">General Application</option>
            <option value="Budget">Budget Application</option>
          </select>
        </div>

        {/* Event Name */}
        <div>
          <label className="block text-sm font-medium text-gray-500">Subject</label>
          <input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter application subject"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Briefly describe your request"
            rows="4"
            required
          ></textarea>
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Upload Supporting Document</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="mt-1 w-full p-2 border border-gray-300 rounded-lg"
            accept=".pdf"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded-lg hover:bg-green-700 transition"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default ApplicationApproval;
