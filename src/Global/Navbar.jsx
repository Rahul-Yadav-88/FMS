import React, { useState } from 'react';

const Navbar = ({ currentRole, setCurrentRole }) => {
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const roles = ['Admin', 'Accountant', 'Student'];

  const handleRoleChange = (role) => {
  setCurrentRole(role);
  setActiveItem('Dashboard');
  setIsRoleDropdownOpen(false);
};

  const getCurrentDate = () => {
    const date = new Date();
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <nav className="bg-gray-50 border-b border-gray-200 px-6 py-4 flex items-center justify-between relative z-50">
      {/* Left Section - Welcome Message */}
      <div className="flex flex-col">
        <h1 className="text-2xl font-semibold text-gray-800">
          Welcome back, {currentRole} User
        </h1>
        <div className="flex items-center text-sm text-gray-600 mt-1">
          <span className="text-yellow-500 mr-1">⚡</span>
          <span>{getCurrentDate()}</span>
        </div>
      </div>

      {/* Right Section - Role Switcher, Notifications & Profile */}
      <div className="flex items-center space-x-4">
        {/* Role Switcher */}
        <div className="flex items-center space-x-3">
          <span className="text-gray-600 font-medium">Switch Role:</span>
          <div className="relative">
            <button
              onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
              className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${
                  currentRole === 'Admin' ? 'bg-red-500' :
                  currentRole === 'Accountant' ? 'bg-green-500' :
                  'bg-blue-500'
                }`}></div>
                <span className="text-gray-800 font-medium">{currentRole}</span>
              </div>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Role Dropdown */}
            {isRoleDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                {roles.map((role) => (
                  <button
                    key={role}
                    onClick={() => handleRoleChange(role)}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center space-x-2 ${
                      currentRole === role ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                    }`}
                  >
                    <div className={`w-2 h-2 rounded-full ${
                      role === 'Admin' ? 'bg-red-500' : 
                      role === 'Accountant' ? 'bg-green-500' : 'bg-blue-500'
                    }`}></div>
                    <span>{role}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setIsNotificationOpen(!isNotificationOpen)}
            className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors relative"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-3.5-3.5a8.31 8.31 0 000-11.7c-7.3-7.3-19.1-7.3-26.4 0a8.31 8.31 0 000 11.7L12 21l3-4z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.73 21a2 2 0 01-3.46 0" />
            </svg>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
          </button>

          {/* Notifications Dropdown */}
          {isNotificationOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
              <div className="px-4 py-2 border-b border-gray-200">
                <h3 className="text-sm font-semibold text-gray-800">Notifications</h3>
              </div>
              <div className="max-h-64 overflow-y-auto">
                <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer">
                  <p className="text-sm text-gray-800">New student registration pending</p>
                  <p className="text-xs text-gray-500 mt-1">2 minutes ago</p>
                </div>
                <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer">
                  <p className="text-sm text-gray-800">Fee payment received from John Doe</p>
                  <p className="text-xs text-gray-500 mt-1">5 minutes ago</p>
                </div>
                <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer">
                  <p className="text-sm text-gray-800">Monthly report is ready</p>
                  <p className="text-xs text-gray-500 mt-1">1 hour ago</p>
                </div>
              </div>
              <div className="px-4 py-2 border-t border-gray-200">
                <button className="text-sm text-blue-600 hover:text-blue-800">View all notifications</button>
              </div>
            </div>
          )}
        </div>

        {/* User Avatar */}
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
          <span className="text-white font-semibold text-sm">{currentRole.slice(0, 2).toUpperCase()}</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
