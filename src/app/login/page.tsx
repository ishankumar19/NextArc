"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, Mail, User, AlertCircle, ArrowRight, ShieldCheck } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [tab, setTab] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error?.message || "Failed to sign in. Please verify your credentials.");
        return;
      }

      router.push("/");
      router.refresh();
    } catch {
      setError("Network error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error?.message || "Failed to register account.");
        return;
      }

      router.push("/");
      router.refresh();
    } catch {
      setError("Network error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto py-14 sm:py-20 px-4 animate-in fade-in duration-200">
      {/* Brand Header */}
      <div className="text-center mb-9 space-y-3">
        <div className="w-12 h-12 rounded-xl bg-indigo-600 border border-indigo-400/40 flex items-center justify-center text-white shadow-sm shadow-indigo-600/30 mx-auto">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4.5 16.5c1.5 1.26 3 1.5 4.5 0s3-1.5 4.5 0 3 1.5 4.5 0" />
            <path d="M7 11.5L12 6.5L17 11.5" />
            <path d="M12 6.5V17" />
          </svg>
        </div>
        <div className="space-y-1.5">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Progress
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xs mx-auto leading-relaxed">
            Evidence-first competitive programming intelligence platform.
          </p>
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-[#0C1017] border border-white/[0.08] rounded-2xl p-7 sm:p-9 shadow-elevated space-y-7">
        {/* Tab Toggle */}
        <div className="grid grid-cols-2 bg-[#080A0F] p-1.5 rounded-xl border border-white/[0.06] text-xs font-medium">
          <button
            type="button"
            onClick={() => { setTab("login"); setError(null); }}
            className={`py-2 rounded-lg transition cursor-pointer font-semibold ${
              tab === "login"
                ? "bg-white/[0.08] text-white shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setTab("register"); setError(null); }}
            className={`py-2 rounded-lg transition cursor-pointer font-semibold ${
              tab === "register"
                ? "bg-white/[0.08] text-white shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs p-4 rounded-xl flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
            <span className="leading-relaxed">{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={tab === "login" ? handleLogin : handleRegister} className="space-y-5">
          {tab === "register" && (
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 block">Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#080A0F] border border-white/[0.08] rounded-lg pl-10 pr-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 block">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                placeholder="developer@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#080A0F] border border-white/[0.08] rounded-lg pl-10 pr-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 block">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                placeholder={tab === "register" ? "Minimum 8 characters" : "••••••••"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#080A0F] border border-white/[0.08] rounded-lg pl-10 pr-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-semibold transition disabled:opacity-50 cursor-pointer shadow-sm shadow-indigo-600/30 flex items-center justify-center gap-2 mt-2"
          >
            <span>{loading ? "Authenticating..." : tab === "login" ? "Sign In to Progress" : "Create Account"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>

      <div className="text-center text-xs text-slate-500 mt-7 flex items-center justify-center gap-2">
        <ShieldCheck className="w-4 h-4 text-slate-500" />
        <span>Grounded in cryptographic session tokens &amp; isolated user evidence</span>
      </div>
    </div>
  );
}
