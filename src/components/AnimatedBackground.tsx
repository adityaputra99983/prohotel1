"use client";

import { useEffect, useState } from "react";

interface LuxuryElement {
  type: "leaf" | "circle" | "dot" | "gold-dust" | "light-ray";
  color: string;
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
  spinDuration?: number;
  opacity: number;
  blur: number;
  rotation?: number;
  scale?: number;
  lift?: number;
}

const luxuryElements = [
  { type: "leaf", color: "var(--primary)", count: 6 },
  { type: "circle", color: "var(--accent)", count: 4 },
  { type: "dot", color: "var(--primary-light)", count: 8 },
  { type: "gold-dust", color: "var(--luxury-gold)", count: 15 },
  { type: "light-ray", color: "var(--luxury-gold-light)", count: 3 }
] as const;

export default function AnimatedBackground({ className }: { className?: string }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Generate luxury elements with randomized properties
  const elements: LuxuryElement[] = [];
  luxuryElements.forEach(({ type, color, count }) => {
    for (let i = 0; i < count; i++) {
      const baseSize = type === "gold-dust" ? Math.random() * 3 + 1 : 
                      type === "light-ray" ? Math.random() * 100 + 50 : 
                      Math.random() * 20 + 10;
      
      elements.push({
        type,
        color,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: baseSize,
        duration: Math.random() * 25 + 15,
        delay: Math.random() * 8,
        spinDuration: Math.random() * 8 + 4,
        opacity: Math.random() * 0.4 + (type === "gold-dust" ? 0.3 : 0.1),
        blur: Math.random() * 2 + (type === "light-ray" ? 8 : 1),
        rotation: Math.random() * 360,
        scale: Math.random() * 0.5 + 0.5,
        lift: Math.random() * 20 + 10
      });
    }
  });

  return (
    <div className={`fixed inset-0 z-0 pointer-events-none overflow-hidden ${className ?? ""}`} style={{ willChange: "transform", transform: "translateZ(0)" }}>
      {/* Deep background with luxury gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-bg-cream via-misty-white to-bg-green-light" />
        <div className="absolute inset-0" style={{
          background: `
            radial-gradient(ellipse at 20% 30%, rgba(45, 90, 39, 0.08) 0%, transparent 40%),
            radial-gradient(ellipse at 80% 70%, rgba(139, 105, 20, 0.05) 0%, transparent 40%),
            radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.03) 0%, transparent 50%)
          `
        }} />
      </div>

      {/* Floating luxury elements */}
      <div className="absolute inset-0">
        {mounted && elements.map((el, i) => {
          const baseStyle = {
            position: "absolute",
            width: `${el.size}px`,
            height: `${el.size}px`,
            left: `${el.left}%`,
            top: `${el.top}%`,
            opacity: el.opacity,
            filter: `blur(${el.blur}px)`,
            willChange: "transform, opacity" as const,
          } as React.CSSProperties;

          let style: React.CSSProperties = { ...baseStyle };

          // Different behaviors based on type
          if (el.type === "leaf") {
            style = {
              ...style,
              background: el.color,
              borderRadius: "40% 60% 60% 40% / 50% 40% 60% 50%",
              transform: `rotate(${el.rotation}deg) translateZ(${el.lift}px)`,
              animation: `
                luxury-float ${el.duration}s ease-in-out infinite,
                spin ${el.spinDuration}s linear infinite,
                gentle-drift ${el.duration * 1.5}s ease-in-out infinite
              `,
              animationDelay: `${el.delay}s`
            };
          } else if (el.type === "circle") {
            style = {
              ...style,
              background: el.color,
              borderRadius: "50%",
              transform: `translateZ(${el.lift}px)`,
              animation: `
                luxury-float ${el.duration}s ease-in-out infinite,
                spin ${el.spinDuration}s linear infinite,
                luxury-pulse ${el.duration * 0.8}s ease-in-out infinite
              `,
              animationDelay: `${el.delay}s`
            };
          } else if (el.type === "dot") {
            style = {
              ...style,
              background: el.color,
              borderRadius: "50%",
              transform: `translateZ(${el.lift}px)`,
              animation: `
                luxury-float ${el.duration}s ease-in-out infinite,
                spin ${el.spinDuration}s linear infinite
              `,
              animationDelay: `${el.delay}s`
            };
          } else if (el.type === "gold-dust") {
            style = {
              ...style,
              background: el.color,
              borderRadius: "50%",
              transform: `translateZ(${el.lift}px)`,
              animation: `
                luxury-float ${el.duration}s ease-in-out infinite,
                luxury-shine 3s linear infinite,
                luxury-pulse ${el.duration * 0.6}s ease-in-out infinite
              `,
              animationDelay: `${el.delay}s`
            };
          } else if (el.type === "light-ray") {
            style = {
              ...style,
              width: `${el.size}px`,
              height: `${el.size * 0.1}px`,
              background: `linear-gradient(90deg, transparent, ${el.color}, transparent)`,
              borderRadius: "50%",
              transform: `rotate(${el.rotation}deg) translateZ(${el.lift}px)`,
              animation: `
                luxury-float ${el.duration}s ease-in-out infinite,
                rotate ${el.spinDuration}s linear infinite
              `,
              animationDelay: `${el.delay}s`
            };
          }

          return <div key={i} style={style} />;
        })}
      </div>

      {/* Subtle animated light particles */}
      <div className="absolute inset-0">
        {mounted && Array.from({ length: 30 }).map((_, i) => {
          const size = Math.random() * 2 + 0.5;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                width: `${size}px`,
                height: `${size}px`,
                left: Math.random() * 100 + "%",
                top: Math.random() * 100 + "%",
                background: i % 3 === 0 ? "var(--luxury-gold)" : i % 3 === 1 ? "var(--luxury-gold-light)" : "var(--primary-light)",
                opacity: Math.random() * 0.3 + 0.1,
                filter: "blur(0.5px)",
                willChange: "transform, opacity" as const,
                animation: `
                  luxury-float ${Math.random() * 20 + 10}s ease-in-out infinite,
                  luxury-pulse ${Math.random() * 4 + 2}s ease-in-out infinite
                `,
                animationDelay: `${Math.random() * 8}s`
              }}
            />
          );
        })}
      </div>

      {/* Moving background waves with luxury touch */}
      <div className="absolute inset-0" style={{
        pointerEvents: "none"
      }}>
        <div
          style={{
            position: "absolute",
            width: "200vw",
            height: "200vh",
            top: "-50%",
            left: "-50%",
            background: `
              radial-gradient(circle at 20% 30%, rgba(45, 90, 39, 0.03) 0%, transparent 20%),
              radial-gradient(circle at 80% 70%, rgba(139, 105, 20, 0.02) 0%, transparent 20%)
            `,
            animation: "move-wave 40s ease-in-out infinite",
            willChange: "transform"
          }}
        />
      </div>
    </div>
  );
}
