"use client";

import { useState } from "react";
import { getFacilityInfo } from "@/data/facilityImages";

interface FacilityFlipCardProps {
  name: string;
  index: number;
}

export default function FacilityFlipCard({ name, index }: FacilityFlipCardProps) {
  const [flipped, setFlipped] = useState(false);
  const info = getFacilityInfo(name);

  return (
    <div
      className="flip-card-sm cursor-pointer"
      onClick={() => setFlipped(!flipped)}
      style={{
        perspective: "600px",
        height: "100%",
        opacity: 0,
        animation: `fade-in-up 0.5s ease-out ${index * 60}ms forwards`,
      }}
    >
      <div
        className="flip-card-sm-inner"
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "none",
        }}
      >
        {/* FRONT — image */}
        <div
          className="flip-card-sm-front"
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            borderRadius: "0.75rem",
            overflow: "hidden",
          }}
        >
          <div className="relative w-full h-full overflow-hidden group">
            <img
              src={info.image}
              alt={info.name}
              loading="lazy"
              className="w-full h-full object-cover transition-all duration-700"
              style={{
                animation: "ken-burns 20s ease-in-out infinite alternate",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-2.5">
              <p className="text-white text-[11px] font-semibold leading-tight drop-shadow-lg">
                {info.name}
              </p>
            </div>
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          </div>
        </div>

        {/* BACK — description */}
        <div
          className="flip-card-sm-back"
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            borderRadius: "0.75rem",
            overflow: "hidden",
            transform: "rotateY(180deg)",
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(0, 0, 0, 0.05)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "0.75rem",
          }}
        >
          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mb-2">
            <span className="text-xs">✨</span>
          </div>
          <p className="text-foreground/80 text-[10px] leading-relaxed text-center font-medium">
            {info.desc}
          </p>
          <span className="text-primary/40 text-[9px] mt-2 font-semibold uppercase tracking-wider">Info</span>
        </div>

      </div>
    </div>
  );
}
