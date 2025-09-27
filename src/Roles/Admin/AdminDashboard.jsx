import React from 'react';

const AdminDashboard = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Admin Dashboard</h2>
          <p className="text-sm text-gray-500">Manage your school's financial operations</p>
        </div>
        <div className="space-x-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">+ Add Student</button>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">Create Fee Structure</button>
        </div>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-4 gap-6">
        {[
          { label: 'Total Students', value: '1,234' },
          { label: 'Total Collections', value: '₹12,45,000', note: 'This month, +2.8%' },
          { label: 'Outstanding Dues', value: '₹2,34,000', note: 'Pending payments, -5.1%' },
          { label: 'Collection Rate', value: '84.2%', note: 'This month, +2.1%' },
        ].map((metric) => (
          <div key={metric.label} className="bg-white p-4 rounded-xl shadow border border-gray-200">
            <h4 className="text-sm text-gray-500">{metric.label}</h4>
            <p className="text-xl font-semibold text-gray-800 mt-1">{metric.value}</p>
            {metric.note && <p className="text-xs text-green-600 mt-1">{metric.note}</p>}
          </div>
        ))}
      </div>

      {/* Recent Payments */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Recent Payments</h3>
        <p className="text-sm text-gray-500 mb-4">Latest fee payments received</p>
        <div className="bg-white rounded-xl shadow border border-gray-200 divide-y">
          {[
            { name: 'John Doe', amount: '₹5,000', date: '2024-01-05' },
            { name: 'Jane Smith', amount: '₹4,500', date: '2024-01-05' },
            { name: 'Mike Johnson', amount: '₹5,000', date: '2024-01-04' },
          ].map((payment, index) => (
            <div key={index} className="flex justify-between items-center px-4 py-3">
              <div>
                <p className="text-sm font-medium text-gray-800">{payment.name}</p>
                <p className="text-xs text-gray-500">{payment.date}</p>
              </div>
              <p className="text-sm font-semibold text-green-600">{payment.amount}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Quick Actions</h3>
        <p className="text-sm text-gray-500 mb-4">Frequently used actions</p>
        <div className="flex space-x-4">
          <button className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 text-gray-700 font-medium">Manage Students</button>
          <button className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 text-gray-700 font-medium">Fee Structure</button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
