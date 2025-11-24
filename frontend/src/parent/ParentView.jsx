import React, { useEffect, useState } from "react";
import { getTransactions, updateNoteApi } from "../api";

import SearchBox from "./SearchBox";
import MobileView from "./MobileView";
import DesktopTable from "./DesktopTable";

export default function ParentView() {
  const [rows, setRows] = useState([]);
  const [q, setQ] = useState("");

  const [saving, setSaving] = useState({});
  const [savedPopup, setSavedPopup] = useState({});
  const [showSave, setShowSave] = useState({});
  const [editing, setEditing] = useState({});
  const [isLandscape, setIsLandscape] = useState(false);

  // Detect screen width
  useEffect(() => {
    const check = () => setIsLandscape(window.innerWidth > 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Load data but preserve edited rows
  useEffect(() => {
    const load = async () => {
      try {
        const res = await getTransactions();

        setRows((prev) =>
          res.data.map((row) => {
            if (editing[row._id]) {
              return prev.find((p) => p._id === row._id) || row;
            }
            return row;
          })
        );
      } catch (err) {
        console.error("load failed", err);
      }
    };

    load();
    const int = setInterval(load, 5000);
    return () => clearInterval(int);
  }, [editing]);

  // ============================
  // SAVE NOTE (BACKEND SETS DATE)
  // ============================
  const saveNote = async (id, rawValue) => {
    try {
      setSaving((p) => ({ ...p, [id]: true }));

      const numericValue =
        rawValue === "" || rawValue == null ? null : Number(rawValue);

    

      // ✔ ONLY SEND NOTE (BACKEND UPDATES DATE)
      const res = await updateNoteApi(id, {
        note: numericValue,
      });

      // ✔ Backend returns updated date & time
      setRows((prev) => prev.map((r) => (r._id === id ? res.data : r)));

      setEditing((p) => ({ ...p, [id]: false }));
      setSavedPopup((p) => ({ ...p, [id]: true }));
      setShowSave((p) => ({ ...p, [id]: false }));

      setTimeout(() => {
        setSavedPopup((p) => ({ ...p, [id]: false }));
      }, 1000);
    } catch {
      alert("Save failed");
    } finally {
      setSaving((p) => ({ ...p, [id]: false }));
    }
  };

  // SEARCH FILTER
  const filtered = rows.filter((r) =>
    r.name?.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="p-4 max-w-6xl mx-auto space-y-6 bg-black min-h-screen text-white">

      {/* SEARCH BOX */}
      <SearchBox q={q} setQ={setQ} filtered={filtered} />

      {/* MOBILE / DESKTOP SWITCH */}
      {!isLandscape ? (
        <MobileView
          filtered={filtered}
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
      ) : (
        <DesktopTable filtered={filtered} />
      )}
    </div>
  );
}
