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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl border-b border-primary/15 shadow-lg shadow-primary/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 py-6">
          <Link href="/" className="flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center group-hover:shadow-xl group-hover:shadow-primary/30 transition-all duration-400">
              <span className="text-white text-lg font-bold">FH</span>
            </div>
            <div>
              <span
                className="text-2xl font-bold tracking-tight transition-colors duration-400"
                style={{ color: scrolled ? "var(--foreground)" : "white" }}
              >
                Forest Haven
              </span>
              <span
                className="text-sm block transition-colors duration-400 tracking-wider"
                style={{ color: scrolled ? "var(--foreground-muted)" : "rgba(255,255,255,0.7)" }}
              >
                Luxury Forest Resort
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative group font-medium text-base transition-colors duration-400 hover:text-primary/90"
                style={{ color: scrolled ? "var(--foreground)" : "rgba(255,255,255,0.9)" }}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-400 group-hover:w-full" />
              </Link> 
            ))}
            <Link
              href="/#rooms"
              className="btn-primary px-8 py-3 rounded-2xl text-base font-medium relative overflow-hidden group flex items-center gap-2"
            >
              <span className="relative z-10">Pesan Sekarang</span>
              <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-400" />
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <button
            className="md:hidden p-3 transition-all duration-400"
            style={{ color: scrolled ? "var(--primary)" : "white" }}
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-400 ${
          isOpen ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{ background: scrolled ? "rgba(255,255,255,0.95)" : "rgba(21, 94, 58, 0.95)" }}
      >
        <div className="px-6 py-6 space-y-4 border-t border-primary/12">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block py-4 font-medium text-base transition-colors duration-400 hover:text-primary/90"
              style={{ color: scrolled ? "var(--foreground)" : "rgba(255,255,255,0.9)" }}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4">
            <Link
              href="/#rooms"
              className="w-full block btn-primary text-white text-center py-3 rounded-2xl font-medium mt-2 flex items-center justify-center gap-2"
            >
              <span className="relative z-10">Pesan Sekarang</span>
              <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-400" />
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
