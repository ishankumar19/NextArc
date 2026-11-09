"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Target, BarChart2, Layers, LogOut } from "lucide-react";
import clsx from "clsx";

export function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<{ email: string; name: string | null } | null>(null);

  useEffect(() => {
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
    { href: "/", label: "Dashboard", icon: Target },
    { href: "/progress", label: "Progress", icon: BarChart2 },
    { href: "/platforms", label: "Platforms", icon: Layers },
  ];

  const isLoginPage = pathname === "/login";

  return (
    <nav className="border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-600/30 group-hover:bg-indigo-500 transition">
              P
            </div>
            <span className="font-bold tracking-tight text-white text-lg">
              PROGRESS
            </span>
          </Link>

          {!isLoginPage && (
            <div className="flex items-center gap-1">
              {links.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={clsx(
                      "flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition",
                      isActive
                        ? "bg-slate-800 text-white shadow-sm"
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1 rounded-full text-xs text-slate-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span className="font-medium">{user.name || user.email}</span>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                title="Sign out"
                className="text-slate-400 hover:text-rose-400 p-1.5 rounded-lg hover:bg-slate-900 transition cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : !isLoginPage ? (
            <Link
              href="/login"
              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition shadow-sm"
            >
              Sign In
            </Link>
          ) : null}
        </div>
      </div>
    </nav>
  );
}
