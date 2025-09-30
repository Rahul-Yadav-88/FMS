import React, { useState } from "react";
import {
  Users,
  DollarSign,
  AlertCircle,
  TrendingUp,
  Plus,
  FileText,
  CreditCard,
  Calendar,
  ArrowUp,
  X,
  Save,
  User,
  Phone,
  Mail,
  MapPin,
  BookOpen,
  School,
  UserPlus,
  Search,
  Filter,
  Sparkles,
  Bookmark,
  GraduationCap
} from "lucide-react";

// Helper component to replace the Card from the original code
const CustomCard = ({ children, className = "" }) => (
  <div
    className={`rounded-2xl bg-white border border-blue-100/50 backdrop-blur-sm ${className}`}
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
  <p className={`text-sm text-gray-600 ${className}`}>{children}</p>
);
const CardContent = ({ children, className = "" }) => (
  <div className={`p-6 pt-0 ${className}`}>{children}</div>
);

// Helper component to replace the Button from the original code
const CustomButton = ({ children, className = "", variant = "default", ...props }) => {
  let baseClasses = "inline-flex items-center justify-center rounded-xl text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 disabled:opacity-50 disabled:pointer-events-none h-10 px-4 py-2";
  let variantClasses = "";

  if (variant === "default") {
    variantClasses = "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95";
  } else if (variant === "outline") {
    variantClasses = "border-2 border-blue-200 bg-white text-blue-700 hover:bg-blue-50 hover:border-blue-300 hover:scale-105 active:scale-95";
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

// Floating Animation Component
const FloatingElements = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-10 left-10 w-4 h-4 bg-blue-300/30 rounded-full animate-float-slow"></div>
    <div className="absolute top-20 right-20 w-6 h-6 bg-blue-400/20 rounded-full animate-float-medium"></div>
    <div className="absolute bottom-20 left-20 w-3 h-3 bg-blue-500/30 rounded-full animate-float-fast"></div>
    <div className="absolute bottom-10 right-10 w-5 h-5 bg-blue-300/40 rounded-full animate-float-slow"></div>
  </div>
);

// Animated Background
const AnimatedBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200/20 rounded-full animate-pulse-slow"></div>
    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300/10 rounded-full animate-pulse-medium"></div>
  </div>
);

