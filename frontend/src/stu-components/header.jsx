import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full flex items-center text-white justify-between px-6 py-4 bg-blue-100 shadow-md rounded-lg z-50">
      {/* Logo Section */}
      <div className="flex items-center">
        <img 
          src="https://upload.wikimedia.org/wikipedia/en/0/04/Shri_Guru_Gobind_Singhji_Institute_of_Engineering_and_Technology_%28SGGSIE%26T%29_logo.png?20230310001512" 
          alt="Logo" 
          className="h-16 rounded-md"
        />
      </div>

      {/* Navigation Section */}
      <nav>
        <ul className="flex space-x-8 text-coolGray-800">
        <li>
            <NavLink 
              to="" 
              className={({ isActive }) => 
                `text-gray-700 hover:text-blue-600 font-medium ${isActive ? 'text-blue-700 font-bold' : ''}`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/application" 
              className={({ isActive }) => 
                `text-gray-700 hover:text-blue-600 font-medium ${isActive ? 'text-blue-700 font-bold' : ''}`
              }
            >
              Application
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/complaints" 
              className={({ isActive }) => 
                `text-gray-700 hover:text-blue-600 font-medium ${isActive ? 'text-blue-700 font-bold' : ''}`
              }
            >
              Complaints
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/election" 
              className={({ isActive }) => 
                `text-gray-700 hover:text-blue-600 font-medium ${isActive ? 'text-blue-700 font-bold' : ''}`
              }
            >
              Election
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
