"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getStoredBookings } from "@/lib/storage";

export default function AdminDashboard() {
  const [mounted, setMounted] = useState(false);
  const [stats, setStats] = useState({ pending: 0, approved: 0, rejected: 0, total: 0 });

  useEffect(() => {
    const bookings = getStoredBookings();
    if (bookings.length > 0) {
      const counts = bookings.reduce(
        (acc, b) => {
          if (b.status === "pending") acc.pending++;
          else if (b.status === "approved") acc.approved++;
          else if (b.status === "rejected") acc.rejected++;
          return acc;
        },
        { pending: 0, approved: 0, rejected: 0 }
      );
      setStats({ ...counts, total: bookings.length });
    }
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const statCards = [
    {
      href: "/admin/bookings",
      icon: "⏳",
      label: "Menunggu",
      value: stats.pending,
      gradient: "from-amber-500/20 to-amber-600/5",
      border: "border-amber-200/50",
      iconBg: "bg-amber-100",
      valueClass: "text-amber-600",
      filter: "pending",
    },
    {
      href: "/admin/bookings",
      icon: "✅",
      label: "Diterima",
      value: stats.approved,
      gradient: "from-emerald-500/20 to-emerald-600/5",
      border: "border-emerald-200/50",
      iconBg: "bg-emerald-100",
      valueClass: "text-emerald-600",
      filter: "approved",
    },
    {
      href: "/admin/bookings",
      icon: "❌",
      label: "Ditolak",
      value: stats.rejected,
      gradient: "from-red-500/15 to-red-600/5",
      border: "border-red-200/50",
      iconBg: "bg-red-100",
      valueClass: "text-red-600",
      filter: "rejected",
    },
  ];

  return (
    <div>
      {/* HEADER */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-lg shadow-primary/20">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">Dashboard</h1>
            <p className="text-foreground-muted text-sm">Overview bisnis Forest Haven Resort</p>
          </div>
        </div>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-8">
        {statCards.map((card, i) => (
          <Link
            key={card.filter}
            href={card.filter === "pending" ? "/admin/bookings" : `/admin/bookings?filter=${card.filter}`}
            className="relative overflow-hidden rounded-2xl border bg-white transition-all duration-500 hover:-translate-y-1 hover:shadow-xl group"
            style={{
              opacity: 0,
              animation: `fade-in-up 0.5s ease-out ${0.1 + i * 0.1}s forwards`,
            }}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-60`} />
            <div className="relative p-5 md:p-6">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl ${card.iconBg} flex items-center justify-center text-lg shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:shadow-md`}>
                  {card.icon}
                </div>
                <div>
                  <p className={`text-2xl md:text-3xl font-bold ${card.valueClass} transition-all duration-300`}>{card.value}</p>
                  <p className="text-foreground-muted text-sm">{card.label}</p>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-1 text-[11px] text-foreground-light">
                <span>Lihat detail</span>
                <svg className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* MENU ADMIN */}
      <div
        className="rounded-2xl bg-white border border-border overflow-hidden"
        style={{
          opacity: 0,
          animation: "fade-in-up 0.5s ease-out 0.5s forwards",
        }}
      >
        <div className="px-6 py-5 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
              <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            </div>
            <h2 className="text-lg font-bold text-foreground">Menu Admin</h2>
          </div>
          <span className="text-xs text-foreground-muted bg-bg-cream px-3 py-1.5 rounded-full border border-border">{stats.total} total booking</span>
        </div>

        <div className="p-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <MenuCard
            href="/admin/bookings"
            label="Kelola Booking"
            desc="Lihat, filter, dan kelola semua pemesanan"
            secondary
          />
          <MenuCard
            href="/admin/rooms"
            label="Kelola Kamar"
            desc="Tambah, edit, dan hapus tipe kamar"
            secondary
          />
          <MenuCard
            href="/"
            label="Lihat Website"
            desc="Kembali ke halaman utama resort"
          />
        </div>
      </div>
    </div>
  );
}

function MenuCard({ href, label, desc, secondary }: { href: string; label: string; desc: string; secondary?: boolean }) {
  return (
    <Link
      href={href}
      className={`group relative overflow-hidden rounded-xl p-5 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl ${
        secondary
          ? "bg-gradient-to-br from-bg-cream to-bg-green-light border border-border hover:border-primary/20"
          : "bg-gradient-to-br from-primary to-primary-dark text-white shadow-lg shadow-primary/20"
      }`}
    >
      <div className={`absolute top-0 right-0 w-24 h-24 rounded-full transition-all duration-500 group-hover:scale-150 ${
        secondary ? "bg-primary/3" : "bg-white/5"
      }`} />
      <div className="relative">
        {secondary ? (
          <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center shadow-sm mb-3 transition-transform duration-300 group-hover:scale-110">
            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={href === "/admin/bookings" ? "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" : "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"} />
            </svg>
          </div>
        ) : (
          <div className="w-10 h-10 rounded-2xl bg-white/15 flex items-center justify-center backdrop-blur-sm mb-3 transition-transform duration-300 group-hover:scale-110">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </div>
        )}
        <span className="font-bold text-sm block mb-0.5">{label}</span>
        <span className={`text-xs ${secondary ? "text-foreground-muted" : "text-white/60"}`}>{desc}</span>
      </div>
    </Link>
  );
}
