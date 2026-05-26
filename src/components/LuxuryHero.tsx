"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = ["Home", "Experience", "Rooms", "Facilities", "Reviews", "Contact"];

export default function LuxuryHero() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black">
      <section className="relative h-screen overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_091828_e240eb17-6edc-4129-ad9d-98678e3fd238.mp4"
            type="video/mp4"
          />
        </video>

        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />

        <nav className="relative z-20 max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-semibold text-white">
              AuroraStay
            </span>

            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-white/90 hover:text-white transition-colors text-sm font-medium"
                >
                  {link}
                </a>
              ))}
            </div>

            <button
              className="md:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden mt-4 bg-black/40 backdrop-blur-xl rounded-2xl shadow-xl p-6">
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="text-white/90 hover:text-white transition-colors text-sm font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          )}
        </nav>

        <div className="relative z-10 h-full flex flex-col">
          <div className="flex-1 flex items-center justify-center text-center px-6 -mt-72">
            <div>
              <p className="text-sm font-semibold text-white/70 tracking-[0.3em] mb-4 uppercase">
                Luxury Hotel Experience
              </p>

              <h1 className="text-6xl md:text-7xl lg:text-8xl font-normal text-white/70 leading-none tracking-tighter">
                Stay.
              </h1>

              <h1 className="text-6xl md:text-7xl lg:text-8xl font-normal text-white leading-none tracking-tighter -mt-3">
                Extraordinary.
              </h1>

              <p className="text-lg md:text-xl text-white/80 mb-6 max-w-2xl mx-auto mt-6">
                Experience comfort, elegance, and seamless hospitality in one place.
              </p>

              <div className="flex gap-4 justify-center">
                <button className="px-5 py-2.5 rounded-full bg-white/20 backdrop-blur-md text-white font-medium hover:bg-white/30 transition-colors">
                  Explore Rooms
                </button>
                <button className="px-5 py-2.5 rounded-full text-white bg-[#202A36] hover:bg-[#1a2229] transition-colors">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
