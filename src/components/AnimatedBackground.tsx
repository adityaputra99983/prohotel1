"use client";

import { useEffect, useState } from "react";

interface NatureElement {
  type: "leaf" | "circle" | "dot";
  color: string;
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
  spinDuration: number;
  opacity: number;
  blur: number;
}

const natureElements = [
  { type: "leaf", color: "var(--primary)", count: 8 },
  { type: "circle", color: "var(--accent)", count: 6 },
  { type: "dot", color: "var(--primary-light)", count: 12 }
] as const;

export default function AnimatedBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Generate nature elements with randomized properties
  const elements: NatureElement[] = [];
  natureElements.forEach(({ type, color, count }) => {
    for (let i = 0; i < count; i++) {
      elements.push({
        type,
        color,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 20 + 10,
        duration: Math.random() * 20 + 15,
        delay: Math.random() * 5,
        spinDuration: Math.random() * 10 + 5,
        opacity: Math.random() * 0.3 + 0.1,
        blur: Math.random() * 3 + 1
      });
    }
  });

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" style={{ willChange: "transform", transform: "translateZ(0)" }}>
      {/* Base gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-bg-cream via-bg-cream to-bg-green-light" />
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse at 20% 40%, rgba(26,138,74,0.03) 0%, transparent 50%), radial-gradient(ellipse at 80% 60%, rgba(196,163,90,0.02) 0%, transparent 50%)"
        }} />
      </div>

      {/* Floating nature elements */}
      <div className="absolute inset-0">
        {mounted && elements.map((el, i) => {
          const style = {
            position: "absolute",
            width: `${el.size}px`,
            height: `${el.size}px`,
            left: `${el.left}%`,
            top: `${el.top}%`,
            background: el.color,
            opacity: el.opacity,
            filter: `blur(${el.blur}px)`,
            willChange: "transform, opacity" as const,
            animation: `
              float-slow ${el.duration}s ease-in-out infinite,
              spin ${el.spinDuration}s linear infinite
            `,
            animationDelay: `${el.delay}s`
          } as React.CSSProperties;

          // Different shapes based on type
          if (el.type === "leaf") {
            style.borderRadius = "40% 60% 60% 40% / 50% 40% 60% 50%";
            style.transform = "rotate(45deg)";
          } else if (el.type === "circle") {
            style.borderRadius = "50%";
          } else if (el.type === "dot") {
            style.borderRadius = "50%";
            style.background = "radial-gradient(circle, var(--primary-light) 0%, transparent 70%)";
          }

          return <div key={i} style={style} />;
        })}
      </div>

      {/* Subtle animated light particles */}
      <div className="absolute inset-0">
        {mounted && Array.from({ length: 20 }).map((_, i) => {
          const size = Math.random() * 3 + 1;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                width: `${size}px`,
                height: `${size}px`,
                left: Math.random() * 100 + "%",
                top: Math.random() * 100 + "%",
                background: i % 3 === 0 ? "var(--primary)" : i % 3 === 1 ? "var(--accent)" : "var(--sky)",
                opacity: Math.random() * 0.4 + 0.1,
                filter: "blur(1px)",
                willChange: "transform, opacity" as const,
                animation: `
                  gentle-drift ${Math.random() * 15 + 10}s ease-in-out infinite,
                  pulse ${Math.random() * 4 + 2}s ease-in-out infinite
                `,
                animationDelay: `${Math.random() * 5}s`
              } as React.CSSProperties}
            />
          );
        })}
      </div>

      {/* Moving background waves */}
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
              radial-gradient(circle at 20% 30%, rgba(26,138,74,0.02) 0%, transparent 20%),
              radial-gradient(circle at 80% 70%, rgba(196,163,90,0.015) 0%, transparent 20%)
            `,
            animation: "move-wave 30s ease-in-out infinite",
            willChange: "transform" as const
          } as React.CSSProperties}
        />
      </div>
    </div>
  );
}
