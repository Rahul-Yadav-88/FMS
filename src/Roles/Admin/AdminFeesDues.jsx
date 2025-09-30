import { useState } from "react";

const AdminFeesDues = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("all");
  const [selectedPriority, setSelectedPriority] = useState("all");
  const [reminderDialogOpen, setReminderDialogOpen] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [reminderMessage, setReminderMessage] = useState("");

  const [studentsWithDues, setStudentsWithDues] = useState([
    {
      id: 1,
      name: "Alice Wonderland",
      rollNo: "101",
      class: "VII",
      totalDue: 12500,
      overdueDays: 25,
      parentName: "Bob Wonderland",
      parentMobile: "9876543210",
      parentEmail: "bob.wonderland@email.com",
      priority: "High",
      lastPayment: "2024-01-15",
      feeHeads: [
        { name: "Tuition Fee", amount: 8000, dueDate: "2024-01-01" },
        { name: "Transport Fee", amount: 4500, dueDate: "2024-01-01" },
      ],
    },
    {
      id: 2,
      name: "Charlie Puth",
      rollNo: "102",
      class: "VIII",
      totalDue: 8000,
      overdueDays: 10,
      parentName: "David Puth",
      parentMobile: "8765432109",
      parentEmail: "david.puth@email.com",
      priority: "Medium",
      lastPayment: "2024-01-20",
      feeHeads: [{ name: "Tuition Fee", amount: 8000, dueDate: "2024-01-01" }],
    },
    {
      id: 3,
      name: "Eva Mendes",
      rollNo: "103",
      class: "IX",
      totalDue: 5000,
      overdueDays: 5,
      parentName: "Franklin Mendes",
      parentMobile: "7654321098",
      parentEmail: "franklin.mendes@email.com",
      priority: "Low",
      lastPayment: "2024-01-25",
      feeHeads: [{ name: "Tuition Fee", amount: 5000, dueDate: "2024-01-01" }],
    },
    {
      id: 4,
      name: "George Clooney",
      rollNo: "104",
      class: "X",
      totalDue: 15000,
      overdueDays: 30,
      parentName: "Harry Clooney",
      parentMobile: "6543210987",
      parentEmail: "harry.clooney@email.com",
      priority: "High",
      lastPayment: null,
      feeHeads: [
        { name: "Tuition Fee", amount: 10000, dueDate: "2024-01-01" },
        { name: "Exam Fee", amount: 5000, dueDate: "2024-01-01" },
      ],
    },
    {
      id: 5,
      name: "Irene Adler",
      rollNo: "105",
      class: "XI",
      totalDue: 10000,
      overdueDays: 15,
      parentName: "Jack Adler",
      parentMobile: "5432109876",
      parentEmail: "jack.adler@email.com",
      priority: "Medium",
      lastPayment: "2024-01-10",
      feeHeads: [{ name: "Tuition Fee", amount: 10000, dueDate: "2024-01-01" }],
    },
    {
      id: 6,
      name: "Kevin Bacon",
      rollNo: "106",
      class: "XII",
      totalDue: 7500,
      overdueDays: 8,
      parentName: "Laura Bacon",
      parentMobile: "4321098765",
      parentEmail: "laura.bacon@email.com",
      priority: "Low",
      lastPayment: "2024-01-18",
      feeHeads: [{ name: "Tuition Fee", amount: 7500, dueDate: "2024-01-01" }],
    },
  ]);

  const filteredStudents = studentsWithDues.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.class.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = selectedClass === "all" || student.class === selectedClass;
    const matchesPriority = selectedPriority === "all" || student.priority === selectedPriority;
    return matchesSearch && matchesClass && matchesPriority;
  });

  const handleSendReminder = (student) => {
    setSelectedStudent(student);
    setReminderMessage(
      `Dear ${student.parentName}, your ward ${student.name} has pending fees of ₹${student.totalDue.toLocaleString()}. Please clear the dues at the earliest.`,
    );
    setReminderDialogOpen(true);
  };

  const handleViewDetails = (student) => {
    setSelectedStudent(student);
    setDetailsDialogOpen(true);
  };

  const sendReminder = () => {
    console.log(`Sending reminder to ${selectedStudent.parentMobile}: ${reminderMessage}`);
    setReminderDialogOpen(false);
    setSelectedStudent(null);
    setReminderMessage("");
  };

  const sendBulkReminders = () => {
    const highPriorityStudents = filteredStudents.filter((s) => s.priority === "High" || s.overdueDays > 10);
    console.log(`Sending reminders to ${highPriorityStudents.length} students`);
  };

  const exportReport = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Name,Roll No,Class,Due Amount,Overdue Days,Priority\n" +
      filteredStudents
        .map((s) => `${s.name},${s.rollNo},${s.class},${s.totalDue},${s.overdueDays},${s.priority}`)
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "fee_dues_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getPriorityBadge = (priority) => {
    if (priority === "High") {
      return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">High</span>;
    } else if (priority === "Medium") {
      return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">Medium</span>;
    } else {
      return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">Low</span>;
    }
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
  const AlertCircle = () => (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  const Send = () => (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
  );

  const Download = () => (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );

  const Search = () => (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );

  const Filter = () => (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
    </svg>
  );

  const Sparkles = () => (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  );

  const Eye = () => (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  );

  const Phone = () => (
    <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );

  const Mail = () => (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50/30 relative overflow-hidden">
      <AnimatedBackground />
      
      <div className="relative space-y-8 p-6">
        {/* Header Section */}
        <div className="flex justify-between items-center animate-slide-down">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg group hover:scale-105 transition-transform duration-300">
              <AlertCircle />
            </div>
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Fee Dues Management
              </h2>
              <p className="text-gray-600 flex items-center space-x-2 mt-1">
                <Sparkles />
                <span>Track and manage outstanding fee payments</span>
              </p>
            </div>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={sendBulkReminders}
              className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
            >
              <Send />
              <span className="ml-2">Send Bulk Reminders</span>
            </button>
            <button
              onClick={exportReport}
              className="flex items-center px-4 py-2 border-2 border-blue-200 text-blue-700 rounded-xl hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 hover:scale-105 bg-white/80 backdrop-blur-sm group"
            >
              <Download />
              <span className="ml-2">Export Report</span>
            </button>
          </div>
        </div>

        {/* Stats Cards - UNCHANGED */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Total Outstanding Card */}
          <div className="relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all hover:scale-105 rounded-lg bg-white group animate-card-float">
            <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-red-100 opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
            <div className="absolute top-0 right-0 w-32 h-32 transform translate-x-8 -translate-y-8">
              <div className="w-full h-full bg-gradient-to-br from-red-500 to-red-600 opacity-10 rounded-full group-hover:scale-110 transition-transform duration-500"></div>
            </div>
            <div className="relative p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-700">Total Outstanding</h3>
                <div className="p-2 rounded-lg bg-gradient-to-r from-red-500 to-red-600 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <AlertCircle />
                </div>
              </div>
              <div className="text-3xl font-bold text-red-600 mb-1">
                ₹58,000
              </div>
              <p className="text-xs text-gray-600">6 students</p>
            </div>
          </div>

          {/* High Priority Card */}
          <div className="relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all hover:scale-105 rounded-lg bg-white group animate-card-float" style={{animationDelay: '100ms'}}>
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-yellow-100 opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
            <div className="absolute top-0 right-0 w-32 h-32 transform translate-x-8 -translate-y-8">
              <div className="w-full h-full bg-gradient-to-br from-yellow-500 to-yellow-600 opacity-10 rounded-full group-hover:scale-110 transition-transform duration-500"></div>
            </div>
            <div className="relative p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-700">High Priority</h3>
                <div className="p-2 rounded-lg bg-gradient-to-r from-yellow-500 to-yellow-600 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <AlertCircle />
                </div>
              </div>
              <div className="text-3xl font-bold text-yellow-600 mb-1">
                2
              </div>
              <p className="text-xs text-gray-600">Students</p>
            </div>
          </div>

          {/* Overdue >30 Days Card */}
          <div className="relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all hover:scale-105 rounded-lg bg-white group animate-card-float" style={{animationDelay: '200ms'}}>
            <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-orange-100 opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
            <div className="absolute top-0 right-0 w-32 h-32 transform translate-x-8 -translate-y-8">
              <div className="w-full h-full bg-gradient-to-br from-orange-500 to-orange-600 opacity-10 rounded-full group-hover:scale-110 transition-transform duration-500"></div>
            </div>
            <div className="relative p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-700">Overdue &gt;30 Days</h3>
                <div className="p-2 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <AlertCircle />
                </div>
              </div>
              <div className="text-3xl font-bold text-orange-600 mb-1">
                0
              </div>
              <p className="text-xs text-gray-600">Critical cases</p>
            </div>
          </div>

          {/* Average Due Card */}
          <div className="relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all hover:scale-105 rounded-lg bg-white group animate-card-float" style={{animationDelay: '300ms'}}>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
            <div className="absolute top-0 right-0 w-32 h-32 transform translate-x-8 -translate-y-8">
              <div className="w-full h-full bg-gradient-to-br from-blue-500 to-blue-600 opacity-10 rounded-full group-hover:scale-110 transition-transform duration-500"></div>
            </div>
            <div className="relative p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-700">Average Due</h3>
                <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <AlertCircle />
                </div>
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-1">
                ₹9,667
              </div>
              <p className="text-xs text-gray-600">Per student</p>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 rounded-2xl bg-white border border-blue-100/50 backdrop-blur-sm animate-slide-in-left">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100/50 border-b border-blue-100 p-6 rounded-t-2xl">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg">
                <Filter />
              </div>
              <span className="text-lg font-semibold text-gray-800">Filters</span>
            </div>
          </div>
          <div className="p-6">
            <div className="flex space-x-4">
              <div className="flex-1">
                <div className="relative">
                  <div className="absolute left-3 top-3">
                    <Search />
                  </div>
                  <input
                    type="text"
                    placeholder="Search by name, roll number, or class..."
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
                <option value="VII">VII</option>
                <option value="VIII">VIII</option>
                <option value="IX">IX</option>
                <option value="X">X</option>
                <option value="XI">XI</option>
                <option value="XII">XII</option>
              </select>
              <select
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                className="w-48 px-3 py-3 border-2 border-blue-100 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-blue-400 outline-none transition-all duration-300 hover:border-blue-300 bg-white/80"
              >
                <option value="all">All Priorities</option>
                <option value="High">High Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="Low">Low Priority</option>
              </select>
            </div>
          </div>
        </div>

        {/* Students Table */}
        <div className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 rounded-2xl bg-white border border-blue-100/50 backdrop-blur-sm animate-slide-in-up">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100/50 border-b border-blue-100 p-6 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg">
                  <AlertCircle />
                </div>
                <span className="text-lg font-semibold text-gray-800">
                  Students with Outstanding Dues ({filteredStudents.length})
                </span>
              </div>
              <div className="text-sm text-gray-600">
                Total Outstanding: ₹{filteredStudents.reduce((sum, s) => sum + s.totalDue, 0).toLocaleString()}
              </div>
            </div>
            <p className="text-gray-600 mt-2">Manage and track student fee dues efficiently</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-blue-50/80 to-blue-100/50 border-b border-blue-100">
                  <th className="text-left p-4 font-semibold text-gray-700">Roll No.</th>
                  <th className="text-left p-4 font-semibold text-gray-700">Name</th>
                  <th className="text-left p-4 font-semibold text-gray-700">Class</th>
                  <th className="text-left p-4 font-semibold text-gray-700">Due Amount</th>
                  <th className="text-left p-4 font-semibold text-gray-700">Overdue Days</th>
                  <th className="text-left p-4 font-semibold text-gray-700">Priority</th>
                  <th className="text-left p-4 font-semibold text-gray-700">Parent Contact</th>
                  <th className="text-left p-4 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student, index) => (
                  <tr
                    key={student.id}
                    className="hover:bg-blue-50/50 transition-all duration-300 border-b border-blue-50 group animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <td className="p-4 font-medium text-blue-600">{student.rollNo}</td>
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xs group-hover:scale-110 transition-transform duration-300 shadow-lg">
                          {student.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <span className="font-medium text-gray-800">{student.name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-gray-800">{student.class}</td>
                    <td className="p-4 font-bold text-red-600">₹{student.totalDue.toLocaleString()}</td>
                    <td className="p-4">
                      <span
                        className={`font-medium ${
                          student.overdueDays > 20
                            ? "text-red-600"
                            : student.overdueDays > 10
                            ? "text-yellow-600"
                            : "text-green-600"
                        }`}
                      >
                        {student.overdueDays} days
                      </span>
                    </td>
                    <td className="p-4">{getPriorityBadge(student.priority)}</td>
                    <td className="p-4">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-1 text-sm">
                          <Phone />
                          <span>{student.parentMobile}</span>
                        </div>
                        <div className="text-xs text-gray-500">{student.parentName}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleViewDetails(student)}
                          className="p-2 hover:bg-blue-100 hover:text-blue-600 rounded-xl transition-all duration-300 hover:scale-110 group"
                        >
                          <Eye />
                        </button>
                        <button
                          onClick={() => handleSendReminder(student)}
                          className="p-2 hover:bg-green-100 hover:text-green-600 rounded-xl transition-all duration-300 hover:scale-110 group"
                        >
                          <Send />
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

      {/* Send Reminder Dialog */}
      {reminderDialogOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50 backdrop-blur-sm animate-modal-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full border border-blue-100 animate-modal-slide-up">
            <FloatingElements />
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <Send />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">Send Fee Reminder</h3>
                    <p className="text-gray-600">
                      Send reminder to {selectedStudent?.parentName} ({selectedStudent?.parentMobile})
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setReminderDialogOpen(false)}
                  className="p-2 hover:bg-blue-50 rounded-xl transition-all duration-300 hover:scale-110"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Student Name</label>
                    <input
                      value={selectedStudent?.name || ""}
                      disabled
                      className="w-full p-3 bg-blue-50 rounded-xl border border-blue-100"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Due Amount</label>
                    <input
                      value={selectedStudent ? `₹${selectedStudent.totalDue.toLocaleString()}` : ""}
                      disabled
                      className="w-full p-3 bg-red-50 text-red-600 font-bold rounded-xl border border-red-100"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Parent Name</label>
                    <input
                      value={selectedStudent?.parentName || ""}
                      disabled
                      className="w-full p-3 bg-blue-50 rounded-xl border border-blue-100"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Contact Method</label>
                    <select className="w-full p-3 border-2 border-blue-100 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-blue-400 outline-none transition-all duration-300 hover:border-blue-300 bg-white/80">
                      <option value="sms">SMS</option>
                      <option value="email">Email</option>
                      <option value="both">SMS & Email</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Message</label>
                  <textarea
                    value={reminderMessage}
                    onChange={(e) => setReminderMessage(e.target.value)}
                    rows={4}
                    className="w-full p-3 border-2 border-blue-100 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-blue-400 outline-none transition-all duration-300 hover:border-blue-300 bg-white/80 resize-none"
                  />
                </div>

                <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100/50 rounded-xl border border-blue-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertCircle />
                    <span className="font-medium text-blue-700">Reminder Details</span>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>• Overdue: {selectedStudent?.overdueDays} days</p>
                    <p>• Priority: {selectedStudent?.priority}</p>
                    <p>• Last Payment: {selectedStudent?.lastPayment || "Never"}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-blue-100 flex justify-end space-x-3 rounded-b-3xl bg-blue-50/50">
              <button
                onClick={() => setReminderDialogOpen(false)}
                className="px-6 py-3 border border-blue-200 text-blue-700 rounded-xl hover:bg-blue-50 transition-all duration-300 hover:scale-105 bg-white/80"
              >
                Cancel
              </button>
              <button
                onClick={sendReminder}
                className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Send />
                <span className="ml-2">Send Reminder</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Student Details Dialog */}
      {detailsDialogOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50 backdrop-blur-sm animate-modal-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full border border-blue-100 animate-modal-slide-up">
            <FloatingElements />
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <Eye />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">Student Fee Details</h3>
                    <p className="text-gray-600">Complete fee information for {selectedStudent?.name}</p>
                  </div>
                </div>
                <button
                  onClick={() => setDetailsDialogOpen(false)}
                  className="p-2 hover:bg-blue-50 rounded-xl transition-all duration-300 hover:scale-110"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {selectedStudent && (
                <div className="space-y-6">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="font-semibold text-sm text-gray-700">Student Name</label>
                      <p className="p-3 bg-blue-50 rounded-xl border border-blue-100">{selectedStudent.name}</p>
                    </div>
                    <div className="space-y-2">
                      <label className="font-semibold text-sm text-gray-700">Roll Number</label>
                      <p className="p-3 bg-blue-50 rounded-xl border border-blue-100">{selectedStudent.rollNo}</p>
                    </div>
                    <div className="space-y-2">
                      <label className="font-semibold text-sm text-gray-700">Class</label>
                      <p className="p-3 bg-blue-50 rounded-xl border border-blue-100">{selectedStudent.class}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="font-semibold text-sm text-gray-700">Total Due Amount</label>
                      <p className="p-4 bg-red-50 rounded-xl font-bold text-red-600 text-lg border border-red-100">
                        ₹{selectedStudent.totalDue.toLocaleString()}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <label className="font-semibold text-sm text-gray-700">Overdue Period</label>
                      <p className="p-4 bg-yellow-50 rounded-xl font-bold text-yellow-600 text-lg border border-yellow-100">
                        {selectedStudent.overdueDays} days
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="font-semibold text-sm text-gray-700">Fee Breakdown</label>
                    <div className="space-y-2">
                      {selectedStudent.feeHeads?.map((fee, index) => (
                        <div key={index} className="flex justify-between items-center p-4 bg-blue-50 rounded-xl border border-blue-100">
                          <div>
                            <p className="font-medium text-gray-800">{fee.name}</p>
                            <p className="text-sm text-gray-500">Due Date: {fee.dueDate}</p>
                          </div>
                          <p className="font-bold text-red-600 text-lg">₹{fee.amount.toLocaleString()}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-blue-100">
                    <div className="space-y-3">
                      <label className="font-semibold text-sm text-gray-700">Parent Contact Information</label>
                      <div className="space-y-2">
                        <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
                          <p className="font-medium text-gray-800">{selectedStudent.parentName}</p>
                        </div>
                        <div className="flex items-center space-x-2 p-3 bg-blue-50 rounded-xl border border-blue-100">
                          <Phone />
                          <span className="text-gray-800">{selectedStudent.parentMobile}</span>
                        </div>
                        <div className="flex items-center space-x-2 p-3 bg-blue-50 rounded-xl border border-blue-100">
                          <Mail />
                          <span className="text-gray-800">{selectedStudent.parentEmail}</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="font-semibold text-sm text-gray-700">Payment Status</label>
                      <div className="space-y-2">
                        <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
                          <p className="text-sm text-gray-600">Priority Level</p>
                          <div className="mt-2">{getPriorityBadge(selectedStudent.priority)}</div>
                        </div>
                        <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
                          <p className="text-sm text-gray-600">Last Payment</p>
                          <p className="font-medium text-gray-800">{selectedStudent.lastPayment || "No previous payments"}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="p-6 border-t border-blue-100 flex justify-end space-x-3 rounded-b-3xl bg-blue-50/50">
              <button
                onClick={() => setDetailsDialogOpen(false)}
                className="px-6 py-3 border border-blue-200 text-blue-700 rounded-xl hover:bg-blue-50 transition-all duration-300 hover:scale-105 bg-white/80"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setDetailsDialogOpen(false);
                  handleSendReminder(selectedStudent);
                }}
                className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Send />
                <span className="ml-2">Send Reminder</span>
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
        @keyframes slide-in-left {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
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
        .animate-slide-in-left { animation: slide-in-left 0.5s ease-out; }
        .animate-slide-in-up { animation: slide-in-up 0.5s ease-out; }
        .animate-card-float { animation: card-float 0.6s ease-out; }
        .animate-fade-in { animation: fade-in 0.4s ease-out; }
      `}</style>
    </div>
  );
};

export default AdminFeesDues;