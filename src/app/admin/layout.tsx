"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const adminLinks = [
  { href: "/admin/dashboard", label: "Dashboard", icon: "📊" },
  { href: "/admin/bookings", label: "Booking", icon: "📅" },
  { href: "/admin/rooms", label: "Kamar", icon: "🏠" },
];

const linkIcons = {
  "/admin/dashboard": (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  "/admin/bookings": (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  "/admin/rooms": (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => router.push("/");

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex" style={{ background: "linear-gradient(135deg, #f0f5f0 0%, #f8f6f3 100%)" }}>
      {/* SIDEBAR */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-40 w-64
        bg-gradient-to-b from-[#1a2e23] via-[#1e3e1a] to-[#2d5a27]
        transform transition-all duration-500 md:transform-none
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        flex flex-col shadow-2xl shadow-black/10
      `}>
        <div className="p-6 border-b border-white/8">
          <Link href="/admin/dashboard" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-primary flex items-center justify-center shadow-lg shadow-emerald-900/30 transition-all duration-300 group-hover:scale-105 group-hover:shadow-emerald-400/20">
              <span className="text-white font-bold text-sm">FH</span>
            </div>
            <div>
              <span className="font-bold text-white text-base tracking-tight">Forest Haven</span>
              <span className="text-[10px] text-emerald-300/60 block tracking-widest uppercase">Admin Panel</span>
            </div>
          </Link>
        </div>

        <div className="flex-1 p-4 space-y-1 mt-2">
          {adminLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-white/15 text-white shadow-md shadow-black/10"
                    : "text-white/50 hover:text-white hover:bg-white/8 hover:translate-x-0.5"
                }`}
              >
                <span className="w-5 h-5 flex items-center justify-center">
                  {linkIcons[link.href as keyof typeof linkIcons]}
                </span>
                <span>{link.label}</span>
                {isActive && (
                  <span className="ml-auto flex gap-0.5">
                    <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse-soft" />
                    <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse-soft" style={{ animationDelay: "0.3s" }} />
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        <div className="p-4 border-t border-white/8 mt-auto">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium text-white/40 hover:text-white/80 hover:bg-white/8 transition-all duration-300 group"
          >
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Keluar</span>
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
      )}

      {/* MAIN */}
      <main className="flex-1 min-h-screen flex flex-col">
        <header className="sticky top-0 z-20 bg-white/70 backdrop-blur-2xl border-b border-emerald-900/8 px-4 md:px-8 py-4 flex items-center gap-4">
          <button
            className="md:hidden p-2 text-foreground-muted hover:text-primary transition-all duration-200 -ml-2 rounded-xl hover:bg-white/80"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="flex items-center gap-2 text-foreground-muted text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{new Date().toLocaleDateString("id-ID", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</span>
          </div>

          <div className="flex-1" />

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-xs text-white font-bold shadow-sm">
              A
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-foreground leading-tight">Admin</p>
              <p className="text-[11px] text-foreground-muted">Forest Haven Resort</p>
            </div>
          </div>
        </header>

        <div className="flex-1 p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
