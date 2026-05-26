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
    <>
      <Navbar />
      <Hero />
      <RoomsSection rooms={rooms} />
      <FacilitiesSection />
      <PromoSection />
      <Footer />
    </>
  );
}

function RoomsSection({ rooms }: { rooms: Room[] }) {
  const { ref, isVisible } = useReveal();

  return (
    <section
      ref={ref}
      id="rooms"
      className="relative py-28 overflow-hidden"
      style={{ background: "linear-gradient(180deg, var(--bg-green-light) 0%, var(--bg-cream) 100%)" }}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="ambient-glow" style={{
          width: "600px", height: "600px",
          top: "-15%", right: "-10%",
          background: "radial-gradient(circle, var(--primary), transparent 70%)",
          animationDelay: "0s",
        }} />
        <div className="ambient-glow" style={{
          width: "400px", height: "400px",
          bottom: "-10%", left: "-5%",
          background: "radial-gradient(circle, var(--luxury-gold), transparent 70%)",
          animationDelay: "2s",
        }} />
        <div className="ambient-glow" style={{
          width: "300px", height: "300px",
          top: "40%", left: "50%",
          background: "radial-gradient(circle, var(--primary-light), transparent 70%)",
          animationDelay: "4s",
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`text-center mb-16 reveal-up transition-all duration-800 ${isVisible ? "is-visible" : ""}`}>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-5">
            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse-soft" />
            Kamar Tersedia
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-5 tracking-tight leading-[1.1]">
            Kamar <span className="text-gradient">Menghadap Hutan</span>
          </h2>
          <div className="w-16 h-0.5 rounded-full mx-auto mb-5 divider-organic" />
          <p className="text-foreground-muted text-lg max-w-2xl mx-auto leading-relaxed">
            Setiap kamar dirancang dengan elegan, menghadap keindahan hutan yang hijau.
            Fasilitas premium untuk kenyamanan maximum Anda
          </p>
        </div>

        <div className="grid-asymmetric">
          {rooms.map((room, i) => (
            <div
              key={room.id}
              className={`transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
              }`}
              style={{
                transitionDelay: `${i * 150}ms`,
                transform: isVisible ? "none" : undefined,
              }}
            >
              <RoomCard room={room} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FacilitiesSection() {
  const { ref, isVisible } = useReveal();
  const facilities = [
    { icon: "🏊", title: "Kolam Renang", desc: "Views hutan yang asri", image: "/images/hotel_pool.png" },
    { icon: "🍽️", title: "Restoran", desc: "Makanan lokal & internasional", image: "/images/hotel_restaurant.png" },
    { icon: "💆", title: "Spa & Wellness", desc: "Pijat tradisional", image: "/images/hotel_spa.png" },
    { icon: "🏋️", title: "Gym", desc: "Fasilitas lengkap", image: "/images/room_deluxe.png" },
    { icon: "📶", title: "WiFi", desc: "Internet super cepat", image: "https://images.unsplash.com/photo-1563986768609-322da13575f2?w=400&auto=format&fit=crop&q=80" },
    { icon: "🅿️", title: "Parkir", desc: "Area luas & aman", image: "/images/hotel_exterior.png" },
    { icon: "🛎️", title: "Layanan 24 Jam", desc: "Resepsionis & keamanan", image: "https://images.unsplash.com/photo-1552581234-26160f608093?w=400&auto=format&fit=crop&q=80" },
    { icon: "🚗", title: "Transport", desc: "Antar jemput gratis", image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&auto=format&fit=crop&q=80" },
  ];


  return (
    <section
      ref={ref}
      id="facilities"
      className="relative py-28 overflow-hidden bg-white"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute rounded-full opacity-[0.02]"
          style={{
            width: "500px", height: "500px",
            bottom: "-15%", left: "-10%",
            background: "radial-gradient(circle, var(--accent), transparent 70%)",
            animation: "slow-drift 28s ease-in-out infinite reverse",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`text-center mb-16 reveal-up transition-all duration-800 ${isVisible ? "is-visible" : ""}`}>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent/10 text-accent rounded-full text-sm font-medium mb-5">
            <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse-soft" />
            Fasilitas
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-5 tracking-tight leading-[1.1]">
            Nikmatin Fasilitas <span className="text-gradient">Premium</span>
          </h2>
          <div className="w-16 h-0.5 rounded-full mx-auto mb-5 divider-organic" />
          <p className="text-foreground-muted text-lg max-w-2xl mx-auto leading-relaxed">
            Berbagai fasilitas terbaik tersedia untuk kenyamanan dan hiburan Anda
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {facilities.map((item, i) => (
            <FacilityCard key={item.title} item={item} index={i} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FacilityCard({
  item,
  index,
  isVisible,
}: {
  item: { icon: string; title: string; desc: string; image?: string };
  index: number;
  isVisible: boolean;
}) {
  const { ref, isVisible: cardVisible } = useReveal();

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden rounded-2xl group cursor-default transition-all duration-700 hover:-translate-y-2 hover:shadow-2xl ${
        cardVisible && isVisible ? "is-visible" : ""
      }`}
      style={{
        opacity: cardVisible && isVisible ? 1 : 0,
        height: "220px",
        transform: cardVisible && isVisible ? "translateY(0)" : "translateY(20px)",
        transitionDelay: `${index * 80}ms`,
        transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >

      {item.image ? (
        <>
          <img
            src={item.image}
            alt={item.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-500 group-hover:opacity-90" />
        </>
      ) : (
        <div className="absolute inset-0 bg-slate-100" />
      )}

      <div className="absolute inset-0 p-6 flex flex-col justify-end items-center text-center">
        <span
          className="text-3xl block mb-2 transition-all duration-500 group-hover:scale-125 group-hover:-translate-y-1 inline-block"
        >
          {item.icon}
        </span>
        <h3 className="font-bold text-white mb-1 transition-colors duration-300">
          {item.title}
        </h3>
        <p className="text-white/70 text-xs leading-relaxed opacity-0 transform translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
          {item.desc}
        </p>
      </div>
    </div>
  );
}


function PromoSection() {
  const { ref, isVisible } = useReveal();

  return (
    <section className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 green-gradient" />
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute rounded-full opacity-5"
          style={{
            width: "600px", height: "600px",
            top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            background: "radial-gradient(circle, white, transparent 70%)",
            animation: "breathe 8s ease-in-out infinite",
          }}
        />
        <div
          className="absolute w-32 h-32 rounded-full border border-white/10"
          style={{ top: "15%", left: "10%", animation: "float-organic 16s ease-in-out infinite" }}
        />
        <div
          className="absolute w-20 h-20 rounded-full border border-white/8"
          style={{ bottom: "20%", right: "12%", animation: "float-organic 14s ease-in-out infinite 3s" }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <div ref={ref} className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 text-white rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 bg-green-300 rounded-full animate-pulse-soft" />
            Promo Spesial
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-[1.1]">
            Mulai Booking Sekarang!
          </h2>
          <p className="text-white/60 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            Stok terbatas untuk musim ini! Pesan sekarang dan nikmati diskon 15% untuk pembayaran via WhatsApp
          </p>
          <a
            href="https://wa.me/62816781261273?text=Halo,%20saya%20ingin%20booking%20kamar"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white text-primary-dark px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white/90 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl active:scale-[0.98] group"
          >
            <svg className="w-6 h-6 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01.57-.01.198 0 .52.074.792.372.272.297 1.04 1.016 1.04 2.156 0 1.14-.848 2.446-1.01 2.77-.159.297-.01.596.114.743.149.149.328.447.97.729 1.517.666 2.573 1.323 3.011 1.502.713.293 1.404.264 1.921.18.6-.099 1.837-.734 2.109-1.44.273-.706.273-1.473.192-1.612-.074-.149-.297-.199-.495-.249z"/>
            </svg>
            <span className="relative">
              Hubungi via WhatsApp
              <span className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-primary-dark/20 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
