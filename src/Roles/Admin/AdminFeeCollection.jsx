import React, { useState } from 'react';
import { Search, CreditCard, Download, Upload, Sparkles, Users, TrendingUp, FileText } from 'lucide-react';

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
        return 'bg-green-100 text-green-700 border border-green-200';
      case 'Partial':
        return 'bg-yellow-100 text-yellow-700 border border-yellow-200';
      case 'Due':
        return 'bg-red-100 text-red-700 border border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border border-gray-200';
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
    console.log({
      student: selectedStudent,
      paymentAmount,
      paymentMode,
      transactionId,
      remarks
    });
    setIsDialogOpen(false);
    setPaymentAmount('');
    setPaymentMode('');
    setTransactionId('');
    setRemarks('');
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log('File selected:', file.name);
    }
  };

  // Generate PDF Receipt
  const generateReceipt = (student) => {
    // Create a new window for PDF
    const receiptWindow = window.open('', '_blank');
    
    // Get current date
    const currentDate = new Date().toLocaleDateString('en-IN');
    const receiptNumber = `REC${Date.now()}`;
    
    // PDF content
    const pdfContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Fee Receipt - ${student.name}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          }
          .receipt-container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            border-radius: 15px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            overflow: hidden;
          }
          .header {
            background: linear-gradient(135deg, #3b82f6, #1d4ed8);
            color: white;
            padding: 30px;
            text-align: center;
          }
          .school-name {
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 5px;
          }
          .receipt-title {
            font-size: 20px;
            opacity: 0.9;
          }
          .content {
            padding: 30px;
          }
          .student-info {
            background: #f8fafc;
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 20px;
            border-left: 4px solid #3b82f6;
          }
          .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin-bottom: 20px;
          }
          .info-item {
            margin-bottom: 10px;
          }
          .info-label {
            font-weight: bold;
            color: #64748b;
            font-size: 14px;
          }
          .info-value {
            color: #1e293b;
            font-size: 16px;
          }
          .amount-section {
            background: linear-gradient(135deg, #3b82f6, #1d4ed8);
            color: white;
            padding: 25px;
            border-radius: 10px;
            text-align: center;
            margin: 25px 0;
          }
          .total-amount {
            font-size: 32px;
            font-weight: bold;
            margin: 10px 0;
          }
          .breakdown {
            background: #f1f5f9;
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 20px;
          }
          .breakdown-item {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid #e2e8f0;
          }
          .breakdown-item:last-child {
            border-bottom: none;
            font-weight: bold;
            color: #3b82f6;
          }
          .footer {
            text-align: center;
            padding: 20px;
            background: #f8fafc;
            border-top: 1px solid #e2e8f0;
            color: #64748b;
            font-size: 12px;
          }
          .signature {
            margin-top: 40px;
            border-top: 1px solid #cbd5e1;
            padding-top: 20px;
            text-align: right;
          }
          .watermark {
            opacity: 0.1;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(-45deg);
            font-size: 80px;
            font-weight: bold;
            color: #64748b;
          }
        </style>
      </head>
      <body>
        <div class="receipt-container">
          <div class="header">
            <div class="school-name">EDU MANAGEMENT SYSTEM</div>
            <div class="receipt-title">FEE PAYMENT RECEIPT</div>
          </div>
          
          <div class="content">
            <div class="student-info">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                <div>
                  <div class="info-label">Receipt Number</div>
                  <div class="info-value" style="color: #3b82f6; font-weight: bold;">${receiptNumber}</div>
                </div>
                <div style="text-align: right;">
                  <div class="info-label">Date</div>
                  <div class="info-value">${currentDate}</div>
                </div>
              </div>
              
              <div class="info-grid">
                <div class="info-item">
                  <div class="info-label">Student Name</div>
                  <div class="info-value">${student.name}</div>
                </div>
                <div class="info-item">
                  <div class="info-label">Roll Number</div>
                  <div class="info-value">${student.rollNo}</div>
                </div>
                <div class="info-item">
                  <div class="info-label">Class</div>
                  <div class="info-value">${student.class}</div>
                </div>
                <div class="info-item">
                  <div class="info-label">Academic Year</div>
                  <div class="info-value">2024-2025</div>
                </div>
              </div>
            </div>

            <div class="amount-section">
              <div style="font-size: 16px; opacity: 0.9;">Total Amount Paid</div>
              <div class="total-amount">₹${student.paidAmount.toLocaleString()}</div>
              <div style="font-size: 14px; opacity: 0.9;">${student.status === 'Paid' ? 'Full Payment Received' : 'Partial Payment Received'}</div>
            </div>

            <div class="breakdown">
              <div style="font-weight: bold; margin-bottom: 15px; color: #1e293b; font-size: 16px;">Fee Breakdown</div>
              <div class="breakdown-item">
                <span>Total Course Fees:</span>
                <span>₹${student.totalFees.toLocaleString()}</span>
              </div>
              <div class="breakdown-item">
                <span>Amount Paid:</span>
                <span style="color: #3b82f6;">₹${student.paidAmount.toLocaleString()}</span>
              </div>
              <div class="breakdown-item">
                <span>Due Amount:</span>
                <span style="color: ${student.dueAmount > 0 ? '#ef4444' : '#3b82f6'};">₹${student.dueAmount.toLocaleString()}</span>
              </div>
            </div>

            <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; border-left: 4px solid #3b82f6; margin: 20px 0;">
              <div style="font-weight: bold; color: #1e40af; margin-bottom: 5px;">Payment Status</div>
              <div style="color: #3b82f6; font-size: 18px; font-weight: bold;">${student.status}</div>
              ${student.lastPayment ? `<div style="color: #64748b; font-size: 12px; margin-top: 5px;">Last Payment: ${student.lastPayment}</div>` : ''}
            </div>

            <div class="signature">
              <div style="margin-bottom: 40px;">
                <div style="border-top: 1px solid #cbd5e1; width: 200px; margin-left: auto;"></div>
                <div style="text-align: right; color: #64748b; font-size: 14px; margin-top: 5px;">Authorized Signature</div>
              </div>
            </div>
          </div>

          <div class="footer">
            <div>Edu Management System • 123 Education Street, Knowledge City • Phone: +91-9876543210</div>
            <div style="margin-top: 5px;">Email: info@edumanagement.edu • Website: www.edumanagement.edu</div>
            <div style="margin-top: 10px; font-size: 10px;">This is a computer generated receipt. No signature required.</div>
          </div>
        </div>

        <div class="watermark">PAID</div>
      </body>
      </html>
    `;

    // Write content to new window
    receiptWindow.document.write(pdfContent);
    receiptWindow.document.close();
    
    // Print the receipt
    setTimeout(() => {
      receiptWindow.print();
    }, 500);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50/30 relative overflow-hidden">
      <AnimatedBackground />
      
      <div className="relative max-w-7xl mx-auto space-y-6 p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-8 animate-slide-down">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg group hover:scale-105 transition-transform duration-300">
              <CreditCard className="w-8 h-8 text-white" strokeWidth={2} />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Fee Collection
              </h1>
              <p className="text-gray-600 mt-1 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-500 animate-pulse" />
                <span>Manage fee payments with ease</span>
              </p>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="relative w-80 animate-slide-in-right">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search students..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border-2 border-blue-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all duration-300 shadow-sm hover:shadow-md bg-white/80 backdrop-blur-sm"
            />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Today's Collections",
              value: "₹45,000",
              description: "12 payments received",
              icon: CreditCard,
              color: "green",
              delay: "0ms"
            },
            {
              title: "Pending Collections",
              value: "₹2,34,000",
              description: "From 156 students",
              icon: Users,
              color: "red",
              delay: "100ms"
            },
            {
              title: "Collection Rate",
              value: "84.2%",
              description: "This month",
              icon: TrendingUp,
              color: "blue",
              delay: "200ms"
            }
          ].map((stat, index) => {
            const Icon = stat.icon;
            const colorClasses = {
              green: { bg: "bg-green-50", icon: "bg-green-100 text-green-600", text: "text-green-600" },
              red: { bg: "bg-red-50", icon: "bg-red-100 text-red-600", text: "text-red-600" },
              blue: { bg: "bg-blue-50", icon: "bg-blue-100 text-blue-600", text: "text-blue-600" }
            }[stat.color];

            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-blue-100/50 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 group backdrop-blur-sm animate-card-float"
                style={{ animationDelay: stat.delay }}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-gray-700">{stat.title}</h3>
                    <div className={`p-3 rounded-xl ${colorClasses.icon} group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <div className={`text-2xl font-bold ${colorClasses.text} mb-1`}>
                    {stat.value}
                  </div>
                  <p className="text-xs text-gray-600">{stat.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Students Table Card */}
        <div className="bg-white rounded-2xl border border-blue-100/50 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden backdrop-blur-sm animate-slide-in-left">
          {/* Table Header Section */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100/50 px-6 py-5 border-b border-blue-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center group hover:scale-105 transition-transform duration-300">
                <FileText className="w-6 h-6 text-white" strokeWidth={2} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Fee Management</h2>
                <p className="text-gray-600 text-sm mt-0.5">Track and collect student fees</p>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-blue-50/80 to-blue-100/50 border-b border-blue-100">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Roll No.</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Student</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Class</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Total Fees</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Paid</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Due</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student, index) => (
                  <tr 
                    key={student.rollNo} 
                    className="border-b border-blue-50 hover:bg-blue-50/50 transition-all duration-300 group animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <td className="px-6 py-4">
                      <span className="text-blue-600 font-medium">{student.rollNo}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold text-sm group-hover:scale-110 transition-transform duration-300 shadow-lg">
                          {student.initials}
                        </div>
                        <div>
                          <span className="font-medium text-gray-900 block">{student.name}</span>
                          {student.lastPayment && (
                            <span className="text-xs text-gray-500">Last: {student.lastPayment}</span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-700 font-medium">{student.class}</td>
                    <td className="px-6 py-4 font-bold text-gray-900">₹{student.totalFees.toLocaleString()}</td>
                    <td className="px-6 py-4 font-bold text-green-600">₹{student.paidAmount.toLocaleString()}</td>
                    <td className="px-6 py-4 font-medium text-red-600">₹{student.dueAmount.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${getStatusColor(student.status)} transition-all duration-300`}>
                        {student.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {student.dueAmount > 0 && (
                          <button 
                            onClick={() => handleCollectFee(student)}
                            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 transition-all flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105 duration-300 group"
                          >
                            <CreditCard className="w-4 h-4 group-hover:scale-110 transition-transform" />
                            Collect Fee
                          </button>
                        )}
                        <button 
                          onClick={() => generateReceipt(student)}
                          className="px-4 py-2 border border-blue-200 text-blue-700 rounded-xl font-medium hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 hover:scale-105 flex items-center gap-2 bg-white/80 backdrop-blur-sm group"
                        >
                          <Download className="w-4 h-4 group-hover:scale-110 transition-transform" />
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
      </div>

      {/* Payment Dialog */}
      {isDialogOpen && selectedStudent && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50 backdrop-blur-sm animate-modal-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-blue-100 animate-modal-slide-up">
            <FloatingElements />
            
            <div className="p-6">
              {/* Header */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">Collect Fee Payment</h2>
                    <p className="text-gray-600">
                      For {selectedStudent.name} • Roll No: {selectedStudent.rollNo}
                    </p>
                  </div>
                </div>
              </div>

              {/* Student Info Summary */}
              <div className="bg-blue-50 rounded-xl p-4 mb-6 border border-blue-100">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-sm text-gray-600">Total Fees</div>
                    <div className="font-bold text-gray-800">₹{selectedStudent.totalFees.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Paid Amount</div>
                    <div className="font-bold text-green-600">₹{selectedStudent.paidAmount.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Due Amount</div>
                    <div className="font-bold text-red-600">₹{selectedStudent.dueAmount.toLocaleString()}</div>
                  </div>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handlePaymentSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Payment Amount (₹)</label>
                    <input
                      type="number"
                      placeholder="Enter amount"
                      value={paymentAmount}
                      onChange={(e) => setPaymentAmount(e.target.value)}
                      max={selectedStudent.dueAmount}
                      className="w-full px-4 py-3 border-2 border-blue-100 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all duration-300 hover:border-blue-300 bg-white/80"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Payment Mode</label>
                    <select
                      value={paymentMode}
                      onChange={(e) => setPaymentMode(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-blue-100 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all duration-300 hover:border-blue-300 bg-white/80"
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
                  <label className="text-sm font-medium text-gray-700">
                    Transaction ID / Reference
                  </label>
                  <input
                    type="text"
                    placeholder="Enter transaction ID or reference number"
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-blue-100 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all duration-300 hover:border-blue-300 bg-white/80"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Payment Proof (Optional)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="file"
                      accept="image/*,application/pdf"
                      onChange={handleFileUpload}
                      className="w-full px-4 py-3 border-2 border-blue-100 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all duration-300 hover:border-blue-300 bg-white/80"
                    />
                    <button
                      type="button"
                      className="px-4 py-3 border border-blue-200 text-blue-700 rounded-xl hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 hover:scale-105 bg-white/80 backdrop-blur-sm"
                    >
                      <Upload className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Remarks
                  </label>
                  <textarea
                    placeholder="Add any additional notes..."
                    rows={3}
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-blue-100 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all duration-300 hover:border-blue-300 resize-none bg-white/80"
                  />
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 pt-6 border-t border-blue-100">
                  <button
                    type="button"
                    onClick={() => setIsDialogOpen(false)}
                    className="px-6 py-3 border border-blue-200 text-blue-700 rounded-xl font-medium hover:bg-blue-50 transition-all duration-300 hover:scale-105 bg-white/80 backdrop-blur-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    Record Payment
                  </button>
                </div>
              </form>
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
        @keyframes card-float {
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
        .animate-card-float { animation: card-float 0.6s ease-out; }
        .animate-fade-in { animation: fade-in 0.4s ease-out; }
      `}</style>
    </div>
  );
};

export default AdminFeeCollection;