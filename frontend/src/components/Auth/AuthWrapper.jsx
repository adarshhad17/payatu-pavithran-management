import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";

export default function AuthWrapper({ onAuth }) {
  const [mode, setMode] = useState("login");

  return (
    <>
      {mode === "login" ? (
        <Login onAuth={onAuth} setMode={setMode} />
      ) : (
        <Register setMode={setMode} />
      )}
    </>
  );
}
