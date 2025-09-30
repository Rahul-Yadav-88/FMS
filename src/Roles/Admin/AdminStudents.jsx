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
      Paid: 'bg-green-100 text-green-700 border border-green-200',
      Partial: 'bg-yellow-100 text-yellow-700 border border-yellow-200',
      Due: 'bg-red-100 text-red-700 border border-red-200',
    };
    
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[status]} transition-all duration-300`}>
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

  // Floating Animation Component
  const FloatingElements = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-10 left-10 w-4 h-4 bg-blue-300/30 rounded-full animate-float-slow"></div>
      <div className="absolute top-20 right-20 w-6 h-6 bg-blue-400/20 rounded-full animate-float-medium"></div>
      <div className="absolute bottom-20 left-20 w-3 h-3 bg-blue-500/30 rounded-full animate-float-fast"></div>
    </div>
  );

  // Animated Background
  const AnimatedBackground = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200/20 rounded-full animate-pulse-slow"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300/10 rounded-full animate-pulse-medium"></div>
    </div>
  );

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
    <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  );

  const CloseIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50/30 relative overflow-hidden">
      <AnimatedBackground />
      
      <div className="relative max-w-7xl mx-auto space-y-6 p-6">
        {/* Header */}
        <div className="flex justify-between items-center animate-slide-down">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg group hover:scale-105 transition-transform duration-300">
              <UsersIcon />
            </div>
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Student Management
              </h2>
              <p className="text-gray-600 flex items-center space-x-2 mt-1">
                <SparklesIcon />
                <span>Manage student information and records</span>
              </p>
            </div>
          </div>
          <button
            onClick={handleAddStudent}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-slide-in-right flex items-center group"
          >
            <PlusIcon />
            <span className="ml-2">Add Student</span>
          </button>
        </div>

        {/* Filters Card */}
        <div className="bg-white rounded-2xl border border-blue-100/50 shadow-xl hover:shadow-2xl transition-all duration-500 animate-slide-in-left backdrop-blur-sm">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100/50 border-b border-blue-100 px-6 py-4 rounded-t-2xl">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg">
                <FilterIcon />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Filters</h3>
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
                    className="w-full pl-10 pr-4 py-3 border-2 border-blue-100 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-blue-400 outline-none transition-all duration-300 hover:border-blue-300 bg-white/80"
                  />
                </div>
              </div>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-48 px-3 py-3 border-2 border-blue-100 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-blue-400 outline-none transition-all duration-300 hover:border-blue-300 bg-white/80"
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
        <div className="bg-white rounded-2xl border border-blue-100/50 shadow-xl hover:shadow-2xl transition-all duration-500 animate-slide-in-up backdrop-blur-sm">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100/50 border-b border-blue-100 px-6 py-4 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg">
                  <UsersIcon />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Students ({filteredStudents.length})</h3>
              </div>
              <div className="text-sm text-gray-600">Total: {students.length} students</div>
            </div>
            <p className="text-sm text-gray-600 mt-1">Manage student information and fee assignments</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-blue-50/80 to-blue-100/50 border-b border-blue-100">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Roll No.</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Student</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Class</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Section</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Parent</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Fee Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Due Amount</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-100">
                {filteredStudents.map((student, index) => (
                  <tr
                    key={student.id}
                    className="hover:bg-blue-50/50 transition-all duration-300 group animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-medium text-blue-600">{student.rollNo}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm group-hover:scale-110 transition-transform duration-300 shadow-lg">
                          {student.initials}
                        </div>
                        <div>
                          <span className="font-medium text-gray-800 block">{student.name}</span>
                          <span className="text-sm text-gray-500">{student.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-gray-800 font-medium">{student.class}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-gray-800">{student.section}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-gray-800">{student.parentName}</span>
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
                          className="p-2 hover:bg-blue-100 hover:text-blue-600 rounded-xl transition-all duration-300 hover:scale-110 group"
                          title="View Student"
                        >
                          <EyeIcon />
                        </button>
                        <button
                          onClick={() => handleEditStudent(student)}
                          className="p-2 hover:bg-green-100 hover:text-green-600 rounded-xl transition-all duration-300 hover:scale-110 group"
                          title="Edit Student"
                        >
                          <EditIcon />
                        </button>
                        <button
                          onClick={() => handleDeleteStudent(student)}
                          className="p-2 hover:bg-red-100 hover:text-red-600 rounded-xl transition-all duration-300 hover:scale-110 group"
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
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50 backdrop-blur-sm animate-modal-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-blue-100 animate-modal-slide-up">
            <FloatingElements />
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <UsersIcon />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">Student Details</h3>
                    <p className="text-gray-600">Complete student information</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsViewModalOpen(false)}
                  className="p-2 hover:bg-blue-50 rounded-xl transition-all duration-300 hover:scale-110"
                >
                  <CloseIcon />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries({
                  'Full Name': selectedStudent.name,
                  'Roll Number': selectedStudent.rollNo,
                  'Class': selectedStudent.class,
                  'Section': selectedStudent.section,
                  'Email': selectedStudent.email,
                  'Mobile': selectedStudent.mobile,
                  'Parent Name': selectedStudent.parentName,
                  'Fee Status': selectedStudent.feeStatus,
                  'Address': selectedStudent.address
                }).map(([key, value]) => (
                  <div key={key} className="space-y-2">
                    <label className="font-semibold text-sm text-gray-700">{key}</label>
                    <p className="p-3 bg-blue-50 rounded-xl text-gray-800 border border-blue-100">{value}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="px-6 py-4 border-t border-blue-100 bg-blue-50/50 flex justify-end rounded-b-3xl">
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Student Modal */}
      {isEditModalOpen && selectedStudent && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50 backdrop-blur-sm animate-modal-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-blue-100 animate-modal-slide-up">
            <FloatingElements />
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <EditIcon />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">Edit Student</h3>
                    <p className="text-gray-600">Update student information</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="p-2 hover:bg-blue-50 rounded-xl transition-all duration-300 hover:scale-110"
                >
                  <CloseIcon />
                </button>
              </div>
              <form onSubmit={handleUpdateStudent}>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { id: 'edit-name', name: 'name', label: 'Full Name', value: selectedStudent.name, type: 'text' },
                    { id: 'edit-rollNo', name: 'rollNo', label: 'Roll Number', value: selectedStudent.rollNo, type: 'text', disabled: true },
                    { id: 'edit-email', name: 'email', label: 'Email', value: selectedStudent.email, type: 'email' },
                    { id: 'edit-mobile', name: 'mobile', label: 'Mobile', value: selectedStudent.mobile, type: 'text' },
                    { id: 'edit-parentName', name: 'parentName', label: 'Parent Name', value: selectedStudent.parentName, type: 'text' },
                    { id: 'edit-address', name: 'address', label: 'Address', value: selectedStudent.address, type: 'text' },
                  ].map((field) => (
                    <div key={field.id} className="space-y-2">
                      <label htmlFor={field.id} className="font-semibold text-sm text-gray-700">{field.label}</label>
                      <input
                        id={field.id}
                        name={field.name}
                        type={field.type}
                        defaultValue={field.value}
                        disabled={field.disabled}
                        className="w-full p-3 border-2 border-blue-100 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-blue-400 outline-none transition-all duration-300 hover:border-blue-300 bg-white/80"
                      />
                    </div>
                  ))}
                </div>
                <div className="flex justify-end space-x-3 pt-6 mt-6 border-t border-blue-100">
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="px-6 py-3 border border-blue-200 text-blue-700 rounded-xl hover:bg-blue-50 transition-all duration-300 hover:scale-105 bg-white/80"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    Update Student
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Add Student Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50 backdrop-blur-sm animate-modal-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-blue-100 animate-modal-slide-up">
            <FloatingElements />
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <PlusIcon />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">Add New Student</h3>
                    <p className="text-gray-600">Enter student details to add them to the system</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-2 hover:bg-blue-50 rounded-xl transition-all duration-300 hover:scale-110"
                >
                  <CloseIcon />
                </button>
              </div>
              <form onSubmit={handleAddNewStudent}>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { id: 'add-name', name: 'name', label: 'Full Name', placeholder: 'Enter full name', type: 'text', required: true },
                    { id: 'add-rollNo', name: 'rollNo', label: 'Roll Number', placeholder: 'Enter roll number', type: 'text', required: true },
                    { id: 'add-class', name: 'class', label: 'Class', type: 'select', required: true, options: ['8-A', '9-A', '9-B', '10-A', '10-B'] },
                    { id: 'add-section', name: 'section', label: 'Section', type: 'select', required: true, options: ['Science', 'Commerce', 'Arts'] },
                    { id: 'add-email', name: 'email', label: 'Email', placeholder: 'Enter email', type: 'email', required: true },
                    { id: 'add-mobile', name: 'mobile', label: 'Mobile', placeholder: 'Enter mobile number', type: 'text', required: true },
                    { id: 'add-parentName', name: 'parentName', label: 'Parent Name', placeholder: 'Enter parent name', type: 'text', required: true },
                    { id: 'add-address', name: 'address', label: 'Address', placeholder: 'Enter address', type: 'text', required: true },
                  ].map((field) => (
                    <div key={field.id} className="space-y-2">
                      <label htmlFor={field.id} className="font-semibold text-sm text-gray-700">{field.label}</label>
                      {field.type === 'select' ? (
                        <select
                          id={field.id}
                          name={field.name}
                          className="w-full p-3 border-2 border-blue-100 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-blue-400 outline-none transition-all duration-300 hover:border-blue-300 bg-white/80"
                          required={field.required}
                        >
                          <option value="">Select {field.label.toLowerCase()}</option>
                          {field.options.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      ) : (
                        <input
                          id={field.id}
                          name={field.name}
                          type={field.type}
                          placeholder={field.placeholder}
                          className="w-full p-3 border-2 border-blue-100 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-blue-400 outline-none transition-all duration-300 hover:border-blue-300 bg-white/80"
                          required={field.required}
                        />
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex justify-end pt-6 mt-6 border-t border-blue-100">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    Add Student
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && selectedStudent && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50 backdrop-blur-sm animate-modal-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full border border-blue-100 animate-modal-slide-up">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                  <TrashIcon />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-red-600">Confirm Delete</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Are you sure you want to delete {selectedStudent.name}?
                  </p>
                </div>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="px-6 py-3 border border-blue-200 text-blue-700 rounded-xl hover:bg-blue-50 transition-all duration-300 hover:scale-105 bg-white/80"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Delete Student
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-5deg); }
        }
        @keyframes float-fast {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.2; transform: scale(1.1); }
        }
        @keyframes pulse-medium {
          0%, 100% { opacity: 0.05; transform: scale(1); }
          50% { opacity: 0.15; transform: scale(1.05); }
        }
        @keyframes modal-fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modal-slide-up {
          from { opacity: 0; transform: translateY(30px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-in-right {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slide-in-left {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slide-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-float-slow { animation: float-slow 6s ease-in-out infinite; }
        .animate-float-medium { animation: float-medium 4s ease-in-out infinite; }
        .animate-float-fast { animation: float-fast 3s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 8s ease-in-out infinite; }
        .animate-pulse-medium { animation: pulse-medium 6s ease-in-out infinite; }
        .animate-modal-fade-in { animation: modal-fade-in 0.3s ease-out; }
        .animate-modal-slide-up { animation: modal-slide-up 0.4s ease-out; }
        .animate-slide-down { animation: slide-down 0.5s ease-out; }
        .animate-slide-in-right { animation: slide-in-right 0.5s ease-out; }
        .animate-slide-in-left { animation: slide-in-left 0.5s ease-out; }
        .animate-slide-in-up { animation: slide-in-up 0.5s ease-out; }
        .animate-fade-in { animation: fade-in 0.4s ease-out; }
      `}</style>
    </div>
  );
};

export default AdminStudents;