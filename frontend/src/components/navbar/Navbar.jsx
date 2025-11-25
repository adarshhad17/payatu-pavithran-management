import React from "react";

export default function Navbar({ user, onLogout }) {
  return (
    <div className="
      fixed top-0 left-0 w-full 
      bg-blue-900 text-white 
      p-3 
      flex justify-between items-center 
      border-b border-gray-700 
      z-50
    ">
      <div className="font-bold text-lg">{user.name}</div>

      <button
        className="px-3 py-1 bg-red-600 rounded font-bold"
        onClick={onLogout}
      >
        Logout
      </button>
    </div>
  );
}
