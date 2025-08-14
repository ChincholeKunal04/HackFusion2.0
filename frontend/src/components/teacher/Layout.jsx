import React, { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  ClipboardList,
  BarChart,
  FileWarning,
  FileText,
  HeartPulse,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { logoutTeacher } from "../../store/auth";

const TeacherLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logoutTeacher());
    navigate("/auth/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex min-h-screen bg-gray-100 overflow-x-hidden">
      {/* Desktop Sidebar */}
      <div
        className={`
          hidden sm:block
          ${collapsed ? "w-16" : "w-64"}
          bg-white h-screen fixed top-0 left-0 border-r border-gray-200
          transition-all duration-300 ease-in-out z-30
        `}
      >
        <Sidebar
          collapsed={collapsed}
          toggleCollapse={() => setCollapsed(!collapsed)}
          onNavigate={navigate}
          activePath={location.pathname}
        />
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200
          transform ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          transition-transform duration-300 ease-in-out
          z-40 sm:hidden
        `}
      >
        <Sidebar
          collapsed={false}
          toggleCollapse={() => setMobileOpen(false)}
          onNavigate={(path) => {
            navigate(path);
            setMobileOpen(false);
          }}
          activePath={location.pathname}
        />
      </div>

      {/* Main Content */}
      <div
        className={`
          flex flex-col flex-1
          ${collapsed ? "sm:ml-16" : "sm:ml-64"}
          transition-all duration-300
        `}
      >
        {/* Header */}
        <header className="bg-white h-16 border-b px-6 flex items-center justify-between shadow-sm">
          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="sm:hidden"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <h1 className="text-lg font-semibold text-gray-800">Teacher Dashboard</h1>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <div className="font-medium text-gray-700">{user?.name || "Teacher"}</div>
              <div className="text-sm text-gray-500">{user?.email || "email@sggs.ac.in"}</div>
            </div>
            <div className="h-9 w-9 rounded-full bg-blue-200 text-blue-800 font-semibold flex items-center justify-center">
              {user?.name?.[0]?.toUpperCase() || "T"}
            </div>
            <button
              onClick={handleLogout}
              className="text-red-600 hover:text-red-800 flex items-center gap-1 text-sm font-medium"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </header>

        <main className="p-4 sm:p-8 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

const Sidebar = ({ collapsed, toggleCollapse, onNavigate, activePath }) => (
  <>
    <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
      {!collapsed && (
        <span className="text-lg font-bold text-gray-900">Teacher Portal</span>
      )}
      <button
        onClick={toggleCollapse}
        className="rounded-md p-1.5 hover:bg-gray-100"
      >
        <X className="h-5 w-5 text-gray-500" />
      </button>
    </div>
    <nav className="p-2 mt-2 space-y-1">
      {[
        { label: "Dashboard", icon: <BarChart size={20} />, path: "/teacher/dashboard" },
        { label: "Cheating Reports", icon: <ClipboardList size={20} />, path: "/teacher/cheating-records" },
        { label: "Complaints", icon: <FileWarning size={20} />, path: "/teacher/complaints" },
        { label: "Leave Reports", icon: <FileText size={20} />, path: "/teacher/leave-reports" },
        { label: "Health Reports", icon: <HeartPulse size={20} />, path: "/teacher/health-reports" },
      ].map(({ label, icon, path }) => (
        <div
          key={label}
          onClick={() => onNavigate(path)}
          className={`
            flex items-center py-2 px-3 rounded-md cursor-pointer
            ${collapsed ? "justify-center" : ""}
            ${activePath.includes(path) ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-100"}
            transition-colors
          `}
        >
          <div className="flex-shrink-0">{icon}</div>
          {!collapsed && <span className="ml-3 font-medium">{label}</span>}
        </div>
      ))}
    </nav>
  </>
);

export default TeacherLayout;
