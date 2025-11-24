import React from "react";

export default function NoteSection({
  r,
  i,
  rows,
  setRows,
  showSave,
  setShowSave,
  setEditing,
  saving,
  savedPopup,
  saveNote
}) {
  return (
    <div className="col-span-2 space-y-2">
      <div className="flex items-center bg-gray-600 p-3 rounded">
        <span className="text-gray-300 font-bold">പയറ്റിയത് :</span>

        <input
          className="w-32 text-right bg-transparent text-orange-400 text-2xl font-bold outline-none"
          value={r.note ?? ""}
          onChange={(e) => {
            const updated = [...rows];
            updated[i].note = e.target.value;
            setRows(updated);

            setEditing((p) => ({ ...p, [r._id]: true }));
            setShowSave((p) => ({ ...p, [r._id]: true }));
          }}
        />
      </div>

      {showSave[r._id] && (
        <button
          onClick={() => saveNote(r._id, r.note)}
          className="w-full bg-green-600 p-2 rounded font-bold"
        >
          {saving[r._id] ? "Saving..." : "Save"}
        </button>
      )}

      {savedPopup[r._id] && (
        <div className="text-green-400 text-center font-bold">
          ✔ Saved Successfully
        </div>
      )}
    </div>
  );
}
