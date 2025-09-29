import React from "react";
// Import all necessary icons from lucide-react
import {
  Users,
  DollarSign,
  AlertCircle,
  TrendingUp,
  Plus,
  FileText,
  CreditCard,
  Sparkles,
  ArrowUp,
} from "lucide-react";

// Helper component to replace the Card from the original code
const CustomCard = ({ children, className = "" }) => (
  <div
    className={`rounded-xl bg-white ${className}`} // Tailwind equivalent for a basic Card container
  >
    {children}
  </div>
);

// Helper component to replace the CardHeader/Title/Description
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

// Helper component to replace the Button from the original code
const CustomButton = ({ children, className = "", variant = "default", ...props }) => {
  let baseClasses = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none h-10 px-4 py-2";
  let variantClasses = "";

  if (variant === "default") {
    // Mimics the original button's gradient and shadow
    variantClasses = "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl hover:scale-105";
  } else if (variant === "outline") {
    // Mimics the original outline button's hover effect
    variantClasses = "border-2 border-input bg-transparent hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:border-blue-300 hover:scale-105";
  }

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const AdminDashboard = () => {
  const stats = [
    {
      title: "Total Students",
      value: "1,234",
      description: "Active students",
      icon: Users,
      color: "from-blue-500 to-blue-600",
      bgColor: "from-blue-50 to-blue-100",
      change: "+12%",
      trend: "up",
    },
    {
      title: "Total Collections",
      value: "₹12,45,000",
      description: "This month",
      icon: DollarSign,
      color: "from-green-500 to-green-600",
      bgColor: "from-green-50 to-green-100",
      change: "+8.2%",
      trend: "up",
    },
    {
      title: "Outstanding Dues",
      value: "₹2,34,000",
      description: "Pending payments",
      icon: AlertCircle,
      color: "from-red-500 to-red-600",
      bgColor: "from-red-50 to-red-100",
      change: "-5.1%",
      trend: "down",
    },
    {
      title: "Collection Rate",
      value: "84.2%",
      description: "This month",
      icon: TrendingUp,
      color: "from-purple-500 to-purple-600",
      bgColor: "from-purple-50 to-purple-100",
      change: "+2.4%",
      trend: "up",
    },
  ];

  const recentPayments = [
    { id: 1, student: "John Doe", class: "10-A", amount: "₹5,000", date: "2024-01-15", status: "Paid" },
    { id: 2, student: "Jane Smith", class: "9-B", amount: "₹4,500", date: "2024-01-14", status: "Paid" },
    { id: 3, student: "Mike Johnson", class: "11-C", amount: "₹5,500", date: "2024-01-13", status: "Paid" },
    { id: 4, student: "Sarah Wilson", class: "8-A", amount: "₹4,000", date: "2024-01-12", status: "Paid" },
  ];

  return (
    <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center animate-in slide-in-from-top duration-500">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Admin Dashboard
          </h2>
          <p className="text-gray-600 mt-2 flex items-center space-x-1">
            <Sparkles className="h-4 w-4 text-yellow-500 animate-pulse" />
            <span>Manage your school's financial operations</span>
          </p>
        </div>
        <div className="flex space-x-3">
          <CustomButton>
            <Plus className="mr-2 h-4 w-4" />
            Add Student
          </CustomButton>
          <CustomButton variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Create Fee Structure
          </CustomButton>
        </div>
      </div>

      {/* --- */}

      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <CustomCard
              key={index}
              className="relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 group animate-in slide-in-from-bottom"
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
                <div className="text-xl font-bold text-gray-800 mb-1">
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

      {/* --- */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Enhanced Recent Payments */}
        <CustomCard className="border-0 shadow-xl hover:shadow-2xl transition-all animate-in slide-in-from-left duration-700">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b">
            <CardTitle className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                <CreditCard className="h-4 w-4 text-white" />
              </div>
              <span>Recent Payments</span>
            </CardTitle>
            <CardDescription>Latest fee payments received</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-0">
              {recentPayments.map((payment, index) => (
                <div
                  key={payment.id}
                  className="flex items-center justify-between p-4 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all border-b border-gray-100 last:border-b-0 group animate-in slide-in-from-right duration-500"
                  // style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm group-hover:scale-110 transition-transform duration-300">
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
                        Class {payment.class}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">
                      {payment.amount}
                    </p>
                    <p className="text-sm text-gray-500">{payment.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </CustomCard>

        {/* Enhanced Quick Actions */}
        <CustomCard className="border-0 shadow-xl hover:shadow-2xl transition-all animate-in slide-in-from-right duration-700">
          <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 border-b">
            <CardTitle className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <span>Quick Actions</span>
            </CardTitle>
            <CardDescription>Frequently used actions</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  icon: Users,
                  label: "Manage Students",
                  color: "from-blue-500 to-blue-600",
                  bgColor: "from-blue-50 to-blue-100",
                },
                {
                  icon: FileText,
                  label: "Fee Structures",
                  color: "from-green-500 to-green-600",
                  bgColor: "from-green-50 to-green-100",
                },
                {
                  icon: CreditCard,
                  label: "Collect Fees",
                  color: "from-purple-500 to-purple-600",
                  bgColor: "from-purple-50 to-purple-100",
                },
                {
                  icon: AlertCircle,
                  label: "View Dues",
                  color: "from-red-500 to-red-600",
                  bgColor: "from-red-50 to-red-100",
                },
              ].map((action, index) => {
                const Icon = action.icon;
                return (
                  <button
                    key={index}
                    // Replaced CustomButton with a standard button for the action grid
                    className={`h-24 flex flex-col items-center justify-center bg-gradient-to-br ${action.bgColor} border-0 shadow-md hover:shadow-xl transition-all hover:scale-105 group p-2 rounded-xl text-sm font-medium animate-in zoom-in duration-500`}
                    // style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div
                      className={`p-3 rounded-xl bg-gradient-to-r ${action.color} mb-2 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {action.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </CustomCard>
      </div>
    </div>
  );
};

export default AdminDashboard;