import React from 'react';
import {
  LayoutDashboard,
  Users,
  FileText,
  CreditCard,
  History,
  AlertCircle,
  GraduationCap,
  Sparkles,
} from 'lucide-react';

const Sidebar = ({ role, activeItem, setActiveItem }) => {
  const adminMenu = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'Students', icon: Users },
    { name: 'Fee Structures', icon: FileText },
    { name: 'Fee Collection', icon: CreditCard },
    { name: 'Payment History', icon: History },
    { name: 'Fee Dues', icon: AlertCircle },
  ];

  const accountantMenu = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'Fee Collection', icon: CreditCard },
    { name: 'Payment History', icon: FileText },
    { name: 'Fee Dues', icon: AlertCircle },
  ];

  const studentMenu = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'Payment History', icon: CreditCard },
    { name: 'Fee Dues', icon: AlertCircle },
  ];

  const menuItems =
    role === 'Admin' ? adminMenu :
    role === 'Accountant' ? accountantMenu :
    studentMenu;

  return (
    <div className="w-64 h-screen bg-white/80 backdrop-blur-xl shadow-2xl border-r border-white/20 flex flex-col relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-600/5 via-purple-600/5 to-indigo-600/5 animate-pulse"></div>

      {/* Header */}
      <div className="relative p-6 border-b border-gray-100 z-10">
        <div className="flex items-center space-x-3 group">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              SFMS
            </h2>
            <div className="flex items-center space-x-1">
              <Sparkles className="h-3 w-3 text-yellow-500 animate-pulse" />
              <p className="text-sm text-gray-600 capitalize font-medium">{role}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 py-6 px-4 relative z-10">
        <nav className="space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeItem === item.name;

            return (
              <button
                key={item.name}
                onClick={() => setActiveItem(item.name)}
                className={`w-full flex items-center px-4 py-3 rounded-xl text-left transition-all duration-300 group relative overflow-hidden ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl transform scale-105'
                    : 'text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-700 hover:scale-105'
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Icon
                  className={`mr-3 h-5 w-5 transition-all duration-300 ${
                    isActive ? 'animate-pulse' : 'group-hover:scale-110 text-gray-500'
                  }`}
                />
                <span className="font-medium">{item.name}</span>
                {isActive && (
                  <div className="absolute right-2 w-2 h-2 bg-white rounded-full animate-ping"></div>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Decorative bottom gradient */}
      <div className="h-20 bg-gradient-to-t from-blue-600/10 to-transparent z-0"></div>
    </div>
  );
};

export default Sidebar;
 