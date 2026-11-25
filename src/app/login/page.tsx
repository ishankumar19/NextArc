"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Lock, Mail, User, AlertCircle, ArrowRight, ShieldCheck } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") === "register" ? "register" : "login";

  const [tab, setTab] = useState<"login" | "register">(initialTab);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const requestedTab = searchParams.get("tab");
    if (requestedTab === "register" || requestedTab === "login") {
      setTab(requestedTab);
    }
  }, [searchParams]);

  // If already authenticated, redirect to dashboard
  useEffect(() => {
    fetch("/api/auth/session")
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (json?.success && json?.data?.user) {
          router.replace("/");
        }
      })
      .catch(() => {});
  }, [router]);

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
    <div className="max-w-md mx-auto py-12 sm:py-16 px-4 animate-in fade-in duration-200">
      {/* Brand Header */}
      <div className="text-center mb-8 space-y-3">
        <Link href="/" className="inline-block group">
          <div className="w-12 h-12 rounded-xl bg-[#176B5B] border border-[#145B4D] flex items-center justify-center text-white shadow-sm mx-auto group-hover:bg-[#115246] transition">
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
        </Link>
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#172923] tracking-tight">
            nextARC
          </h1>
          <p className="text-xs sm:text-sm text-[#52665D] max-w-xs mx-auto leading-relaxed">
            Evidence-first competitive programming intelligence platform.
          </p>
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-white border border-[#E2E8E3] rounded-2xl p-7 sm:p-9 shadow-subtle space-y-6">
        {/* Tab Toggle */}
        <div className="grid grid-cols-2 bg-[#F8FAF7] p-1.5 rounded-xl border border-[#E2E8E3] text-xs font-medium">
          <button
            type="button"
            onClick={() => { setTab("login"); setError(null); }}
            className={`py-2 rounded-lg transition cursor-pointer font-semibold ${
              tab === "login"
                ? "bg-white text-[#172923] shadow-xs"
                : "text-[#64746C] hover:text-[#172923]"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setTab("register"); setError(null); }}
            className={`py-2 rounded-lg transition cursor-pointer font-semibold ${
              tab === "register"
                ? "bg-white text-[#172923] shadow-xs"
                : "text-[#64746C] hover:text-[#172923]"
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-[#FDF2F2] border border-[#F5C6C6] text-[#9C3939] text-xs p-4 rounded-xl flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#C65D5D]" />
            <span className="leading-relaxed font-medium">{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={tab === "login" ? handleLogin : handleRegister} className="space-y-5">
          {tab === "register" && (
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#172923] block">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-[#8E9F97] absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#F8FAF7] border border-[#E2E8E3] rounded-lg pl-10 pr-3.5 py-2.5 text-xs sm:text-sm text-[#172923] placeholder-[#8E9F97] focus:outline-none focus:border-[#176B5B] focus:bg-white transition"
                />
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#172923] block">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#8E9F97] absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                placeholder="developer@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#F8FAF7] border border-[#E2E8E3] rounded-lg pl-10 pr-3.5 py-2.5 text-xs sm:text-sm text-[#172923] placeholder-[#8E9F97] focus:outline-none focus:border-[#176B5B] focus:bg-white font-mono transition"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#172923] block">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#8E9F97] absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                placeholder={tab === "register" ? "Minimum 8 characters" : "••••••••"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#F8FAF7] border border-[#E2E8E3] rounded-lg pl-10 pr-3.5 py-2.5 text-xs sm:text-sm text-[#172923] placeholder-[#8E9F97] focus:outline-none focus:border-[#176B5B] focus:bg-white transition"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-5 rounded-lg bg-[#176B5B] hover:bg-[#115246] text-white text-xs sm:text-sm font-semibold transition disabled:opacity-50 cursor-pointer shadow-sm flex items-center justify-center gap-2 mt-2"
          >
            <span>{loading ? "Authenticating..." : tab === "login" ? "Sign In to nextARC" : "Create Account"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>

      <div className="text-center text-xs text-[#64746C] mt-6 flex items-center justify-center gap-2">
        <ShieldCheck className="w-4 h-4 text-[#176B5B]" />
        <span>Grounded in cryptographic session tokens &amp; isolated user evidence</span>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="max-w-md mx-auto py-16 text-center text-sm text-[#52665D]">Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
