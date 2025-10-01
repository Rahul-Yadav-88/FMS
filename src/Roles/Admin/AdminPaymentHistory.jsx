import React, { useState } from "react";
import { Download, Search, CheckCircle, Clock, FileText, Sparkles } from "lucide-react";

// Dummy payment data
const paymentsData = [
  {
    id: 1,
    transactionId: "TXN001",
    studentName: "Aarav Sharma",
    class: "10th Grade",
    amount: 15000,
    paymentDate: "2025-09-01",
    paymentMode: "UPI",
    status: "Verified",
    verifiedBy: "Admin",
  },
  {
    id: 2,
    transactionId: "TXN002",
    studentName: "Isha Verma",
    class: "9th Grade",
    amount: 12000,
    paymentDate: "2025-09-03",
    paymentMode: "Credit Card",
    status: "Pending",
    verifiedBy: null,
  },
  {
    id: 3,
    transactionId: "TXN003",
    studentName: "Rohan Mehta",
    class: "11th Grade",
    amount: 18000,
    paymentDate: "2025-09-05",
    paymentMode: "Net Banking",
    status: "Verified",
    verifiedBy: "Accountant",
  },
  {
    id: 4,
    transactionId: "TXN004",
    studentName: "Sneha Kapoor",
    class: "12th Grade",
    amount: 20000,
    paymentDate: "2025-09-07",
    paymentMode: "Cash",
    status: "Pending",
    verifiedBy: null,
  },
  {
    id: 5,
    transactionId: "TXN005",
    studentName: "Yuvraj Singh",
    class: "8th Grade",
    amount: 10000,
    paymentDate: "2025-09-09",
    paymentMode: "UPI",
    status: "Verified",
    verifiedBy: "Admin",
  },
];

