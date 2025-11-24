import React from "react";

import DiffBlock from "./DiffBlock";
import NoteInput from "./NoteInput";

export default function MobileView({
  filtered,
  rows,
  setRows,
  editing,
  setEditing,
  showSave,
  setShowSave,
  saving,
  savedPopup,
  saveNote,
}) {
  return (
    <div className="space-y-8 sm:hidden">
      {filtered.map((r, i) => (
        <div
          key={r._id}
          className="bg-gray-900 p-4 rounded-xl border border-gray-700 space-y-3"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 flex items-center justify-center text-gray-400">
              {i + 1}.
            </div>
            <div className="text-yellow-400 text-2xl font-normal capitalize">
              {r.name}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-800 p-2 rounded">
              <div className="text-gray-300 text-sm">കിട്ടാനുള്ളത്:</div>
              <div className="font-bold text-2xl">{r.iGive}</div>
            </div>

            <div className="bg-gray-800 p-2 rounded">
              <div className="text-gray-300">തന്നത്:</div>
              <div className="font-bold text-2xl">{r.theyGive}</div>
            </div>

            {/* ⭐ Diff Block */}
            <DiffBlock r={r} />

            {/* ⭐ Note Input */}
            <NoteInput
              r={r}
              i={i}
              rows={rows}
              setRows={setRows}
              editing={editing}
              setEditing={setEditing}
              showSave={showSave}
              setShowSave={setShowSave}
              saving={saving}
              savedPopup={savedPopup}
              saveNote={saveNote}
            />

            {/* ⭐ NEW — Result / ഇനി കിട്ടാനുള്ളത് */}
            <div className="col-span-2 bg-black p-2  text-gray-300">
              ഇനി കിട്ടാനുള്ളത് :
              <span className="text-green-400 font-bold text-2xl ml-2">
                {r.result ?? ""}
              </span>
            </div>

          </div>
        </div>
      ))}
    </div>
  );
}
