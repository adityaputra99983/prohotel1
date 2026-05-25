"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/5 to-black/35 z-10" />

      <div
        className="absolute inset-0 bg-cover bg-center animate-slow-zoom"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=1920&auto=format&fit=crop&q=80')`,
        }}
      />

      <div className="absolute inset-0 z-20 pointer-events-none">
        <svg className="absolute top-[15%] left-[6%] w-12 h-12 text-white/5 animate-float-slow" viewBox="0 0 40 40" fill="currentColor">
          <path d="M20 0C20 0 8 12 8 24C8 30 13 35 20 35C27 35 32 30 32 24C32 12 20 0 20 0Z" />
        </svg>
        <svg className="absolute bottom-[35%] left-[12%] w-7 h-7 text-white/5 animate-float" style={{ animationDelay: "1.5s" }} viewBox="0 0 40 40" fill="currentColor">
          <path d="M20 0C20 0 8 12 8 24C8 30 13 35 20 35C27 35 32 30 32 24C32 12 20 0 20 0Z" />
        </svg>
        <svg className="absolute top-[45%] right-[8%] w-9 h-9 text-white/5 animate-float-slow" style={{ animationDelay: "3s" }} viewBox="0 0 40 40" fill="currentColor">
          <path d="M20 0C20 0 8 12 8 24C8 30 13 35 20 35C27 35 32 30 32 24C32 12 20 0 20 0Z" />
        </svg>
        <div className="absolute top-[28%] right-[18%] w-16 h-16 rounded-full border border-white/5 animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-[28%] right-[22%] w-10 h-10 rounded-full border border-white/5 animate-float-slow" style={{ animationDelay: "4s" }} />
        <div className="absolute top-[20%] left-[40%] w-1 h-1 bg-white/20 rounded-full animate-pulse" />
        <div className="absolute top-[60%] right-[30%] w-1 h-1 bg-white/15 rounded-full animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-[35%] left-[25%] w-1 h-1 bg-white/20 rounded-full animate-pulse" style={{ animationDelay: "0.5s" }} />
      </div>

      <div className="relative z-30 text-center text-white px-4 max-w-5xl mx-auto">
        <div
          className={`inline-flex items-center gap-2 glass-nature rounded-full px-5 py-2 mb-8 transition-all duration-700 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.4)]" />
          <span className="text-sm font-medium tracking-wide text-white/90">Resor Penginapan Alam Kelas Atas</span>
        </div>

        <h1
          className={`text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight tracking-tight transition-all duration-700 delay-200 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-gradient drop-shadow-[0_2px_20px_rgba(77,184,112,0.3)]">Forest Haven</span>
        </h1>

        <p
          className={`text-lg md:text-xl text-white/80 mb-10 max-w-3xl mx-auto font-light leading-relaxed transition-all duration-700 delay-300 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Terhubungkan dengan keindahan alam. Nikmati ketenangan hutan dengan fasilitas luxury dan pelayanan terbaik
        </p>

        <div
          className={`flex flex-col sm:flex-row gap-5 justify-center transition-all duration-700 delay-400 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Link
            href="/#rooms"
            className="btn-primary px-10 py-4 rounded-xl font-semibold text-lg relative overflow-hidden group"
          >
            <span className="relative z-10">Pesan Kamar</span>
            <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </Link>
          <Link
            href="#facilities"
            className="btn-outline px-10 py-4 rounded-xl font-semibold text-lg"
          >
            Lihat Fasilitas
          </Link>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30">
        <div className="flex flex-col items-center gap-2 text-white/45">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-5 h-8 border-2 border-white/25 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white/60 rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
