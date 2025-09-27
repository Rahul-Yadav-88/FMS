import React, { useState } from 'react';
import Sidebar from './Global/Sidebar';
import Navbar from './Global/Navbar';
import AdminDashboard from './Roles/Admin/AdminDashboard';
import AdminStudents from './Roles/Admin/AdminStudents';


const App = () => {
  const [currentRole, setCurrentRole] = useState('Admin');
  const [activeItem, setActiveItem] = useState('Dashboard');

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar 
        role={currentRole} 
        activeItem={activeItem} 
        setActiveItem={setActiveItem} 
      />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1">
        {/* Navbar */}
        <Navbar 
          currentRole={currentRole} 
          setCurrentRole={setCurrentRole} 
          setActiveItem={setActiveItem} // Reset sidebar when role changes
        />

        {/* Page Content */}
        <div className="p-4 overflow-y-auto bg-gray-50">
          {/* Admin Views */}
          {currentRole === 'Admin' && activeItem === 'Dashboard' && <AdminDashboard />}
           {currentRole === 'Admin' && activeItem === 'Students' && <AdminStudents />}
          {/* You can add more views like this: */}
          {/* {currentRole === 'Admin' && activeItem === 'Students' && <AdminStudents />} */}
          {/* {currentRole === 'Accountant' && activeItem === 'Fee Collection' && <AccountantFeeCollection />} */}
        </div>
      </div>
    </div>
  );
};

export default App;
