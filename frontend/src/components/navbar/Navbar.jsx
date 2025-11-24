import React from "react";

export default function Navbar({ user, onLogout }) {
  return (
    <div className="mt-6 bg-gray-900 text-white p-3 rounded flex justify-between items-center border border-gray-700">
      <div>{user.name}</div>

      <button
        className="px-3 py-1 bg-red-600 rounded font-bold"
        onClick={onLogout}
      >
        Logout
      </button>
    </div>
  );
}
