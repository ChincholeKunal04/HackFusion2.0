import React from 'react';

import { Link } from 'react-router-dom';
 const Footer = () => {
    return (
      <footer className=" text-white py-1">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* College Info */}
            <div>
              <h2 className="text-black font-semibold">Shri Guru Gobind Singhji Institute of Engineering and Technology(SGGSIE&T)</h2>
             
            </div>
  
            {/* Quick Links */}
            <div>
             
              <ul className="mt-2 space-y-2">
                
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">About</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">Contact</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">Help & Support</a>
                </li>
              </ul>
            </div>
  
            {/* Social Media */}
            <div>
              <h2 className="text-black  font-semibold">Follow Us</h2>
              <div className="flex mt-2 space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                <img src="/logos/facebook-logo.svg" alt="Facebook" className="w-6 h-6 rounded-md" />
                Facebook
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                X Twitter
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  📷 Instagram
                </a>
              </div>
            </div>
          </div>
  
          {/* Bottom Section */}
          <div className="border-t border-gray-700 mt-6 pt-4 text-center text-gray-400">
            © {new Date().getFullYear()} Shri Guru Gobind Singhji Institute of Engineering and Technology(SGGSIE&T) | All Rights Reserved.
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  
