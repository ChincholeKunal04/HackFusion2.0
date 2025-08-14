// src/components/teacher/TeacherDashboard.jsx

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MessageSquare, FileText, UserCheck, HeartPulse } from "lucide-react";

import { fetchAllCheatingReports } from "../../store/teacher/cheating";
import { fetchAllComplaints } from "../../store/teacher/complaint";
import {
  fetchAllLeaveReports,
  fetchAllApprovedHealthReports,
} from "../../store/teacher/reports";

const StatCard = ({ title, count, icon: Icon, color }) => (
  <div className={`bg-white p-4 rounded-lg shadow-md border-l-4 ${color}`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-600 mb-1">{title}</p>
        <h3 className="text-2xl sm:text-3xl font-bold text-gray-800">{count}</h3>
      </div>
      <Icon size={28} className="text-gray-400" />
    </div>
  </div>
);

const DashboardCard = ({ title, description, icon: Icon, link }) => (
  <Link
    to={link}
    className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
  >
    <div className="flex items-center mb-4">
      <Icon size={28} className="text-blue-600 mr-3" />
      <h3 className="text-lg sm:text-xl font-semibold text-gray-800">{title}</h3>
    </div>
    <p className="text-gray-600 text-sm">{description}</p>
  </Link>
);

const TeacherDashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllCheatingReports());
    dispatch(fetchAllComplaints());
    dispatch(fetchAllLeaveReports());
    dispatch(fetchAllApprovedHealthReports());
  }, [dispatch]);

  const cheatingReports =
    useSelector((state) => state.cheating?.cheatingReports) || [];
  const complaints =
    useSelector((state) => state.complaintApplication?.complaints) || [];
  const leaveReports =
    useSelector((state) => state.healtAndLeaveReport?.leaveReports) || [];
  const approvedHealthReports =
    useSelector((state) => state.healtAndLeaveReport?.approvedHealthReports) ||
    [];

  const stats = [
    {
      title: "Cheating Reports",
      count: cheatingReports.length,
      icon: UserCheck,
      color: "border-red-500",
    },
    {
      title: "Complaints",
      count: complaints.length,
      icon: MessageSquare,
      color: "border-yellow-500",
    },
    {
      title: "Leave Reports",
      count: leaveReports.length,
      icon: FileText,
      color: "border-blue-500",
    },
    {
      title: "Approved Health Reports",
      count: approvedHealthReports.length,
      icon: HeartPulse,
      color: "border-green-500",
    },
  ];

  const cards = [
    {
      title: "Cheating Reports",
      description: "View and manage cheating reports",
      icon: UserCheck,
      link: "/teacher/cheating-records",
    },
    {
      title: "Complaints",
      description: "View complaints and votes",
      icon: MessageSquare,
      link: "/teacher/complaints",
    },
    {
      title: "Leave Reports",
      description: "Review leave reports submitted by students",
      icon: FileText,
      link: "/teacher/leave-reports",
    },
    {
      title: "Health Reports",
      description: "View approved health reports",
      icon: HeartPulse,
      link: "/teacher/health-reports",
    },
  ];

  return (
    <div className="px-4 py-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-bold mb-10 text-gray-900">
        Teacher Dashboard
      </h1>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-14">
        {stats.map(({ title, count, icon, color }) => (
          <StatCard
            key={title}
            title={title}
            count={count}
            icon={icon}
            color={color}
          />
        ))}
      </div>

      {/* Quick Access Cards */}
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6">
        Quick Access
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {cards.map(({ title, description, icon, link }) => (
          <DashboardCard
            key={title}
            title={title}
            description={description}
            icon={icon}
            link={link}
          />
        ))}
      </div>
    </div>
  );
};

export default TeacherDashboard;
