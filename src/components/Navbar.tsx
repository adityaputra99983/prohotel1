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
          ? "bg-white/85 backdrop-blur-xl border-b border-primary/10 shadow-sm shadow-primary/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18 py-4">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center group-hover:shadow-lg group-hover:shadow-primary/30 transition-all duration-300">
              <span className="text-white text-sm font-bold">FH</span>
            </div>
            <div>
              <span
                className="text-xl font-bold transition-colors duration-300 tracking-tight"
                style={{ color: scrolled ? "var(--foreground)" : "white" }}
              >
                Forest Haven
              </span>
              <span
                className="text-xs block transition-colors duration-300"
                style={{ color: scrolled ? "var(--foreground-muted)" : "rgba(255,255,255,0.65)" }}
              >
                Mountain Resort
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative font-medium text-sm transition-colors duration-300 hover:text-primary"
                style={{ color: scrolled ? "var(--foreground-muted)" : "rgba(255,255,255,0.8)" }}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
            <Link
              href="/#rooms"
              className="btn-primary px-6 py-2.5 rounded-xl text-sm relative overflow-hidden group"
            >
              <span className="relative z-10">Pesan Sekarang</span>
              <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </Link>
          </div>

          <button
            className="md:hidden p-2 transition-colors duration-300"
            style={{ color: scrolled ? "var(--primary)" : "white" }}
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{ background: scrolled ? "rgba(255,255,255,0.98)" : "rgba(15,106,53,0.98)" }}
      >
        <div className="px-4 py-4 space-y-2 border-t border-primary/10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block py-3 font-medium transition-colors text-sm"
              style={{ color: scrolled ? "var(--foreground-muted)" : "rgba(255,255,255,0.85)" }}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#rooms"
            className="block btn-primary text-white text-center py-3 rounded-xl mt-4"
            onClick={() => setIsOpen(false)}
          >
            Pesan Sekarang
          </Link>
        </div>
      </div>
    </nav>
  );
}
