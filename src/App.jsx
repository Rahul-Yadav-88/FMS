import React, { useState } from 'react';
import Sidebar from './Global/Sidebar';
import Navbar from './Global/Navbar';
import AdminDashboard from './Roles/Admin/AdminDashboard';
import AdminStudents from './Roles/Admin/AdminStudents';
import AdminFeeStructure from './Roles/Admin/AdminFeeStructure';
import AdminFeeCollection from './Roles/Admin/AdminFeeCollection';
import AdminPaymentHistory from './Roles/Admin/AdminPaymentHistory';
import AdminFeesDues from './Roles/Admin/AdminFeesDues';
import AccountantDashboard from './Roles/Accountant/AccountantDashboard';
import StudentDashboard from './Roles/Student/StudentDashboard';



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
         {currentRole === 'Admin' && activeItem === 'Dashboard' && <AdminDashboard />}
         {currentRole === 'Admin' && activeItem === 'Students' && <AdminStudents />}
         {currentRole === 'Admin' && activeItem === 'Fee Structures' && <AdminFeeStructure />}
         {currentRole === 'Admin' && activeItem === 'Fee Collection' && <AdminFeeCollection />}
         {currentRole === 'Admin' && activeItem === 'Payment History' && <AdminPaymentHistory />}
         {currentRole === 'Admin' && activeItem === 'Fee Dues' && <AdminFeesDues />}
         {currentRole === 'Accountant' && activeItem === 'Dashboard' && <AccountantDashboard />}
         {currentRole === 'Accountant' && activeItem === 'Fee Collection' && <AdminFeeCollection />}
         {currentRole === 'Accountant' && activeItem === 'Payment History' && <AdminPaymentHistory />}
         {currentRole === 'Accountant' && activeItem === 'Fee Dues' && <AdminFeesDues />}
         {currentRole === 'Student' && activeItem === 'Dashboard' && <StudentDashboard />}
         {currentRole === 'Student' && activeItem === 'Payment History' && <AdminPaymentHistory />}
         {currentRole === 'Student' && activeItem === 'Fee Dues' && <AdminFeesDues />}
        </div>
      </div>
    </div>
  );
};

export default App;
