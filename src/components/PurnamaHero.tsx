"use client";

import { useState, useEffect } from "react";
import { Menu, X, MapPin, Calendar, Users, ChevronDown } from "lucide-react";

const navItems = ["Suites", "Dining", "Wellness", "Experiences", "Offers"];

export default function PurnamaHero() {
  const [loaded, setLoaded] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setLoaded(true);
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const today = new Date().toISOString().split("T")[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];

  return (
    <section className="relative h-screen w-full overflow-visible bg-gray-50">
      {/* VIDEO BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_091828_e240eb17-6edc-4129-ad9d-98678e3fd238.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/70" />
      </div>

      {/* NAVBAR */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <span
            className={`text-2xl tracking-wide transition-colors duration-500 ${
              scrolled ? "text-[#202A36]" : "text-white"
            }`}
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            Purnama Hotels
          </span>

          {/* DESKTOP MENU */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item}
                href="#"
                className={`relative text-sm font-medium transition-colors duration-300 group ${
                  scrolled
                    ? "text-gray-600 hover:text-[#202A36]"
                    : "text-white/90 hover:text-white"
                }`}
              >
                {item}
                <span
                  className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 rounded-full transition-all duration-300 group-hover:w-full ${
                    scrolled ? "bg-[#202A36]" : "bg-white"
                  }`}
                />
              </a>
            ))}
          </div>

          {/* DESKTOP RIGHT */}
          <div className="hidden lg:flex items-center gap-6">
            <div className="relative">
              <button
                onClick={() => setLangOpen((o) => !o)}
                className={`flex items-center gap-1 text-sm font-medium transition-colors duration-300 ${
                  scrolled
                    ? "text-gray-600 hover:text-[#202A36]"
                    : "text-white/90 hover:text-white"
                }`}
              >
                EN / USD
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${langOpen ? "rotate-180" : ""}`} />
              </button>
              {langOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-xl py-2 z-50 overflow-hidden border">
                  <button className="block w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">English / USD</button>
                  <button className="block w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">Bahasa Indonesia / IDR</button>
                </div>
              )}
            </div>
            <a
              href="#"
              className={`text-sm font-medium transition-colors duration-300 ${
                scrolled
                  ? "text-gray-600 hover:text-[#202A36]"
                  : "text-white/90 hover:text-white"
              }`}
            >
              Sign In
            </a>
          </div>

          {/* MOBILE HAMBURGER */}
          <button
            className={`lg:hidden p-1 transition-colors duration-500 ${
              scrolled ? "text-[#202A36]" : "text-white"
            }`}
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* MOBILE OVERLAY */}
        <div
          className={`lg:hidden fixed inset-0 z-40 bg-black/80 backdrop-blur-md transition-all duration-500 ${
            mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="flex flex-col items-center justify-center h-full gap-10 px-8">
            {navItems.map((item, i) => (
              <a
                key={item}
                href="#"
                className="text-white text-3xl font-light tracking-wide hover:text-gray-300 transition-colors"
                style={{
                  opacity: mobileOpen ? 1 : 0,
                  transform: mobileOpen ? "translateY(0)" : "translateY(20px)",
                  transition: `all 0.4s ease-out ${i * 0.08}s`,
                }}
              >
                {item}
              </a>
            ))}
            <hr className="w-20 border-white/20 my-4" />
            <a href="#" className="text-white/70 text-xl font-light hover:text-white transition-colors">Sign In</a>
            <div className="flex gap-6 text-white/50 text-sm mt-2">
              <span className="hover:text-white transition-colors cursor-pointer">EN</span>
              <span className="hover:text-white transition-colors cursor-pointer">ID</span>
            </div>
          </div>
        </div>
      </nav>

      {/* HERO CONTENT */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center pb-52 px-4 text-center">
        <p
          className={`text-xs md:text-sm font-semibold text-yellow-500 tracking-[0.2em] mb-4 transition-all duration-1000 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          UNPARALLELED LUXURY
        </p>

        <h1
          className={`transition-all duration-1000 delay-200 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span
            className="block text-6xl md:text-7xl lg:text-8xl font-light text-white leading-none"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            Timeless.
          </span>
          <span
            className="block text-6xl md:text-7xl lg:text-8xl italic text-white -mt-4"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            Sanctuary.
          </span>
        </h1>

        <p
          className={`text-base md:text-lg text-gray-200 mb-12 max-w-2xl font-light transition-all duration-1000 delay-[400ms] ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Immerse yourself in breathtaking views and refined elegance.
        </p>

        {/* SCROLL INDICATOR */}
        <div
          className={`absolute left-1/2 -translate-x-1/2 transition-all duration-1000 delay-700 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          style={{ bottom: "14rem" }}
        >
          <div className="w-5 h-9 border-2 border-white/30 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-white/60 rounded-full animate-bounce" />
          </div>
        </div>
      </div>

      {/* BOOKING WIDGET */}
      <div className="absolute bottom-0 left-0 right-0 z-40 translate-y-1/2 px-4">
        <div className="max-w-5xl mx-auto w-full">
          <div className="bg-white rounded-lg shadow-2xl flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-gray-200">
            {/* DESTINATION */}
            <div className="flex-1 p-4 md:p-5 min-w-0">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-0.5">Destination / Hotel</p>
                  <select className="text-sm font-semibold text-gray-900 bg-transparent border-none p-0 outline-none w-full appearance-none cursor-pointer">
                    <option>Purnama Hotels — Bali</option>
                    <option>Purnama Hotels — Jakarta</option>
                    <option>Purnama Hotels — Yogyakarta</option>
                  </select>
                </div>
              </div>
            </div>

            {/* CHECK-IN */}
            <div className="flex-1 p-4 md:p-5 min-w-0">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-0.5">Check-in</p>
                  <input
                    type="date"
                    defaultValue={today}
                    className="text-sm font-semibold text-gray-900 bg-transparent border-none p-0 outline-none w-full cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* CHECK-OUT */}
            <div className="flex-1 p-4 md:p-5 min-w-0">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-0.5">Check-out</p>
                  <input
                    type="date"
                    defaultValue={tomorrow}
                    className="text-sm font-semibold text-gray-900 bg-transparent border-none p-0 outline-none w-full cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* GUESTS */}
            <div className="flex-1 p-4 md:p-5 min-w-0">
              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-0.5">Guests &amp; Rooms</p>
                  <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-900 flex-wrap">
                    <select className="bg-transparent border-none p-0 outline-none appearance-none cursor-pointer">
                      <option>1 Adult</option>
                      <option>2 Adults</option>
                      <option>3 Adults</option>
                      <option>4 Adults</option>
                    </select>
                    <span className="text-gray-300">|</span>
                    <select className="bg-transparent border-none p-0 outline-none appearance-none cursor-pointer">
                      <option>0 Children</option>
                      <option>1 Child</option>
                      <option>2 Children</option>
                    </select>
                    <span className="text-gray-300">|</span>
                    <select className="bg-transparent border-none p-0 outline-none appearance-none cursor-pointer">
                      <option>1 Room</option>
                      <option>2 Rooms</option>
                      <option>3 Rooms</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="flex-shrink-0">
              <button className="bg-[#202A36] text-white hover:bg-[#1a2229] px-8 py-4 md:py-0 h-full font-medium transition-colors w-full md:w-auto text-sm rounded-b-lg md:rounded-r-lg md:rounded-bl-none whitespace-nowrap">
                Check Availability
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
