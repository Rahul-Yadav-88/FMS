import React, { useState, useRef } from 'react';
import { Bell, ChevronDown, Zap } from 'lucide-react';

const Navbar = ({ currentRole, setCurrentRole }) => {
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const dropdownRef = useRef(null);

  const roles = ['Admin', 'Accountant', 'Student'];

  const handleRoleChange = (role) => {
    setCurrentRole(role);
    setActiveItem('Dashboard');
    setIsRoleDropdownOpen(false);
    if (dropdownRef.current) dropdownRef.current.scrollTop = 0;
  };

  const getCurrentDate = () => {
    const date = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <nav className="bg-white/80 backdrop-blur-xl shadow-lg border-b border-white/20 px-6 py-4 relative overflow-visible z-50">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-indigo-600/5 animate-pulse"></div>

      <div className="flex items-center justify-between relative z-10">
        {/* Left Section */}
        <div className="animate-in slide-in-from-left duration-500">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Welcome back, {currentRole} User
          </h1>
          <p className="text-sm text-gray-500 flex items-center space-x-1 mt-1">
            <Zap className="h-3 w-3 text-yellow-500 animate-pulse" />
            <span>{getCurrentDate()}</span>
          </p>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4 animate-in slide-in-from-right duration-500">
          {/* Role Switcher */}
          <div className="flex items-center space-x-3 bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-2 rounded-xl border border-blue-100 shadow-sm">
            <span className="text-sm font-medium text-gray-700">Switch Role:</span>
            <div className="relative">
              <button
                onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                className="flex items-center space-x-2 px-4 py-2 bg-white/80 border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${
                    currentRole === 'Admin' ? 'bg-red-500' :
                    currentRole === 'Accountant' ? 'bg-green-500' :
                    'bg-purple-500'
                  }`}></div>
                  <span className="text-gray-800 font-medium">{currentRole}</span>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </button>

              {/* Dropdown */}
              {isRoleDropdownOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute right-0 mt-2 w-40 bg-white/95 backdrop-blur-xl rounded-lg shadow-xl border border-white/20 py-2 max-h-60 overflow-y-auto z-50"
                >
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
                        role === 'Accountant' ? 'bg-green-500' : 'bg-purple-500'
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
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300 relative group hover:scale-110"
            >
              <Bell className="h-5 w-5 group-hover:text-blue-600 transition-colors duration-300" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            </button>

            {/* Notifications Dropdown */}
            {isNotificationOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white/95 backdrop-blur-xl rounded-lg shadow-xl border border-white/20 py-2">
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

          {/* Updated Logo / Avatar */}
          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center ring-2 ring-blue-200 hover:ring-blue-400 transition-all duration-300 hover:scale-110">
            <span className="text-white font-bold text-sm">
              {currentRole.slice(0, 2).toUpperCase()}
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
