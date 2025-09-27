import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';

const AdminStudents = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Student Management</h2>
          <p className="text-sm text-gray-500">Manage student information and records</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">+ Add Student</button>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search by name or roll number..."
          className="px-4 py-2 border border-gray-300 rounded-lg w-1/2"
        />
        <select className="px-4 py-2 border border-gray-300 rounded-lg">
          <option>All Classes</option>
          <option>Class 10-A</option>
          <option>Class 9-B</option>
        </select>
      </div>

      {/* Students Table */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Students (3)</h3>
        <p className="text-sm text-gray-500 mb-4">Manage student information and fee assignments</p>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-xl shadow">
            <thead className="bg-gray-100 text-gray-600 text-sm">
              <tr>
                <th className="px-4 py-3 text-left">Roll No.</th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Class</th>
                <th className="px-4 py-3 text-left">Section</th>
                <th className="px-4 py-3 text-left">Parent</th>
                <th className="px-4 py-3 text-left">Fee Status</th>
                <th className="px-4 py-3 text-left">Due Amount</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700">
              <tr className="border-t">
                <td className="px-4 py-3">2024001</td>
                <td className="px-4 py-3">John Doe</td>
                <td className="px-4 py-3">10-A</td>
                <td className="px-4 py-3">Science</td>
                <td className="px-4 py-3">Robert Doe</td>
                <td className="px-4 py-3 text-green-600 font-medium">Paid</td>
                <td className="px-4 py-3">—</td>
                <td className="px-4 py-3 flex space-x-2">
                  <button className="text-blue-600 hover:text-blue-800">
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button className="text-red-600 hover:text-red-800">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
              {/* Add more rows here */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminStudents;
