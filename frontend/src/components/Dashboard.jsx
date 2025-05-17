import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaClipboardList } from 'react-icons/fa';

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">👑 Admin Dashboard</h1>
        <p className="text-gray-600">Choose an action to manage today</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
        <Link
          to="/admin"
          className="bg-white shadow-lg hover:shadow-xl rounded-xl p-6 flex items-center space-x-4 transition duration-300 hover:bg-blue-50"
        >
          <FaHome className="text-blue-600 text-3xl" />
          <span className="text-xl text-gray-700 font-semibold">Manage Houses</span>
        </Link>

        <Link
          to="/ReservatinAdmin"
          className="bg-white shadow-lg hover:shadow-xl rounded-xl p-6 flex items-center space-x-4 transition duration-300 hover:bg-blue-50"
        >
          <FaClipboardList className="text-green-600 text-3xl" />
          <span className="text-xl text-gray-700 font-semibold">Manage Reservations</span>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