const PaymentHistory = () => {
  const [search, setSearch] = useState("");
  const [payments, setPayments] = useState(paymentsData);
  const [receiptDialogOpen, setReceiptDialogOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);

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

  const filteredPayments = payments.filter(
    (payment) =>
      payment.studentName.toLowerCase().includes(search.toLowerCase()) ||
      payment.transactionId.toLowerCase().includes(search.toLowerCase())
  );

  const handleDownloadReceipt = (payment) => {
    setSelectedPayment(payment);
    setReceiptDialogOpen(true);
  };

  const handleVerifyPayment = (paymentId) => {
    setPayments(
      payments.map((payment) =>
        payment.id === paymentId
          ? { ...payment, status: "Verified", verifiedBy: "Current User" }
          : payment
      )
    );
  };

  const exportPayments = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Transaction ID,Student,Amount,Date,Status\n" +
      filteredPayments
        .map(
          (p) =>
            `${p.transactionId},${p.studentName},${p.amount},${p.paymentDate},${p.status}`
        )
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "payment_history.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const verifiedCount = payments.filter(p => p.status === "Verified").length;
  const pendingCount = payments.filter(p => p.status === "Pending").length;
  const totalAmount = payments.reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50/30 relative overflow-hidden">
      <AnimatedBackground />
      
      <div className="relative max-w-7xl mx-auto space-y-8 p-8">
        {/* Header Section */}
        <div className="animate-slide-down">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-2">
            Payment History
          </h1>
          <p className="text-gray-600 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-blue-500" />
            Manage and track all student payment transactions
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Total Payments",
              value: payments.length,
              icon: FileText,
              color: "blue",
              delay: "0ms"
            },
            {
              title: "Total Amount",
              value: `₹${totalAmount.toLocaleString()}`,
              icon: CheckCircle,
              color: "green",
              delay: "100ms"
            },
            {
              title: "Verified / Pending",
              value: `${verifiedCount} / ${pendingCount}`,
              icon: Clock,
              color: "amber",
              delay: "200ms"
            }
          ].map((stat, index) => {
            const Icon = stat.icon;
            const colorClasses = {
              blue: { bg: "bg-blue-50", icon: "bg-blue-100 text-blue-600", text: "text-blue-600" },
              green: { bg: "bg-green-50", icon: "bg-green-100 text-green-600", text: "text-green-600" },
              amber: { bg: "bg-amber-50", icon: "bg-amber-100 text-amber-600", text: "text-amber-600" }
            }[stat.color];

            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-blue-100/50 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 group backdrop-blur-sm animate-card-float"
                style={{ animationDelay: stat.delay }}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-1">{stat.title}</p>
                      <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-xl ${colorClasses.icon} group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-2xl border border-blue-100/50 shadow-xl hover:shadow-2xl transition-all duration-500 backdrop-blur-sm animate-slide-in-up">
          {/* Search and Export Bar */}
          <div className="p-6 border-b border-blue-100 bg-gradient-to-r from-blue-50 to-blue-100/50">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="search"
                  placeholder="Search student or transaction ID..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-blue-100 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all duration-300 hover:border-blue-300 bg-white/80"
                />
              </div>
              <button
                onClick={exportPayments}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-medium group"
              >
                <Download className="w-4 h-4 group-hover:scale-110 transition-transform" />
                Export CSV
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-50/80 to-blue-100/50 border-b border-blue-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Transaction ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Student Details
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-100">
                {filteredPayments.map((payment, index) => (
                  <tr 
                    key={payment.id} 
                    className="hover:bg-blue-50/50 transition-all duration-300 animate-fade-in group"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <td className="px-6 py-4">
                      <span className="font-mono text-sm font-medium text-gray-800">
                        {payment.transactionId}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-gray-800">{payment.studentName}</div>
                        <div className="text-sm text-gray-600">{payment.class}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-blue-600">
                        ₹{payment.amount.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">{payment.paymentDate}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border transition-all duration-300 ${
                          payment.status === "Verified"
                            ? "bg-green-100 text-green-700 border-green-200"
                            : "bg-amber-100 text-amber-700 border-amber-200"
                        }`}
                      >
                        {payment.status === "Verified" ? (
                          <CheckCircle className="w-3 h-3" />
                        ) : (
                          <Clock className="w-3 h-3" />
                        )}
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleDownloadReceipt(payment)}
                          className="p-2 text-blue-600 hover:bg-blue-100 rounded-xl transition-all duration-300 hover:scale-110 group"
                          title="View Receipt"
                        >
                          <Download className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        </button>
                        {payment.status === "Pending" && (
                          <button
                            onClick={() => handleVerifyPayment(payment.id)}
                            className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white text-sm font-medium rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                          >
                            Verify
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredPayments.length === 0 && (
            <div className="p-12 text-center">
              <p className="text-gray-500">No payments found matching your search.</p>
            </div>
          )}
        </div>
      </div>

      {/* Receipt Dialog */}
      {receiptDialogOpen && selectedPayment && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-modal-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border border-blue-100 animate-modal-slide-up">
            <FloatingElements />
            
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
              <h2 className="text-2xl font-bold text-center mb-1">Payment Receipt</h2>
              <p className="text-center text-blue-100 text-sm">Transaction Confirmation</p>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Student Info Card */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 p-5 rounded-xl mb-6 border border-blue-100">
                <h3 className="font-bold text-xl text-gray-800 mb-2">
                  {selectedPayment.studentName}
                </h3>
                <div className="space-y-1 text-sm">
                  <p className="text-gray-700">
                    <span className="font-medium">Transaction:</span>{" "}
                    <span className="font-mono">{selectedPayment.transactionId}</span>
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Class:</span> {selectedPayment.class}
                  </p>
                </div>
              </div>

              {/* Payment Details */}
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-blue-100">
                  <span className="text-gray-600 font-medium">Amount Paid</span>
                  <span className="text-2xl font-bold text-green-600">
                    ₹{selectedPayment.amount.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-blue-100">
                  <span className="text-gray-600 font-medium">Payment Mode</span>
                  <span className="font-semibold text-gray-800">
                    {selectedPayment.paymentMode}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-blue-100">
                  <span className="text-gray-600 font-medium">Payment Date</span>
                  <span className="font-semibold text-gray-800">
                    {selectedPayment.paymentDate}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-blue-100">
                  <span className="text-gray-600 font-medium">Status</span>
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold border transition-all duration-300 ${
                      selectedPayment.status === "Verified"
                        ? "bg-green-100 text-green-700 border-green-200"
                        : "bg-amber-100 text-amber-700 border-amber-200"
                    }`}
                  >
                    {selectedPayment.status === "Verified" ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <Clock className="w-4 h-4" />
                    )}
                    {selectedPayment.status}
                  </span>
                </div>
                {selectedPayment.verifiedBy && (
                  <div className="flex justify-between items-center py-3 bg-green-50 px-4 rounded-xl border border-green-200">
                    <span className="text-gray-600 font-medium">Verified By</span>
                    <span className="font-semibold text-green-700">
                      {selectedPayment.verifiedBy}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 bg-blue-50/50 border-t border-blue-100">
              <button
                onClick={() => setReceiptDialogOpen(false)}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Close Receipt
              </button>
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
        @keyframes slide-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
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
        .animate-slide-in-up { animation: slide-in-up 0.5s ease-out; }
        .animate-card-float { animation: card-float 0.6s ease-out; }
        .animate-fade-in { animation: fade-in 0.4s ease-out; }
      `}</style>
    </div>
  );
};

export default PaymentHistory;