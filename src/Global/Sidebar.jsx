import React from 'react';
import {
  LayoutDashboard,
  Users,
  FileText,
  CreditCard,
  History,
  AlertCircle,
  GraduationCap,
  ChevronRight,
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
    <div className="w-64 h-screen bg-white shadow-lg border-r border-gray-100 flex flex-col relative overflow-hidden">
      {/* Subtle animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-sky-50/20 animate-gradient-xy"></div>

      {/* Header */}
      <div className="relative p-6 border-b border-gray-100 z-10 bg-white/70 backdrop-blur-sm">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-blue-500 to-sky-500 p-3 rounded-xl shadow-sm transition-all duration-300 hover:shadow-md">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">SFMS</h2>
            <p className="text-sm text-gray-600 capitalize font-medium">{role}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 py-6 px-4 relative z-10">
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.name;

            return (
              <button
                key={item.name}
                onClick={() => setActiveItem(item.name)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-all duration-300 group relative overflow-hidden ${
                  isActive
                    ? 'bg-blue-50 border-l-4 border-blue-500 text-blue-700 shadow-sm transform translate-x-1'
                    : 'text-gray-600 hover:bg-blue-50/50 hover:text-blue-600 hover:translate-x-1'
                }`}
              >
                <div className="flex items-center">
                  <div className={`p-2 rounded-lg mr-3 transition-all duration-300 ${
                    isActive 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'bg-gray-100 text-gray-500 group-hover:bg-blue-100 group-hover:text-blue-500'
                  }`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="font-medium text-sm">{item.name}</span>
                </div>
                
                {isActive && (
                  <ChevronRight className="h-4 w-4 text-blue-500 animate-slide-in" />
                )}
                
                {/* Active indicator */}
                {isActive && (
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-blue-500 rounded-l-full"></div>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom subtle gradient */}
      <div className="h-8 bg-gradient-to-t from-blue-50/50 to-transparent z-0"></div>
    </div>
  );
};

export default Sidebar;