"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const adminLinks = [
  { href: "/admin/dashboard", label: "Dashboard", icon: "📊" },
  { href: "/admin/bookings", label: "Booking", icon: "📅" },
  { href: "/admin/rooms", label: "Kamar", icon: "🏠" },
];

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
    <div className="min-h-screen bg-bg-cream flex">
      <aside className={`
        fixed md:static inset-y-0 left-0 z-40 w-64
        bg-gradient-to-b from-primary-dark to-primary-dark/95
        border-r border-primary/10
        transform transition-transform duration-300 md:transform-none
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        flex flex-col
      `}>
        <div className="p-6 border-b border-white/8">
          <Link href="/admin/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-light to-primary flex items-center justify-center shadow-lg shadow-primary/20">
              <span className="text-white font-bold text-sm">FH</span>
            </div>
            <div>
              <span className="font-bold text-white text-base tracking-tight">Forest Haven</span>
              <span className="text-xs text-white/45 block">Admin Panel</span>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {adminLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-white/15 text-white shadow-sm"
                    : "text-white/55 hover:text-white hover:bg-white/8"
                }`}
              >
                <span className="text-lg">{link.icon}</span>
                <span>{link.label}</span>
                {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-light animate-pulse-soft" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/8">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-white/55 hover:text-white hover:bg-white/8 transition-all duration-200"
          >
            <span>🚪</span>
            <span>Keluar</span>
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/30 z-30 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <main className="flex-1 min-h-screen flex flex-col">
        <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-border px-4 md:px-8 py-4 flex items-center gap-4">
          <button
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors -ml-2"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex-1" />
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-sm text-primary">A</div>
            <span className="text-sm text-foreground-muted hidden sm:block">Admin</span>
          </div>
        </header>

        <div className="flex-1 p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
