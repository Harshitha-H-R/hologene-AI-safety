import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    setError("");
    const trimmedUser = username.trim();
    const trimmedPass = password.trim();

    if (trimmedUser === "doctor" && trimmedPass === "1234") {
      navigate("/dashboard");
      return;
    }

    setError("Invalid credentials. Use doctor / 1234");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="relative z-10 w-full max-w-md">
        <div className="glass-card p-10 rounded-3xl shadow-2xl shadow-cyan-500/10">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-cyan-500/10 text-4xl">
              🧬
            </div>
            <h1 className="text-4xl font-black text-white">
              HoloGene <span className="text-cyan-400">AI</span>
            </h1>
            <p className="mt-2 text-sm uppercase tracking-[0.3em] text-cyan-300">
              Clinical sequencing flow
            </p>
          </div>

          <div className="space-y-5">
            <div>
              <label className="mb-2 block text-xs uppercase tracking-[0.35em] text-slate-400">
                Username
              </label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                placeholder="doctor"
                className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs uppercase tracking-[0.35em] text-slate-400">
                Password
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="1234"
                className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              />
            </div>

            {error ? (
              <div className="rounded-2xl bg-red-500/10 p-3 text-sm text-red-300">
                {error}
              </div>
            ) : null}

            <button
              onClick={handleLogin}
              className="w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-4 text-sm font-black uppercase tracking-[0.2em] text-white transition hover:brightness-110"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}