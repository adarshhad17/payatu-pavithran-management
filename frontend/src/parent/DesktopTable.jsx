import React from "react";

export default function DesktopTable({ filtered }) {
  return (
    <div className="overflow-x-auto rounded border border-gray-700">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-950">
          <tr>
            <th className="border p-3">#</th>
            <th className="border p-3">Name</th>
            <th className="border p-3">കിട്ടാനുള്ളത്</th>
            <th className="border p-3">തന്നത്</th>
            <th className="border p-3">കൊടുക്കാനുള്ളത്</th>
            <th className="border p-3">പയറ്റിയത്</th>
            <th className="border p-3">ഇനി കിട്ടാനുള്ളത്</th>
            <th className="border p-3">Date</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((r, i) => (
            <tr key={r._id} className="bg-gray-900">
              <td className="border p-3">{i + 1}</td>
              <td className="border p-3 border-amber-50 text-yellow-400">{r.name}</td>
              <td className="border p-3">{r.iGive}</td>
              <td className="border p-3">{r.theyGive}</td>

              {/* ⭐ DIFF COLUMN WITH GREEN BG FOR <= 0 (SMALL TEXT) */}
              <td
                className={`border p-3 border-amber-50 text-center ${
                  Number(r.diff) <= 0 ? "bg-green-400" : ""
                }`}
              >
                {Number(r.diff) <= 0 ? (
                  <div className="flex flex-col leading-tight">
                    <span className="text-black font-bold text-xs">
                      കൊടുക്കാനില്ല
                    </span>

                    <span className="text-black font-bold text-xs">
                      കിട്ടാനുള്ളത് :
                      <span className="text-pink-700 font-bold ml-1 text-sm">
                        {Math.abs(Number(r.diff))}
                      </span>
                    </span>
                  </div>
                ) : (
                  <div className="leading-tight">
                    <span className="text-red-600 font-bold text-sm">
                      {r.diff}
                    </span>
                  </div>
                )}
              </td>

              <td className="border p-3 border-amber-50 text-blue-400">{r.note}</td>

              <td className="border p-3 border-amber-50 text-green-400">{r.result}</td>

              <td className="border p-3">{r.date || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
