import React from "react";
// Import all necessary icons from lucide-react
import {
  DollarSign,
  Download,
  AlertCircle,
  CheckCircle,
  Calendar,
  Sparkles,
  GraduationCap,
} from "lucide-react";

// -----------------------------------------------------------------
// Custom Component Replacements (mimicking shadcn/ui components)
// -----------------------------------------------------------------

// 1. Custom Card and sub-components
const CustomCard = ({ children, className = "", style = {} }) => (
  <div
    className={`rounded-xl border bg-white ${className}`}
    style={style}
  >
    {children}
  </div>
);

const CardHeader = ({ children, className = "" }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>{children}</div>
);
const CardTitle = ({ children, className = "" }) => (
  <h3 className={`font-semibold leading-none tracking-tight ${className}`}>
    {children}
  </h3>
);
const CardDescription = ({ children, className = "" }) => (
  <p className={`text-sm text-gray-500 ${className}`}>{children}</p>
);
const CardContent = ({ children, className = "" }) => (
  <div className={`p-6 pt-0 ${className}`}>{children}</div>
);

// 2. Custom Button
const CustomButton = ({
  children,
  className = "",
  variant = "default",
  size = "md",
  ...props
}) => {
  let baseClasses =
    "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  let sizeClasses = "h-10 px-4 py-2";
  let variantClasses = "";

  if (size === "sm") {
    sizeClasses = "h-8 px-3 text-xs";
  } else if (size === "lg") {
    sizeClasses = "h-11 px-8";
  }

  // Define variants based on usage in the original code
  if (variant === "default") {
    // Note: The original component uses custom gradients on every button,
    // so this default is less critical, but we'll set a basic style.
    variantClasses = "bg-blue-600 text-white hover:bg-blue-700";
  } else if (variant === "outline") {
    // Used for the 'Receipt' button
    variantClasses = "border border-gray-200 hover:bg-gray-50";
  } else if (variant === "destructive") {
    // Not used in this specific component, but good to define
    variantClasses = "bg-red-500 text-white hover:bg-red-600";
  }

  return (
    <button className={`${baseClasses} ${sizeClasses} ${variantClasses} ${className}`} {...props}>
      {children}
    </button>
  );
};

// 3. Custom Badge
const CustomBadge = ({ children, className = "" }) => (
  <span
    className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}
  >
    {children}
  </span>
);


// -----------------------------------------------------------------
// Main Student Dashboard Component
// -----------------------------------------------------------------

