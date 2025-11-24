import React from "react";

export default function NoteInput({
  r,
  i,
  rows,
  setRows,
  setEditing,
  showSave,
  setShowSave,
  saving,
  savedPopup,
  saveNote,
}) {
  return (
    <div className="col-span-2 space-y-2">
      <div className="flex items-center bg-gray-600 p-3 rounded">
        <span className="text-gray-300 font-bold">പയറ്റിയത് :</span>

      <input
  className="
    w-32
    bg-transparent
    text-right
    text-yellow-300
    text-2xl
    font-bold
    border-b border-gray-500
    focus:border-blue-500
    outline-none
    caret-white
    pb-1
  "
  value={r.note ?? ""}
  onChange={(e) => {
    const updated = [...rows];
    updated[i].note = e.target.value;
    setRows(updated);

    setEditing((p) => ({ ...p, [r._id]: true }));
    setShowSave((p) => ({ ...p, [r._id]: true }));
  }}
  inputMode="numeric"
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

      <div className="text-right text-xs italic">
        {r.date ? (
          <>
            <span className="text-gray-400 font-semibold">
              Date: {r.date.split(" ")[0]}
            </span>
            <span className="text-gray-400 ml-3">
              {r.date.split(" ")[1]} {r.date.split(" ")[2]}
            </span>
          </>
        ) : (
          <span className="text-white"> </span>
        )}
      </div>
    </div>
  );
}
