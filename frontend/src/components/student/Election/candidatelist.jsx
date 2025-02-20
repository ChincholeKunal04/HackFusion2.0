import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, User } from 'lucide-react';

const CandidateList = () => {
  // Local state for candidates
  const [candidates, setCandidates] = useState([
    { name: "John Doe", position: "President", platform: "Transparency and Growth", votes: 120 },
    { name: "Jane Smith", position: "Vice President", platform: "Education Reform", votes: 95 },
    { name: "Alice Johnson", position: "Secretary", platform: "Student Well-being", votes: 80 }
  ]);

  return (
    <div className="max-w-4xl mx-auto">
      <Link to="/election" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </Link>
      <h2 className="text-2xl font-bold mb-6">Registered Candidates</h2>
      <div className="grid gap-6">
        {candidates.map((candidate, index) => (
          <Link to={`/candidate/${index}`} key={index} className="block bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-gray-100 rounded-full">
                <User className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold">{candidate.name}</h3>
                <p className="text-blue-600 font-medium">{candidate.position}</p>
                <p className="text-gray-600 mt-2">{candidate.platform}</p>
                <div className="mt-4 text-sm text-gray-500">
                  Current Votes: {candidate.votes}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CandidateList;
