"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/#rooms", label: "Kamar" },
  { href: "/#facilities", label: "Fasilitas" },
  { href: "/#contact", label: "Kontak" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled
          ? "bg-white/80 backdrop-blur-2xl shadow-lg"
          : "bg-transparent"
      }`}
      style={{
        boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.06)" : "none",
        borderBottom: scrolled ? "1px solid rgba(45,90,39,0.08)" : "1px solid transparent"
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center gap-4 group">
            <img src={scrolled ? "/logo-fh-horizontal.svg" : "/logo-fh-horizontal-white.svg"} alt="Forest Haven" className="h-10 w-auto transition-all duration-500 group-hover:scale-105" />
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative group px-4 py-2 text-sm font-medium transition-all duration-300 rounded-xl hover:bg-white/10"
                style={{ color: scrolled ? "var(--foreground-muted)" : "rgba(255,255,255,0.85)" }}
              >
                {link.label}
                <span
                  className="absolute bottom-1 left-4 right-4 h-[2px] rounded-full origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100"
                  style={{ background: scrolled ? "var(--primary)" : "white" }}
                />
              </Link>
            ))}
            <div className="w-px h-6 mx-2 rounded-full" style={{ background: scrolled ? "var(--border)" : "rgba(255,255,255,0.2)" }} />
            <Link
              href="/#rooms"
              className="relative overflow-hidden rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-300 hover:scale-105 active:scale-95"
              style={{
                background: scrolled
                  ? "linear-gradient(135deg, var(--primary), var(--primary-dark))"
                  : "rgba(255,255,255,0.15)",
                color: "white"
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Pesan Sekarang
                <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          </div>

          <button
            className="md:hidden relative w-10 h-10 flex items-center justify-center transition-all duration-300 rounded-xl hover:bg-white/10"
            style={{ color: scrolled ? "var(--foreground)" : "white" }}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-5 h-4 relative flex flex-col justify-between">
              <span
                className="block h-[2px] w-full rounded-full transition-all duration-300 origin-center"
                style={{
                  background: scrolled ? "var(--foreground)" : "white",
                  transform: isOpen ? "rotate(45deg) translate(2.5px, 2.5px)" : "none"
                }}
              />
              <span
                className="block h-[2px] w-full rounded-full transition-all duration-300"
                style={{
                  background: scrolled ? "var(--foreground)" : "white",
                  opacity: isOpen ? 0 : 1
                }}
              />
              <span
                className="block h-[2px] w-full rounded-full transition-all duration-300 origin-center"
                style={{
                  background: scrolled ? "var(--foreground)" : "white",
                  transform: isOpen ? "rotate(-45deg) translate(2.5px, -2.5px)" : "none"
                }}
              />
            </div>
          </button>
        </div>
      </div>

      <div
        className={`md:hidden transition-all duration-500 overflow-hidden`}
        style={{
          maxHeight: isOpen ? "400px" : "0",
          opacity: isOpen ? 1 : 0,
          background: scrolled
            ? "rgba(255,255,255,0.98)"
            : "rgba(15,27,22,0.95)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        <div className="px-6 py-6 space-y-1" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className="block py-3.5 px-4 rounded-xl font-medium transition-all duration-300 hover:bg-white/10"
              style={{
                color: scrolled ? "var(--foreground)" : "rgba(255,255,255,0.85)",
                transitionDelay: isOpen ? `${i * 60}ms` : "0ms",
                transform: isOpen ? "translateX(0)" : "translateX(-10px)",
                opacity: isOpen ? 1 : 0,
              }}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3">
            <Link
              href="/#rooms"
              className="w-full block text-center py-3.5 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: "linear-gradient(135deg, var(--primary), var(--primary-dark))",
              }}
              onClick={() => setIsOpen(false)}
            >
              <span className="flex items-center justify-center gap-2">
                Pesan Sekarang
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
