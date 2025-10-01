import React, { useState } from 'react';
import { Edit2, Copy, Trash2, Plus, FileText, Sparkles } from 'lucide-react';

const AdminFeeStructure = () => {
  const [feeHeads, setFeeHeads] = useState([
    { name: "Tuition Fee", amount: "" },
    { name: "Transport Fee", amount: "" },
  ]);

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedStructure, setSelectedStructure] = useState(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [feeStructures, setFeeStructures] = useState([
    {
      id: 1,
      name: "Class 10 - Science Stream",
      class: "10-A",
      term: "Monthly",
      totalAmount: 10500,
      feeHeads: [
        { name: "Tuition Fee", amount: 8000 },
        { name: "Transport Fee", amount: 2000 },
        { name: "Library Fee", amount: 500 },
      ],
      studentsAssigned: 45,
      status: "Active",
    },
    {
      id: 2,
      name: "Class 9 - Commerce Stream",
      class: "9-B",
      term: "Monthly",
      totalAmount: 9000,
      feeHeads: [
        { name: "Tuition Fee", amount: 7000 },
        { name: "Transport Fee", amount: 2000 },
      ],
      studentsAssigned: 38,
      status: "Active",
    },
    {
      id: 3,
      name: "Class 8 - General",
      class: "8-A",
      term: "Quarterly",
      totalAmount: 24000,
      feeHeads: [
        { name: "Tuition Fee", amount: 20000 },
        { name: "Activity Fee", amount: 4000 },
      ],
      studentsAssigned: 52,
      status: "Active",
    },
  ]);

  // Form state for creating new structure
  const [newStructure, setNewStructure] = useState({
    name: '',
    class: '',
    term: '',
  });

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

  const addFeeHead = () => {
    setFeeHeads([...feeHeads, { name: "", amount: "" }]);
  };

  const removeFeeHead = (index) => {
    if (feeHeads.length > 1) {
      setFeeHeads(feeHeads.filter((_, i) => i !== index));
    }
  };

  const updateFeeHead = (index, field, value) => {
    const updated = feeHeads.map((head, i) => 
      i === index ? { ...head, [field]: value } : head
    );
    setFeeHeads(updated);
  };

  const handleEditStructure = (structure) => {
    setSelectedStructure(structure);
    setNewStructure({
      name: structure.name,
      class: structure.class,
      term: structure.term,
    });
    setFeeHeads(structure.feeHeads.map(head => ({
      name: head.name,
      amount: head.amount.toString()
    })));
    setEditDialogOpen(true);
  };

  const handleCopyStructure = (structure) => {
    const newStructure = {
      ...structure,
      id: Date.now(),
      name: `${structure.name} (Copy)`,
      studentsAssigned: 0,
    };
    setFeeStructures([...feeStructures, newStructure]);
  };

  const handleDeleteStructure = (structure) => {
    setSelectedStructure(structure);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    setFeeStructures(feeStructures.filter((s) => s.id !== selectedStructure.id));
    setDeleteDialogOpen(false);
    setSelectedStructure(null);
  };

  const handleSaveStructure = () => {
    const totalAmount = feeHeads.reduce((sum, head) => sum + (parseInt(head.amount) || 0), 0);
    
    if (editDialogOpen && selectedStructure) {
      const updatedStructures = feeStructures.map(structure => 
        structure.id === selectedStructure.id
          ? {
              ...structure,
              name: newStructure.name,
              class: newStructure.class,
              term: newStructure.term,
              totalAmount: totalAmount,
              feeHeads: feeHeads.map(head => ({
                name: head.name,
                amount: parseInt(head.amount) || 0
              })),
            }
          : structure
      );
      setFeeStructures(updatedStructures);
      setEditDialogOpen(false);
      setSelectedStructure(null);
    } else {
      const newFeeStructure = {
        id: Date.now(),
        name: newStructure.name,
        class: newStructure.class,
        term: newStructure.term,
        totalAmount: totalAmount,
        feeHeads: feeHeads.map(head => ({
          name: head.name,
          amount: parseInt(head.amount) || 0
        })),
        studentsAssigned: 0,
        status: "Active",
      };
      setFeeStructures([...feeStructures, newFeeStructure]);
      setIsCreateDialogOpen(false);
    }
    
    resetForm();
  };

  const resetForm = () => {
    setNewStructure({ name: '', class: '', term: '' });
    setFeeHeads([
      { name: "Tuition Fee", amount: "" },
      { name: "Transport Fee", amount: "" },
    ]);
  };

  const handleCloseDialog = () => {
    if (editDialogOpen) {
      setEditDialogOpen(false);
      setSelectedStructure(null);
    } else {
      setIsCreateDialogOpen(false);
    }
    resetForm();
  };

  const updateNewStructure = (field, value) => {
    setNewStructure(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const totalAmount = feeHeads.reduce((sum, head) => sum + (parseInt(head.amount) || 0), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50/30 relative overflow-hidden">
      <AnimatedBackground />
      
      <div className="relative space-y-8 p-8">
        {/* Header */}
        <div className="flex items-start justify-between animate-slide-down">
          <div className="flex items-start gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg group hover:scale-105 transition-transform duration-300">
              <FileText className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-2">
                Fee Structure Management
              </h1>
              <p className="text-gray-600 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-blue-500" />
                Create and manage fee structures for different classes
              </p>
            </div>
          </div>
          <button 
            onClick={() => setIsCreateDialogOpen(true)}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-3 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group animate-slide-in-right"
          >
            <Plus className="h-5 w-5 group-hover:scale-110 transition-transform" />
            Create Fee Structure
          </button>
        </div>

        {/* Fee Structures Card */}
        <div className="bg-white rounded-2xl border border-blue-100/50 shadow-xl hover:shadow-2xl transition-all duration-500 backdrop-blur-sm animate-slide-in-left">
          {/* Card Header */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100/50 p-6 border-b border-blue-100">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Fee Structures ({feeStructures.length})</h2>
                <p className="text-gray-600 text-sm">Manage fee structures for different classes</p>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-blue-100 bg-gradient-to-r from-blue-50/80 to-blue-100/50">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Structure Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Class
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Term
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Total Amount
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Students Assigned
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-100">
                {feeStructures.map((structure, index) => (
                  <tr 
                    key={structure.id} 
                    className="hover:bg-blue-50/50 transition-all duration-300 animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <td className="px-6 py-5 text-gray-800 font-medium">
                      {structure.name}
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-blue-600 font-semibold">
                        {structure.class}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-gray-700">
                      {structure.term}
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-blue-600 font-bold text-lg">
                        ₹{structure.totalAmount.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-gray-700">
                      {structure.studentsAssigned}
                    </td>
                    <td className="px-6 py-5">
                      <span className="inline-flex rounded-full bg-green-100 px-4 py-1.5 text-sm font-medium text-green-700 border border-green-200">
                        {structure.status}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleEditStructure(structure)}
                          className="rounded-xl p-2 text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-all duration-300 hover:scale-110 group"
                          title="Edit"
                        >
                          <Edit2 className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleCopyStructure(structure)}
                          className="rounded-xl p-2 text-gray-600 hover:bg-green-100 hover:text-green-600 transition-all duration-300 hover:scale-110 group"
                          title="Copy"
                        >
                          <Copy className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteStructure(structure)}
                          className="rounded-xl p-2 text-gray-600 hover:bg-red-100 hover:text-red-600 transition-all duration-300 hover:scale-110 group"
                          title="Delete"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Fee Structure Details Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {feeStructures.map((structure, index) => (
            <div
              key={structure.id}
              className="bg-white rounded-2xl border border-blue-100/50 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 overflow-hidden backdrop-blur-sm animate-card-float"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="bg-gradient-to-r from-blue-50 to-blue-100/50 p-6 border-b border-blue-100">
                <h3 className="text-lg font-bold text-gray-800">{structure.name}</h3>
                <p className="text-gray-600 text-sm">
                  Class {structure.class} • {structure.term}
                </p>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  <div className="space-y-2">
                    {structure.feeHeads.map((head, headIndex) => (
                      <div
                        key={headIndex}
                        className="flex justify-between text-sm p-3 rounded-xl bg-blue-50 hover:bg-blue-100 transition-all duration-300 group"
                      >
                        <span className="font-medium text-gray-700">{head.name}</span>
                        <span className="font-bold text-blue-600 group-hover:scale-110 transition-transform">
                          ₹{head.amount.toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-blue-100 pt-4">
                    <div className="flex justify-between font-bold text-lg">
                      <span className="text-gray-800">Total</span>
                      <span className="text-blue-600">₹{structure.totalAmount.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="text-sm text-blue-600 text-center p-3 bg-blue-50 rounded-xl border border-blue-100">
                    {structure.studentsAssigned} students assigned
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create/Edit Fee Structure Dialog */}
      {(isCreateDialogOpen || editDialogOpen) && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50 backdrop-blur-sm animate-modal-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-blue-100 animate-modal-slide-up">
            <FloatingElements />
            <div className="p-6 border-b border-blue-100">
              <h2 className="text-2xl font-bold text-gray-800">
                {editDialogOpen ? 'Edit Fee Structure' : 'Create New Fee Structure'}
              </h2>
              <p className="text-gray-600 mt-1">
                {editDialogOpen 
                  ? 'Update the fee structure details below.' 
                  : 'Define fee structure for a class with multiple fee heads.'}
              </p>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Structure Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Class 10 - Science Stream"
                    value={newStructure.name}
                    onChange={(e) => updateNewStructure('name', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-blue-100 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all duration-300 hover:border-blue-300 bg-white/80"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Class
                  </label>
                  <select
                    value={newStructure.class}
                    onChange={(e) => updateNewStructure('class', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-blue-100 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all duration-300 hover:border-blue-300 bg-white/80"
                  >
                    <option value="">Select class</option>
                    <option value="8-A">8-A</option>
                    <option value="9-A">9-A</option>
                    <option value="9-B">9-B</option>
                    <option value="10-A">10-A</option>
                    <option value="10-B">10-B</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Term
                </label>
                <select
                  value={newStructure.term}
                  onChange={(e) => updateNewStructure('term', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-blue-100 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all duration-300 hover:border-blue-300 bg-white/80"
                >
                  <option value="">Select term</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Quarterly">Quarterly</option>
                  <option value="Yearly">Yearly</option>
                </select>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="block text-sm font-medium text-gray-700">
                    Fee Heads
                  </label>
                  <button
                    onClick={addFeeHead}
                    className="flex items-center gap-2 px-4 py-2 text-sm border-2 border-blue-200 text-blue-700 rounded-xl hover:bg-blue-50 transition-all duration-300 hover:scale-105 bg-white/80"
                  >
                    <Plus className="h-4 w-4" />
                    Add Fee Head
                  </button>
                </div>

                <div className="space-y-3">
                  {feeHeads.map((head, index) => (
                    <div key={index} className="flex gap-3 items-end">
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Fee Head Name
                        </label>
                        <input
                          type="text"
                          placeholder="e.g., Tuition Fee"
                          value={head.name}
                          onChange={(e) => updateFeeHead(index, "name", e.target.value)}
                          className="w-full px-4 py-3 border-2 border-blue-100 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all duration-300 hover:border-blue-300 bg-white/80"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Amount (₹)
                        </label>
                        <input
                          type="number"
                          placeholder="0"
                          value={head.amount}
                          onChange={(e) => updateFeeHead(index, "amount", e.target.value)}
                          className="w-full px-4 py-3 border-2 border-blue-100 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all duration-300 hover:border-blue-300 bg-white/80"
                        />
                      </div>
                      <button
                        onClick={() => removeFeeHead(index)}
                        disabled={feeHeads.length === 1}
                        className="p-3 text-gray-400 hover:text-red-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 hover:scale-110"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100/50 rounded-xl border border-blue-200">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-700">Total Amount:</span>
                    <span className="text-2xl font-bold text-blue-600">
                      ₹{totalAmount.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-blue-100 flex gap-3 justify-end bg-blue-50/50 rounded-b-3xl">
              <button
                onClick={handleCloseDialog}
                className="px-6 py-3 border border-blue-200 text-blue-700 rounded-xl hover:bg-blue-50 transition-all duration-300 hover:scale-105 bg-white/80"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveStructure}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                {editDialogOpen ? 'Update Fee Structure' : 'Create Fee Structure'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {deleteDialogOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50 backdrop-blur-sm animate-modal-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md border border-blue-100 animate-modal-slide-up">
            <FloatingElements />
            <div className="p-6 border-b border-blue-100">
              <h2 className="text-xl font-bold text-red-600">Confirm Delete</h2>
              <p className="text-gray-600 mt-1">
                Are you sure you want to delete "{selectedStructure?.name}"? This will affect{" "}
                {selectedStructure?.studentsAssigned} students.
              </p>
            </div>
            <div className="p-6 flex gap-3 justify-end bg-blue-50/50 rounded-b-3xl">
              <button
                onClick={() => setDeleteDialogOpen(false)}
                className="px-6 py-3 border border-blue-200 text-blue-700 rounded-xl hover:bg-blue-50 transition-all duration-300 hover:scale-105 bg-white/80"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-medium hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Delete Structure
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

export default AdminFeeStructure;