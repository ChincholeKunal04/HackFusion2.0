import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Trophy, Users, Vote } from 'lucide-react';

const Results = () => {
  const electionResults = {
    totalVotes: 375,
    totalVoters: 400,
    candidates: [
      {
        name: 'John Doe',
        position: 'President',
        votes: 145,
        percentage: 38.7
      },
      {
        name: 'Jane Smith',
        position: 'Vice President',
        votes: 132,
        percentage: 35.2
      },
      {
        name: 'Mike Johnson',
        position: 'Secretary',
        votes: 98,
        percentage: 26.1
      }
    ]
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Link to="/election" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back 
      </Link>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold mb-6">Election Results</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center space-x-3">
              <Vote className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-800">Total Votes</h3>
            </div>
            <p className="text-2xl font-bold text-blue-600 mt-2">{electionResults.totalVotes}</p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center space-x-3">
              <Users className="w-5 h-5 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-800">Total Voters</h3>
            </div>
            <p className="text-2xl font-bold text-green-600 mt-2">{electionResults.totalVoters}</p>
          </div>
          
          <div className="bg-orange-50 p-4 rounded-lg">
            <div className="flex items-center space-x-3">
              <Trophy className="w-5 h-5 text-orange-600" />
              <h3 className="text-lg font-semibold text-gray-800">Turnout</h3>
            </div>
            <p className="text-2xl font-bold text-orange-600 mt-2">
              {((electionResults.totalVotes / electionResults.totalVoters) * 100).toFixed(1)}%
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {electionResults.candidates.map((candidate, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-semibold">{candidate.name}</h3>
                  <p className="text-blue-600">{candidate.position}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-800">{candidate.votes}</p>
                  <p className="text-sm text-gray-500">votes</p>
                </div>
              </div>
              <div className="relative pt-1">
                <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                  <div
                    style={{ width: `${candidate.percentage}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"
                  />
                </div>
                <p className="text-sm text-gray-600 mt-1">{candidate.percentage}% of total votes</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Results;