"use client";

import Link from "next/link";
import { useReveal } from "@/lib/useReveal";

export default function Footer() {
  const { ref, isVisible } = useReveal();

  return (
    <footer
      ref={ref}
      id="contact"
      className={`relative overflow-hidden reveal-up transition-all duration-700 ${
        isVisible ? "is-visible" : ""
      }`}
      style={{ background: "linear-gradient(180deg, #0f6a35 0%, #0a4d26 100%)" }}
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-light to-primary flex items-center justify-center shadow-lg shadow-primary/20">
                <span className="text-white font-bold text-lg">FH</span>
              </div>
              <div>
                <span className="text-2xl font-bold text-white tracking-tight">Forest Haven</span>
                <span className="text-xs block text-white/45">Mountain Resort</span>
              </div>
            </div>
            <p className="text-white/55 max-w-md leading-relaxed mb-6">
              Resor kelas atas yang dikelilingi keindahan hutan hijau. Nikmati ketenangan
              alam dengan fasilitas luxury dan pelayanan istimewa untuk pengalaman menginap yang tak terlupakan.
            </p>
            <div className="flex gap-4">
              <a
                href="https://wa.me/62816781261273"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/8 flex items-center justify-center hover:bg-primary-light hover:scale-110 transition-all duration-300 text-white/60 hover:text-white"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01.57-.01.198 0 .52.074.792.372.272.297 1.04 1.016 1.04 2.156 0 1.14-.848 2.446-1.01 2.77-.159.297-.01.596.114.743.149.149.328.447.97.729 1.517.666 2.573 1.323 3.011 1.502.713.293 1.404.264 1.921.18.6-.099 1.837-.734 2.109-1.44.273-.706.273-1.473.192-1.612-.074-.149-.297-.199-.495-.249z"/>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-5 text-white">Menu</h4>
            <ul className="space-y-3">
              <li><Link href="/" className="text-white/45 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block text-sm">Beranda</Link></li>
              <li><Link href="/#rooms" className="text-white/45 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block text-sm">Kamar</Link></li>
              <li><Link href="/#facilities" className="text-white/45 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block text-sm">Fasilitas</Link></li>
              <li><Link href="/admin" className="text-white/45 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block text-sm">Admin</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-5 text-white">Kontak</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-white/8 flex items-center justify-center text-sm text-white/60">📱</span>
                <a href="https://wa.me/62816781261273" target="_blank" rel="noopener noreferrer" className="text-white/45 hover:text-white transition-colors text-sm">+62 816-7812-61273</a>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-white/8 flex items-center justify-center text-sm text-white/60">📧</span>
                <span className="text-white/45 text-sm">hello@foresthaven.com</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-white/8 flex items-center justify-center text-sm text-white/60">📍</span>
                <span className="text-white/45 text-sm">Jl. Raya Hutan No.1</span>
              </li>
            </ul>
            <a
              href="https://wa.me/62816781261273?text=Halo,%20saya%20ingin%20booking%20kamar"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/10 text-white border border-white/15 px-5 py-3 rounded-xl font-medium mt-5 hover:bg-white hover:text-primary-dark hover:border-white transition-all duration-300 group text-sm"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01.57-.01.198 0 .52.074.792.372.272.297 1.04 1.016 1.04 2.156 0 1.14-.848 2.446-1.01 2.77-.159.297-.01.596.114.743.149.149.328.447.97.729 1.517.666 2.573 1.323 3.011 1.502.713.293 1.404.264 1.921.18.6-.099 1.837-.734 2.109-1.44.273-.706.273-1.473.192-1.612-.074-.149-.297-.199-.495-.249z"/>
              </svg>
              Chat WhatsApp
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
            </a>
          </div>
        </div>

        <div className="border-t border-white/8 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/25 text-sm">&copy; 2026 Forest Haven Resort. All rights reserved.</p>
          <div className="flex items-center gap-6 text-sm">
            <Link href="#" className="text-white/25 hover:text-white/60 transition-colors">Privacy</Link>
            <Link href="#" className="text-white/25 hover:text-white/60 transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
