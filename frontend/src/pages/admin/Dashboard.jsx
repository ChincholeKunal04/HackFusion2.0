import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Vote, UserCheck, MessageSquare, FileText, LogOut, User } from 'lucide-react';
import { logoutAdmin } from '../../store/auth';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUnverifyStudents, fetchAllUnverifyTeacher } from '../../store/admin/verifyAccount';
import { fetchAllComplaints } from '../../store/admin/complaints';
import { fetchAllPendingApplication } from '../../store/admin/applications';
import { fetchAllElections } from '../../store/admin/election';

const StatCard = ({ title, count, icon: Icon, color }) => (
    <div className={`bg-white p-6 rounded-lg shadow-md border-l-4 ${color}`}>
        <div className="flex items-center justify-between">
            <div>
                <p className="text-sm text-gray-600 mb-1">{title}</p>
                <h3 className="text-2xl font-bold text-gray-800">{count}</h3>
            </div>
            <Icon size={24} className="text-gray-400" />
        </div>
    </div>
);

  const DashboardCard = ({ title, description, icon: Icon, link }) => (
      <Link
          to={link}
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
      >
          <div className="flex items-center mb-4">
              <Icon size={24} className="text-blue-500 mr-3" />
              <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
          </div>
          <p className="text-gray-600">{description}</p>
      </Link>
  );

  
  const Dashboard = () => {
      const dispatch = useDispatch()

      const studentList = useSelector((state) => state.verify?.studentList) || [];
      const teacherList = useSelector((state) => state.verify?.teacherList) || [];

      useEffect(() => {
          dispatch(fetchAllUnverifyStudents());
          dispatch(fetchAllUnverifyTeacher());
      }, [dispatch]);

      const verifyCount = studentList.length + teacherList.length;

      const complaintList = useSelector((state) => state.complaints?.complaintList) || [];
      
      useEffect(() => {
          dispatch(fetchAllComplaints());
      }, [dispatch])

      const complaintCount = complaintList.length

      const applications = useSelector((state) => state.applications?.applicationList) || [];

      useEffect(() => {
        dispatch(fetchAllPendingApplication());
      }, [dispatch])

      const applicationCount = applications.length

      const electionList = useSelector((state) => state.elections?.electionList) || [];
      
      useEffect(() => {
          dispatch(fetchAllElections());
      }, [dispatch])

      const electionCount = electionList.length

      const {user} = useSelector((state) => state.auth)

    // Mock data for statistics
      const stats = [
          { title: 'Active Elections', count: electionCount, icon: Vote, color: 'border-blue-500' },
          { title: 'Pending Verifications', count: verifyCount, icon: UserCheck, color: 'border-yellow-500' },
          { title: 'Unresolved Complaints', count: complaintCount, icon: MessageSquare, color: 'border-red-500' },
          { title: 'New Applications', count: applicationCount, icon: FileText, color: 'border-green-500' },
      ];
    
      const cards = [
          {
          title: 'Elections',
          description: 'Create and manage election events',
          icon: Vote,
          link: '/admin/election'
          },
          {
            title: 'Account Verification',
            description: 'Verify teacher and student accounts',
            icon: UserCheck,
            link: '/admin/account-verification'
          },
          {
            title: 'Complaints',
            description: 'Review anonymous complaints',
            icon: MessageSquare,
            link: '/admin/complaints'
          },
          {
            title: 'Applications',
            description: 'Review and manage applications',
            icon: FileText,
            link: '/admin/applications'
          }
      ];

      const handleLogout = () => {
          dispatch(logoutAdmin());
          navigate("/auth/login");
      };

      // console.log(user)

  return (
    <div>
      {/* Header */}
      <div className="bg-white p-4 mb-8 rounded-lg shadow-md flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              <User size={20} className="text-gray-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-800">{user?.name}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
          </div>
          <button 
          onClick={handleLogout}
          className="flex items-center px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
            <LogOut size={18} className="mr-2" />
            Logout
          </button>
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Quick Access Cards */}
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Quick Access</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <DashboardCard key={card.title} {...card} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
