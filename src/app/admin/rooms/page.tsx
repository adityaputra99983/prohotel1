"use client";

import { useState, useEffect } from "react";
import { rooms as initialRooms, Room, formatPrice } from "@/data/rooms";
import { getStoredRooms, saveStoredRooms } from "@/lib/storage";

export default function AdminRooms() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [mounted, setMounted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const [form, setForm] = useState({ name: "", desc: "", price: "", size: "", amenities: "", image: "" });

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
    setForm({ name: "", desc: "", price: "", size: "", amenities: "", image: "" });
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
    const updated = rooms.filter((r) => r.id !== id);
    setRooms(updated);
    saveStoredRooms(updated);
  };

  if (!mounted) return null;

  return (
    <div className="animate-[fade-in-up_0.4s_ease-out]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">Kelola Kamar</h1>
          <p className="text-foreground-muted mt-1">Tambah, edit, atau hapus tipe kamar</p>
        </div>
        <button onClick={openAdd} className="btn-primary px-5 py-2.5 rounded-xl text-sm inline-flex items-center gap-2 w-fit">
          <span>+</span>
          <span>Tambah Kamar</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <div key={room.id} className="bg-white rounded-2xl border border-border overflow-hidden group hover:shadow-lg hover:border-primary/10 transition-all duration-300">
            <div className="relative h-48 overflow-hidden">
              <img src={room.image} alt={room.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-foreground px-3 py-1 rounded-lg text-xs font-semibold shadow-sm">
                {room.size}
              </div>
            </div>

            <div className="p-5">
              <h3 className="text-lg font-bold text-foreground mb-2">{room.name}</h3>
              <p className="text-foreground-muted text-sm leading-relaxed mb-4 line-clamp-2">{room.desc}</p>

              <div className="flex flex-wrap gap-1.5 mb-5">
                {room.amenities.slice(0, 4).map((a) => (
                  <span key={a} className="text-[11px] text-foreground-muted bg-bg-cream px-2.5 py-1 rounded-lg border border-border">{a}</span>
                ))}
                {room.amenities.length > 4 && (
                  <span className="text-[11px] bg-primary/10 text-primary px-2.5 py-1 rounded-lg font-medium">+{room.amenities.length - 4}</span>
                )}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div>
                  <span className="text-xl font-bold text-primary">{formatPrice(room.price)}</span>
                  <span className="text-foreground-muted text-xs">/malam</span>
                </div>
                <div className="flex gap-1.5">
                  <button onClick={() => openEdit(room)} className="w-9 h-9 rounded-lg bg-bg-cream text-foreground-muted hover:text-primary hover:bg-primary/5 border border-border transition-all text-sm flex items-center justify-center" title="Edit">
                    ✏️
                  </button>
                  <button onClick={() => deleteRoom(room.id)} className="w-9 h-9 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 border border-red-200 transition-all text-sm flex items-center justify-center" title="Hapus">
                    🗑
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
          <div
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-[fade-in-up_0.3s_ease-out]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-5 border-b border-border flex items-center justify-between">
              <h3 className="text-lg font-bold text-foreground">
                {editingRoom ? "Edit Kamar" : "Tambah Kamar Baru"}
              </h3>
              <button onClick={() => setShowModal(false)} className="w-8 h-8 rounded-lg bg-bg-cream text-foreground-muted hover:text-foreground flex items-center justify-center transition-colors text-sm">✕</button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Nama Kamar</label>
                <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 bg-bg-cream rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/15 text-foreground placeholder-foreground-light/60 transition-all duration-200" placeholder="Deluxe Room" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Deskripsi</label>
                <textarea value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} className="w-full px-4 py-3 bg-bg-cream rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/15 text-foreground placeholder-foreground-light/60 transition-all duration-200 min-h-[80px]" placeholder="Deskripsi kamar..." required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Harga (Rp)</label>
                  <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="w-full px-4 py-3 bg-bg-cream rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/15 text-foreground placeholder-foreground-light/60 transition-all duration-200" placeholder="850000" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Ukuran</label>
                  <input type="text" value={form.size} onChange={(e) => setForm({ ...form, size: e.target.value })} className="w-full px-4 py-3 bg-bg-cream rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/15 text-foreground placeholder-foreground-light/60 transition-all duration-200" placeholder="35 m²" required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Fasilitas (pisahkan dengan koma)</label>
                <input type="text" value={form.amenities} onChange={(e) => setForm({ ...form, amenities: e.target.value })} className="w-full px-4 py-3 bg-bg-cream rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/15 text-foreground placeholder-foreground-light/60 transition-all duration-200" placeholder="King Bed, AC, Smart TV" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">URL Gambar (opsional)</label>
                <input type="url" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="w-full px-4 py-3 bg-bg-cream rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/15 text-foreground placeholder-foreground-light/60 transition-all duration-200" placeholder="https://..." />
              </div>

              <div className="flex gap-3 pt-3">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-3 border-2 border-border rounded-xl font-medium hover:bg-bg-cream transition-colors text-foreground-muted">Batal</button>
                <button type="submit" className="flex-1 btn-primary py-3 rounded-xl font-medium">
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
