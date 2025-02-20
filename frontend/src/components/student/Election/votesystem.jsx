import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle } from 'lucide-react';

const Voting = () => {
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);

  const candidates = [
    {
      id: '1',
      name: 'John Doe',
      position: 'President',
      platform: 'Building a better future through innovation and sustainability'
    },
    {
      id: '2',
      name: 'Jane Smith',
      position: 'Vice President',
      platform: 'Promoting education and equal opportunities for all'
    },
    {
      id: '3',
      name: 'Mike Johnson',
      position: 'Secretary',
      platform: 'Transparency and accountability in governance'
    }
  ];

  const handleVote = () => {
    if (!selectedCandidate) return;
    setHasVoted(true);
  };

  if (hasVoted) {
    return (
      <div className="max-w-2xl mx-auto">
        <Link to="/election" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back 
        </Link>
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Thank You for Voting!</h2>
          <p className="text-gray-600 mb-6">Your vote has been successfully recorded.</p>
          <Link
            to="/result"
            className="inline-block bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors"
          >
            View Results
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Dashboard
      </Link>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">Cast Your Vote</h2>
        <div className="space-y-4">
          {candidates.map((candidate) => (
            <div
              key={candidate.id}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                selectedCandidate === candidate.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
              onClick={() => setSelectedCandidate(candidate.id)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{candidate.name}</h3>
                  <p className="text-blue-600">{candidate.position}</p>
                  <p className="text-gray-600 mt-2">{candidate.platform}</p>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 ${
                  selectedCandidate === candidate.id
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-gray-300'
                }`}>
                  {selectedCandidate === candidate.id && (
                    <CheckCircle className="w-5 h-5 text-white" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={handleVote}
          disabled={!selectedCandidate}
          className={`w-full mt-6 py-2 px-4 rounded-md transition-colors ${
            selectedCandidate
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
        >
          Submit Vote
        </button>
      </div>
    </div>
  );
};

export default Voting;