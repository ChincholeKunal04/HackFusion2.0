import React, { useState } from "react";

const ElectionSection = () => {
  const [votes, setVotes] = useState({
    candidateA: 0,
    candidateB: 0,
    candidateC: 0,
  });
  const [hasVoted, setHasVoted] = useState(false);

  const handleVote = (candidate) => {
    if (hasVoted) return alert("You have already voted!");

    setVotes((prevVotes) => ({
      ...prevVotes,
      [candidate]: prevVotes[candidate] + 1,
    }));
    setHasVoted(true);
  };

  const totalVotes = votes.candidateA + votes.candidateB + votes.candidateC;

  return (
    <div className="p-6 bg-green-200 rounded-lg shadow-lg w-full max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-center">🗳️ Student Election</h2>

      {/* Voting Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {Object.keys(votes).map((candidate) => (
          <button
            key={candidate}
            onClick={() => handleVote(candidate)}
            className={`p-3 w-full rounded-md text-white ${
              hasVoted ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
            disabled={hasVoted}
          >
            Vote for {candidate.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Live Results */}
      <h3 className="text-lg font-semibold mb-3">📊 Live Results</h3>
      {totalVotes === 0 ? (
        <p className="text-gray-500">No votes yet.</p>
      ) : (
        <div className="space-y-2">
          {Object.entries(votes).map(([candidate, count]) => (
            <div key={candidate} className="flex items-center">
              <span className="w-1/4 font-semibold">{candidate.toUpperCase()}:</span>
              <div className="w-3/4 bg-gray-200 h-6 rounded-lg overflow-hidden">
                <div
                  className="h-full bg-blue-500"
                  style={{ width: `${(count / totalVotes) * 100}%` }}
                ></div>
              </div>
              <span className="ml-2">{count} votes</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ElectionSection;
