import React, { useState } from "react";

import AuthWrapper from "./components/Auth/AuthWrapper";
import ParentView from "./parent/ParentView";
import AdminPanel from "./AdminPanel/AdminPanel";
import Navbar from "./components/navbar/Navbar";

export default function App() {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("user");
    if (!raw || raw === "undefined") return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  });

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  if (!user) return <AuthWrapper onAuth={setUser} />;

  return (
    <div className="p-4 min-h-screen bg-black text-white flex flex-col">

      <div className="flex-grow: 1;">
        {user.role === "parent" && <ParentView />}
        {user.role === "admin" && <AdminPanel />}
      </div>

      <Navbar user={user} onLogout={logout} />  {/* ✅ Clean and separate */}

    </div>
  );
}
