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

const pageTitles: Record<string, string> = {
  "/admin/dashboard": "Dashboard",
  "/admin/bookings": "Booking",
  "/admin/rooms": "Kamar",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => router.push("/");
  const currentPage = pageTitles[pathname] || "Admin";

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex" style={{ background: "linear-gradient(135deg, #f0f5f0 0%, #f8f6f3 100%)" }}>
      {/* OVERLAY */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-30 md:hidden backdrop-blur-sm transition-opacity duration-300" onClick={() => setSidebarOpen(false)} />
      )}

      {/* SIDEBAR */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-40 w-64
        bg-gradient-to-b from-[#0f1f14] via-[#1a3a15] to-[#2d5a27]
        transform transition-all duration-300 md:transform-none flex flex-col
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}>
        {/* LOGO */}
        <div className="p-5 border-b border-white/8">
          <Link href="/admin/dashboard" className="flex items-center gap-3 group">
            <img src="/logo-fh.svg" alt="Forest Haven" className="w-10 h-10 rounded-xl transition-all duration-300 group-hover:scale-105" />
            <div>
              <span className="font-bold text-white text-sm tracking-tight block leading-tight">Forest Haven</span>
              <span className="text-[10px] text-emerald-300 block tracking-[0.15em] uppercase">Admin Panel</span>
            </div>
          </Link>
        </div>

        {/* NAV LINKS */}
        <nav className="flex-1 p-3 space-y-0.5 mt-1 overflow-y-auto">
          {adminLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-white/15 text-white shadow-sm"
                    : "text-white hover:text-white hover:bg-white/10"
                }`}
              >
                <span className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                  {linkIcons[link.href as keyof typeof linkIcons]}
                </span>
                <span>{link.label}</span>
                {isActive && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* LOGOUT */}
        <div className="p-3 border-t border-white/8">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:text-white hover:bg-white/10 transition-all duration-200 group"
          >
            <svg className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Keluar</span>
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 min-h-screen flex flex-col">
        {/* HEADER */}
        <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-border/50 px-4 md:px-6 py-3 flex items-center gap-3">
          <button
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl text-foreground-muted hover:text-primary hover:bg-white/80 transition-all duration-200 -ml-1"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle sidebar"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="hidden sm:flex items-center gap-1.5 text-sm text-foreground-muted">
            <span className="text-foreground">Admin</span>
            <svg className="w-3 h-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="font-medium text-foreground">{currentPage}</span>
          </div>

          <div className="flex-1" />

          <div className="flex items-center gap-1.5 text-xs text-foreground-muted bg-bg-cream/80 px-3 py-1.5 rounded-lg border border-border/50">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="hidden sm:inline">{new Date().toLocaleDateString("id-ID", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</span>
            <span className="sm:hidden">{new Date().toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}</span>
          </div>

          {/* USER MENU */}
          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-white/80 transition-all duration-200"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-xs text-white font-bold shadow-sm">
                A
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-foreground leading-tight -mt-0.5">Admin</p>
                <p className="text-[10px] text-foreground">Forest Haven Resort</p>
              </div>
              <svg className={`w-4 h-4 text-foreground transition-transform duration-200 ${userMenuOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {userMenuOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setUserMenuOpen(false)} />
                <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-xl shadow-xl border border-border/50 py-1 z-20 transition-all duration-200">
                  <div className="px-4 py-2.5 border-b border-border/50">
                    <p className="text-sm font-medium text-foreground">Admin</p>
                    <p className="text-xs text-foreground-muted">admin@foresthaven.com</p>
                  </div>
                  <Link href="/" className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-primary hover:text-primary hover:bg-primary/5 transition-all" onClick={() => setUserMenuOpen(false)}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Lihat Website
                  </Link>
                  <button
                    onClick={() => { setUserMenuOpen(false); handleLogout(); }}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-all"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Keluar
                  </button>
                </div>
              </>
            )}
          </div>
        </header>

        {/* PAGE CONTENT */}
        <div className="flex-1 p-4 md:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
