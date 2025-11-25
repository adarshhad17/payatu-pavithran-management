import React from "react";

export default function AdminMobileCard({
  filtered,
  deleteRow,
  handleEdit,
}) {
  return (
    <div className="md:hidden ">
      {filtered.map((r, index) => (   // ⭐ ONLY CHANGE HERE
        <div
          key={r._id}
          className="bg-gray-900 border border-pink-800 p-5 rounded-xl my-3 text-gray-200 mb-15"
        >
          <div className="flex justify-between items-center mb-3">
            <div className="text-yellow-400 text-xl font-normal capitalize">
              <span className="text-gray-400 text-md">
                {index + 1}.{" "}   {/* ⭐ FIXED INDEX NUMBER */}
              </span>
              {r.name}
            </div>
          </div>

          <div className="space-y-5 text-lg">

            {/* ⭐ iGive */}
            <p>
              <span className="text-gray-400">കിട്ടാനുള്ളത്:</span>
              <span className="font-bold text-2xl"> {r.iGive} </span>
            </p>

            {/* ⭐ theyGive */}
            <p>
              <span className="text-gray-400">തന്നത്:</span>
              <span className="font-bold text-2xl"> {r.theyGive}  </span>
            </p>

            {/* ⭐ DIFF LOGIC */}
            <p
              className={`p-2 rounded ${
                Number(r.diff) <= 0 ? "bg-green-400 text-black" : "bg-gray-800"
              }`}
            >
              {Number(r.diff) <= 0 ? (
                <>
                  <span className="text-red-600 font-semibold text-xl">
                    കൊടുക്കാനില്ല
                  </span>
                  <br />
                  <span className="font-bold text-xl">
                    കിട്ടാനുള്ളത് :
                    <span className="text-pink-600 text-3xl font-bold ml-1">
                      {Math.abs(Number(r.diff))}
                    </span>
                  </span>
                </>
              ) : (
                <>
                  <span className="text-gray-300 ">
                    കൊടുക്കാനുള്ളത്:
                  </span>
                  <span className="text-red-600 font-bold text-3xl ml-1">
                    {r.diff}
                  </span>
                </>
              )}
            </p>

            {/* ⭐ Note */}
            <p className="bg-gray-800 rounded p-3">
              <span className="text-gray-200">പയറ്റിയത്: </span>
              <span className="text-yellow-300 ml-1 text-2xl">{r.note || "__"}</span>
            </p>
            <div className="text-sm text-gray-400">{r.date || "-"}</div>


            {/* ⭐ Result */}
            <p className="bg-black p-3 rounded">
              <span className="text-gray-400">ഇനി കിട്ടാനുള്ളത്:</span>
              <span className="text-green-500 ml-1 font-semibold">
                {r.result}
              </span>
            </p>
          </div>

          <div className="flex gap-3 mt-4">
            <button
              className="bg-blue-600 px-4 py-2 rounded text-white"
              onClick={() => handleEdit(r)}
            >
              Edit
            </button>

            <button
              className="bg-red-600 px-4 py-2 rounded text-white"
              onClick={() => deleteRow(r._id)}
            >
              Delete
            </button>
            
          </div>
        </div>
      ))}
    </div>
  );
}
