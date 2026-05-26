"use client";

import Link from "next/link";
import { useReveal } from "@/lib/useReveal";

export default function Footer() {
  const { ref, isVisible } = useReveal();

  return (
    <footer
      ref={ref}
      id="contact"
      className={`relative overflow-hidden transition-all duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      style={{
        background: "linear-gradient(180deg, var(--forest-deep) 0%, var(--primary-dark) 100%)",
      }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute rounded-full border border-luxury-gold/15"
          style={{
            width: "200px", height: "200px",
            top: "5%", left: "3%",
            animation: "float-organic 18s ease-in-out infinite",
          }}
        />
        <div
          className="absolute rounded-full border border-luxury-gold/10"
          style={{
            width: "140px", height: "140px",
            bottom: "10%", right: "8%",
            animation: "float-organic 16s ease-in-out infinite 4s",
          }}
        />
        <div
          className="absolute bg-luxury-gold/5 rounded-full"
          style={{
            width: "80px", height: "80px",
            top: "40%", right: "5%",
            animation: "breathe 8s ease-in-out infinite 2s",
          }}
        />
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-luxury-gold/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-xl">
                <span className="text-white text-xl font-bold">FH</span>
              </div>
              <div className="space-y-0.5">
                <span className="text-xl font-bold text-white tracking-tight block">Forest Haven</span>
                <span className="text-xs text-white/50 tracking-[0.2em] uppercase block">Luxury Forest Resort</span>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-md mb-6">
              Pengalaman menginap eksklusif di tengah keindahan hutan riwi. Kami menyajikan
              harmonii sempurna antara keindahan alam dan kemewahan modern untuk menciptakan
              kenangan yang tak terlupakan.
            </p>
            <a
              href="https://wa.me/62816781261273"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/20 hover:scale-105 transition-all duration-300"
            >
              <svg className="w-5 h-5 text-white/60" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01.57-.01.198 0 .52.074.792.372.272.297 1.04 1.016 1.04 2.156 0 1.14-.848 2.446-1.01 2.77-.159.297-.01.596.114.743.149.149.328.447.97.729 1.517.666 2.573 1.323 3.011 1.502.713.293 1.404.264 1.921.18.6-.099 1.837-.734 2.109-1.44.273-.706.273-1.473.192-1.612-.074-.149-.297-.199-.495-.249z"/>
              </svg>
            </a>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-sm font-semibold text-white/80 tracking-wider mb-5 uppercase">Menu</h4>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Beranda", icon: "🏠" },
                { href: "/#rooms", label: "Kamar", icon: "🏨" },
                { href: "/#facilities", label: "Fasilitas", icon: "🌿" },
                { href: "/admin", label: "Admin", icon: "⚙️" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-3 text-white/50 hover:text-white transition-all duration-300 group text-sm"
                  >
                    <span className="w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center text-xs group-hover:bg-white/10 transition-colors duration-300">
                      {item.icon}
                    </span>
                    <span className="group-hover:translate-x-0.5 transition-transform duration-300">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="text-sm font-semibold text-white/80 tracking-wider mb-5 uppercase">Kontak</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-xs flex-shrink-10 mt-0.5">📱</span>
                <a
                  href="https://wa.me/62816781261273"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-white transition-colors text-sm"
                >
                  +62 816-7812-61273
                </a>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">📧</span>
                <span className="text-white/50 text-sm">hello@foresthaven.com</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">📍</span>
                <span className="text-white/50 text-sm">Jl. Raya Hutan No.1, Kabupaten Bogor</span>
              </li>
            </ul>
            <a
              href="https://wa.me/62816781261273?text=Halo,%20saya%20ingin%20booking%20kamar%20di%20Forest%20Haven%20Resort"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 bg-luxury-gold/85 text-white px-5 py-3 rounded-xl text-sm font-medium hover:bg-luxury-gold/70 hover:-translate-y-0.5 transition-all duration-300 group"
            >
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01.57-.01.198 0 .52.074.792.372.272.297 1.04 1.016 1.04 2.156 0 1.14-.848 2.446-1.01 2.77-.159.297-.01.596.114.743.149.149.328.447.97.729 1.517.666 2.573 1.323 3.011 1.502.713.293 1.404.264 1.921.18.6-.099 1.837-.734 2.109-1.44.273-.706.273-1.473.192-1.612-.074-.149-.297-.199-.495-.249z"/>
              </svg>
              Chat WhatsApp Booking
            </a>
          </div>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-10" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-white/30 text-sm">&copy; 2026 Forest Haven Resort.</span>
            <span className="text-white/20 text-sm">All rights reserved.</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-white/30 hover:text-white/50 transition-colors text-xs tracking-wider uppercase">
              Privacy
            </Link>
            <span className="text-white/10">|</span>
            <Link href="#" className="text-white/30 hover:text-white/50 transition-colors text-xs tracking-wider uppercase">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
