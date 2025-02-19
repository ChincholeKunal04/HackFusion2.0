import React from 'react';
import { Link } from 'react-router-dom';
import { Vote, Users, UserPlus, BarChart3 } from 'lucide-react';
import {Outlet} from 'react-router-dom';
const ElectionSection = () => {
  const sections = [
    {
      title: 'Register As Candidate',
      icon: <UserPlus className="w-6 h-6 text-blue-600" />,
      description: 'Submit your candidacy for the upcoming election',
      link: '/registercandidate',
      bgColor: 'hover:bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      title: 'List of Candidates',
      icon: <Users className="w-6 h-6 text-purple-600" />,
      description: 'View all registered candidates and their platforms',
      link: '/candidatelist',
      bgColor: 'hover:bg-purple-50',
      borderColor: 'border-purple-200'
    },
    {
      title: 'Cast Your Vote',
      icon: <Vote className="w-6 h-6 text-green-600" />,
      description: 'Participate in the election by casting your vote',
      link: '/votesystem',
      bgColor: 'hover:bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      title: 'Election Results',
      icon: <BarChart3 className="w-6 h-6 text-orange-600" />,
      description: 'View live election results and statistics',
      link: '/result',
      bgColor: 'hover:bg-orange-50',
      borderColor: 'border-orange-200'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to the Election Portal
        </h1>
        <p className="text-gray-600 text-lg">
          Your voice matters. Make it count in this election.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((section, index) => (
          <Link
            key={index}
            to={section.link}
            className={`group p-6 bg-white rounded-xl shadow-sm border-2 ${section.borderColor} 
              ${section.bgColor} transition-all duration-300 transform hover:-translate-y-1 
              hover:shadow-md`}
          >
            <div className="flex items-start space-x-4">
              <div className={`p-3 rounded-full bg-gray-50 group-hover:scale-110 
                transition-transform duration-300`}>
                {section.icon}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {section.title}
                </h2>
                <p className="text-gray-600">
                  {section.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-12 text-center">
        <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Important Notice
          </h3>
          <p className="text-gray-600">
            Exercise your right to vote and make your voice heard! The election process is secure,
            transparent, and accessible to all eligible voters.
          </p>
        </div>
      </div>
      
    </div>
  );
};

export default ElectionSection;