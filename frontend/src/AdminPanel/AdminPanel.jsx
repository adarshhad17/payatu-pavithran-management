import React, { useEffect, useState } from "react";
import {
  getTransactions,
  adminUpdateApi,
  adminAddApi,
  adminDeleteApi,
} from "../api";

import AdminForm from "./AdminForm";
import AdminSearch from "./AdminSearch";
import AdminTable from "./AdminTable";
import AdminMobileCard from "./AdminMobileCard";

export default function AdminPanel() {
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    id: null,
    name: "",
    iGive: "",
    theyGive: "",
    note: "",
  });

  // SAFE DATA LOAD (NO WARNING)
  useEffect(() => {
    let isActive = true;

    const fetchData = async () => {
      try {
        const res = await getTransactions();

        if (!isActive) return;

        const normalized = res.data.map((r) => ({
          ...r,
          note: r.note === null ? "" : r.note,
          iGive: r.iGive === null ? "" : r.iGive,
          theyGive: r.theyGive === null ? "" : r.theyGive,
        }));

        setRows(normalized.sort((a, b) => a.indexNumber - b.indexNumber));
      } catch (err) {
        console.error("Load failed", err);
      }
    };

    fetchData();

    return () => {
      isActive = false;
    };
  }, []);

  // FORM HANDLER
  const handleChange = (field, value) =>
    setForm((p) => ({ ...p, [field]: value }));

  const clearForm = () =>
    setForm({
      id: null,
      name: "",
      iGive: "",
      theyGive: "",
      note: "",
    });

  // ADD
  const handleAdd = async () => {
    if (!form.name.trim()) return alert("Name required!");

    const newIndex =
      rows.length > 0 ? rows[rows.length - 1].indexNumber + 1 : 1;

    const iGiveNum = form.iGive === "" ? null : Number(form.iGive);
    const theyGiveNum = form.theyGive === "" ? null : Number(form.theyGive);
    const noteNum = form.note === "" ? null : Number(form.note);

    const diff =
      iGiveNum == null || theyGiveNum == null ? null : theyGiveNum - iGiveNum;

    const result =
      noteNum == null || theyGiveNum == null ? null : theyGiveNum - noteNum;

    try {
      await adminAddApi({
        indexNumber: newIndex,
        name: form.name.trim(),
        iGive: iGiveNum,
        theyGive: theyGiveNum,
        diff,
        note: noteNum,
        result,
        date: new Date().toLocaleDateString("en-GB"),
      });

      clearForm();
      reloadData();
    } catch {
      alert("Add failed");
    }
  };

  // EDIT
  const handleEdit = (row) => {
    setForm({
      id: row._id,
      name: row.name,
      iGive: row.iGive ?? "",
      theyGive: row.theyGive ?? "",
      note: row.note ?? "",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // UPDATE
  const handleUpdate = async () => {
    const iGiveNum = form.iGive === "" ? null : Number(form.iGive);
    const theyGiveNum = form.theyGive === "" ? null : Number(form.theyGive);
    const noteNum = form.note === "" ? null : Number(form.note);

    const diff =
      iGiveNum == null || theyGiveNum == null ? null : theyGiveNum - iGiveNum;

    const result =
      noteNum == null || theyGiveNum == null ? null : theyGiveNum - noteNum;

    try {
      await adminUpdateApi(form.id, {
        name: form.name.trim(),
        iGive: iGiveNum,
        theyGive: theyGiveNum,
        diff,
        note: noteNum,
        result,
        date: new Date().toLocaleDateString("en-GB"),
      });

      clearForm();
      reloadData();
    } catch {
      alert("Update failed");
    }
  };

  // DELETE
  const deleteRow = async (id) => {
    if (!window.confirm("Confirm delete?")) return;

    try {
      await adminDeleteApi(id);
      reloadData();
    } catch {
      alert("Delete failed");
    }
  };

  // RELOAD DATA SAFELY
  const reloadData = async () => {
    try {
      const res = await getTransactions();

      const normalized = res.data.map((r) => ({
        ...r,
        note: r.note === null ? "" : r.note,
        iGive: r.iGive === null ? "" : r.iGive,
        theyGive: r.theyGive === null ? "" : r.theyGive,
      }));

      setRows(normalized.sort((a, b) => a.indexNumber - b.indexNumber));
    } catch (err) {
      console.error("Reload failed", err);
    }
  };

  const filtered = rows.filter((r) =>
    r.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 max-w-6xl mx-auto space-y-6 bg-black text-white">
  

      <AdminForm
        form={form}
        handleChange={handleChange}
        handleAdd={handleAdd}
        handleUpdate={handleUpdate}
        clearForm={clearForm}
      />

      <AdminSearch search={search} setSearch={setSearch} />

      <AdminTable
        filtered={filtered}
        deleteRow={deleteRow}
        handleEdit={handleEdit}
      />

      <AdminMobileCard
        filtered={filtered}
        deleteRow={deleteRow}
        handleEdit={handleEdit}
      />
    </div>
  );
}
