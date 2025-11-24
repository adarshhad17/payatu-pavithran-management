import React from "react";

export default function SearchBox({ q, setQ, filtered }) {
  return (
    <div className="space-y-3 mb-10">

      {/* Search Input with Icon */}
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-black text-xl">
          🔍
        </span>

        <input
          className="w-full pl-10 p-3 rounded bg-gray-100 text-black text-xl border border-blue-700"
          placeholder="Search by name..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>

      {/* NO RESULT MESSAGE */}
      {q.trim() !== "" && filtered.length === 0 && (
        <div className="text-center text-white p-3 rounded-lg mt-2">
          <div className="text-2xl font-bold text-orange-500">
            ഈ പേരിൽ ആരും ഇല്ല..!
          </div>

          <div className="text-white text-2xl mt-8">
            ദയവായി മറ്റൊരു പേര് തിരയുക 🙏
          </div>
        </div>
      )}
    </div>
  );
}
