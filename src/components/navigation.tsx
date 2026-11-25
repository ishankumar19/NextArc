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
    <nav className="border-b border-white/[0.08] bg-[#080A0F]/90 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 h-16 flex items-center justify-between">
        {/* Brand & Desktop Links */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 border border-indigo-400/40 flex items-center justify-center text-white shadow-sm shadow-indigo-600/30 group-hover:bg-indigo-500 transition">
              <svg
                width="16"
                height="16"
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
            <div className="flex items-center gap-2">
              <span className="font-bold tracking-tight text-white text-base">
                PROGRESS
              </span>
              <span className="hidden sm:inline-block text-[10px] font-mono tracking-wider uppercase px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-medium">
                INTELLIGENCE
              </span>
            </div>
          </Link>

          {!isLoginPage && (
            <div className="hidden md:flex items-center gap-2 pl-2">
              {links.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    prefetch={true}
                    className={clsx(
                      "flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition",
                      isActive
                        ? "bg-white/[0.08] text-white font-semibold border border-white/[0.08] shadow-sm"
                        : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]"
                    )}
                  >
                    <Icon className="w-4 h-4 opacity-80" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Section: User Status or Auth Button */}
        <div className="flex items-center gap-3.5">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 bg-[#0C1017] border border-white/[0.08] px-3.5 py-1.5 rounded-full text-xs text-slate-300 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="font-mono text-xs text-slate-300 font-medium truncate max-w-[160px]">
                  {user.name || user.email}
                </span>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                title="Sign out"
                className="text-slate-400 hover:text-rose-400 p-2 rounded-lg hover:bg-white/[0.05] transition cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : !isLoginPage ? (
            <Link
              href="/login"
              className="text-xs font-semibold px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition shadow-sm border border-indigo-400/30"
            >
              Sign In
            </Link>
          ) : null}

          {/* Mobile Menu Hamburger */}
          {!isLoginPage && (
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/[0.05]"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && !isLoginPage && (
        <div className="md:hidden border-t border-white/[0.08] bg-[#0C1017] px-5 py-4 space-y-1.5">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                prefetch={true}
                className={clsx(
                  "flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition",
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
            <div className="pt-3 mt-3 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400 px-3.5 py-1.5">
              <span className="font-mono text-xs truncate max-w-[200px] text-slate-300">{user.email}</span>
              <button
                onClick={handleLogout}
                className="text-rose-400 hover:text-rose-300 font-semibold px-2 py-1 rounded hover:bg-rose-500/10"
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
