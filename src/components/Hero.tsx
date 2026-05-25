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
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/5 to-black/25 z-10" />

      <div
        className="absolute inset-0 bg-cover bg-center animate-slow-zoom"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=1920&auto=format&fit=crop&q=80')`,
        }}
      />

      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-20 h-20 rounded-full border border-luxury-gold/20 animate-float-slow" style={{ animationDelay: "0s" }} />
        <div className="absolute bottom-[15%] right-[15%] w-16 h-16 rounded-full border border-luxury-gold/15 animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute top-[30%] left-[5%] w-12 h-12 bg-luxury-gold/10 rounded-full animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-[40%] right-[10%] w-8 h-8 bg-luxury-gold/15 rounded-full animate-pulse" style={{ animationDelay: "3s" }} />
        <div className="absolute top-[50%] left-[20%] w-4 h-4 bg-luxury-gold/20 rounded-full animate-pulse" style={{ animationDelay: "0.5s" }} />
      </div>

      <div className="relative z-30 text-center text-white px-4 max-w-5xl mx-auto">
        <div
          className={`inline-flex items-center gap-2 glass-nature rounded-full px-6 py-2.5 mb-10 transition-all duration-800 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="w-2.5 h-2.5 bg-luxury-gold rounded-full animate-pulse shadow-[0_0_8px_rgba(212,175,55,0.3)]" />
          <span className="text-base font-medium tracking-wide text-white/90">Luxury Forest Resort</span>
        </div>

        <h1
          className={`text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold mb-8 leading-tight tracking-tight transition-all duration-800 delay-200 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span className="text-gradient drop-shadow-[0_2px_25px_rgba(212,175,55,0.2)]">Forest Haven</span>
        </h1>

        <p
          className={`text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto font-light leading-relaxed transition-all duration-800 delay-300 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          Terjalani keunggulan menginap di tengah hutan riwi dengan fasilitas 5 bintang dan pemandangan yang menakjubkan
        </p>

        <div
          className={`flex flex-col sm:flex-row gap-6 justify-center transition-all duration-800 delay-400 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <Link
            href="/#rooms"
            className="btn-primary px-12 py-5 rounded-2xl font-semibold text-xl relative overflow-hidden group flex items-center gap-3"
          >
            <span className="relative z-10">Pesan Suite Anda</span>
            <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-400" />
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7" />
            </svg>
          </Link>
          <Link
            href="#facilities"
            className="btn-outline px-12 py-5 rounded-2xl font-semibold text-xl"
          >
            Jelajahi Fasilitas Eksklusif
          </Link>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30">
        <div className="flex flex-col items-center gap-3 text-white/50">
          <span className="text-sm tracking-widest uppercase">Scroll Down untuk Menjelajahi</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-2 h-3 bg-white/60 rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
