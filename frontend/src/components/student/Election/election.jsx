import React, { useState } from 'react';
import { Calendar, CheckCircle2, Clock, ArrowRight, Vote } from 'lucide-react';

function electionfirst() {
  const [activeTab, setActiveTab] = useState('upcoming');

  const elections = {
    upcoming: [
      {
        id: 1,
        title: "Student Council Elections 2024",
        date: "2024-05-15",
        positions: ["President", "Vice President", "Secretary"],
        registrationDeadline: "2024-05-01",
        description: "Annual student council elections for the academic year 2024-25"
      },
      {
        id: 2,
        title: "Department Representatives Election",
        date: "2024-06-01",
        positions: ["CS Rep", "Engineering Rep", "Arts Rep"],
        registrationDeadline: "2024-05-20",
        description: "Selection of department representatives for various academic committees"
      }
    ],
    present: [
      {
        id: 3,
        title: "Library Committee Election",
        date: "2024-03-20",
        endDate: "2024-03-21",
        positions: ["Student Representative"],
        votingStatus: "In Progress",
        voterTurnout: "45%",
        description: "Ongoing election for student representative in the library committee"
      }
    ],
    past: [
      {
        id: 4,
        title: "Sports Committee Elections",
        date: "2024-02-15",
        positions: ["Sports Secretary", "Team Captains"],
        winner: "Sarah Johnson",
        voterTurnout: "78%",
        description: "Election for selecting sports committee representatives"
      },
      {
        id: 5,
        title: "Cultural Committee Elections",
        date: "2024-01-20",
        positions: ["Cultural Secretary"],
        winner: "Michael Chen",
        voterTurnout: "65%",
        description: "Selection of cultural committee representatives"
      }
    ]
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'present':
        return 'bg-green-100 text-green-800';
      case 'past':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Campus Elections</h1>
          <p className="text-lg text-gray-600">Stay informed about all election activities on campus</p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center space-x-4 mb-8">
          {['upcoming', 'present', 'past'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                activeTab === tab
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)} Elections
            </button>
          ))}
        </div>

        {/* Election Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {elections[activeTab].map((election) => (
            <div key={election.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{election.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(activeTab)}`}>
                    {activeTab === 'present' ? 'Active' : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-4">{election.description}</p>
                
                <div className="space-y-3">
                  <div className="flex items-center text-gray-700">
                    <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                    <span>
                      {formatDate(election.date)}
                      {election.endDate && ` - ${formatDate(election.endDate)}`}
                    </span>
                  </div>
                  
                  <div className="flex items-start text-gray-700">
                    <Vote className="w-5 h-5 mr-2 mt-1 text-blue-600" />
                    <div>
                      <span className="font-medium">Positions: </span>
                      {election.positions.join(", ")}
                    </div>
                  </div>

                  {activeTab === 'upcoming' && election.registrationDeadline && (
                    <div className="flex items-center text-gray-700">
                      <Clock className="w-5 h-5 mr-2 text-blue-600" />
                      <span>
                        Registration Deadline: {formatDate(election.registrationDeadline)}
                      </span>
                    </div>
                  )}

                  {activeTab === 'present' && (
                    <div className="flex items-center text-gray-700">
                      <CheckCircle2 className="w-5 h-5 mr-2 text-green-600" />
                      <span>Voter Turnout: {election.voterTurnout}</span>
                    </div>
                  )}

                  {activeTab === 'past' && (
                    <>
                      <div className="flex items-center text-gray-700">
                        <CheckCircle2 className="w-5 h-5 mr-2 text-blue-600" />
                        <span>Winner: {election.winner}</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <Vote className="w-5 h-5 mr-2 text-blue-600" />
                        <span>Turnout: {election.voterTurnout}</span>
                      </div>
                    </>
                  )}
                </div>

                <button className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
                  {activeTab === 'upcoming' ? 'Register Now' : activeTab === 'present' ? 'Vote Now' : 'View Results'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default electionfirst;