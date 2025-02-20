import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer' 
const StudentLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      {/* Add padding to push content down so it's not under the fixed header */}
      <main className="flex-grow p-10 p-32">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 border border-gray-300">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default StudentLayout
