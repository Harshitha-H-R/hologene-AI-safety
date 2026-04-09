import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [licenseId, setLicenseId] = useState('');
  const navigate = useNavigate();

  const handleEntry = () => {
    // Trim handles accidental spaces
    if (licenseId.trim().length >= 4) {
      navigate('/dashboard');
    } else {
      alert("Please enter a valid Medical License ID (min 4 characters)");
    }
  };

  return (
    <div className="bg-dna">
      {/* Container to ensure it stays centered */}
      <div className="relative z-10 w-full flex justify-center px-4">
        <div className="glass-card p-10 rounded-[2.5rem] w-full max-w-md text-center">
          
          <div className="mb-8 flex flex-col items-center">
            <div className="w-20 h-20 bg-cyan-500/10 rounded-full flex items-center justify-center mb-4 border border-cyan-500/20 animate-pulse">
              <span className="text-4xl">🧬</span>
            </div>
            <h1 className="text-4xl font-black tracking-tighter text-white">
              HOLO<span className="text-cyan-400">GENE</span> AI
            </h1>
            <p className="text-[10px] uppercase tracking-[0.4em] text-cyan-500/60 font-bold mt-2">
              Precision Medicine Portal
            </p>
          </div>

          <div className="space-y-6">
            <div className="text-left">
              <label className="text-[10px] font-bold text-slate-500 uppercase ml-2 mb-2 block tracking-widest">
                Physician Authentication
              </label>
              <input 
                type="password"
                placeholder="License ID"
                className="w-full bg-black/40 border border-white/5 p-4 rounded-2xl text-white placeholder:text-slate-700 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 outline-none transition-all text-center tracking-[0.5em] text-xl"
                value={licenseId}
                onChange={(e) => setLicenseId(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleEntry()}
                autoFocus
              />
            </div>

            <button 
              onClick={handleEntry}
              className="w-full py-4 bg-gradient-to-r from-cyan-600 to-blue-700 hover:scale-[1.02] text-white font-black rounded-2xl transition-all shadow-xl shadow-cyan-500/10 active:scale-[0.98]"
            >
              VERIFY & ENTER
            </button>
          </div>

          <div className="mt-12 pt-6 border-t border-white/5 flex justify-between items-center opacity-20 text-[9px] font-bold uppercase text-white tracking-widest">
            <span>HIPAA SECURE</span>
            <span>V2.0.4</span>
          </div>
        </div>
      </div>
    </div>
  );
}import React, { useState } from "react";
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