"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Target, BarChart3, Layers, LogOut, Menu, X } from "lucide-react";
import clsx from "clsx";

export function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<{ email: string; name: string | null } | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
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
    <nav className="border-b border-[#E2E8E3] bg-[#FFFFFF]/90 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 h-16 flex items-center justify-between">
        {/* Brand & Desktop Links */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-lg bg-[#176B5B] flex items-center justify-center text-white shadow-sm shadow-[#176B5B]/20 group-hover:bg-[#115246] transition">
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
              <span className="font-bold tracking-tight text-[#172923] text-base">
                PROGRESS
              </span>
              <span className="hidden sm:inline-block text-[10px] font-mono tracking-wider uppercase px-2 py-0.5 rounded bg-[#E5F1EB] text-[#145B4D] border border-[#BCE0D4] font-medium">
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
                        ? "bg-[#E5F1EB] text-[#176B5B] font-semibold border border-[#CCE4D8] shadow-sm"
                        : "text-[#52665D] hover:text-[#172923] hover:bg-[#F0F4F1]"
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
              <div className="hidden sm:flex items-center gap-2 bg-[#FFFFFF] border border-[#E2E8E3] px-3.5 py-1.5 rounded-full text-xs text-[#52665D] shadow-subtle">
                <span className="w-2 h-2 rounded-full bg-[#176B5B] animate-pulse"></span>
                <span className="font-mono text-xs text-[#172923] font-medium truncate max-w-[160px]">
                  {user.name || user.email}
                </span>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                title="Sign out"
                className="text-[#8E9F97] hover:text-[#C65D5D] p-2 rounded-lg hover:bg-[#FDF2F2] transition cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : !isLoginPage ? (
            <Link
              href="/login"
              className="text-xs font-semibold px-4 py-2 rounded-lg bg-[#176B5B] hover:bg-[#115246] text-white transition shadow-sm shadow-[#176B5B]/20"
            >
              Sign In
            </Link>
          ) : null}

          {/* Mobile Menu Hamburger */}
          {!isLoginPage && (
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#52665D] hover:text-[#172923] rounded-lg hover:bg-[#F0F4F1]"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && !isLoginPage && (
        <div className="md:hidden border-t border-[#E2E8E3] bg-[#FFFFFF] px-5 py-4 space-y-1.5 shadow-card">
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
                    ? "bg-[#E5F1EB] text-[#176B5B] font-semibold"
                    : "text-[#52665D] hover:text-[#172923] hover:bg-[#F0F4F1]"
                )}
              >
                <Icon className="w-4 h-4" />
                <span>{link.label}</span>
              </Link>
            );
          })}
          {user && (
            <div className="pt-3 mt-3 border-t border-[#E2E8E3] flex items-center justify-between text-xs text-[#52665D] px-3.5 py-1.5">
              <span className="font-mono text-xs truncate max-w-[200px] text-[#172923]">{user.email}</span>
              <button
                onClick={handleLogout}
                className="text-[#C65D5D] hover:text-[#9C3939] font-semibold px-2 py-1 rounded hover:bg-[#FDF2F2]"
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