const StudentDashboard = () => {
  const studentInfo = {
    name: "Jane Student",
    rollNo: "2024001",
    class: "10-A",
    section: "Science",
  };

  const feeStatus = {
    totalFees: 50000,
    paidAmount: 35000,
    dueAmount: 15000,
    nextDueDate: "2024-02-15",
  };

  const recentPayments = [
    {
      id: 1,
      description: "Tuition Fee - January",
      amount: 8000,
      date: "2024-01-15",
      status: "Paid",
    },
    {
      id: 2,
      description: "Transport Fee - January",
      amount: 2000,
      date: "2024-01-15",
      status: "Paid",
    },
    {
      id: 3,
      description: "Library Fee - January",
      amount: 500,
      date: "2024-01-10",
      status: "Paid",
    },
  ];

  const pendingDues = [
    {
      id: 1,
      description: "Tuition Fee - February",
      amount: 8000,
      dueDate: "2024-02-15",
    },
    {
      id: 2,
      description: "Transport Fee - February",
      amount: 2000,
      dueDate: "2024-02-15",
    },
    {
      id: 3,
      description: "Exam Fee - Annual",
      amount: 5000,
      dueDate: "2024-02-28",
    },
  ];

  const completionPercentage = Math.round(
    (feeStatus.paidAmount / feeStatus.totalFees) * 100
  );

  return (
    <div className="space-y-8 p-6 lg:p-10 bg-gray-50 min-h-screen font-sans">
      <div className="animate-in slide-in-from-top duration-500">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg flex-shrink-0">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Student Dashboard
            </h2>
            <p className="text-gray-600 flex items-center space-x-1 mt-1 text-sm sm:text-base flex-wrap">
              <Sparkles className="h-4 w-4 text-purple-500 animate-pulse" />
              <span>
                {studentInfo.name} • Roll No: {studentInfo.rollNo} • Class:{" "}
                {studentInfo.class}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Enhanced Fee Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Fees Card */}
        <CustomCard className="relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all hover:scale-[1.02] group animate-in slide-in-from-left duration-500">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
          <div className="absolute top-0 right-0 w-32 h-32 transform translate-x-8 -translate-y-8">
            <div className="w-full h-full bg-gradient-to-br from-blue-500 to-blue-600 opacity-10 rounded-full group-hover:scale-110 transition-transform duration-500"></div>
          </div>

          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
            <CardTitle className="text-sm font-medium text-gray-700">
              Total Fees
            </CardTitle>
            <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <DollarSign className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-3xl font-bold text-gray-800 mb-1">
              ₹{feeStatus.totalFees.toLocaleString()}
            </div>
            <p className="text-xs text-gray-600">Academic Year 2024-25</p>
          </CardContent>
        </CustomCard>

        {/* Paid Amount Card */}
        <CustomCard
          className="relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all hover:scale-[1.02] group animate-in slide-in-from-bottom duration-500"
          style={{ animationDelay: `100ms` }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-green-100 opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
          <div className="absolute top-0 right-0 w-32 h-32 transform translate-x-8 -translate-y-8">
            <div className="w-full h-full bg-gradient-to-br from-green-500 to-green-600 opacity-10 rounded-full group-hover:scale-110 transition-transform duration-500"></div>
          </div>

          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
            <CardTitle className="text-sm font-medium text-gray-700">
              Paid Amount
            </CardTitle>
            <div className="p-2 rounded-lg bg-gradient-to-r from-green-500 to-green-600 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <CheckCircle className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-3xl font-bold text-green-600 mb-2">
              ₹{feeStatus.paidAmount.toLocaleString()}
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${completionPercentage}%` }}
                ></div>
              </div>
              <span className="text-xs font-medium text-green-600">
                {completionPercentage}%
              </span>
            </div>
          </CardContent>
        </CustomCard>

        {/* Due Amount Card */}
        <CustomCard
          className="relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all hover:scale-[1.02] group animate-in slide-in-from-right duration-500"
          style={{ animationDelay: `200ms` }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-red-100 opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
          <div className="absolute top-0 right-0 w-32 h-32 transform translate-x-8 -translate-y-8">
            <div className="w-full h-full bg-gradient-to-br from-red-500 to-red-600 opacity-10 rounded-full group-hover:scale-110 transition-transform duration-500"></div>
          </div>

          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
            <CardTitle className="text-sm font-medium text-gray-700">
              Due Amount
            </CardTitle>
            <div className="p-2 rounded-lg bg-gradient-to-r from-red-500 to-red-600 shadow-lg group-hover:scale-110 transition-transform duration-300 animate-pulse">
              <AlertCircle className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-3xl font-bold text-red-600 mb-1">
              ₹{feeStatus.dueAmount.toLocaleString()}
            </div>
            <p className="text-xs text-red-600 font-medium">
              Due by {feeStatus.nextDueDate}
            </p>
          </CardContent>
        </CustomCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Enhanced Pending Dues */}
        <CustomCard className="border-0 shadow-xl hover:shadow-2xl transition-all animate-in slide-in-from-left duration-700">
          <CardHeader className="bg-gradient-to-r from-red-50 to-pink-50 border-b">
            <CardTitle className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg animate-pulse">
                <AlertCircle className="h-4 w-4 text-white" />
              </div>
              <span>Pending Dues</span>
            </CardTitle>
            <CardDescription>Outstanding fee payments</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-0">
              {pendingDues.map((due, index) => (
                <div
                  key={due.id}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-red-50/50 to-pink-50/50 hover:from-red-100 hover:to-pink-100 border-b border-red-200 last:border-b-0 transition-all group animate-in slide-in-from-right duration-500"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                      !
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">
                        {due.description}
                      </p>
                      <p className="text-sm text-gray-500 flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        Due: {due.dueDate}
                      </p>
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end">
                    <p className="font-bold text-red-600 text-lg">
                      ₹{due.amount.toLocaleString()}
                    </p>
                    <CustomButton
                      size="sm"
                      className="mt-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
                    >
                      Pay Now
                    </CustomButton>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </CustomCard>

        {/* Enhanced Recent Payments */}
        <CustomCard className="border-0 shadow-xl hover:shadow-2xl transition-all animate-in slide-in-from-right duration-700">
          <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 border-b">
            <CardTitle className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg">
                <CheckCircle className="h-4 w-4 text-white" />
              </div>
              <span>Recent Payments</span>
            </CardTitle>
            <CardDescription>Your payment history</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-0">
              {recentPayments.map((payment, index) => (
                <div
                  key={payment.id}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50/50 to-blue-50/50 hover:from-green-100 hover:to-blue-100 border-b border-green-200 last:border-b-0 transition-all group animate-in slide-in-from-left duration-500"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                      ✓
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">
                        {payment.description}
                      </p>
                      <p className="text-sm text-gray-500">{payment.date}</p>
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end">
                    <p className="font-bold text-green-600 text-lg">
                      ₹{payment.amount.toLocaleString()}
                    </p>
                    <div className="flex items-center space-x-2 mt-2">
                      <CustomBadge className="bg-green-100 text-green-800 border-green-200">
                        {payment.status}
                      </CustomBadge>
                      <CustomButton
                        size="sm"
                        variant="outline"
                        className="hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 hover:scale-105 bg-transparent text-gray-700"
                      >
                        <Download className="h-3 w-3 mr-1" />
                        Receipt
                      </CustomButton>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </CustomCard>
      </div>
    </div>
  );
};

export default StudentDashboard;
