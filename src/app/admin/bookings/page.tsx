"use client";

import { useState, useEffect } from "react";
import { getStoredBookings, saveBooking, updateBookingStatus, deleteBooking, Booking } from "@/lib/storage";

const defaultBookings: Booking[] = [
  { id: "1", nama: "Budi Santoso", wa: "6281234567890", kamar: "Deluxe Room", kamarId: "deluxe", checkIn: "2026-04-25", checkOut: "2026-04-27", tamu: 2, status: "pending", createdAt: "2026-04-23", totalHarga: 1200000 },
  { id: "2", nama: "Siti Rahayu", wa: "6289876543210", kamar: "Suite Room", kamarId: "suite", checkIn: "2026-04-28", checkOut: "2026-04-30", tamu: 2, status: "pending", createdAt: "2026-04-23", totalHarga: 1800000 },
  { id: "3", nama: "Ahmad Wijaya", wa: "6285555555555", kamar: "Premium Room", kamarId: "premium", checkIn: "2026-04-20", checkOut: "2026-04-22", tamu: 3, status: "approved", createdAt: "2026-04-18", totalHarga: 1500000 },
  { id: "4", nama: "Diana Lestari", wa: "6287777777777", kamar: "Deluxe Room", kamarId: "deluxe", checkIn: "2026-04-15", checkOut: "2026-04-17", tamu: 2, status: "rejected", createdAt: "2026-04-14", totalHarga: 1200000 },
];

const tabs = [
  { key: "all", label: "Semua" },
  { key: "pending", label: "Pending" },
  { key: "approved", label: "Diterima" },
  { key: "rejected", label: "Ditolak" },
] as const;

const statusStyles: Record<string, { dot: string; bg: string; text: string; label: string }> = {
  pending: { dot: "bg-amber-500", bg: "bg-amber-50 border-amber-200", text: "text-amber-700", label: "Pending" },
  approved: { dot: "bg-emerald-500", bg: "bg-emerald-50 border-emerald-200", text: "text-emerald-700", label: "Diterima" },
  rejected: { dot: "bg-red-500", bg: "bg-red-50 border-red-200", text: "text-red-700", label: "Ditolak" },
};

