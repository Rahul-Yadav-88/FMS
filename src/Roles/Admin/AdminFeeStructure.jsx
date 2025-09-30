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
    // Pre-fill form with existing data
    setNewStructure({
      name: structure.name,
      class: structure.class,
      term: structure.term,
    });
    // Load existing fee heads
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
      // Update existing structure
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
      // Create new structure
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
    
    // Reset form
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
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="mb-8 flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 shadow-lg">
            <FileText className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Fee Structure Management</h1>
            <p className="text-gray-500 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-emerald-500" />
              Create and manage fee structures for different classes
            </p>
          </div>
        </div>
        <button 
          onClick={() => setIsCreateDialogOpen(true)}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-blue-600 px-6 py-3 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
        >
          <Plus className="h-5 w-5" />
          Create Fee Structure
        </button>
      </div>

      {/* Fee Structures Card */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-8">
        {/* Card Header */}
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Fee Structures ({feeStructures.length})</h2>
              <p className="text-gray-600 text-sm">Manage fee structures for different classes</p>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
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
            <tbody className="divide-y divide-gray-100">
              {feeStructures.map((structure) => (
                <tr key={structure.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-5 text-gray-900 font-medium">
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
                    <span className="text-emerald-600 font-bold text-lg">
                      ₹{structure.totalAmount.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-gray-700">
                    {structure.studentsAssigned}
                  </td>
                  <td className="px-6 py-5">
                    <span className="inline-flex rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-medium text-emerald-700">
                      {structure.status}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleEditStructure(structure)}
                        className="rounded-lg p-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        title="Edit"
                      >
                        <Edit2 className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleCopyStructure(structure)}
                        className="rounded-lg p-2 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors"
                        title="Copy"
                      >
                        <Copy className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteStructure(structure)}
                        className="rounded-lg p-2 text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
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
        {feeStructures.map((structure) => (
          <div
            key={structure.id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden"
          >
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900">{structure.name}</h3>
              <p className="text-gray-600 text-sm">
                Class {structure.class} • {structure.term}
              </p>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                <div className="space-y-2">
                  {structure.feeHeads.map((head, index) => (
                    <div
                      key={index}
                      className="flex justify-between text-sm p-3 rounded-lg bg-gray-50 hover:bg-emerald-50 transition-colors"
                    >
                      <span className="font-medium text-gray-700">{head.name}</span>
                      <span className="font-bold text-emerald-600">₹{head.amount.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between font-bold text-lg">
                    <span className="text-gray-900">Total</span>
                    <span className="text-emerald-600">₹{structure.totalAmount.toLocaleString()}</span>
                  </div>
                </div>
                <div className="text-sm text-gray-500 text-center p-3 bg-blue-50 rounded-lg">
                  {structure.studentsAssigned} students assigned
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create/Edit Fee Structure Dialog */}
      {(isCreateDialogOpen || editDialogOpen) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Class
                  </label>
                  <select
                    value={newStructure.class}
                    onChange={(e) => updateNewStructure('class', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
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
                    className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
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
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
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
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                        />
                      </div>
                      <button
                        onClick={() => removeFeeHead(index)}
                        disabled={feeHeads.length === 1}
                        className="p-3 text-gray-400 hover:text-red-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-700">Total Amount:</span>
                    <span className="text-2xl font-bold text-emerald-600">
                      ₹{totalAmount.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex gap-3 justify-end">
              <button
                onClick={handleCloseDialog}
                className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveStructure}
                className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200"
              >
                {editDialogOpen ? 'Update Fee Structure' : 'Create Fee Structure'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {deleteDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-red-600">Confirm Delete</h2>
              <p className="text-gray-600 mt-1">
                Are you sure you want to delete "{selectedStructure?.name}"? This will affect{" "}
                {selectedStructure?.studentsAssigned} students.
              </p>
            </div>
            <div className="p-6 flex gap-3 justify-end">
              <button
                onClick={() => setDeleteDialogOpen(false)}
                className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-6 py-3 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors"
              >
                Delete Structure
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminFeeStructure;