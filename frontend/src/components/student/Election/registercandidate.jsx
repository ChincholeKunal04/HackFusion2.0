import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
// import candidateslice from "../../store/candidate/candidateslice.js";

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
const RegisterCandidate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [candidate, setCandidate] = useState({
    name: '',
    position: '',
    platform: '',
    votes: 0, // Default votes
  });

  const handleChange = (e) => {
    setCandidate({ ...candidate, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addCandidate(candidate)); // Dispatch Redux action to add candidate
    navigate('/candidatelist'); // Navigate back to the list
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <h2 className="text-2xl font-bold mb-6">Register as a Candidate</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input type="text" name="name" onChange={handleChange} required className="mt-1 p-2 w-full border rounded-md"/>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Position</label>
          <input type="text" name="position" onChange={handleChange} required className="mt-1 p-2 w-full border rounded-md"/>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Platform</label>
          <textarea name="platform" onChange={handleChange} required className="mt-1 p-2 w-full border rounded-md"></textarea>
        </div>
       
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md">
          Register
        </button>
        
       
      </form>
    </div>
  );
};

export default RegisterCandidate;