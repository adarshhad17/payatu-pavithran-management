import React from "react";

export default function AdminSearch({ search, setSearch }) {
  return (
    <input
      className="w-full border border-orange-500 p-4 rounded bg-white text-black"
      placeholder="Search by name..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}
