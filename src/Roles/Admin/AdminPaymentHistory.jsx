import React, { useState } from "react";
import { Download, Search, CheckCircle, Clock, FileText } from "lucide-react";

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Payment History</h1>
          <p className="text-slate-600">Manage and track all student payment transactions</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 mb-1">Total Payments</p>
                <p className="text-3xl font-bold text-slate-900">{payments.length}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 mb-1">Total Amount</p>
                <p className="text-3xl font-bold text-slate-900">₹{totalAmount.toLocaleString()}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 mb-1">Verified / Pending</p>
                <p className="text-3xl font-bold text-slate-900">{verifiedCount} / {pendingCount}</p>
              </div>
              <div className="bg-amber-100 p-3 rounded-lg">
                <Clock className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Search and Export Bar */}
          <div className="p-6 border-b border-slate-200 bg-slate-50">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="search"
                  placeholder="Search student or transaction ID..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
              <button
                onClick={exportPayments}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 shadow-sm hover:shadow-md transition-all font-medium"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-100 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Transaction ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Student Details
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredPayments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-mono text-sm font-medium text-slate-900">
                        {payment.transactionId}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-slate-900">{payment.studentName}</div>
                        <div className="text-sm text-slate-500">{payment.class}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-slate-900">
                        ₹{payment.amount.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-600">{payment.paymentDate}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                          payment.status === "Verified"
                            ? "bg-green-100 text-green-700"
                            : "bg-amber-100 text-amber-700"
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
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View Receipt"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        {payment.status === "Pending" && (
                          <button
                            onClick={() => handleVerifyPayment(payment.id)}
                            className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors shadow-sm"
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
              <p className="text-slate-500">No payments found matching your search.</p>
            </div>
          )}
        </div>
      </div>

      {/* Receipt Dialog */}
      {receiptDialogOpen && selectedPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
              <h2 className="text-2xl font-bold text-center mb-1">Payment Receipt</h2>
              <p className="text-center text-blue-100 text-sm">Transaction Confirmation</p>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Student Info Card */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-xl mb-6 border border-blue-100">
                <h3 className="font-bold text-xl text-slate-900 mb-2">
                  {selectedPayment.studentName}
                </h3>
                <div className="space-y-1 text-sm">
                  <p className="text-slate-700">
                    <span className="font-medium">Transaction:</span>{" "}
                    <span className="font-mono">{selectedPayment.transactionId}</span>
                  </p>
                  <p className="text-slate-700">
                    <span className="font-medium">Class:</span> {selectedPayment.class}
                  </p>
                </div>
              </div>

              {/* Payment Details */}
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-slate-200">
                  <span className="text-slate-600 font-medium">Amount Paid</span>
                  <span className="text-2xl font-bold text-green-600">
                    ₹{selectedPayment.amount.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-slate-200">
                  <span className="text-slate-600 font-medium">Payment Mode</span>
                  <span className="font-semibold text-slate-900">
                    {selectedPayment.paymentMode}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-slate-200">
                  <span className="text-slate-600 font-medium">Payment Date</span>
                  <span className="font-semibold text-slate-900">
                    {selectedPayment.paymentDate}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-slate-200">
                  <span className="text-slate-600 font-medium">Status</span>
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold ${
                      selectedPayment.status === "Verified"
                        ? "bg-green-100 text-green-700"
                        : "bg-amber-100 text-amber-700"
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
                  <div className="flex justify-between items-center py-3 bg-green-50 px-4 rounded-lg">
                    <span className="text-slate-600 font-medium">Verified By</span>
                    <span className="font-semibold text-green-700">
                      {selectedPayment.verifiedBy}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 bg-slate-50 border-t border-slate-200">
              <button
                onClick={() => setReceiptDialogOpen(false)}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-sm hover:shadow-md"
              >
                Close Receipt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;