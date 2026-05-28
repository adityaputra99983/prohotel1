"use client";

import { useState, useEffect } from "react";
import { rooms as initialRooms, Room } from "@/data/rooms";
import { getStoredRooms, saveStoredRooms } from "@/lib/storage";

export default function AdminRooms() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [mounted, setMounted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const [animateOut, setAnimateOut] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", desc: "", price: "", size: "", amenities: "", image: "", gallery: "" });

  useEffect(() => {
    const stored = getStoredRooms();
    if (stored) {
      setRooms(stored);
    } else {
      saveStoredRooms(initialRooms);
      setRooms(initialRooms);
    }
    setMounted(true);
  }, []);

  const openAdd = () => {
    setEditingRoom(null);
    setForm({ name: "", desc: "", price: "", size: "", amenities: "", image: "", gallery: "" });
    setShowModal(true);
  };

  const openEdit = (room: Room) => {
    setEditingRoom(room);
    setForm({
      name: room.name,
      desc: room.desc,
      price: room.price.toString(),
      size: room.size,
      amenities: room.amenities.join(", "),
      image: room.image,
      gallery: (room.gallery && room.gallery.length > 0) ? room.gallery.join(", ") : "",
    });
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const roomData: Room = {
      id: editingRoom?.id || `room-${Date.now()}`,
      name: form.name,
      desc: form.desc,
      price: parseInt(form.price),
      size: form.size,
      amenities: form.amenities.split(",").map((a) => a.trim()).filter(Boolean),
      image: form.image || "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&auto=format&fit=crop&q=80",
      gallery: form.gallery
        ? form.gallery.split(",").map((u) => u.trim()).filter(Boolean)
        : undefined,
    };

    let updated: Room[];
    if (editingRoom) {
      updated = rooms.map((r) => (r.id === editingRoom.id ? roomData : r));
    } else {
      updated = [...rooms, roomData];
    }
    setRooms(updated);
    saveStoredRooms(updated);
    setShowModal(false);
  };

  const deleteRoom = (id: string) => {
    if (!confirm("Yakin ingin menghapus kamar ini?")) return;
    setAnimateOut(id);
    setTimeout(() => {
      const updated = rooms.filter((r) => r.id !== id);
      setRooms(updated);
      saveStoredRooms(updated);
      setAnimateOut(null);
    }, 300);
  };

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(price);

  if (!mounted) return null;

  return (
    <div className="max-w-6xl">
      {/* HEADER */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-lg shadow-primary/20">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">Kelola Kamar</h1>
              <p className="text-foreground-muted text-sm mt-0.5">{rooms.length} tipe kamar tersedia</p>
            </div>
          </div>
          <button
            onClick={openAdd}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-primary-dark text-white font-medium text-sm shadow-md shadow-primary/20 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 active:scale-95 w-fit"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Tambah Kamar
          </button>
        </div>
      </div>

      {/* ROOM GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {rooms.map((room, i) => (
          <div
            key={room.id}
            className={`bg-white rounded-2xl border border-border/70 overflow-hidden group transition-all duration-300 ${
              animateOut === room.id
                ? "opacity-0 scale-95 -translate-y-2"
                : "hover:shadow-lg hover:-translate-y-1 hover:border-primary/15"
            }`}
            style={{
              opacity: animateOut === room.id ? 0 : 0,
              animation: animateOut === room.id ? "none" : `fade-in-up 0.35s ease-out ${i * 60}ms forwards`,
            }}
          >
            {/* IMAGE */}
            <div className="relative h-48 overflow-hidden bg-bg-cream">
              <img
                src={room.image}
                alt={room.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-foreground px-2.5 py-1 rounded-lg text-xs font-semibold shadow-sm flex items-center gap-1.5">
                <svg className="w-3 h-3 text-foreground-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
                {room.size}
              </div>
              {room.gallery && room.gallery.length > 1 && (
                <div className="absolute bottom-3 right-3">
                  <span className="bg-black/50 backdrop-blur-sm text-white text-[11px] font-medium px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {room.gallery.length}
                  </span>
                </div>
              )}
            </div>

            {/* BODY */}
            <div className="p-5">
              <h3 className="text-lg font-bold text-foreground mb-2">{room.name}</h3>
              <p className="text-foreground text-sm leading-relaxed mb-4 line-clamp-2">{room.desc}</p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {room.amenities.slice(0, 4).map((a) => (
                  <span key={a} className="text-[11px] text-foreground bg-bg-cream px-2.5 py-1.5 rounded-lg border border-border/50 leading-none">{a}</span>
                ))}
                {room.amenities.length > 4 && (
                  <span className="text-[11px] bg-primary/10 text-primary px-2.5 py-1.5 rounded-lg font-medium leading-none">+{room.amenities.length - 4}</span>
                )}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border/50">
                <div>
                  <span className="text-lg font-bold text-primary">{formatPrice(room.price)}</span>
                  <span className="text-foreground text-xs">/malam</span>
                </div>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => openEdit(room)}
                    className="w-9 h-9 rounded-xl bg-bg-cream text-primary hover:text-primary hover:bg-primary/5 border border-border/70 transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center"
                    title="Edit"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => deleteRoom(room.id)}
                    className="w-9 h-9 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 border border-red-200 transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center"
                    title="Hapus"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-200" />
          <div
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            style={{ animation: "fade-in-up 0.25s ease-out" }}
          >
            {/* MODAL HEADER */}
            <div className="px-5 md:px-6 py-4 border-b border-border/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={editingRoom ? "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" : "M12 4v16m8-8H4"} />
                  </svg>
                </div>
                <h3 className="text-base font-bold text-foreground">
                  {editingRoom ? "Edit Kamar" : "Tambah Kamar Baru"}
                </h3>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="w-8 h-8 rounded-xl bg-bg-cream text-foreground-muted hover:text-foreground flex items-center justify-center transition-all text-sm hover:scale-105 active:scale-95"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* MODAL FORM */}
            <form onSubmit={handleSubmit} className="p-5 md:p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Nama Kamar</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-2.5 bg-bg-cream rounded-xl border border-border/70 focus:border-primary focus:ring-2 focus:ring-primary/15 text-foreground placeholder-foreground-light/50 transition-all duration-200 outline-none text-sm"
                  placeholder="Deluxe Room"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Deskripsi</label>
                <textarea
                  value={form.desc}
                  onChange={(e) => setForm({ ...form, desc: e.target.value })}
                  className="w-full px-4 py-2.5 bg-bg-cream rounded-xl border border-border/70 focus:border-primary focus:ring-2 focus:ring-primary/15 text-foreground placeholder-foreground-light/50 transition-all duration-200 min-h-[72px] outline-none resize-none text-sm"
                  placeholder="Deskripsi kamar..."
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Harga (Rp)</label>
                  <input
                    type="number"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    className="w-full px-4 py-2.5 bg-bg-cream rounded-xl border border-border/70 focus:border-primary focus:ring-2 focus:ring-primary/15 text-foreground placeholder-foreground-light/50 transition-all duration-200 outline-none text-sm"
                    placeholder="850000"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Ukuran</label>
                  <input
                    type="text"
                    value={form.size}
                    onChange={(e) => setForm({ ...form, size: e.target.value })}
                    className="w-full px-4 py-2.5 bg-bg-cream rounded-xl border border-border/70 focus:border-primary focus:ring-2 focus:ring-primary/15 text-foreground placeholder-foreground-light/50 transition-all duration-200 outline-none text-sm"
                    placeholder="35 m²"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Fasilitas (pisahkan dengan koma)</label>
                <input
                  type="text"
                  value={form.amenities}
                  onChange={(e) => setForm({ ...form, amenities: e.target.value })}
                  className="w-full px-4 py-2.5 bg-bg-cream rounded-xl border border-border/70 focus:border-primary focus:ring-2 focus:ring-primary/15 text-foreground placeholder-foreground-light/50 transition-all duration-200 outline-none text-sm"
                  placeholder="King Bed, AC, Smart TV"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">URL Gambar Utama</label>
                <input
                  type="url"
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  className="w-full px-4 py-2.5 bg-bg-cream rounded-xl border border-border/70 focus:border-primary focus:ring-2 focus:ring-primary/15 text-foreground placeholder-foreground-light/50 transition-all duration-200 outline-none text-sm"
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">URL Gambar Lainnya (pisahkan dengan koma)</label>
                <input
                  type="text"
                  value={form.gallery}
                  onChange={(e) => setForm({ ...form, gallery: e.target.value })}
                  className="w-full px-4 py-2.5 bg-bg-cream rounded-xl border border-border/70 focus:border-primary focus:ring-2 focus:ring-primary/15 text-foreground placeholder-foreground-light/50 transition-all duration-200 outline-none text-sm"
                  placeholder="https://..., https://..."
                />
                <p className="text-[11px] text-foreground mt-1.5">Tambahkan URL gambar tambahan untuk slideshow</p>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2.5 border-2 border-primary/20 rounded-xl font-medium hover:bg-primary/5 transition-all duration-200 text-foreground hover:text-primary text-sm active:scale-[0.98]"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl font-medium bg-gradient-to-r from-primary to-primary-dark text-white shadow-md shadow-primary/20 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 text-sm active:scale-[0.98]"
                >
                  {editingRoom ? "Simpan" : "Tambah"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
