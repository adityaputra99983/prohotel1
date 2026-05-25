"use client";

import Link from "next/link";
import { useReveal } from "@/lib/useReveal";

export default function Footer() {
  const { ref, isVisible } = useReveal();

  return (
    <footer
      ref={ref}
      id="contact"
      className={`relative overflow-hidden reveal-up transition-all duration-800 ${
        isVisible ? "is-visible" : ""
      }`}
      style={{ 
        background: "linear-gradient(180deg, var(--forest-deep) 0%, var(--primary-dark) 100%)",
        position: "relative"
      }}
    >
      {/* Luxury decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-[10%] left-[5%] w-[150px] h-[150px] rounded-full border border-luxury-gold/20 animate-float-slow"
          style={{ animationDelay: "0s" }}
        />
        <div 
          className="absolute bottom-[15%] right-[10%] w-[120px] h-[120px] rounded-full border border-luxury-gold/15 animate-float"
          style={{ animationDelay: "3s" }}
        />
        <div 
          className="absolute top-[30%] right-[5%] w-[80px] h-[80px] bg-luxury-gold/10 rounded-full animate-pulse"
          style={{ animationDelay: "1.5s" }}
        />
      </div>

      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-luxury-gold/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-xl shadow-primary/25">
                <span className="text-white text-2xl font-bold">FH</span>
              </div>
              <div className="space-y-1">
                <span className="text-2xl font-bold text-white tracking-tight">Forest Haven</span>
                <span className="text-base block text-white/60 tracking-wider">Luxury Forest Resort</span>
              </div>
            </div>
            <p className="text-white/60 max-w-xl leading-relaxed mb-6">
              Pengalaman menginap eksklusif di tengah keindahan hutan riwi. Kami menyajikan 
              harmonii sempurna antara keindahan alam dan kemewahan modern untuk menciptakan 
              kenangan yang tak terlupakan.
            </p>
            <div className="flex flex-wrap gap-4 mb-6">
              <a
                href="https://wa.me/62816781261273"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-sm hover:bg-white/20 hover:scale-105 transition-all duration-400 text-white/70 hover:text-white border border-white/15"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01.57-.01.198 0 .52.074.792.372.272.297 1.04 1.016 1.04 2.156 0 1.14-.848 2.446-1.01 2.77-.159.297-.01.596.114.743.149.149.328.447.97.729 1.517.666 2.573 1.323 3.011 1.502.713.293 1.404.264 1.921.18.6-.099 1.837-.734 2.109-1.44.273-.706.273-1.473.192-1.612-.074-.149-.297-.199-.495-.249z"/>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white tracking-wider">Menu Utama</h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/" 
                  className="flex items-center gap-2 text-white/60 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block text-base"
                >
                  <span className="w-4 h-4 bg-white/10 rounded-full flex items-center justify-center text-white/70">🏠</span>
                  Beranda
                </Link>
              </li>
              <li>
                <Link 
                  href="/#rooms" 
                  className="flex items-center gap-2 text-white/60 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block text-base"
                >
                  <span className="w-4 h-4 bg-white/10 rounded-full flex items-center justify-center text-white/70">🏨</span>
                  Kamar
                </Link>
              </li>
              <li>
                <Link 
                  href="/#facilities" 
                  className="flex items-center gap-2 text-white/60 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block text-base"
                >
                  <span className="w-4 h-4 bg-white/10 rounded-full flex items-center justify-center text-white/70">🌿</span>
                  Fasilitas
                </Link>
              </li>
              <li>
                <Link 
                  href="/admin" 
                  className="flex items-center gap-2 text-white/60 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block text-base"
                >
                  <span className="w-4 h-4 bg-white/10 rounded-full flex items-center justify-center text-white/70">⚙️</span>
                  Admin
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white tracking-wider">Hubungi Kami</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-white/60">📱</span>
                <a 
                  href="https://wa.me/62816781261273" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-white/50 hover:text-white transition-colors text-base"
                >
                  +62 816-7812-61273
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-white/60">📧</span>
                <span className="text-white/50 text-base">hello@foresthaven.com</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-white/60">📍</span>
                <span className="text-white/50 text-base">Jl. Raya Hutan No.1, Kabupaten Bogor</span>
              </li>
            </ul>
            <a
              href="https://wa.me/62816781261273?text=Halo,%20saya%20ingin%20booking%20kamar%20di%20Forest%20Haven%20Resort"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-3 bg-luxury-gold/90 text-white border-none px-6 py-3 rounded-xl font-medium mt-6 hover:bg-luxury-gold/80 hover:-translate-y-1 transition-all duration-400 group text-base flex-nowrap"
            >
              <span className="relative z-10">Chat WhatsApp Untuk Booking</span>
              <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-400" />
            </a>
          </div>
        </div>

        <div className="border-t border-white/10 mt-16 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4 text-sm">
            <span className="w-5 h-5 rounded-full bg-luxury-gold/20 flex items-center justify-center text-luxury-gold/80">©</span>
            <span className="text-white/40">2026 Forest Haven Resort. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <Link 
              href="#" 
              className="flex items-center gap-1 text-white/30 hover:text-white/60 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link 
              href="#" 
              className="flex items-center gap-1 text-white/30 hover:text-white/60 transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
