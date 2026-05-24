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

  return (
    <div className="animate-[fade-in-up_0.4s_ease-out]">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">Dashboard</h1>
        <p className="text-foreground-muted mt-1">Kelola booking dan kamar Resort Anda</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
        <StatCard href="/admin/bookings" icon="⏳" label="Menunggu" value={stats.pending} bgClass="bg-amber-50 border-amber-100" iconClass="bg-amber-100" valueClass="text-amber-700" filter="pending" />
        <StatCard href="/admin/bookings" icon="✅" label="Diterima" value={stats.approved} bgClass="bg-green-50 border-green-100" iconClass="bg-green-100" valueClass="text-green-700" filter="approved" />
        <StatCard href="/admin/bookings" icon="❌" label="Ditolak" value={stats.rejected} bgClass="bg-red-50 border-red-100" iconClass="bg-red-100" valueClass="text-red-700" filter="rejected" />
      </div>

      <div className="mt-8 bg-white rounded-2xl border border-border overflow-hidden">
        <div className="px-6 py-5 border-b border-border flex items-center justify-between">
          <h2 className="text-lg font-bold text-foreground">Menu Admin</h2>
          <span className="text-xs text-foreground-muted bg-bg-cream px-3 py-1 rounded-lg">{stats.total} total booking</span>
        </div>
        <div className="p-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <MenuCard href="/admin/bookings" icon="📅" label="Kelola Booking" desc="Lihat dan kelola pemesanan" />
          <MenuCard href="/admin/rooms" icon="🏠" label="Kelola Kamar" desc="Tambah, edit, hapus kamar" />
          <MenuCard href="/" icon="🌐" label="Lihat Website" desc="Kembali ke halaman utama" primary />
        </div>
      </div>
    </div>
  );
}

function StatCard({ href, icon, label, value, bgClass, iconClass, valueClass, filter }: {
  href: string; icon: string; label: string; value: number; bgClass: string; iconClass: string; valueClass: string; filter: string;
}) {
  return (
    <Link
      href={filter === "pending" ? "/admin/bookings" : `/admin/bookings?filter=${filter}`}
      className={`rounded-2xl border p-5 md:p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md ${bgClass}`}
    >
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg ${iconClass}`}>
          {icon}
        </div>
        <div>
          <p className={`text-2xl md:text-3xl font-bold ${valueClass}`}>{value}</p>
          <p className="text-foreground-muted text-sm">{label}</p>
        </div>
      </div>
    </Link>
  );
}

function MenuCard({ href, icon, label, desc, primary }: { href: string; icon: string; label: string; desc: string; primary?: boolean }) {
  return (
    <Link
      href={href}
      className={`rounded-xl p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md ${
        primary
          ? "bg-primary text-white hover:shadow-primary/20"
          : "bg-bg-cream text-foreground hover:shadow-sm border border-border"
      }`}
    >
      <span className="text-2xl block mb-3">{icon}</span>
      <span className="font-bold text-sm block mb-1">{label}</span>
      <span className={`text-xs ${primary ? "text-white/65" : "text-foreground-muted"}`}>{desc}</span>
    </Link>
  );
}
