import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './stu-components/Header.jsx';
import Footer from './stu-components/Footer.jsx';
import HomePage from './stu-components/Home.jsx';
const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      {/* Add padding to push content down so it's not under the fixed header */}
      <main className="flex-grow p-10 pt-30">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 border border-gray-300">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
