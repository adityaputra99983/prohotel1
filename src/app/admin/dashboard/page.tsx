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
      gradient: "from-amber-500 to-amber-600",
      badge: "bg-amber-100 text-amber-700 border-amber-200",
      valueClass: "text-amber-600",
      filter: "pending",
    },
    {
      href: "/admin/bookings",
      icon: "✅",
      label: "Diterima",
      value: stats.approved,
      gradient: "from-emerald-500 to-emerald-600",
      badge: "bg-emerald-100 text-emerald-700 border-emerald-200",
      valueClass: "text-emerald-600",
      filter: "approved",
    },
    {
      href: "/admin/bookings",
      icon: "❌",
      label: "Ditolak",
      value: stats.rejected,
      gradient: "from-red-500 to-red-600",
      badge: "bg-red-100 text-red-700 border-red-200",
      valueClass: "text-red-600",
      filter: "rejected",
    },
  ];

  return (
    <div className="max-w-6xl">
      {/* HEADER */}
      <div className="mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-lg shadow-primary/20">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">Dashboard</h1>
            <p className="text-foreground-muted text-sm mt-0.5">Overview bisnis Forest Haven Resort</p>
          </div>
        </div>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5 mb-8">
        {statCards.map((card, i) => (
          <Link
            key={card.filter}
            href={card.filter === "pending" ? "/admin/bookings" : `/admin/bookings?filter=${card.filter}`}
            className="relative overflow-hidden rounded-2xl bg-white border border-border/70 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group"
            style={{
              opacity: 0,
              animation: `fade-in-up 0.4s ease-out ${0.1 + i * 0.1}s forwards`,
            }}
          >
            <div className={`absolute top-0 right-0 w-32 h-32 rounded-full opacity-5 bg-gradient-to-br ${card.gradient} transition-all duration-500 group-hover:scale-[2] group-hover:opacity-10`} />
            <div className="relative p-5 md:p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-11 h-11 rounded-2xl ${card.badge} flex items-center justify-center text-lg shadow-sm transition-all duration-300 group-hover:scale-110`}>
                  {card.icon}
                </div>
                <span className={`text-2xl md:text-3xl font-bold ${card.valueClass} tabular-nums`}>{card.value}</span>
              </div>
              <p className="text-foreground-muted text-sm font-medium">{card.label}</p>
              <div className="mt-3 flex items-center gap-1 text-[11px] text-primary group-hover:text-primary transition-colors duration-200">
                <span>Lihat detail</span>
                <svg className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* QUICK MENU */}
      <div
        className="rounded-2xl bg-white border border-border/70 overflow-hidden"
        style={{
          opacity: 0,
          animation: "fade-in-up 0.4s ease-out 0.4s forwards",
        }}
      >
        <div className="px-5 md:px-6 py-4 border-b border-border/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
              <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            </div>
            <h2 className="text-base font-bold text-foreground">Menu Cepat</h2>
          </div>
          <span className="text-xs text-primary bg-bg-cream px-3 py-1.5 rounded-full border border-border/50">
            {stats.total} total booking
          </span>
        </div>

        <div className="p-4 md:p-5 grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
          <QuickCard
            href="/admin/bookings"
            label="Kelola Booking"
            desc="Lihat, filter, dan kelola semua pemesanan"
            secondary
          />
          <QuickCard
            href="/admin/rooms"
            label="Kelola Kamar"
            desc="Tambah, edit, dan hapus tipe kamar"
            secondary
          />
          <QuickCard
            href="/"
            label="Lihat Website"
            desc="Kembali ke halaman utama resort"
          />
        </div>
      </div>
    </div>
  );
}

function QuickCard({ href, label, desc, secondary }: { href: string; label: string; desc: string; secondary?: boolean }) {
  return (
    <Link
      href={href}
      className={`group relative overflow-hidden rounded-xl p-4 md:p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md ${
        secondary
          ? "bg-gradient-to-br from-bg-cream to-bg-green-light border border-border/70 hover:border-primary/20"
          : "bg-gradient-to-br from-primary to-primary-dark text-white shadow-md shadow-primary/10"
      }`}
    >
      <div className={`absolute top-0 right-0 w-24 h-24 rounded-full transition-all duration-500 group-hover:scale-150 ${
        secondary ? "bg-primary/5" : "bg-white/8"
      }`} />
      <div className="relative">
        {secondary ? (
          <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center shadow-sm mb-3 transition-transform duration-300 group-hover:scale-110">
            <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={href === "/admin/bookings" ? "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" : "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"} />
            </svg>
          </div>
        ) : (
          <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center backdrop-blur-sm mb-3 transition-transform duration-300 group-hover:scale-110">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </div>
        )}
        <span className="font-semibold text-sm block mb-0.5">{label}</span>
        <span className={`text-xs ${secondary ? "text-foreground" : "text-white/90"}`}>{desc}</span>
      </div>
    </Link>
  );
}
