"use client";

import { useEffect, useState } from "react";

const particleConfig = Array.from({ length: 16 }, (_, i) => ({
  left: `${(i * 11 + 7) % 100}%`,
  top: `${(i * 17 + 3) % 100}%`,
  size: (i % 3 + 1) * 2,
  delay: i * 0.5,
  duration: 18 + (i % 5) * 4,
}));

export default function AnimatedBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-bg-cream via-bg-cream to-bg-green-light" />

      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse at 20% 30%, rgba(26,138,74,0.04) 0%, transparent 60%), radial-gradient(ellipse at 80% 70%, rgba(26,138,74,0.02) 0%, transparent 50%)"
      }} />

      <div
        style={{
          position: "absolute",
          width: "550px", height: "550px",
          top: "-10%", left: "-5%",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(26,138,74,0.05), transparent 70%)",
          animation: "float-slow 18s ease-in-out infinite",
          filter: "blur(80px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "400px", height: "400px",
          bottom: "-5%", right: "-8%",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(26,138,74,0.03), transparent 70%)",
          animation: "float-slow 22s ease-in-out infinite reverse",
          filter: "blur(80px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "300px", height: "300px",
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(196,163,90,0.02), transparent 70%)",
          animation: "float-slow 20s ease-in-out infinite",
          animationDelay: "-6s",
          filter: "blur(80px)",
        }}
      />

      {mounted && particleConfig.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: p.left,
            top: p.top,
            borderRadius: "50%",
            background: i % 2 === 0 ? "var(--primary)" : "var(--accent)",
            opacity: 0.08,
            filter: "blur(1px)",
            animation: `gentle-drift ${p.duration}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
