import React, { useState, useRef } from 'react';
import { Bell, ChevronDown, Calendar } from 'lucide-react';

const Navbar = ({ currentRole, setCurrentRole, setActiveItem }) => {
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
    <nav className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 relative z-50">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 to-sky-50/20"></div>

      <div className="flex items-center justify-between relative z-10">
        {/* Left Section */}
        <div className="animate-fade-in">
          <h1 className="text-xl font-semibold text-gray-800">
            Welcome back, {currentRole}
          </h1>
          <p className="text-sm text-gray-600 flex items-center space-x-2 mt-1">
            <Calendar className="h-3 w-3 text-blue-500" />
            <span>{getCurrentDate()}</span>
          </p>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Role Switcher */}
          <div className="flex items-center space-x-3 bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm">
            <span className="text-sm font-medium text-gray-700">Role:</span>
            <div className="relative">
              <button
                onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                className="flex items-center space-x-2 px-3 py-2 bg-white border border-gray-300 rounded-md hover:border-blue-400 transition-all duration-200"
              >
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${
                    currentRole === 'Admin' ? 'bg-red-500' :
                    currentRole === 'Accountant' ? 'bg-green-500' :
                    'bg-blue-500'
                  }`}></div>
                  <span className="text-gray-800 font-medium text-sm">{currentRole}</span>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-500 transition-transform duration-200" />
              </button>

              {/* Dropdown */}
              {isRoleDropdownOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-1 max-h-60 overflow-y-auto z-50 animate-dropdown"
                >
                  {roles.map((role) => (
                    <button
                      key={role}
                      onClick={() => handleRoleChange(role)}
                      className={`w-full text-left px-3 py-2 text-sm hover:bg-blue-50 flex items-center space-x-2 transition-colors duration-200 ${
                        currentRole === role ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                      }`}
                    >
                      <div className={`w-2 h-2 rounded-full ${
                        role === 'Admin' ? 'bg-red-500' :
                        role === 'Accountant' ? 'bg-green-500' : 'bg-blue-500'
                      }`}></div>
                      <span className="font-medium">{role}</span>
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
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 relative group"
            >
              <Bell className="h-5 w-5 transition-colors duration-200" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
            </button>

            {/* Notifications Dropdown */}
            {isNotificationOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2 animate-dropdown">
                <div className="px-4 py-2 border-b border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-800">Notifications</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  <div className="px-4 py-3 hover:bg-blue-50 cursor-pointer transition-colors duration-200">
                    <p className="text-sm text-gray-800">New student registration pending</p>
                    <p className="text-xs text-gray-500 mt-1">2 minutes ago</p>
                  </div>
                  <div className="px-4 py-3 hover:bg-blue-50 cursor-pointer transition-colors duration-200">
                    <p className="text-sm text-gray-800">Fee payment received from John Doe</p>
                    <p className="text-xs text-gray-500 mt-1">5 minutes ago</p>
                  </div>
                  <div className="px-4 py-3 hover:bg-blue-50 cursor-pointer transition-colors duration-200">
                    <p className="text-sm text-gray-800">Monthly report is ready</p>
                    <p className="text-xs text-gray-500 mt-1">1 hour ago</p>
                  </div>
                </div>
                <div className="px-4 py-2 border-t border-gray-200">
                  <button className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Avatar */}
          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-sky-500 flex items-center justify-center ring-2 ring-blue-100 hover:ring-blue-300 transition-all duration-200">
            <span className="text-white font-semibold text-sm">
              {currentRole.slice(0, 2).toUpperCase()}
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;  