import React, { useState } from "react";
import { authRegister } from "../../api";

export default function Register({ setMode }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      await authRegister({ name, email, password: pass });
      alert("Registration successful! Please login.");
      setMode("login");
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <form
        onSubmit={submit}
        className="w-full max-w-sm bg-gray-900 text-white p-6 rounded-2xl shadow-xl space-y-6 border border-gray-700"
      >
        <h2 className="text-2xl font-bold text-center text-purple-400">
          Create Account
        </h2>

        <input
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg"
          placeholder="Password"
          type="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-green-600 p-3 rounded-lg font-bold"
        >
          Register
        </button>

        <button
          type="button"
          className="w-full bg-gray-700 p-3 rounded-lg"
          onClick={() => setMode("login")}
        >
          Back to Login
        </button>
      </form>
    </div>
  );
}
