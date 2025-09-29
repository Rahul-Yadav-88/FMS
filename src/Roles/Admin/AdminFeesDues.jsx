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
      return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200 animate-pulse">High</span>;
    } else if (priority === "Medium") {
      return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200 animate-pulse">Medium</span>;
    } else {
      return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200 animate-pulse">Low</span>;
    }
  };

  // Icons as SVG components (replacing Lucide React icons)
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
    <div className="space-y-8 p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl shadow-lg">
            <AlertCircle />
          </div>
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              Fee Dues Management
            </h2>
            <p className="text-gray-600 flex items-center space-x-1">
              <Sparkles />
              <span>Track and manage outstanding fee payments</span>
            </p>
          </div>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={sendBulkReminders}
            className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            <Send />
            <span className="ml-2">Send Bulk Reminders</span>
          </button>
          <button
            onClick={exportReport}
            className="flex items-center px-4 py-2 border-2 border-gray-300 hover:bg-gradient-to-r hover:from-green-50 hover:to-blue-50 hover:border-green-300 rounded-lg transition-all duration-300 hover:scale-105"
          >
            <Download />
            <span className="ml-2">Export Report</span>
          </button>
        </div>
      </div>

      {/* Filters Section */}
      <div className="border-0 shadow-xl hover:shadow-2xl transition-all rounded-lg bg-white">
        <div className="bg-gradient-to-r from-red-50 to-orange-50 border-b p-6 rounded-t-lg">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg">
              <Filter />
            </div>
            <span className="text-lg font-semibold">Filters</span>
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
                  className="w-full pl-10 pr-4 py-2 border-2 border-gray-300 rounded-lg focus:border-red-400 transition-all duration-300 shadow-sm hover:shadow-md"
                />
              </div>
            </div>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-48 border-2 border-gray-300 rounded-lg focus:border-red-400 transition-all duration-300 shadow-sm hover:shadow-md px-3 py-2"
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
              className="w-48 border-2 border-gray-300 rounded-lg focus:border-red-400 transition-all duration-300 shadow-sm hover:shadow-md px-3 py-2"
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
      <div className="border-0 shadow-xl hover:shadow-2xl transition-all rounded-lg bg-white">
        <div className="bg-gradient-to-r from-red-50 to-orange-50 border-b p-6 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg">
                <AlertCircle />
              </div>
              <span className="text-lg font-semibold">
                Students with Outstanding Dues ({filteredStudents.length})
              </span>
            </div>
            <div className="text-sm text-gray-500">
              Total Outstanding: ₹{filteredStudents.reduce((sum, s) => sum + s.totalDue, 0).toLocaleString()}
            </div>
          </div>
          <p className="text-gray-600 mt-2">Manage and track student fee dues efficiently</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
                <th className="text-left p-4 font-semibold">Roll No.</th>
                <th className="text-left p-4 font-semibold">Name</th>
                <th className="text-left p-4 font-semibold">Class</th>
                <th className="text-left p-4 font-semibold">Due Amount</th>
                <th className="text-left p-4 font-semibold">Overdue Days</th>
                <th className="text-left p-4 font-semibold">Priority</th>
                <th className="text-left p-4 font-semibold">Parent Contact</th>
                <th className="text-left p-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student, index) => (
                <tr
                  key={student.id}
                  className="hover:bg-gradient-to-r hover:from-red-50 hover:to-orange-50 transition-all border-b"
                >
                  <td className="p-4 font-medium text-blue-600">{student.rollNo}</td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                        {student.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <span className="font-medium">{student.name}</span>
                    </div>
                  </td>
                  <td className="p-4">{student.class}</td>
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
                        className="p-2 hover:bg-blue-100 hover:text-blue-600 rounded-lg transition-all duration-300 hover:scale-110"
                      >
                        <Eye />
                      </button>
                      <button
                        onClick={() => handleSendReminder(student)}
                        className="p-2 hover:bg-green-100 hover:text-green-600 rounded-lg transition-all duration-300 hover:scale-110"
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

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Total Outstanding Card */}
        <div className="relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all hover:scale-105 rounded-lg bg-white group">
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
              ₹{filteredStudents.reduce((sum, s) => sum + s.totalDue, 0).toLocaleString()}
            </div>
            <p className="text-xs text-gray-600">{filteredStudents.length} students</p>
          </div>
        </div>

        {/* High Priority Card */}
        <div className="relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all hover:scale-105 rounded-lg bg-white group">
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
              {filteredStudents.filter((s) => s.priority === "High").length}
            </div>
            <p className="text-xs text-gray-600">Students</p>
          </div>
        </div>

        {/* Overdue >30 Days Card */}
        <div className="relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all hover:scale-105 rounded-lg bg-white group">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-orange-100 opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
          <div className="absolute top-0 right-0 w-32 h-32 transform translate-x-8 -translate-y-8">
            <div className="w-full h-full bg-gradient-to-br from-orange-500 to-orange-600 opacity-10 rounded-full group-hover:scale-110 transition-transform duration-500"></div>
          </div>
          <div className="relative p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-700">Overdue &gt;30 Days</h3>
              <div className="p-2 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg group-hover:scale-110 transition-transform duration-300 animate-pulse">
                <AlertCircle />
              </div>
            </div>
            <div className="text-3xl font-bold text-orange-600 mb-1">
              {filteredStudents.filter((s) => s.overdueDays > 30).length}
            </div>
            <p className="text-xs text-gray-600">Critical cases</p>
          </div>
        </div>

        {/* Average Due Card */}
        <div className="relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all hover:scale-105 rounded-lg bg-white group">
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
              ₹
              {filteredStudents.length > 0
                ? Math.round(
                    filteredStudents.reduce((sum, s) => sum + s.totalDue, 0) / filteredStudents.length
                  ).toLocaleString()
                : 0}
            </div>
            <p className="text-xs text-gray-600">Per student</p>
          </div>
        </div>
      </div>

      {/* Send Reminder Dialog */}
      {reminderDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full mx-4 shadow-2xl">
            <div className="p-6 border-b">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                Send Fee Reminder
              </h3>
              <p className="text-gray-600">
                Send reminder to {selectedStudent?.parentName} ({selectedStudent?.parentMobile})
              </p>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Student Name</label>
                  <input
                    value={selectedStudent?.name || ""}
                    disabled
                    className="w-full p-2 bg-gray-50 rounded border"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Due Amount</label>
                  <input
                    value={selectedStudent ? `₹${selectedStudent.totalDue.toLocaleString()}` : ""}
                    disabled
                    className="w-full p-2 bg-red-50 text-red-600 font-bold rounded border"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Parent Name</label>
                  <input
                    value={selectedStudent?.parentName || ""}
                    disabled
                    className="w-full p-2 bg-gray-50 rounded border"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Contact Method</label>
                  <select className="w-full p-2 border-2 border-gray-300 rounded focus:border-red-400 transition-all duration-300">
                    <option value="sms">SMS</option>
                    <option value="email">Email</option>
                    <option value="both">SMS & Email</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Message</label>
                <textarea
                  value={reminderMessage}
                  onChange={(e) => setReminderMessage(e.target.value)}
                  rows={4}
                  className="w-full p-2 border-2 border-gray-300 rounded focus:border-red-400 transition-all duration-300"
                />
              </div>

              <div className="p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border border-red-200">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertCircle />
                  <span className="font-medium text-red-700">Reminder Details</span>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>• Overdue: {selectedStudent?.overdueDays} days</p>
                  <p>• Priority: {selectedStudent?.priority}</p>
                  <p>• Last Payment: {selectedStudent?.lastPayment || "Never"}</p>
                </div>
              </div>
            </div>
            <div className="p-6 border-t flex justify-end space-x-3">
              <button
                onClick={() => setReminderDialogOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={sendReminder}
                className="flex items-center px-4 py-2 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-3xl w-full mx-4 shadow-2xl">
            <div className="p-6 border-b">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                Student Fee Details
              </h3>
              <p className="text-gray-600">Complete fee information for {selectedStudent?.name}</p>
            </div>
            {selectedStudent && (
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="font-semibold">Student Name</label>
                    <p className="p-2 bg-gray-50 rounded">{selectedStudent.name}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="font-semibold">Roll Number</label>
                    <p className="p-2 bg-gray-50 rounded">{selectedStudent.rollNo}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="font-semibold">Class</label>
                    <p className="p-2 bg-gray-50 rounded">{selectedStudent.class}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="font-semibold">Total Due Amount</label>
                    <p className="p-3 bg-red-50 rounded font-bold text-red-600 text-lg">
                      ₹{selectedStudent.totalDue.toLocaleString()}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <label className="font-semibold">Overdue Period</label>
                    <p className="p-3 bg-yellow-50 rounded font-bold text-yellow-600 text-lg">
                      {selectedStudent.overdueDays} days
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="font-semibold">Fee Breakdown</label>
                  <div className="space-y-2">
                    {selectedStudent.feeHeads?.map((fee, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{fee.name}</p>
                          <p className="text-sm text-gray-500">Due Date: {fee.dueDate}</p>
                        </div>
                        <p className="font-bold text-red-600 text-lg">₹{fee.amount.toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div className="space-y-3">
                    <label className="font-semibold">Parent Contact Information</label>
                    <div className="space-y-2">
                      <div className="p-2 bg-gray-50 rounded">
                        <p className="font-medium">{selectedStudent.parentName}</p>
                      </div>
                      <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                        <Phone />
                        <span>{selectedStudent.parentMobile}</span>
                      </div>
                      <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                        <Mail />
                        <span>{selectedStudent.parentEmail}</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="font-semibold">Payment Status</label>
                    <div className="space-y-2">
                      <div className="p-2 bg-gray-50 rounded">
                        <p className="text-sm text-gray-600">Priority Level</p>
                        <div className="mt-1">{getPriorityBadge(selectedStudent.priority)}</div>
                      </div>
                      <div className="p-2 bg-gray-50 rounded">
                        <p className="text-sm text-gray-600">Last Payment</p>
                        <p className="font-medium">{selectedStudent.lastPayment || "No previous payments"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="p-6 border-t flex justify-end space-x-3">
              <button
                onClick={() => setDetailsDialogOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setDetailsDialogOpen(false);
                  handleSendReminder(selectedStudent);
                }}
                className="flex items-center px-4 py-2 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Send />
                <span className="ml-2">Send Reminder</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminFeesDues;