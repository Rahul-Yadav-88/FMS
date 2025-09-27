import React from 'react';
import { LayoutDashboard, Users, FileText, CreditCard, History, AlertCircle, GraduationCap } from 'lucide-react';

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
    { name: 'Payment Verifications', icon: FileText },
    { name: 'Fee Dues', icon: AlertCircle },
  ];

  const studentMenu = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'My Payments', icon: CreditCard },
    { name: 'My Dues', icon: AlertCircle },
  ];

  const menuItems =
    role === 'Admin' ? adminMenu :
    role === 'Accountant' ? accountantMenu :
    studentMenu;

  return (
    <div className="w-80 h-screen bg-gray-50 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <GraduationCap className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">SFMS</h1>
            <p className="text-sm text-yellow-500 flex items-center">
              <span className="mr-1">⚡</span>
              {role}
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 py-6">
        <nav className="px-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.name;

            return (
              <button
                key={item.name}
                onClick={() => setActiveItem(item.name)}
                className={`
                  w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 group
                  ${isActive 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
                    : 'text-gray-700 hover:bg-gray-100'
                  }
                `}
              >
                <Icon 
                  className={`w-5 h-5 ${
                    isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-700'
                  }`} 
                />
                <span className="font-medium">{item.name}</span>
                {isActive && (
                  <div className="ml-auto w-2 h-2 bg-white rounded-full opacity-80"></div>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center justify-center">
          <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-sm">N</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
