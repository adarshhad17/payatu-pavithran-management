import React from "react";

export default function AdminForm({
  form,
  handleChange,
  handleAdd,
  handleUpdate,
  clearForm,
}) {
  return (
    <div className="bg-gray-900 p-4 rounded border border-gray-700 space-y-4 mb-10">
      <h3 className="text-lg text-center text-pink-600 font-bold">
        {form.id ? "Update Record" : "Add New Record"}
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {/* NAME */}
        <div className="flex flex-col">
          <label className="text-yellow-500 mb-1">Name</label>
          <input
            className="p-3 bg-gray-800 text-white border border-gray-600 rounded"
            placeholder="Type name here..." 
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
        </div>

        {/* iGive */}
        <div className="flex flex-col">
          <label className="text-yellow-500 mb-1">കിട്ടാനുളളത്</label>
          <input
            className="p-3 bg-gray-800 text-white border border-gray-600 rounded"
            placeholder="Type here..."
            type="number"
            value={form.iGive}
            onChange={(e) => handleChange("iGive", e.target.value)}
          />
        </div>

        {/* theyGive */}
        <div className="flex flex-col">
          <label className="text-yellow-500 mb-1">തന്നത്</label>
          <input
            className="p-3 bg-gray-800 text-white border border-gray-600 rounded"
            placeholder="Type here..."
            type="number"

            value={form.theyGive}
            onChange={(e) => handleChange("theyGive", e.target.value)}
          />
        </div>

        {/* note */}
        <div className="flex flex-col">
          <label className="text-yellow-500 mb-1">പയറ്റിയത്</label>
          <input
            className="p-3 bg-gray-800 text-white border border-gray-600 rounded"
            placeholder="Type here..."
            type="number"

            value={form.note}
            onChange={(e) => handleChange("note", e.target.value)}
          />
        </div>
      </div>

      {form.id ? (
        <button
          className="w-full bg-blue-600 text-white p-2 rounded font-bold"
          onClick={handleUpdate}
        >
          Update
        </button>
      ) : (
        <button
          className="w-full bg-green-500 text-white p-3 rounded font-bold"
          onClick={handleAdd}
        >
          Add 
        </button>
      )}

      <button
        className="w-full bg-red-700 text-white p-3 rounded font-bold"
        onClick={clearForm}
      >
        Cancel
      </button>
    </div>
  );
}
