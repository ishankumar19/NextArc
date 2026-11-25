"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Target, BarChart3, Layers, LogOut, Menu, X, ArrowUpRight } from "lucide-react";
import clsx from "clsx";

export function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<{ email: string; name: string | null } | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Only fetch session if not already loaded or if navigating away from /login
    if (!user || pathname === "/") {
      fetch("/api/auth/session")
        .then((res) => (res.ok ? res.json() : null))
        .then((json) => {
          if (json?.success && json?.data?.user) {
            setUser(json.data.user);
          } else {
            setUser(null);
          }
        })
        .catch(() => setUser(null));
    }
  }, [pathname === "/login"]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  async function handleLogout() {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setUser(null);
      router.push("/login");
      router.refresh();
    } catch (e) {
      console.error("Logout failed:", e);
    }
  }

  const links = [
    { href: "/", label: "Overview", icon: Target },
    { href: "/progress", label: "Analytics & Skills", icon: BarChart3 },
    { href: "/platforms", label: "Platforms", icon: Layers },
  ];

  const isLoginPage = pathname === "/login";

  return (
    <nav className="border-b border-white/[0.08] bg-[#080A0F]/85 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-15 flex items-center justify-between">
        {/* Brand & Desktop Links */}
        <div className="flex items-center gap-7">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-7 h-7 rounded-lg bg-indigo-600/90 border border-indigo-400/30 flex items-center justify-center text-white shadow-sm shadow-indigo-600/30 group-hover:bg-indigo-500 transition">
              <svg
                width="15"
                height="15"
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
            <div className="flex items-center gap-1.5">
              <span className="font-bold tracking-tight text-white text-[15px]">
                PROGRESS
              </span>
              <span className="hidden sm:inline-block text-[9px] font-mono tracking-widest uppercase px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                INTELLIGENCE
              </span>
            </div>
          </Link>

          {!isLoginPage && (
            <div className="hidden md:flex items-center gap-1 pl-1">
              {links.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    prefetch={true}
                    className={clsx(
                      "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition",
                      isActive
                        ? "bg-white/[0.08] text-white font-semibold border border-white/[0.08]"
                        : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]"
                    )}
                  >
                    <Icon className="w-3.5 h-3.5 opacity-80" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Section: User Status or Auth Button */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-2 bg-[#0C1017] border border-white/[0.08] px-3 py-1 rounded-full text-xs text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="font-mono text-[11px] text-slate-300 truncate max-w-[150px]">
                  {user.name || user.email}
                </span>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                title="Sign out"
                className="text-slate-400 hover:text-rose-400 p-1.5 rounded-md hover:bg-white/[0.04] transition cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : !isLoginPage ? (
            <Link
              href="/login"
              className="text-xs font-semibold px-3.5 py-1.5 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white transition shadow-sm border border-indigo-400/30"
            >
              Sign In
            </Link>
          ) : null}

          {/* Mobile Menu Hamburger */}
          {!isLoginPage && (
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 text-slate-400 hover:text-white rounded-md hover:bg-white/[0.05]"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && !isLoginPage && (
        <div className="md:hidden border-t border-white/[0.08] bg-[#0C1017] px-4 py-3 space-y-1">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                prefetch={true}
                className={clsx(
                  "flex items-center gap-2.5 px-3 py-2 rounded-md text-xs font-medium transition",
                  isActive
                    ? "bg-white/[0.08] text-white font-semibold"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]"
                )}
              >
                <Icon className="w-4 h-4" />
                <span>{link.label}</span>
              </Link>
            );
          })}
          {user && (
            <div className="pt-2 mt-2 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400 px-3 py-1">
              <span className="font-mono text-[11px] truncate max-w-[200px]">{user.email}</span>
              <button
                onClick={handleLogout}
                className="text-rose-400 hover:text-rose-300 font-semibold"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
