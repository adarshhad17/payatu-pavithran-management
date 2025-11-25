import React, { useState } from "react";
import { authLogin } from "../../api";

export default function Login({ onAuth }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await authLogin({ email, password: pass });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      onAuth(res.data.user);
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
          Welcome Back
        </h2>

        <input
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg"
          type="password"
          placeholder="Password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-purple-600 p-3 rounded-lg font-bold"
        >
          Login
        </button>
      </form>
    </div>
  );
}
