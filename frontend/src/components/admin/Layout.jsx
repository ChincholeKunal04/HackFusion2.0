import React from 'react'
import { Outlet } from 'react-router-dom'
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LayoutDashboard, Vote, UserCheck, MessageSquare, FileText } from 'lucide-react';
import { useState } from 'react';

const AdminLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation();

    const navItems = [
      { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { path: '/admin/election', label: 'Elections', icon: Vote },
      { path: '/admin/account-verification', label: 'Account Verification', icon: UserCheck },
      { path: '/admin/complaints', label: 'Complaints', icon: MessageSquare },
      { path: '/admin/applications', label: 'Applications', icon: FileText },
    ];

  return (
      <div className="min-h-screen bg-gray-50">
          {/* Mobile menu button */}
          <div className="lg:hidden fixed top-4 left-4 z-50">
              <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="p-2 rounded-lg bg-white shadow-md"
              >
                  {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
          </div>

        {/* Sidebar */}
          <aside
              className={`fixed inset-y-0 left-0 transform transition-transform duration-300 ease-in-out w-64 bg-white shadow-xl z-40
              ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
          >
              <div className="h-20 flex items-center justify-center border-b">
                  <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
              </div>
              <nav className="mt-8">
                  {navItems.map((item) => {
                      const Icon = item.icon;
                      return (
                          <Link
                              key={item.path}
                              to={item.path}
                              className={`flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50 ${
                                location.pathname === item.path ? 'bg-gray-100 border-r-4 border-blue-500' : ''
                              }`}
                              onClick={() => setIsSidebarOpen(false)}
                          >
                              <Icon size={20} className="mr-4" />
                              <span>{item.label}</span>
                          </Link>
                      );
                  })}
              </nav>
          </aside>

        {/* Main content */}
          <main
              className={`transition-all duration-300 ease-in-out ${
                isSidebarOpen ? 'lg:ml-64' : 'lg:ml-64'
              } min-h-screen`}
          >
              <div className="p-8">
                <Outlet />
              </div>
          </main>
      </div>
  );
}

export default AdminLayout
