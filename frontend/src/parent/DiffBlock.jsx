import React from "react";

export default function DiffBlock({ r }) {
  return (
    <div
      className={`p-2 rounded col-span-2 text-center ${
        Number(r.diff) <= 0 ? "bg-green-400" : "bg-gray-800"
      }`}
    >
      {Number(r.diff) <= 0 ? (
        <>
          <span className="text-red-500 text-lg font-bold">കൊടുക്കാനില്ല</span>
          <br />
          <span className="text-black font-bold">
            കിട്ടാനുള്ളത് :
            <span className="text-pink-600 text-4xl font-bold ml-1">
              {Math.abs(Number(r.diff))}
            </span>
          </span>
        </>
      ) : (
        <>
          <span className="text-gray-300  mr-2">കൊടുക്കാനുള്ളത്:</span>
          <span className="text-red-600 text-3xl font-bold">{r.diff}</span>
        </>
      )}
    </div>
  );
}
