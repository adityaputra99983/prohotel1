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

const statusStyles: Record<string, { dot: string; bg: string; text: string }> = {
  pending: { dot: "bg-amber-500", bg: "bg-amber-50 border-amber-200", text: "text-amber-700" },
  approved: { dot: "bg-green-500", bg: "bg-green-50 border-green-200", text: "text-green-700" },
  rejected: { dot: "bg-red-500", bg: "bg-red-50 border-red-200", text: "text-red-700" },
};

const statusLabels: Record<string, string> = {
  pending: "Pending",
  approved: "Diterima",
  rejected: "Ditolak",
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

  return (
    <div className="animate-[fade-in-up_0.4s_ease-out]">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">Booking</h1>
        <p className="text-foreground-muted mt-1">{bookings.length} total pemesanan</p>
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setFilter(t.key as typeof filter)}
            className={`px-5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200 ${
              filter === t.key
                ? "bg-primary text-white shadow-md shadow-primary/20"
                : "bg-white text-foreground-muted border border-border hover:border-primary/20 hover:text-primary"
            }`}
          >
            {t.label}
            {t.key !== "all" && (
              <span className={`ml-2 px-1.5 py-0.5 rounded text-xs ${
                filter === t.key ? "bg-white/20" : "bg-bg-cream"
              }`}>
                {bookings.filter((b) => b.status === t.key).length}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        {filtered.length === 0 ? (
          <div className="py-16 text-center">
            <span className="text-4xl block mb-3">📭</span>
            <p className="text-foreground-muted">Tidak ada booking</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-bg-cream border-b border-border">
                  <th className="text-left px-5 py-4 text-xs font-semibold text-foreground-muted uppercase tracking-wider">Nama</th>
                  <th className="text-left px-5 py-4 text-xs font-semibold text-foreground-muted uppercase tracking-wider hidden md:table-cell">Kamar</th>
                  <th className="text-left px-5 py-4 text-xs font-semibold text-foreground-muted uppercase tracking-wider hidden lg:table-cell">Check-in</th>
                  <th className="text-left px-5 py-4 text-xs font-semibold text-foreground-muted uppercase tracking-wider hidden lg:table-cell">Check-out</th>
                  <th className="text-left px-5 py-4 text-xs font-semibold text-foreground-muted uppercase tracking-wider">Status</th>
                  <th className="text-right px-5 py-4 text-xs font-semibold text-foreground-muted uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((booking) => {
                  const st = statusStyles[booking.status];
                  return (
                    <tr key={booking.id} className="hover:bg-bg-cream/50 transition-colors duration-150">
                      <td className="px-5 py-4">
                        <button onClick={() => setDetailBooking(booking)} className="text-left hover:text-primary transition-colors">
                          <p className="font-medium text-foreground text-sm">{booking.nama}</p>
                          <p className="text-xs text-foreground-muted mt-0.5">{booking.wa}</p>
                        </button>
                      </td>
                      <td className="px-5 py-4 hidden md:table-cell">
                        <span className="inline-flex px-3 py-1 rounded-lg text-xs font-medium bg-primary/10 text-primary">
                          {booking.kamar}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-sm text-foreground-muted hidden lg:table-cell">{booking.checkIn}</td>
                      <td className="px-5 py-4 text-sm text-foreground-muted hidden lg:table-cell">{booking.checkOut}</td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium border ${st.bg} ${st.text} ${st.dot ? "" : ""}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />
                          {statusLabels[booking.status]}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {booking.status === "pending" && (
                            <>
                              <button
                                onClick={() => handleUpdateStatus(booking.id, "approved")}
                                className="w-8 h-8 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700 transition-all text-sm border border-green-200"
                                title="Terima"
                              >
                                ✓
                              </button>
                              <button
                                onClick={() => handleUpdateStatus(booking.id, "rejected")}
                                className="w-8 h-8 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 transition-all text-sm border border-red-200"
                                title="Tolak"
                              >
                                ✗
                              </button>
                            </>
                          )}
                          <button
                            onClick={() => setDetailBooking(booking)}
                            className="w-8 h-8 rounded-lg bg-bg-cream text-foreground-muted hover:text-primary hover:bg-primary/5 transition-all text-sm border border-border"
                            title="Detail"
                          >
                            👁
                          </button>
                          <a
                            href={`https://wa.me/${booking.wa}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition-all text-sm border border-green-200 flex items-center justify-center"
                            title="Chat WhatsApp"
                          >
                            💬
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

      {detailBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setDetailBooking(null)}>
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
          <div
            className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto animate-[fade-in-up_0.3s_ease-out]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-5 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📋</span>
                <div>
                  <h3 className="font-bold text-foreground">Detail Booking</h3>
                  <p className="text-xs text-foreground-muted">ID: {detailBooking.id}</p>
                </div>
              </div>
              <button onClick={() => setDetailBooking(null)} className="w-8 h-8 rounded-lg bg-bg-cream text-foreground-muted hover:text-foreground flex items-center justify-center transition-colors text-sm">✕</button>
            </div>

            <div className="p-6 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <Field label="Nama" value={detailBooking.nama} />
                <Field label="WhatsApp" value={detailBooking.wa} />
                <Field label="Kamar" value={detailBooking.kamar} />
                <Field label="Tamu" value={`${detailBooking.tamu} orang`} />
                <Field label="Check-in" value={detailBooking.checkIn} />
                <Field label="Check-out" value={detailBooking.checkOut} />
                <Field label="Total Harga" value={`Rp ${detailBooking.totalHarga.toLocaleString("id-ID")}`} />
                <Field label="Status" value={statusLabels[detailBooking.status]} />
                <Field label="Dibuat" value={detailBooking.createdAt} />
              </div>
            </div>

            <div className="px-6 py-4 border-t border-border flex gap-3 justify-end">
              {detailBooking.status === "pending" && (
                <>
                  <button onClick={() => { handleUpdateStatus(detailBooking.id, "approved"); setDetailBooking(null); }} className="px-5 py-2.5 bg-green-50 text-green-700 border border-green-200 rounded-xl text-sm font-medium hover:bg-green-100 transition-colors">✓ Terima</button>
                  <button onClick={() => { handleUpdateStatus(detailBooking.id, "rejected"); setDetailBooking(null); }} className="px-5 py-2.5 bg-red-50 text-red-700 border border-red-200 rounded-xl text-sm font-medium hover:bg-red-100 transition-colors">✗ Tolak</button>
                </>
              )}
              <button onClick={() => { handleDelete(detailBooking.id); }} className="px-5 py-2.5 text-foreground-muted border border-border rounded-xl text-sm font-medium hover:text-red-600 hover:border-red-200 transition-colors">🗑 Hapus</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-foreground-muted mb-1">{label}</p>
      <p className="text-sm font-medium text-foreground">{value}</p>
    </div>
  );
}
