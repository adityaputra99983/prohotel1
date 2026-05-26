"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const parallaxOffset = scrollY * 0.4;
  const fadeOffset = Math.max(0, 1 - scrollY / 700);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 transition-transform duration-1000"
        style={{
          transform: `translateY(${parallaxOffset * 0.3}px) scale(${1 + scrollY * 0.0003})`,
        }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=1920&auto=format&fit=crop&q=80')`,
          }}
        />
      </div>

      <div
        className="absolute inset-0 z-10"
        style={{
          background: `linear-gradient(to bottom, 
            rgba(0,0,0,0.3) 0%, 
            rgba(0,0,0,0.1) 40%, 
            rgba(0,0,0,0.2) 70%, 
            rgba(15,27,22,0.5) 100%)`,
        }}
      />

      <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
        <div
          className="absolute w-32 h-32 rounded-full border border-luxury-gold/20"
          style={{ top: "12%", left: "8%", animation: "float-organic 14s ease-in-out infinite" }}
        />
        <div
          className="absolute w-24 h-24 rounded-full border border-luxury-gold/15"
          style={{ bottom: "18%", right: "12%", animation: "float-organic 18s ease-in-out infinite 2s" }}
        />
        <div
          className="absolute w-16 h-16 bg-luxury-gold/8 rounded-full"
          style={{ top: "35%", left: "4%", animation: "breathe 6s ease-in-out infinite 1s" }}
        />
        <div
          className="absolute w-10 h-10 bg-luxury-gold/10 rounded-full"
          style={{ bottom: "45%", right: "8%", animation: "breathe 8s ease-in-out infinite 3s" }}
        />
        <div
          className="absolute w-6 h-6 bg-white/10 rounded-full"
          style={{ top: "55%", left: "15%", animation: "pulse-soft 4s ease-in-out infinite 0.5s" }}
        />
        <div
          className="absolute w-72 h-72 rounded-full opacity-20"
          style={{
            top: "20%", right: "-5%",
            background: "radial-gradient(circle, rgba(212,175,55,0.3), transparent 70%)",
            animation: "pulse-glow 6s ease-in-out infinite",
          }}
        />
        <div
          className="absolute w-96 h-96 rounded-full opacity-10"
          style={{
            bottom: "-10%", left: "-10%",
            background: "radial-gradient(circle, rgba(45,90,39,0.4), transparent 70%)",
            animation: "slow-drift 30s ease-in-out infinite",
          }}
        />
      </div>

      <div
        className="relative z-30 text-center px-4 max-w-5xl mx-auto"
        style={{ opacity: fadeOffset, transform: `translateY(${scrollY * 0.15}px)` }}
      >
        <div
          className={`inline-flex items-center gap-2.5 glass-nature rounded-full px-6 py-2.5 mb-8 transition-all duration-1000 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}
        >
          <span className="w-2 h-2 bg-luxury-gold rounded-full animate-pulse-soft" style={{ boxShadow: "0 0 8px rgba(212,175,55,0.4)" }} />
          <span className="text-sm font-medium tracking-wider text-white/90">Luxury Forest Resort</span>
        </div>

        <h1
          className={`transition-all duration-1000 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="block text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold leading-[0.9] tracking-tight">
            <span className="text-gradient drop-shadow-[0_4px_30px_rgba(212,175,55,0.15)] inline-block">Forest Haven</span>
          </span>
        </h1>

        <p
          className={`text-lg sm:text-xl md:text-2xl text-white/75 mb-10 max-w-3xl mx-auto font-light leading-relaxed transition-all duration-1000 delay-200 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          Terjalani keunggulan menginap di tengah hutan riwi dengan fasilitas 5 bintang dan pemandangan yang menakjubkan
        </p>

        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-300 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <Link
            href="/#rooms"
            className="btn-primary px-10 py-4 rounded-2xl font-semibold text-lg group"
          >
            <span className="relative z-10 flex items-center gap-2">
              Pesan Suite Anda
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7" />
              </svg>
            </span>
          </Link>
          <Link
            href="#facilities"
            className="btn-outline px-10 py-4 rounded-2xl font-semibold text-lg group"
          >
            <span className="flex items-center gap-2">
              Jelajahi Fasilitas Eksklusif
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </span>
          </Link>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30" style={{ opacity: fadeOffset }}>
        <div className="flex flex-col items-center gap-2 text-white/40">
          <span className="text-[10px] tracking-[0.3em] uppercase font-medium">Scroll</span>
          <div className="w-5 h-8 border-2 border-white/20 rounded-full flex justify-center pt-1.5">
            <div className="w-1 h-2 bg-white/40 rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
