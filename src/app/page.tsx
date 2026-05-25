"use client";

import { useState, useEffect } from "react";
import { rooms as initialRooms, Room } from "@/data/rooms";
import { getStoredRooms } from "@/lib/storage";
import { useReveal } from "@/lib/useReveal";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import RoomCard from "@/components/RoomCard";
import Footer from "@/components/Footer";

export default function Home() {
  const [rooms, setRooms] = useState<Room[]>(initialRooms);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = getStoredRooms();
    if (stored) setRooms(stored);
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="main-content">
      <Navbar />
      <Hero />
      <RoomsSection rooms={rooms} />
      <FacilitiesSection />
      <PromoSection />
      <Footer />
    </div>
  );
}

function RoomsSection({ rooms }: { rooms: Room[] }) {
  const { ref, isVisible } = useReveal();

  return (
    <section
      ref={ref}
      id="rooms"
      className="relative py-24 overflow-hidden bg-bg-green-light"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          style={{
            position: "absolute",
            width: "450px", height: "450px",
            top: "-10%", right: "-5%",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(26,138,74,0.04), transparent 70%)",
            animation: "float-slow 16s ease-in-out infinite",
            filter: "blur(80px)",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`text-center mb-16 reveal-up transition-all duration-700 ${isVisible ? "is-visible" : ""}`}>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary rounded-xl text-sm font-medium mb-4">
            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse-soft" />
            Kamar Tersedia
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-5 tracking-tight">
            Kamar <span className="text-gradient">Menghadap Hutan</span>
          </h2>
          <p className="text-foreground-muted text-lg max-w-2xl mx-auto leading-relaxed">
            Setiap kamar dirancang dengan elegan, menghadap keindahan hutan yang hijau.
            Fasilitas premium untuk kenyamanan maximum Anda
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {rooms.map((room, i) => (
            <RoomCard key={room.id} room={room} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FacilitiesSection() {
  const { ref, isVisible } = useReveal();
  const facilities = [
    { icon: "🏊", title: "Kolam Renang", desc: "Views hutan yang asri" },
    { icon: "🍽️", title: "Restoran", desc: "Makanan lokal & internasional" },
    { icon: "💆", title: "Spa & Wellness", desc: "Pijat tradisional" },
    { icon: "🏋️", title: "Gym", desc: "Fasilitas lengkap" },
    { icon: "📶", title: "WiFi", desc: "Internet super cepat" },
    { icon: "🅿️", title: "Parkir", desc: "Area luas & aman" },
    { icon: "🛎️", title: "Layanan 24 Jam", desc: "Resepsionis & keamanan" },
    { icon: "🚗", title: "Transport", desc: "Antar jemput gratis" },
  ];

  return (
    <section
      ref={ref}
      id="facilities"
      className="relative py-24 overflow-hidden bg-white"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          style={{
            position: "absolute",
            width: "350px", height: "350px",
            bottom: "-10%", left: "-5%",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(196,163,90,0.03), transparent 70%)",
            animation: "float-slow 18s ease-in-out infinite reverse",
            filter: "blur(80px)",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`text-center mb-16 reveal-up transition-all duration-700 ${isVisible ? "is-visible" : ""}`}>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent/10 text-accent rounded-xl text-sm font-medium mb-4">
            <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse-soft" />
            Fasilitas
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-5 tracking-tight">
            Nikmatin Fasilitas <span className="text-gradient">Premium</span>
          </h2>
          <p className="text-foreground-muted text-lg max-w-2xl mx-auto leading-relaxed">
            Berbagai fasilitas terbaik tersedia untuk kenyamanan dan hiburan Anda
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {facilities.map((item, i) => (
            <FacilityCard key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FacilityCard({
  item,
  index,
}: {
  item: { icon: string; title: string; desc: string };
  index: number;
}) {
  const { ref, isVisible } = useReveal();

  return (
    <div
      ref={ref}
      className={`card-green p-5 md:p-6 text-center group cursor-default reveal-scale transition-all duration-500 ${
        isVisible ? "is-visible" : ""
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <span className="text-3xl block mb-3 group-hover:scale-110 transition-transform duration-300">
        {item.icon}
      </span>
      <h3 className="font-bold text-foreground mb-1 group-hover:text-primary transition-colors duration-200 text-sm">
        {item.title}
      </h3>
      <p className="text-foreground-muted text-xs">{item.desc}</p>
    </div>
  );
}

function PromoSection() {
  const { ref, isVisible } = useReveal();

  return (
    <section className="relative py-24 green-gradient overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div
          style={{
            position: "absolute",
            width: "500px", height: "500px",
            top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,255,255,0.03), transparent 70%)",
            animation: "float-slow 20s ease-in-out infinite",
            filter: "blur(80px)",
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <div ref={ref} className={`reveal-scale transition-all duration-700 ${isVisible ? "is-visible" : ""}`}>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 text-white rounded-xl text-sm font-medium mb-6">
            <span className="w-1.5 h-1.5 bg-green-300 rounded-full animate-pulse" />
            Promo Spesial
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Mulai Booking Sekarang!
          </h2>
          <p className="text-white/70 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            Stok terbatas untuk musim ini! Pesan sekarang dan nikmati diskon 15% untuk pembayaran via WhatsApp
          </p>
          <a
            href="https://wa.me/62816781261273?text=Halo,%20saya%20ingin%20booking%20kamar"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white text-primary-dark px-10 py-5 rounded-xl font-bold text-lg hover:bg-white/90 hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300 group"
          >
            <svg className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01.57-.01.198 0 .52.074.792.372.272.297 1.04 1.016 1.04 2.156 0 1.14-.848 2.446-1.01 2.77-.159.297-.01.596.114.743.149.149.328.447.97.729 1.517.666 2.573 1.323 3.011 1.502.713.293 1.404.264 1.921.18.6-.099 1.837-.734 2.109-1.44.273-.706.273-1.473.192-1.612-.074-.149-.297-.199-.495-.249z"/>
            </svg>
            Hubungi via WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
