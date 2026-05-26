"use client";

import { Room, formatPrice } from "@/data/rooms";
import { saveBooking } from "@/lib/storage";
import { useReveal } from "@/lib/useReveal";
import { useState, useEffect, useRef } from "react";
import FacilityFlipCard from "@/components/FacilityFlipCard";
import { getFacilityInfo } from "@/data/facilityImages";

interface RoomCardProps {
  room: Room;
  index?: number;
}

export default function RoomCard({ room, index = 0 }: RoomCardProps) {
  const { ref, isVisible } = useReveal();
  const [flipped, setFlipped] = useState(false);
  const [currentImg, setCurrentImg] = useState(0);
  const [imgErrors, setImgErrors] = useState<Set<number>>(new Set());
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const images = room.gallery && room.gallery.length > 0 ? room.gallery : [room.image];

  useEffect(() => {
    if (!flipped) {
      intervalRef.current = setInterval(() => {
        setCurrentImg((prev) => (prev + 1) % images.length);
      }, 4000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [flipped, images.length]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || flipped) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -8, y: x * 8 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const openBooking = () => {
    const modal = document.getElementById(`booking-modal-${room.id}`) as HTMLDialogElement;
    modal?.showModal();
  };

  const handleImgError = (i: number) => {
    setImgErrors((prev) => new Set(prev).add(i));
  };

  const fallbackImg = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'%3E%3Crect width='800' height='600' fill='%23e8efe8'/%3E%3Ctext x='400' y='300' text-anchor='middle' dy='.3em' fill='%235a6e5a' font-family='sans-serif' font-size='24'%3E%3Ftspan%3EForest Haven%3C/tspan%3E%3C/text%3E%3C/svg%3E";

  return (
    <>
      <div
        ref={ref}
        className={`transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        } ${flipped ? "flipped" : ""}`}
        style={{ 
          transitionDelay: `${index * 120}ms`,
        }}
      >
        <div
          ref={cardRef}
          className={`flip-card card-depth rounded-2xl transition-transform duration-500 ${!flipped ? "hover:scale-[1.02]" : ""}`}
          style={{ perspective: "2000px" }}
        >
          <div 
            className="flip-card-inner rounded-2xl"
            style={{
              transition: "transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)"
            }}
          >

            {/* FRONT */}
            <div className={`flip-card-front ${flipped ? "pointer-events-none" : ""} rounded-2xl overflow-hidden`}>
              <div
                className="relative overflow-hidden cursor-pointer bg-white"
                onClick={() => setFlipped(true)}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                {/* IMAGE GALLERY */}
                <div
                  className="tilt-card"
                  style={{
                    transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                  }}
                >
                  <div className="relative h-72 md:h-80 w-full overflow-hidden bg-bg-green-light">
                    {images.map((img, i) => (
                      <img
                        key={i}
                        src={imgErrors.has(i) ? fallbackImg : img}
                        alt={`${room.name} - ${i + 1}`}
                        onError={() => handleImgError(i)}
                        loading={i === 0 ? "eager" : "lazy"}
                        className="absolute inset-0 w-full h-full object-cover transition-all duration-1000"
                        style={{
                          opacity: i === currentImg ? 1 : 0,
                          transform: i === currentImg ? "scale(1)" : "scale(1.05)",
                          transition: "opacity 1s ease-in-out, transform 12s ease-in-out",
                        }}
                      />
                    ))}

                    {imgErrors.size < images.length && (
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background: "linear-gradient(135deg, rgba(45,90,39,0.25) 0%, transparent 40%, rgba(212,175,55,0.08) 70%, transparent 100%)",
                        }}
                      />
                    )}

                    {/* AMBIENT SHIMMER */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.03) 50%, transparent 100%)",
                        backgroundSize: "100% 200%",
                        animation: "scan-line 4s linear infinite",
                      }}
                    />

                    {/* TOP GRADIENT */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />

                    {/* BADGES */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span
                        className="text-white text-xs font-semibold px-3 py-1.5 rounded-lg tracking-wide"
                        style={{
                          background: "rgba(255,255,255,0.15)",
                          backdropFilter: "blur(12px)",
                          WebkitBackdropFilter: "blur(12px)",
                          border: "1px solid rgba(255,255,255,0.2)",
                        }}
                      >
                        {room.size}
                      </span>
                      <span
                        className="text-white text-xs font-medium px-3 py-1.5 rounded-lg flex items-center gap-1.5"
                        style={{
                          background: "rgba(255,255,255,0.15)",
                          backdropFilter: "blur(12px)",
                          WebkitBackdropFilter: "blur(12px)",
                          border: "1px solid rgba(255,255,255,0.2)",
                        }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse-soft" />
                        Tersedia
                      </span>
                    </div>

                    {/* GALLERY COUNTER & DOTS */}
                    {images.length > 1 && (
                      <>
                        <div className="absolute top-4 right-4">
                          <span
                            className="text-white/90 text-[11px] font-medium px-2.5 py-1 rounded-lg"
                            style={{
                              background: "rgba(0,0,0,0.3)",
                              backdropFilter: "blur(8px)",
                              WebkitBackdropFilter: "blur(8px)",
                            }}
                          >
                            {currentImg + 1}/{images.length}
                          </span>
                        </div>
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                          {images.map((_, i) => (
                            <button
                              key={i}
                              onClick={(e) => { e.stopPropagation(); setCurrentImg(i); }}
                              className="transition-all duration-300 rounded-full"
                              style={{
                                width: i === currentImg ? "20px" : "6px",
                                height: "6px",
                                background: i === currentImg ? "white" : "rgba(255,255,255,0.4)",
                              }}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-5 md:p-6 bg-white">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg md:text-xl font-bold text-foreground">
                      {room.name}
                    </h3>
                    <span className="text-base opacity-40">🌲</span>
                  </div>

                  <p className="text-foreground-muted text-sm mb-4 line-clamp-2 leading-relaxed">
                    {room.desc}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-3">
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

                  {/* FACILITY IMAGE THUMBNAILS */}
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                      {room.amenities.slice(0, 4).map((amenity) => {
                        const info = getFacilityInfo(amenity);
                        return (
                          <div
                            key={amenity}
                            className="flex-shrink-0 w-12 h-12 rounded-xl overflow-hidden relative group cursor-pointer"
                            title={info.desc}
                            onClick={(e) => { e.stopPropagation(); setFlipped(true); }}
                          >
                            <img
                              src={info.image}
                              alt={amenity}
                              loading="lazy"
                              className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display = "none";
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                          </div>
                        );
                      })}
                    </div>
                    <div 
                      className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary animate-bounce-slow cursor-pointer hover:bg-primary hover:text-white transition-all duration-300"
                      onClick={(e) => { e.stopPropagation(); setFlipped(true); }}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </div>
                  </div>


                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div>
                      <span className="text-xl md:text-2xl font-bold text-primary">{formatPrice(room.price)}</span>
                      <span className="text-foreground-muted text-xs">/malam</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setFlipped(true)}
                        className="px-4 py-2 border border-border rounded-xl text-xs font-medium text-foreground-muted hover:border-primary/20 hover:text-primary hover:bg-primary/5 transition-all duration-300 flex items-center gap-1.5"
                      >
                        Detail
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                      </button>
                      <button
                        onClick={openBooking}
                        className="btn-primary px-4 py-2 rounded-xl text-xs font-medium"
                      >
                        <span className="relative z-10">Pesan</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* BACK */}
            <div className={`flip-card-back ${!flipped ? "pointer-events-none" : ""} rounded-2xl overflow-hidden card-depth`}>
              <div className="h-full flex flex-col bg-white cursor-pointer" onClick={() => setFlipped(false)}>
                <div className="relative h-44 md:h-52 flex-shrink-0 overflow-hidden bg-bg-green-light">
                  <img
                    src={imgErrors.has(0) ? fallbackImg : images[0]}
                    alt={room.name}
                    onError={() => handleImgError(0)}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/50 to-transparent" />
                  <div className="absolute bottom-5 left-5">
                    <h3 className="text-2xl font-bold text-foreground tracking-tight luxury-heading">{room.name}</h3>
                    <p className="text-foreground/70 text-sm">{room.size}</p>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); setFlipped(false); }}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/80 backdrop-blur text-foreground/70 flex items-center justify-center hover:bg-white transition-all duration-300 hover:scale-105"
                  >
                    ✕
                  </button>
                </div>

                <div className="flex-1 p-6 md:p-8 overflow-y-auto">
                  <div className="space-y-6">
                    <p className="text-foreground/80 text-sm leading-relaxed">
                      {room.desc}
                    </p>

                    <div>
                      <h4 className="text-xs font-semibold text-foreground/60 uppercase tracking-wider mb-3">Fasilitas Eksklusif</h4>
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                        {room.amenities.map((a, i) => (
                          <div key={a} style={{ height: "5rem" }}>
                            <FacilityFlipCard name={a} index={i} />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-border">
                      <div className="flex items-end justify-between gap-4">
                        <div>
                          <p className="text-foreground-muted text-xs mb-1">Investasi Per Malam</p>
                          <p className="text-2xl font-bold text-primary tracking-tight">{formatPrice(room.price)}</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={(e) => { e.stopPropagation(); setFlipped(false); }}
                            className="px-4 py-2.5 border border-border rounded-xl text-xs font-medium text-foreground-muted hover:border-primary/20 hover:text-primary transition-all duration-300"
                          >
                            Kembali
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); openBooking(); }}
                            className="btn-primary px-4 py-2.5 rounded-xl text-xs font-medium"
                          >
                            <span className="relative z-10">Pesan</span>
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
        <div className="modal-box bg-white p-6 rounded-2xl shadow-xl">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <span className="text-xl">🌿</span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-foreground">Pesan {room.name}</h3>
              <p className="text-foreground-muted text-sm">{room.size} &bull; {formatPrice(room.price)}/malam</p>
            </div>
            <button
              onClick={() => { const d = document.getElementById(`booking-modal-${room.id}`) as HTMLDialogElement; d.close(); }}
              className="w-8 h-8 rounded-lg bg-bg-cream text-foreground-muted hover:text-foreground flex items-center justify-center transition-colors text-sm flex-shrink-0"
            >
              ✕
            </button>
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
              <button type="submit" className="flex-1 btn-primary py-3 rounded-xl font-medium">
                <span className="relative z-10"> Kirim via WA</span>
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