export default function AdminBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");
  const [mounted, setMounted] = useState(false);
  const [detailBooking, setDetailBooking] = useState<Booking | null>(null);

  useEffect(() => {
    const stored = getStoredBookings();
    if (stored.length > 0) {
      setBookings(stored);
    } else {
      defaultBookings.forEach(b => saveBooking(b));
      setBookings(defaultBookings);
    }
    setMounted(true);
  }, []);

  const filtered = bookings.filter((b) => filter === "all" || b.status === filter);

  const handleUpdateStatus = (id: string, status: "approved" | "rejected") => {
    updateBookingStatus(id, status);
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
  };

  const handleDelete = (id: string) => {
    if (!confirm("Yakin ingin menghapus booking ini?")) return;
    deleteBooking(id);
    setBookings((prev) => prev.filter((b) => b.id !== id));
    setDetailBooking(null);
  };

  if (!mounted) return null;

  const totalPending = bookings.filter((b) => b.status === "pending").length;

  return (
    <div className="max-w-6xl">
      {/* HEADER */}
      <div className="mb-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-lg shadow-primary/20">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">Booking</h1>
              <p className="text-foreground-muted text-sm mt-0.5">{bookings.length} total pemesanan</p>
            </div>
          </div>
          {totalPending > 0 && (
            <span className="px-3 py-1.5 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-medium rounded-full flex items-center gap-1.5 whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse-soft" />
              {totalPending} perlu diproses
            </span>
          )}
        </div>
      </div>

      {/* FILTER TABS */}
      <div className="flex gap-2 mb-5 overflow-x-auto pb-1 scrollbar-none">
        {tabs.map((t) => {
          const count = t.key === "all" ? bookings.length : bookings.filter((b) => b.status === t.key).length;
          return (
            <button
              key={t.key}
              onClick={() => setFilter(t.key as typeof filter)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200 flex items-center gap-2 ${
                filter === t.key
                  ? "bg-primary text-white shadow-md shadow-primary/20"
                  : "bg-white text-foreground border border-border/70 hover:border-primary/20 hover:text-primary"
              }`}
            >
              {t.label}
                  <span className={`text-xs px-1.5 py-0.5 rounded-md ${
                filter === t.key ? "bg-white/20" : "bg-bg-cream text-foreground"
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl border border-border/70 overflow-hidden shadow-sm">
        {filtered.length === 0 ? (
          <div className="py-20 text-center">
            <div className="w-16 h-16 rounded-2xl bg-bg-cream flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-foreground-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <p className="text-foreground font-medium">Belum ada booking</p>
            <p className="text-foreground text-sm mt-1">Booking akan muncul di sini setelah tamu melakukan pemesanan</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-bg-cream to-bg-green-light/50 border-b border-border/50">
                  <th className="text-left px-4 md:px-5 py-3.5 text-[11px] font-semibold text-foreground-muted uppercase tracking-wider">Tamu</th>
                  <th className="text-left px-4 md:px-5 py-3.5 text-[11px] font-semibold text-foreground-muted uppercase tracking-wider hidden md:table-cell">Kamar</th>
                  <th className="text-left px-4 md:px-5 py-3.5 text-[11px] font-semibold text-foreground-muted uppercase tracking-wider hidden lg:table-cell">Tanggal</th>
                  <th className="text-left px-4 md:px-5 py-3.5 text-[11px] font-semibold text-foreground-muted uppercase tracking-wider">Status</th>
                  <th className="text-right px-4 md:px-5 py-3.5 text-[11px] font-semibold text-foreground-muted uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {filtered.map((booking, i) => {
                  const st = statusStyles[booking.status];
                  return (
                    <tr
                      key={booking.id}
                      className="group transition-all duration-150 hover:bg-bg-cream/60"
                      style={{
                        opacity: 0,
                        animation: `fade-in-up 0.25s ease-out ${i * 30}ms forwards`,
                      }}
                    >
                      <td className="px-4 md:px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center text-sm font-bold text-primary flex-shrink-0">
                            {booking.nama.charAt(0).toUpperCase()}
                          </div>
                          <div className="min-w-0">
                            <button
                              onClick={() => setDetailBooking(booking)}
                              className="font-medium text-foreground text-sm hover:text-primary transition-colors text-left truncate block max-w-[140px] sm:max-w-none"
                            >
                              {booking.nama}
                            </button>
                            <p className="text-xs text-foreground mt-0.5">{booking.wa}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 md:px-5 py-3.5 hidden md:table-cell">
                        <span className="inline-flex px-2.5 py-1 rounded-lg text-xs font-medium bg-primary/8 text-primary border border-primary/10">
                          {booking.kamar}
                        </span>
                      </td>
                      <td className="px-4 md:px-5 py-3.5 hidden lg:table-cell">
                        <div className="text-sm text-foreground">
                          <span>{booking.checkIn}</span>
                          <span className="text-foreground-light mx-1">&rarr;</span>
                          <span>{booking.checkOut}</span>
                        </div>
                        <p className="text-xs text-foreground mt-0.5">{booking.tamu} tamu</p>
                      </td>
                      <td className="px-4 md:px-5 py-3.5">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border ${st.bg} ${st.text}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />
                          {st.label}
                        </span>
                      </td>
                      <td className="px-4 md:px-5 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-1">
                          {booking.status === "pending" && (
                            <>
                              <button
                                onClick={() => handleUpdateStatus(booking.id, "approved")}
                                className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-100 hover:text-emerald-700 border border-emerald-200 transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center text-sm"
                                title="Terima"
                              >
                                ✓
                              </button>
                              <button
                                onClick={() => handleUpdateStatus(booking.id, "rejected")}
                                className="w-8 h-8 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600 border border-red-200 transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center text-sm"
                                title="Tolak"
                              >
                                ✗
                              </button>
                            </>
                          )}
                          <button
                            onClick={() => setDetailBooking(booking)}
                            className="w-8 h-8 rounded-xl bg-bg-cream text-primary hover:text-primary hover:bg-primary/5 border border-border/70 transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center"
                            title="Detail"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                          <a
                            href={`https://wa.me/${booking.wa}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border border-emerald-200 transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center"
                            title="Chat WhatsApp"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01.57-.01.198 0 .52.074.792.372.272.297 1.04 1.016 1.04 2.156 0 1.14-.848 2.446-1.01 2.77-.159.297-.01.596.114.743.149.149.328.447.97.729 1.517.666 2.573 1.323 3.011 1.502.713.293 1.404.264 1.921.18.6-.099 1.837-.734 2.109-1.44.273-.706.273-1.473.192-1.612-.074-.149-.297-.199-.495-.249z"/>
                            </svg>
                          </a>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* DETAIL MODAL */}
      {detailBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setDetailBooking(null)}>
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
          <div
            className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            style={{ animation: "fade-in-up 0.25s ease-out" }}
          >
            <div className="px-5 md:px-6 py-4 border-b border-border/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-foreground">Detail Booking</h3>
                  <p className="text-xs text-foreground">ID: {detailBooking.id}</p>
                </div>
              </div>
              <button onClick={() => setDetailBooking(null)} className="w-8 h-8 rounded-xl bg-bg-cream text-foreground hover:text-foreground flex items-center justify-center transition-all text-sm hover:scale-105 active:scale-95">✕</button>
            </div>

            <div className="p-5 md:p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <DetailField label="Nama" value={detailBooking.nama} />
                <DetailField label="WhatsApp" value={detailBooking.wa} />
                <DetailField label="Kamar" value={detailBooking.kamar} />
                <DetailField label="Tamu" value={`${detailBooking.tamu} orang`} />
                <DetailField label="Check-in" value={detailBooking.checkIn} />
                <DetailField label="Check-out" value={detailBooking.checkOut} />
                <DetailField label="Total Harga" value={`Rp ${detailBooking.totalHarga.toLocaleString("id-ID")}`} />
                <DetailField label="Status" value={statusStyles[detailBooking.status].label} />
                <DetailField label="Dibuat" value={detailBooking.createdAt} />
              </div>
            </div>

            <div className="px-5 md:px-6 py-4 border-t border-border/50 flex gap-2 justify-end">
              {detailBooking.status === "pending" && (
                <>
                  <button onClick={() => { handleUpdateStatus(detailBooking.id, "approved"); setDetailBooking(null); }} className="px-4 py-2 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl text-sm font-medium hover:bg-emerald-100 transition-all hover:-translate-y-0.5 flex items-center gap-1.5">
                    <span>✓</span> Terima
                  </button>
                  <button onClick={() => { handleUpdateStatus(detailBooking.id, "rejected"); setDetailBooking(null); }} className="px-4 py-2 bg-red-50 text-red-700 border border-red-200 rounded-xl text-sm font-medium hover:bg-red-100 transition-all hover:-translate-y-0.5 flex items-center gap-1.5">
                    <span>✗</span> Tolak
                  </button>
                </>
              )}
              <button onClick={() => { handleDelete(detailBooking.id); }} className="px-4 py-2 text-foreground border border-border/70 rounded-xl text-sm font-medium hover:text-red-600 hover:border-red-200 transition-all hover:-translate-y-0.5 flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DetailField({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-3 rounded-xl bg-bg-cream border border-border/60">
      <p className="text-[11px] text-foreground-muted font-medium uppercase tracking-wider mb-1">{label}</p>
      <p className="text-sm font-semibold text-foreground">{value}</p>
    </div>
  );
}