// Add Student Form Component
const AddStudentForm = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    email: "",
    phone: "",
    class: "",
    section: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Student Data:", formData);
    onSave(formData);
    onClose();
  };

  const classes = ["Nursery", "LKG", "UKG", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
  const sections = ["A", "B", "C", "D"];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50 animate-modal-fade-in">
      <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl animate-modal-slide-up">
        {/* Animated Header */}
        <div className="relative bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 overflow-hidden">
          <FloatingElements />
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
          
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <UserPlus className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Add New Student</h2>
                <p className="text-blue-100">Welcome to our school family! 🎓</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-xl transition-all duration-300 hover:scale-110"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                First Name *
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-blue-100 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all duration-300 hover:border-blue-300"
                placeholder="Enter first name"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Last Name *
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-blue-100 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all duration-300 hover:border-blue-300"
                placeholder="Enter last name"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Date of Birth *
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-blue-100 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all duration-300 hover:border-blue-300"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Gender *
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-blue-100 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all duration-300 hover:border-blue-300"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Class *
              </label>
              <select
                name="class"
                value={formData.class}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-blue-100 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all duration-300 hover:border-blue-300"
              >
                <option value="">Select Class</option>
                {classes.map(cls => (
                  <option key={cls} value={cls}>{cls}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Section *
              </label>
              <select
                name="section"
                value={formData.section}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-blue-100 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all duration-300 hover:border-blue-300"
              >
                <option value="">Select Section</option>
                {sections.map(sec => (
                  <option key={sec} value={sec}>Section {sec}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-6 border-t border-blue-100">
            <CustomButton
              type="button"
              variant="outline"
              onClick={onClose}
              className="hover:scale-105 active:scale-95"
            >
              <X className="mr-2 h-4 w-4" />
              Cancel
            </CustomButton>
            <CustomButton 
              type="submit"
              className="hover:scale-105 active:scale-95"
            >
              <Save className="mr-2 h-4 w-4" />
              Save Student
            </CustomButton>
          </div>
        </form>
      </div>
    </div>
  );
};

// Main AdminDashboard Component
const AdminDashboard = () => {
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);

  const stats = [
    {
      title: "Total Students",
      value: "1,234",
      description: "Active students",
      icon: Users,
      color: "blue",
      change: "+12%",
      trend: "up",
    },
    {
      title: "Total Collections",
      value: "₹12,45,000",
      description: "This month",
      icon: DollarSign,
      color: "green",
      change: "+8.2%",
      trend: "up",
    },
    {
      title: "Outstanding Dues",
      value: "₹2,34,000",
      description: "Pending payments",
      icon: AlertCircle,
      color: "orange",
      change: "-5.1%",
      trend: "down",
    },
    {
      title: "Collection Rate",
      value: "84.2%",
      description: "This month",
      icon: TrendingUp,
      color: "purple",
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

  const handleSaveStudent = (studentData) => {
    console.log("Saving student:", studentData);
  };

  const getColorClasses = (color) => {
    const colors = {
      blue: { 
        bg: "bg-blue-50", 
        icon: "bg-blue-100 text-blue-600", 
        text: "text-blue-600",
        gradient: "from-blue-500 to-blue-600"
      },
      green: { 
        bg: "bg-green-50", 
        icon: "bg-green-100 text-green-600", 
        text: "text-green-600",
        gradient: "from-green-500 to-green-600"
      },
      orange: { 
        bg: "bg-orange-50", 
        icon: "bg-orange-100 text-orange-600", 
        text: "text-orange-600",
        gradient: "from-orange-500 to-orange-600"
      },
      purple: { 
        bg: "bg-purple-50", 
        icon: "bg-purple-100 text-purple-600", 
        text: "text-purple-600",
        gradient: "from-purple-500 to-purple-600"
      },
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50/30 relative overflow-hidden">
      <AnimatedBackground />
      
      <div className="relative space-y-6 p-6">
        {/* Header */}
        <div className="flex justify-between items-center animate-slide-down">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              School Dashboard
            </h2>
            <p className="text-gray-600 mt-2 flex items-center space-x-2">
              <Sparkles className="h-4 w-4 text-blue-500 animate-pulse" />
              <span>Manage your school with ease and joy! 🌟</span>
            </p>
          </div>
          <div className="flex space-x-3">
            <CustomButton onClick={() => setIsAddStudentOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Student
            </CustomButton>
            <CustomButton variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              Generate Report
            </CustomButton>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const colorClasses = getColorClasses(stat.color);
            
            return (
              <CustomCard
                key={index}
                className="group hover:scale-105 hover:shadow-xl transition-all duration-500 animate-card-float"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative">
                  <CardTitle className="text-sm font-medium text-gray-700">
                    {stat.title}
                  </CardTitle>
                  <div className={`p-3 rounded-xl ${colorClasses.icon} group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-5 w-5" />
                  </div>
                </CardHeader>
                <CardContent className="relative">
                  <div className="text-2xl font-bold text-gray-800 mb-2">
                    {stat.value}
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-600">{stat.description}</p>
                    <div
                      className={`flex items-center space-x-1 text-xs font-medium ${
                        stat.trend === "up" ? "text-green-600" : "text-orange-600"
                      }`}
                    >
                      <ArrowUp
                        className={`h-3 w-3 transition-transform ${
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Payments */}
          <CustomCard className="animate-slide-in-left">
            <CardHeader className="border-b border-blue-100">
              <CardTitle className="flex items-center space-x-2">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <CreditCard className="h-5 w-5 text-blue-600" />
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
                    className="flex items-center justify-between p-4 hover:bg-blue-50/50 transition-all duration-300 border-b border-blue-100 last:border-b-0 group animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        {payment.student.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">
                          {payment.student}
                        </p>
                        <p className="text-sm text-gray-600">
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

          {/* Quick Actions */}
          <CustomCard className="animate-slide-in-right">
            <CardHeader className="border-b border-blue-100">
              <CardTitle className="flex items-center space-x-2">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <GraduationCap className="h-5 w-5 text-blue-600" />
                </div>
                <span>Quick Actions</span>
              </CardTitle>
              <CardDescription>Everything at your fingertips</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    icon: Users,
                    label: "Students",
                    color: "blue",
                  },
                  {
                    icon: FileText,
                    label: "Reports",
                    color: "green",
                  },
                  {
                    icon: CreditCard,
                    label: "Payments",
                    color: "purple",
                  },
                  {
                    icon: Bookmark,
                    label: "Courses",
                    color: "orange",
                  },
                ].map((action, index) => {
                  const Icon = action.icon;
                  const colorClasses = getColorClasses(action.color);
                  
                  return (
                    <button
                      key={index}
                      className={`h-24 flex flex-col items-center justify-center ${colorClasses.bg} border-2 border-transparent rounded-2xl hover:border-blue-200 hover:shadow-lg transition-all duration-300 hover:scale-105 group p-4 animate-bounce-in`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className={`p-3 rounded-xl ${colorClasses.icon} mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="text-sm font-semibold text-gray-700">
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

      {/* Add Student Form Modal */}
      <AddStudentForm
        isOpen={isAddStudentOpen}
        onClose={() => setIsAddStudentOpen(false)}
        onSave={handleSaveStudent}
      />

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
        @keyframes card-float {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-in-left {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slide-in-right {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes bounce-in {
          0% { opacity: 0; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.05); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-float-slow { animation: float-slow 6s ease-in-out infinite; }
        .animate-float-medium { animation: float-medium 4s ease-in-out infinite; }
        .animate-float-fast { animation: float-fast 3s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 8s ease-in-out infinite; }
        .animate-pulse-medium { animation: pulse-medium 6s ease-in-out infinite; }
        .animate-modal-fade-in { animation: modal-fade-in 0.3s ease-out; }
        .animate-modal-slide-up { animation: modal-slide-up 0.4s ease-out; }
        .animate-slide-down { animation: slide-down 0.5s ease-out; }
        .animate-card-float { animation: card-float 0.6s ease-out; }
        .animate-slide-in-left { animation: slide-in-left 0.5s ease-out; }
        .animate-slide-in-right { animation: slide-in-right 0.5s ease-out; }
        .animate-fade-in { animation: fade-in 0.4s ease-out; }
        .animate-bounce-in { animation: bounce-in 0.5s ease-out; }
      `}</style>
    </div>
  );
};

export default AdminDashboard;