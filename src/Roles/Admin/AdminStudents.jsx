import React, { useState } from 'react';

const AdminStudents = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  // Sample student data
  const [students, setStudents] = useState([
    {
      id: 1,
      rollNo: '2024001',
      initials: 'JD',
      name: 'John Doe',
      class: '10-A',
      section: 'Science',
      email: 'john.doe@email.com',
      mobile: '+91 9876543210',
      parentName: 'Robert Doe',
      address: '123 Main St, City',
      feeStatus: 'Paid',
      dueAmount: 0,
    },
    {
      id: 2,
      rollNo: '2024002',
      initials: 'JS',
      name: 'Jane Smith',
      class: '10-A',
      section: 'Science',
      email: 'jane.smith@email.com',
      mobile: '+91 9876543211',
      parentName: 'Michael Smith',
      address: '456 Oak Ave, City',
      feeStatus: 'Partial',
      dueAmount: 5000,
    },
    {
      id: 3,
      rollNo: '2024003',
      initials: 'MJ',
      name: 'Mike Johnson',
      class: '9-B',
      section: 'Commerce',
      email: 'mike.johnson@email.com',
      mobile: '+91 9876543212',
      parentName: 'David Johnson',
      address: '789 Pine Rd, City',
      feeStatus: 'Due',
      dueAmount: 15000,
    },
  ]);

  // Filter students based on search term and class
  const filteredStudents = students.filter(student => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = selectedClass === 'all' || student.class === selectedClass;
    return matchesSearch && matchesClass;
  });

  const getStatusBadge = (status) => {
    const statusStyles = {
      Paid: 'bg-green-100 text-green-800 border-green-200 animate-pulse',
      Partial: 'bg-yellow-100 text-yellow-800 border-yellow-200 animate-pulse',
      Due: 'bg-red-100 text-red-800 border-red-200 animate-pulse',
    };
    
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusStyles[status]}`}>
        {status}
      </span>
    );
  };

  // Action handlers
  const handleViewStudent = (student) => {
    setSelectedStudent(student);
    setIsViewModalOpen(true);
  };

  const handleEditStudent = (student) => {
    setSelectedStudent(student);
    setIsEditModalOpen(true);
  };

  const handleDeleteStudent = (student) => {
    setSelectedStudent(student);
    setIsDeleteModalOpen(true);
  };

  const handleAddStudent = () => {
    setIsAddModalOpen(true);
  };

  const confirmDelete = () => {
    setStudents(students.filter(s => s.id !== selectedStudent.id));
    setIsDeleteModalOpen(false);
    setSelectedStudent(null);
  };

  const handleUpdateStudent = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedData = {
      name: formData.get('name'),
      email: formData.get('email'),
      mobile: formData.get('mobile'),
      parentName: formData.get('parentName'),
      address: formData.get('address'),
    };
    
    setStudents(students.map(s => 
      s.id === selectedStudent.id ? { ...s, ...updatedData } : s
    ));
    setIsEditModalOpen(false);
    setSelectedStudent(null);
  };

  const handleAddNewStudent = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newStudent = {
      id: students.length + 1,
      rollNo: formData.get('rollNo'),
      initials: formData.get('name').split(' ').map(n => n[0]).join(''),
      name: formData.get('name'),
      class: formData.get('class'),
      section: formData.get('section'),
      email: formData.get('email'),
      mobile: formData.get('mobile'),
      parentName: formData.get('parentName'),
      address: formData.get('address'),
      feeStatus: 'Due',
      dueAmount: 0,
    };
    
    setStudents([...students, newStudent]);
    setIsAddModalOpen(false);
  };

  // Icons as SVG components
  const SearchIcon = () => (
    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );

  const UsersIcon = () => (
    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
    </svg>
  );

  const PlusIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  );

  const EyeIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  );

  const EditIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
  );

  const TrashIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  );

  const FilterIcon = () => (
    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
    </svg>
  );

  const SparklesIcon = () => (
    <svg className="w-4 h-4 text-blue-500 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  );

  const CloseIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center animate-in slide-in-from-top duration-500">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl shadow-lg">
              <UsersIcon />
            </div>
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Student Management
              </h2>
              <p className="text-gray-600 flex items-center space-x-1">
                <SparklesIcon />
                <span>Manage student information and records</span>
              </p>
            </div>
          </div>
          <button
            onClick={handleAddStudent}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all hover:scale-105 animate-in slide-in-from-right duration-500 flex items-center"
          >
            <PlusIcon />
            <span className="ml-2">Add Student</span>
          </button>
        </div>

        {/* Filters Card */}
        <div className="bg-white rounded-lg border-0 shadow-xl hover:shadow-2xl transition-all duration-500 animate-in slide-in-from-left mt-8">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-b px-6 py-4 rounded-t-lg">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                <FilterIcon />
              </div>
              <h3 className="text-lg font-semibold">Filters</h3>
            </div>
          </div>
          <div className="p-6">
            <div className="flex space-x-4">
              <div className="flex-1">
                <div className="relative">
                  <div className="absolute left-3 top-3">
                    <SearchIcon />
                  </div>
                  <input
                    type="text"
                    placeholder="Search by name or roll number..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-300 shadow-sm hover:shadow-md"
                  />
                </div>
              </div>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-48 px-3 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <option value="all">All Classes</option>
                <option value="8-A">8-A</option>
                <option value="9-A">9-A</option>
                <option value="9-B">9-B</option>
                <option value="10-A">10-A</option>
                <option value="10-B">10-B</option>
              </select>
            </div>
          </div>
        </div>

        {/* Students Table Card */}
        <div className="bg-white rounded-lg border-0 shadow-xl hover:shadow-2xl transition-all animate-in slide-in-from-bottom duration-700 mt-8">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 border-b px-6 py-4 rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg">
                  <UsersIcon />
                </div>
                <h3 className="text-lg font-semibold">Students ({filteredStudents.length})</h3>
              </div>
              <div className="text-sm text-gray-500">Total: {students.length} students</div>
            </div>
            <p className="text-sm text-gray-600 mt-1">Manage student information and fee assignments</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b">
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Roll No.
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Class
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Section
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Parent
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Fee Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Due Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredStudents.map((student, index) => (
                  <tr
                    key={student.id}
                    className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all animate-in slide-in-from-left duration-500"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-medium text-blue-600">{student.rollNo}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                          {student.initials}
                        </div>
                        <span className="font-medium">{student.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-gray-900">{student.class}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-gray-900">{student.section}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-gray-900">{student.parentName}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(student.feeStatus)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {student.dueAmount > 0 ? (
                        <span className="font-bold text-red-600">₹{student.dueAmount.toLocaleString()}</span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleViewStudent(student)}
                          className="p-2 hover:bg-blue-100 hover:text-blue-600 rounded transition-all duration-300 hover:scale-110"
                          title="View Student"
                        >
                          <EyeIcon />
                        </button>
                        <button
                          onClick={() => handleEditStudent(student)}
                          className="p-2 hover:bg-green-100 hover:text-green-600 rounded transition-all duration-300 hover:scale-110"
                          title="Edit Student"
                        >
                          <EditIcon />
                        </button>
                        <button
                          onClick={() => handleDeleteStudent(student)}
                          className="p-2 hover:bg-red-100 hover:text-red-600 rounded transition-all duration-300 hover:scale-110"
                          title="Delete Student"
                        >
                          <TrashIcon />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* View Student Modal */}
      {isViewModalOpen && selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto backdrop-blur-xl border border-white/20">
            <div className="px-6 py-4 border-b">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Student Details
                </h3>
                <button
                  onClick={() => setIsViewModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-150"
                >
                  <CloseIcon />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="font-semibold text-sm">Full Name</label>
                  <p className="p-2 bg-gray-50 rounded text-gray-900">{selectedStudent.name}</p>
                </div>
                <div className="space-y-2">
                  <label className="font-semibold text-sm">Roll Number</label>
                  <p className="p-2 bg-gray-50 rounded text-gray-900">{selectedStudent.rollNo}</p>
                </div>
                <div className="space-y-2">
                  <label className="font-semibold text-sm">Class</label>
                  <p className="p-2 bg-gray-50 rounded text-gray-900">{selectedStudent.class}</p>
                </div>
                <div className="space-y-2">
                  <label className="font-semibold text-sm">Section</label>
                  <p className="p-2 bg-gray-50 rounded text-gray-900">{selectedStudent.section}</p>
                </div>
                <div className="space-y-2">
                  <label className="font-semibold text-sm">Email</label>
                  <p className="p-2 bg-gray-50 rounded text-gray-900">{selectedStudent.email}</p>
                </div>
                <div className="space-y-2">
                  <label className="font-semibold text-sm">Mobile</label>
                  <p className="p-2 bg-gray-50 rounded text-gray-900">{selectedStudent.mobile}</p>
                </div>
                <div className="space-y-2">
                  <label className="font-semibold text-sm">Parent Name</label>
                  <p className="p-2 bg-gray-50 rounded text-gray-900">{selectedStudent.parentName}</p>
                </div>
                <div className="space-y-2">
                  <label className="font-semibold text-sm">Fee Status</label>
                  <p className="p-2 bg-gray-50 rounded text-gray-900">{selectedStudent.feeStatus}</p>
                </div>
                <div className="col-span-2 space-y-2">
                  <label className="font-semibold text-sm">Address</label>
                  <p className="p-2 bg-gray-50 rounded text-gray-900">{selectedStudent.address}</p>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t bg-gray-50 flex justify-end rounded-b-lg">
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-150"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Student Modal */}
      {isEditModalOpen && selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto backdrop-blur-xl border border-white/20">
            <div className="px-6 py-4 border-b">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Edit Student
                </h3>
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-150"
                >
                  <CloseIcon />
                </button>
              </div>
            </div>
            <form onSubmit={handleUpdateStudent}>
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="edit-name" className="font-semibold text-sm">Full Name</label>
                    <input
                      id="edit-name"
                      name="name"
                      defaultValue={selectedStudent.name}
                      className="w-full p-2 border-2 border-gray-200 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="edit-rollNo" className="font-semibold text-sm">Roll Number</label>
                    <input
                      id="edit-rollNo"
                      defaultValue={selectedStudent.rollNo}
                      disabled
                      className="w-full p-2 bg-gray-100 rounded-lg text-gray-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="edit-email" className="font-semibold text-sm">Email</label>
                    <input
                      id="edit-email"
                      name="email"
                      type="email"
                      defaultValue={selectedStudent.email}
                      className="w-full p-2 border-2 border-gray-200 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="edit-mobile" className="font-semibold text-sm">Mobile</label>
                    <input
                      id="edit-mobile"
                      name="mobile"
                      defaultValue={selectedStudent.mobile}
                      className="w-full p-2 border-2 border-gray-200 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="edit-parentName" className="font-semibold text-sm">Parent Name</label>
                    <input
                      id="edit-parentName"
                      name="parentName"
                      defaultValue={selectedStudent.parentName}
                      className="w-full p-2 border-2 border-gray-200 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="edit-address" className="font-semibold text-sm">Address</label>
                    <input
                      id="edit-address"
                      name="address"
                      defaultValue={selectedStudent.address}
                      className="w-full p-2 border-2 border-gray-200 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-300"
                    />
                  </div>
                </div>
              </div>
              <div className="px-6 py-4 border-t bg-gray-50 flex justify-end space-x-2 rounded-b-lg">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-150"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  Update Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Student Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto backdrop-blur-xl border border-white/20">
            <div className="px-6 py-4 border-b">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Add New Student
                </h3>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-150"
                >
                  <CloseIcon />
                </button>
              </div>
              <p className="text-sm text-gray-600 mt-1">Enter student details to add them to the system.</p>
            </div>
            <form onSubmit={handleAddNewStudent}>
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="add-name" className="font-semibold text-sm">Full Name</label>
                    <input
                      id="add-name"
                      name="name"
                      placeholder="Enter full name"
                      className="w-full p-2 border-2 border-gray-200 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-300"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="add-rollNo" className="font-semibold text-sm">Roll Number</label>
                    <input
                      id="add-rollNo"
                      name="rollNo"
                      placeholder="Enter roll number"
                      className="w-full p-2 border-2 border-gray-200 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-300"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="add-class" className="font-semibold text-sm">Class</label>
                    <select
                      id="add-class"
                      name="class"
                      className="w-full p-2 border-2 border-gray-200 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-300"
                      required
                    >
                      <option value="">Select class</option>
                      <option value="8-A">8-A</option>
                      <option value="9-A">9-A</option>
                      <option value="9-B">9-B</option>
                      <option value="10-A">10-A</option>
                      <option value="10-B">10-B</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="add-section" className="font-semibold text-sm">Section</label>
                    <select
                      id="add-section"
                      name="section"
                      className="w-full p-2 border-2 border-gray-200 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-300"
                      required
                    >
                      <option value="">Select section</option>
                      <option value="Science">Science</option>
                      <option value="Commerce">Commerce</option>
                      <option value="Arts">Arts</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="add-email" className="font-semibold text-sm">Email</label>
                    <input
                      id="add-email"
                      name="email"
                      type="email"
                      placeholder="Enter email"
                      className="w-full p-2 border-2 border-gray-200 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-300"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="add-mobile" className="font-semibold text-sm">Mobile</label>
                    <input
                      id="add-mobile"
                      name="mobile"
                      placeholder="Enter mobile number"
                      className="w-full p-2 border-2 border-gray-200 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-300"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="add-parentName" className="font-semibold text-sm">Parent Name</label>
                    <input
                      id="add-parentName"
                      name="parentName"
                      placeholder="Enter parent name"
                      className="w-full p-2 border-2 border-gray-200 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-300"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="add-address" className="font-semibold text-sm">Address</label>
                    <input
                      id="add-address"
                      name="address"
                      placeholder="Enter address"
                      className="w-full p-2 border-2 border-gray-200 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-300"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="px-6 py-4 border-t bg-gray-50 flex justify-end rounded-b-lg">
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  Add Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full backdrop-blur-xl border border-white/20">
            <div className="px-6 py-4 border-b">
              <h3 className="text-xl font-semibold text-red-600">Confirm Delete</h3>
              <p className="text-sm text-gray-600 mt-1">
                Are you sure you want to delete {selectedStudent.name}? This action cannot be undone.
              </p>
            </div>
            <div className="px-6 py-4 flex justify-end space-x-2">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-150"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Delete Student
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminStudents;