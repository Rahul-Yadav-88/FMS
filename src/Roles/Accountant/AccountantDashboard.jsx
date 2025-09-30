import React, { useState } from "react";
// Import all necessary icons from lucide-react
import {
  DollarSign,
  AlertCircle,
  CheckCircle,
  Clock,
  Search,
  Sparkles,
  ArrowUp,
  TrendingUp,
  X,
  Download,
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
    sizeClasses = "h-8 px-3 text-xs"; // Adjusted size for sm
  } else if (size === "lg") {
    sizeClasses = "h-11 px-8";
  }

  // Define variants based on usage in the original code
  if (variant === "default") {
    variantClasses = "bg-blue-600 text-white hover:bg-blue-700";
  } else if (variant === "outline") {
    // Used for Quick Actions
    variantClasses = "border border-gray-200 hover:bg-gray-50";
  } else if (variant === "destructive") {
    variantClasses = "bg-red-500 text-white hover:bg-red-600";
  }

  return (
    <button className={`${baseClasses} ${sizeClasses} ${variantClasses} ${className}`} {...props}>
      {children}
    </button>
  );
};

// 3. Custom Input
const CustomInput = React.forwardRef(({ className = "", ...props }, ref) => {
  return (
    <input
      className={`flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus-visible:outline-none focus:border-blue-400 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      ref={ref}
      {...props}
    />
  );
});

// -----------------------------------------------------------------
// Main Accountant Dashboard Component
// -----------------------------------------------------------------

const AccountantDashboard = () => {
  // State for pending payments
  const [pendingPayments, setPendingPayments] = useState([
    {
      id: 1,
      student: "Alice Brown",
      class: "10-A",
      amount: "₹5,000",
      mode: "UPI",
      time: "2 hours ago",
      status: "pending", // pending, verified, rejected
    },
    {
      id: 2,
      student: "Bob Wilson",
      class: "9-B",
      amount: "₹4,500",
      mode: "Bank Transfer",
      time: "3 hours ago",
      status: "pending",
    },
    {
      id: 3,
      student: "Carol Davis",
      class: "11-C",
      amount: "₹5,500",
      mode: "Cash",
      time: "4 hours ago",
      status: "pending",
    },
  ]);

  // State for search
  const [searchTerm, setSearchTerm] = useState("");

  // Filtered payments based on search
  const filteredPayments = pendingPayments.filter(payment =>
    payment.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.amount.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.mode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle verify payment
  const handleVerify = (id) => {
    setPendingPayments(prevPayments =>
      prevPayments.map(payment =>
        payment.id === id ? { ...payment, status: "verified" } : payment
      )
    );
  };

  // Handle reject payment
  const handleReject = (id) => {
    setPendingPayments(prevPayments =>
      prevPayments.map(payment =>
        payment.id === id ? { ...payment, status: "rejected" } : payment
      )
    );
  };

  // Handle generate report
  const handleGenerateReport = () => {
    // Create CSV content
    const headers = ["Student Name", "Class", "Amount", "Payment Mode", "Status", "Time"];
    const csvContent = [
      headers.join(","),
      ...pendingPayments.map(payment => [
        payment.student,
        payment.class,
        payment.amount.replace('₹', ''), // Remove ₹ symbol for clean data
        payment.mode,
        payment.status,
        payment.time
      ].join(","))
    ].join("\n");

    // Create blob and download
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `payment-report-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  // Data definitions
  const stats = [
    {
      title: "Today's Collections",
      value: "₹45,000",
      description: "12 payments received",
      icon: DollarSign,
      color: "from-green-500 to-green-600",
      bgColor: "from-green-50 to-green-100",
      change: "+15%",
      trend: "up",
    },
    {
      title: "Pending Verifications",
      value: pendingPayments.filter(p => p.status === "pending").length.toString(),
      description: "Payments to verify",
      icon: Clock,
      color: "from-yellow-500 to-yellow-600",
      bgColor: "from-yellow-50 to-yellow-100",
      change: `-${pendingPayments.filter(p => p.status !== "pending").length}`,
      trend: "down",
    },
    {
      title: "Verified Today",
      value: pendingPayments.filter(p => p.status === "verified").length.toString(),
      description: "Payments verified",
      icon: CheckCircle,
      color: "from-blue-500 to-blue-600",
      bgColor: "from-blue-50 to-blue-100",
      change: `+${pendingPayments.filter(p => p.status === "verified").length}`,
      trend: "up",
    },
    {
      title: "Outstanding Dues",
      value: "₹2,34,000",
      description: "Total pending",
      icon: AlertCircle,
      color: "from-red-500 to-red-600",
      bgColor: "from-red-50 to-red-100",
      change: "-8%",
      trend: "down",
    },
  ];

  const quickActions = [
    {
      icon: CheckCircle,
      label: "Verify Payments",
      color: "from-green-500 to-green-600",
      bgColor: "from-green-50 to-green-100",
      onClick: () => console.log("Verify Payments clicked"),
    },
    {
      icon: DollarSign,
      label: "Generate Reports",
      color: "from-blue-500 to-blue-600",
      bgColor: "from-blue-50 to-blue-100",
      onClick: handleGenerateReport,
    },
    {
      icon: AlertCircle,
      label: "Send Due Reminders",
      color: "from-red-500 to-red-600",
      bgColor: "from-red-50 to-red-100",
      onClick: () => console.log("Send Due Reminders clicked"),
    },
  ];

  // Status badge component
  const StatusBadge = ({ status }) => {
    const statusConfig = {
      pending: {
        color: "bg-yellow-100 text-yellow-800 border-yellow-200",
        text: "Pending",
        icon: Clock,
      },
      verified: {
        color: "bg-green-100 text-green-800 border-green-200",
        text: "Verified",
        icon: CheckCircle,
      },
      rejected: {
        color: "bg-red-100 text-red-800 border-red-200",
        text: "Rejected",
        icon: X,
      },
    };

    const config = statusConfig[status];
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.color}`}>
        <Icon className="h-3 w-3 mr-1" />
        {config.text}
      </span>
    );
  };

  return (
    <div className="space-y-8 p-6 lg:p-10 bg-gray-50 min-h-screen font-sans">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center animate-in slide-in-from-top duration-500">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Accountant Dashboard
          </h2>
          <p className="text-gray-600 mt-2 flex items-center space-x-1">
            <TrendingUp className="h-4 w-4 text-green-500 animate-pulse" />
            <span>Monitor and verify financial transactions</span>
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-2">
          {/* Search Input */}
          <div className="relative w-full sm:w-64 animate-in slide-in-from-right duration-500">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <CustomInput
              placeholder="Search payments..."
              className="pl-10 w-full border-2 focus:border-blue-400 transition-all duration-300 shadow-sm hover:shadow-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <CustomCard
              key={index}
              className="relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] group animate-in slide-in-from-bottom"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Background Gradient Effect */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${stat.bgColor} opacity-50 group-hover:opacity-70 transition-opacity duration-300`}
              ></div>
              {/* Corner Circle Splash Effect */}
              <div className="absolute top-0 right-0 w-32 h-32 transform translate-x-8 -translate-y-8">
                <div
                  className={`w-full h-full bg-gradient-to-br ${stat.color} opacity-10 rounded-full group-hover:scale-110 transition-transform duration-500`}
                ></div>
              </div>

              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
                <CardTitle className="text-sm font-medium text-gray-700">
                  {stat.title}
                </CardTitle>
                <div
                  className={`p-2 rounded-lg bg-gradient-to-r ${stat.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent className="relative">
                <div className="text-3xl font-bold text-gray-800 mb-1">
                  {stat.value}
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-600">{stat.description}</p>
                  <div
                    className={`flex items-center space-x-1 text-xs font-medium ${
                      stat.trend === "up" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    <ArrowUp
                      className={`h-3 w-3 ${
                        stat.trend === "down" ? "rotate-180" : ""
                      }`}
                    />
                    <span>{stat.change}</span>
                  </div>
                </div>
              </CardContent>
            </CustomCard>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Enhanced Pending Verifications */}
        <CustomCard className="border-0 shadow-xl hover:shadow-2xl transition-all animate-in slide-in-from-left duration-700">
          <CardHeader className="bg-gradient-to-r from-yellow-50 to-orange-50 border-b">
            <CardTitle className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg animate-pulse">
                <Clock className="h-4 w-4 text-white" />
              </div>
              <span>Payment Verifications</span>
            </CardTitle>
            <CardDescription>All payments with their current status</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-0">
              {filteredPayments.map((payment, index) => (
                <div
                  key={payment.id}
                  className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border-b last:border-b-0 transition-all group animate-in slide-in-from-right duration-500 ${
                    payment.status === "pending"
                      ? "bg-gradient-to-r from-yellow-50/50 to-orange-50/50 hover:from-yellow-100 hover:to-orange-100 border-yellow-200"
                      : payment.status === "verified"
                      ? "bg-gradient-to-r from-green-50/50 to-green-50/50 hover:from-green-100 hover:to-green-100 border-green-200"
                      : "bg-gradient-to-r from-red-50/50 to-red-50/50 hover:from-red-100 hover:to-red-100 border-red-200"
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center space-x-3 mb-3 sm:mb-0">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm group-hover:scale-110 transition-transform duration-300 flex-shrink-0 ${
                      payment.status === "pending"
                        ? "bg-gradient-to-r from-yellow-500 to-orange-500"
                        : payment.status === "verified"
                        ? "bg-gradient-to-r from-green-500 to-green-600"
                        : "bg-gradient-to-r from-red-500 to-red-600"
                    }`}>
                      {payment.student
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">
                        {payment.student}
                      </p>
                      <p className="text-sm text-gray-500">
                        Class {payment.class} • {payment.mode}
                      </p>
                    </div>
                  </div>
                  <div className="text-left sm:text-right flex flex-col items-start sm:items-end">
                    <p className={`font-bold ${
                      payment.status === "pending"
                        ? "text-yellow-600"
                        : payment.status === "verified"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}>
                      {payment.amount}
                    </p>
                    <div className="flex items-center space-x-2 mt-1 mb-2">
                      <StatusBadge status={payment.status} />
                      <p className="text-sm text-gray-500">
                        {payment.time}
                      </p>
                    </div>
                    {payment.status === "pending" && (
                      <div className="flex space-x-2 mt-1">
                        <CustomButton
                          size="sm"
                          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105"
                          onClick={() => handleVerify(payment.id)}
                        >
                          Verify
                        </CustomButton>
                        <CustomButton
                          size="sm"
                          variant="destructive"
                          className="shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105"
                          onClick={() => handleReject(payment.id)}
                        >
                          Reject
                        </CustomButton>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {filteredPayments.length === 0 && (
                <div className="p-8 text-center text-gray-500">
                  No payments found matching your search.
                </div>
              )}
            </div>
          </CardContent>
        </CustomCard>

        {/* Enhanced Quick Actions */}
        <CustomCard className="border-0 shadow-xl hover:shadow-2xl transition-all animate-in slide-in-from-right duration-700">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b">
            <CardTitle className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <span>Quick Actions</span>
            </CardTitle>
            <CardDescription>Common accounting tasks</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {quickActions.map((action, index) => {
  const Icon = action.icon;
  return (
    <CustomButton
      key={index}
      className={`w-full justify-start h-14 bg-gradient-to-r ${action.bgColor} hover:brightness-95 border-0 shadow-md hover:shadow-xl transition-all hover:scale-[1.02] group animate-in slide-in-from-bottom duration-500`}
      style={{ animationDelay: `${index * 150}ms` }}
      variant="outline"
      onClick={action.onClick}
    >
      <div
        className={`p-2 rounded-lg bg-gradient-to-r ${action.color} mr-3 group-hover:scale-110 transition-transform duration-300 shadow-sm`}
      >
        <Icon className="h-4 w-4 text-white" />
      </div>
      <span className="font-medium text-gray-700">
        {action.label}
      </span>
    </CustomButton>
  );
})}
            </div>
          </CardContent>
        </CustomCard>
      </div>
    </div>
  );
};

export default AccountantDashboard;