import React from "react";

export default function AdminTable({ filtered, deleteRow, handleEdit }) {
  // ⭐ Calculate total result sum
  const totalResult = filtered.reduce(
    (sum, r) => sum + (Number(r.result) || 0),
    0
  );

  return (
    <div className="hidden md:block overflow-x-auto">
      <table className="w-full bg-gray-900 border border-gray-700 rounded-lg text-xs border-collapse">
        <thead>
          <tr className="bg-gray-800 text-gray-300">
            <th className="p-2 border border-gray-700">No</th>
            <th className="p-2 border border-gray-700">Name</th>
            <th className="p-2 border border-gray-700">കിട്ടാനുളളത്</th>
            <th className="p-2 border border-gray-700">തന്നത്</th>
            <th className="p-2 border border-gray-700">കൊടുക്കാനുള്ളത്</th>
            <th className="p-2 border border-gray-700">പയറ്റിയത്</th>
            <th className="p-2 border border-gray-700">ഇനി കിട്ടാനുള്ളത്</th>
            <th className="p-2 border border-gray-700">Actions</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((r, i) => (
            <tr key={r._id} className="bg-gray-900">
              <td className="p-2 border border-gray-700">{i + 1}</td>
              <td className="p-2 border border-gray-700 text-yellow-300 capitalize">
                {r.name}
              </td>
              <td className="p-2 border border-gray-700">{r.iGive}</td>
              <td className="p-2 border border-gray-700">{r.theyGive}</td>
              <td
                className={`p-2 border border-gray-700 text-center ${
                  Number(r.diff) <= 0 ? "bg-green-400" : ""
                }`}
              >
                {Number(r.diff) <= 0 ? (
                  <div className="leading-tight">
                    <span className="text-red-600 font-bold text-xs">
                      കൊടുക്കാനില്ല
                    </span>
                    <br />
                    <span className="text-black font-bold text-xs">
                      കിട്ടാനുള്ളത് :
                      <span className="text-pink-700 font-bold ml-1 text-sm">
                        {Math.abs(Number(r.diff))}
                      </span>
                    </span>
                  </div>
                ) : (
                  <span className="text-red-500 font-bold text-sm">
                    {r.diff}
                  </span>
                )}
              </td>

              <td className="p-2 border border-gray-700">{r.note || "—"}</td>
              <td className="p-2 border border-gray-700 text-green-500">
                {r.result}
              </td>

              <td className="p-2 border border-gray-700 flex gap-2">
                <button
                  className="bg-blue-600 px-3 py-1 rounded text-white text-xs"
                  onClick={() => handleEdit(r)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-600 px-2 py-1 rounded text-white text-xs"
                  onClick={() => deleteRow(r._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {/* ⭐ TOTAL ROW */}
          <tr className="bg-gray-800 font-bold text-gray-200">
            <td colSpan="6" className="p-3 border border-gray-700 text-right">
              Total :
            </td>
            <td className="p-3 border border-gray-700 text-green-500">
              {totalResult}
            </td>
            <td className="p-3 border border-gray-700"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
