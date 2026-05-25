"use client";

import { Room, formatPrice } from "@/data/rooms";
import { saveBooking } from "@/lib/storage";
import { useReveal } from "@/lib/useReveal";
import { useState } from "react";

interface RoomCardProps {
  room: Room;
  index?: number;
}

export default function RoomCard({ room, index = 0 }: RoomCardProps) {
  const { ref, isVisible } = useReveal();
  const [flipped, setFlipped] = useState(false);

  const openBooking = () => {
    const modal = document.getElementById(`booking-modal-${room.id}`) as HTMLDialogElement;
    modal?.showModal();
  };

  return (
    <>
       <div
         ref={ref}
         className={`flip-card reveal-up transition-all duration-800 ${
           isVisible ? "is-visible" : ""
         } ${flipped ? "flipped" : ""}`}
         style={{ transitionDelay: `${index * 100}ms` }}
       >
        <div className="flip-card-inner">
          <div className={`flip-card-front ${flipped ? "pointer-events-none" : ""}`}>
            <div className="card-green h-full group cursor-pointer" onClick={() => setFlipped(true)}>
              <div className="relative h-56 md:h-64 overflow-hidden">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                <div className="absolute top-3 left-3">
                  <span className="bg-white/90 text-foreground px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm">
                    {room.size}
                  </span>
                </div>
                <div className="absolute bottom-3 right-3">
                  <span className="bg-primary/90 text-white px-3 py-1.5 rounded-lg text-xs font-medium shadow-lg">
                    Tersedia
                  </span>
                </div>
              </div>

              <div className="p-5 md:p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg md:text-xl font-bold text-foreground">
                    {room.name}
                  </h3>
                  <span className="text-base opacity-60">🌲</span>
                </div>

                <p className="text-foreground-muted text-sm mb-4 line-clamp-2 leading-relaxed">
                  {room.desc}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {room.amenities.slice(0, 4).map((amenity) => (
                    <span
                      key={amenity}
                      className="text-[11px] text-foreground-muted px-2.5 py-1 rounded-lg bg-bg-green-light border border-border"
                    >
                      {amenity}
                    </span>
                  ))}
                  {room.amenities.length > 4 && (
                    <span className="text-[11px] bg-primary/10 text-primary px-2.5 py-1 rounded-lg font-medium">
                      +{room.amenities.length - 4}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div>
                    <span className="text-xl md:text-2xl font-bold text-primary">{formatPrice(room.price)}</span>
                    <span className="text-foreground-muted text-xs">/malam</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setFlipped(true)}
                      className="px-4 py-2 border border-border rounded-xl text-xs font-medium text-foreground-muted hover:border-primary/20 hover:text-primary hover:bg-primary/5 transition-all duration-200 flex items-center gap-1.5"
                    >
                      Detail
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </button>
                    <button
                      onClick={openBooking}
                      className="btn-primary px-4 py-2 rounded-xl text-xs font-medium relative overflow-hidden group/btn"
                    >
                      <span className="relative z-10">Pesan</span>
                      <span className="absolute inset-0 bg-white/10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

           <div className={`flip-card-back ${!flipped ? "pointer-events-none" : ""}`}>
             <div className="h-full flex flex-col bg-white shadow-lg cursor-pointer" onClick={() => setFlipped(false)}>
               <div className="relative h-44 md:h-52 flex-shrink-0">
                 <img src={room.image} alt={room.name} className="w-full h-full object-cover" />
                 <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />
                 <div className="absolute bottom-4 left-5">
                   <h3 className="text-xl md:text-2xl font-bold text-foreground">{room.name}</h3>
                   <p className="text-foreground-muted text-sm">{room.size}</p>
                 </div>
                 <button
                   onClick={(e) => { e.stopPropagation(); setFlipped(false); }}
                   className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/90 backdrop-blur text-foreground flex items-center justify-center hover:bg-white/50 transition-all duration-200 shadow-md text-lg"
                 >
                   ✕
                 </button>
               </div>

               <div className="flex-1 p-6 md:p-8 overflow-y-auto">
                 <div className="space-y-6">
                   <p className="text-foreground text-sm leading-relaxed">
                     {room.desc}
                   </p>

                   <div className="space-y-5">
                     <div>
                       <h4 className="text-sm font-semibold text-foreground mb-3">Fasilitas Kamar</h4>
                       <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm">
                         {room.amenities.map((a) => (
                           <div key={a} className="flex items-center gap-3">
                             <div className="w-2.5 h-2.5 rounded-full bg-primary flex-shrink-0" />
                             <span className="text-foreground">{a}</span>
                           </div>
                         ))}
                       </div>
                     </div>

                     <div className="pt-4 border-t border-border">
                       <div className="flex items-center justify-between">
                         <div className="text-right">
                           <p className="text-foreground-muted text-sm">Harga per malam</p>
                           <p className="text-2xl font-bold text-primary">{formatPrice(room.price)}</p>
                         </div>
                         <div className="flex gap-3">
                           <button
                             onClick={(e) => { e.stopPropagation(); setFlipped(false); }}
                             className="flex-1 px-5 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                           >
                             Kembali
                           </button>
                           <button
                             onClick={(e) => { e.stopPropagation(); openBooking(); }}
                             className="flex-1 btn-primary px-5 py-3 text-sm font-medium relative overflow-hidden group/btn"
                           >
                             <span className="relative z-10">Pesan Sekarang</span>
                             <span className="absolute inset-0 bg-white/10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                           </button>
                         </div>
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           </div>
        </div>
      </div>

      <dialog id={`booking-modal-${room.id}`} className="modal">
        <div className="modal-box max-w-md bg-white p-6 rounded-2xl shadow-xl border border-primary/10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <span className="text-xl">🌿</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground">Pesan {room.name}</h3>
              <p className="text-foreground-muted text-sm">{room.size} &bull; {formatPrice(room.price)}/malam</p>
            </div>
          </div>

          <form
            method="dialog"
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.currentTarget as HTMLFormElement;
              const formData = new FormData(form);
              const name = formData.get("name") as string;
              const phone = formData.get("phone") as string;
              const checkIn = formData.get("checkIn") as string;
              const checkOut = formData.get("checkOut") as string;
              const guests = formData.get("guests") as string;

              if (!name || !phone || !checkIn || !checkOut) {
                alert("Mohon lengkapi semua data!");
                return;
              }

              const nights = Math.ceil(
                (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24)
              ) || 1;

              const message = `*PEMESANAN KAMAR*

🌿 Forest Haven Resort

👤 Nama: ${name}
📱 WA: ${phone}

🏠 Kamar: ${room.name}
📅 Check-in: ${checkIn}
📅 Check-out: ${checkOut} (${nights} malam)
👥 Tamu: ${guests} orang

💰 Total: ${formatPrice(room.price * nights)}`;

              saveBooking({
                id: `booking-${Date.now()}`,
                nama: name,
                wa: phone,
                kamar: room.name,
                kamarId: room.id,
                checkIn,
                checkOut,
                tamu: parseInt(guests),
                status: "pending",
                createdAt: new Date().toISOString().split("T")[0],
                totalHarga: room.price * nights,
              });

              const waUrl = `https://wa.me/62816781261273?text=${encodeURIComponent(message)}`;
              window.open(waUrl, "_blank");
              const dialog = document.getElementById(`booking-modal-${room.id}`) as HTMLDialogElement;
              dialog.close();
            }}
            className="space-y-5"
          >
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Nama Lengkap</label>
              <input type="text" name="name" required className="w-full px-4 py-3 bg-bg-cream rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/15 text-foreground placeholder-foreground-light/60 transition-all duration-200" placeholder="Masukkan nama Anda" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Nomor WhatsApp</label>
              <input type="tel" name="phone" required className="w-full px-4 py-3 bg-bg-cream rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/15 text-foreground placeholder-foreground-light/60 transition-all duration-200" placeholder="628xxxxxxxxxx" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Check-in</label>
                <input type="date" name="checkIn" required min={new Date().toISOString().split("T")[0]} className="w-full px-4 py-3 bg-bg-cream rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/15 text-foreground transition-all duration-200" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Check-out</label>
                <input type="date" name="checkOut" required min={new Date().toISOString().split("T")[0]} className="w-full px-4 py-3 bg-bg-cream rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/15 text-foreground transition-all duration-200" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Jumlah Tamu</label>
              <select name="guests" className="w-full px-4 py-3 bg-bg-cream rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/15 text-foreground transition-all duration-200">
                <option value="1">1 Tamu</option>
                <option value="2">2 Tamu</option>
                <option value="3">3 Tamu</option>
                <option value="4">4 Tamu</option>
              </select>
            </div>
            <div className="flex gap-3 pt-3">
              <button type="button" onClick={() => { const d = document.getElementById(`booking-modal-${room.id}`) as HTMLDialogElement; d.close(); }} className="flex-1 py-3 border-2 border-border rounded-xl font-medium hover:bg-bg-cream transition-colors text-foreground-muted">Batal</button>
              <button type="submit" className="flex-1 btn-primary py-3 rounded-xl font-medium relative overflow-hidden group/btn">
                <span className="relative z-10"> Kirim via WA</span>
                <span className="absolute inset-0 bg-white/10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
              </button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button className="cursor-default">tutup</button>
        </form>
      </dialog>
    </>
  );
}
