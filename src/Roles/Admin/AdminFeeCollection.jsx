import React, { useState } from 'react';
import { Search, CreditCard, Download, Upload, Sparkles } from 'lucide-react';

const AdminFeeCollection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentMode, setPaymentMode] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [remarks, setRemarks] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const students = [
    {
      rollNo: '2024001',
      name: 'John Doe',
      initials: 'JD',
      class: '10-A',
      totalFees: 50000,
      paidAmount: 35000,
      dueAmount: 15000,
      lastPayment: '2024-01-15',
      status: 'Partial'
    },
    {
      rollNo: '2024002',
      name: 'Jane Smith',
      initials: 'JS',
      class: '10-A',
      totalFees: 50000,
      paidAmount: 0,
      dueAmount: 50000,
      lastPayment: null,
      status: 'Due'
    },
    {
      rollNo: '2024003',
      name: 'Mike Johnson',
      initials: 'MJ',
      class: '9-B',
      totalFees: 45000,
      paidAmount: 45000,
      dueAmount: 0,
      lastPayment: '2024-01-20',
      status: 'Paid'
    }
  ];

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.rollNo.includes(searchQuery)
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-100 text-green-700 animate-pulse';
      case 'Partial':
        return 'bg-yellow-100 text-yellow-700 animate-pulse';
      case 'Due':
        return 'bg-red-100 text-red-700 animate-pulse';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const handleCollectFee = (student) => {
    setSelectedStudent(student);
    setPaymentAmount('');
    setPaymentMode('');
    setTransactionId('');
    setRemarks('');
    setIsDialogOpen(true);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the payment submission
    console.log({
      student: selectedStudent,
      paymentAmount,
      paymentMode,
      transactionId,
      remarks
    });
    setIsDialogOpen(false);
    // Reset form
    setPaymentAmount('');
    setPaymentMode('');
    setTransactionId('');
    setRemarks('');
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log('File selected:', file.name);
      // Handle file upload logic here
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-8 animate-in slide-in-from-top duration-500">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
              <CreditCard className="w-8 h-8 text-white" strokeWidth={2} />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Fee Collection
              </h1>
              <p className="text-gray-600 mt-1 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-green-500 animate-pulse" />
                Manage your school's fee collection
              </p>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="relative w-80 animate-in slide-in-from-right duration-500">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search students..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md"
            />
          </div>
        </div>

        {/* Students Table Card */}
        <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all overflow-hidden animate-in slide-in-from-bottom duration-700">
          {/* Table Header Section */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 px-6 py-5 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-white" strokeWidth={2} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Students with Outstanding Fees</h2>
                <p className="text-gray-600 text-sm mt-0.5">Collect fees and mark payments</p>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Roll No.</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Class</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Total Fees</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Paid Amount</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Due Amount</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student, index) => (
                  <tr 
                    key={student.rollNo} 
                    className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-green-50 hover:to-blue-50 transition-all animate-in slide-in-from-left duration-500"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <td className="px-6 py-4">
                      <span className="text-blue-600 font-medium">{student.rollNo}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center text-white font-semibold text-sm">
                          {student.initials}
                        </div>
                        <span className="font-medium text-gray-900">{student.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-700">{student.class}</td>
                    <td className="px-6 py-4 font-bold text-gray-900">₹{student.totalFees.toLocaleString()}</td>
                    <td className="px-6 py-4 font-bold text-green-600">₹{student.paidAmount.toLocaleString()}</td>
                    <td className="px-6 py-4 font-medium text-red-600">₹{student.dueAmount.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${getStatusColor(student.status)}`}>
                        {student.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {student.dueAmount > 0 && (
                          <button 
                            onClick={() => handleCollectFee(student)}
                            className="px-4 py-2 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg font-medium hover:from-green-700 hover:to-blue-700 transition-all flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105 duration-300"
                          >
                            <CreditCard className="w-4 h-4" />
                            Collect Fee
                          </button>
                        )}
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 hover:scale-105 flex items-center gap-2 bg-transparent">
                          <Download className="w-4 h-4" />
                          Receipt
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Today's Collections */}
          <div className="relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:scale-105 group animate-in slide-in-from-left duration-500 border-0">
            <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-green-100 opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
            <div className="absolute top-0 right-0 w-32 h-32 transform translate-x-8 -translate-y-8">
              <div className="w-full h-full bg-gradient-to-br from-green-500 to-green-600 opacity-10 rounded-full group-hover:scale-110 transition-transform duration-500"></div>
            </div>

            <div className="relative p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-700">Today's Collections</h3>
                <div className="p-2 rounded-lg bg-gradient-to-r from-green-500 to-green-600 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <CreditCard className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="text-3xl font-bold text-green-600 mb-1">₹45,000</div>
              <p className="text-xs text-gray-600">12 payments received</p>
            </div>
          </div>

          {/* Pending Collections */}
          <div className="relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:scale-105 group animate-in slide-in-from-bottom duration-500 delay-100 border-0">
            <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-red-100 opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
            <div className="absolute top-0 right-0 w-32 h-32 transform translate-x-8 -translate-y-8">
              <div className="w-full h-full bg-gradient-to-br from-red-500 to-red-600 opacity-10 rounded-full group-hover:scale-110 transition-transform duration-500"></div>
            </div>

            <div className="relative p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-700">Pending Collections</h3>
                <div className="p-2 rounded-lg bg-gradient-to-r from-red-500 to-red-600 shadow-lg group-hover:scale-110 transition-transform duration-300 animate-pulse">
                  <CreditCard className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="text-3xl font-bold text-red-600 mb-1">₹2,34,000</div>
              <p className="text-xs text-gray-600">From 156 students</p>
            </div>
          </div>

          {/* Collection Rate */}
          <div className="relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:scale-105 group animate-in slide-in-from-right duration-500 delay-200 border-0">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
            <div className="absolute top-0 right-0 w-32 h-32 transform translate-x-8 -translate-y-8">
              <div className="w-full h-full bg-gradient-to-br from-blue-500 to-blue-600 opacity-10 rounded-full group-hover:scale-110 transition-transform duration-500"></div>
            </div>

            <div className="relative p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-700">Collection Rate</h3>
                <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <CreditCard className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-1">84.2%</div>
              <p className="text-xs text-gray-600">This month</p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Dialog */}
      {isDialogOpen && selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/20 bg-white/95 backdrop-blur-xl">
            <div className="p-6">
              {/* Header */}
              <div className="mb-6">
                <h2 className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  Collect Fee Payment
                </h2>
                <p className="text-gray-600 mt-1">
                  Record fee payment for {selectedStudent.name} (Roll No: {selectedStudent.rollNo})
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handlePaymentSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Student Name</label>
                    <input
                      type="text"
                      value={selectedStudent.name}
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Due Amount</label>
                    <input
                      type="text"
                      value={`₹${selectedStudent.dueAmount.toLocaleString()}`}
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-red-50 text-red-600 font-bold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="paymentAmount" className="text-sm font-medium text-gray-700">
                      Payment Amount (₹)
                    </label>
                    <input
                      id="paymentAmount"
                      type="number"
                      placeholder="Enter amount"
                      value={paymentAmount}
                      onChange={(e) => setPaymentAmount(e.target.value)}
                      max={selectedStudent.dueAmount}
                      className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-green-400 focus:outline-none transition-all duration-300"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="paymentMode" className="text-sm font-medium text-gray-700">
                      Payment Mode
                    </label>
                    <select
                      id="paymentMode"
                      value={paymentMode}
                      onChange={(e) => setPaymentMode(e.target.value)}
                      className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-green-400 focus:outline-none transition-all duration-300"
                      required
                    >
                      <option value="">Select payment mode</option>
                      <option value="cash">Cash</option>
                      <option value="upi">UPI</option>
                      <option value="bank-transfer">Bank Transfer</option>
                      <option value="cheque">Cheque</option>
                      <option value="card">Card</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="transactionId" className="text-sm font-medium text-gray-700">
                    Transaction ID / Reference
                  </label>
                  <input
                    id="transactionId"
                    type="text"
                    placeholder="Enter transaction ID or reference number"
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                    className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-green-400 focus:outline-none transition-all duration-300"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="paymentProof" className="text-sm font-medium text-gray-700">
                    Payment Proof (Optional)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      id="paymentProof"
                      type="file"
                      accept="image/*,application/pdf"
                      onChange={handleFileUpload}
                      className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-green-400 focus:outline-none transition-all duration-300"
                    />
                    <button
                      type="button"
                      className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-green-50 hover:border-green-300 transition-all duration-300 hover:scale-105 bg-transparent"
                    >
                      <Upload className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="remarks" className="text-sm font-medium text-gray-700">
                    Remarks
                  </label>
                  <textarea
                    id="remarks"
                    placeholder="Add any additional notes..."
                    rows={3}
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-green-400 focus:outline-none transition-all duration-300 resize-none"
                  />
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsDialogOpen(false)}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg font-medium hover:from-green-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    Record Payment
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminFeeCollection;