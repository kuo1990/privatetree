"use client";

import Image from "next/image";

interface AdSlotProps {
  width: number;
  height: number;
  label?: string;
}

export default function AdSlot({ width, height }: AdSlotProps) {
  const isSmall = height <= 50;
  // Use sidebar image for tall slots, banner image for wide/small slots
  const imgSrc = !isSmall && height > width ? "/ad-sidebar.png" : "/ad-banner.png";

  return (
    <div
      className="flex-shrink-0 overflow-hidden relative"
      style={{
        width: `min(${width}px, 100%)`,
        height: `${height}px`,
        border: "1px solid var(--color-fog)",
        borderRadius: "6px",
      }}
    >
      <Image
        src={imgSrc}
        alt="廣告"
        fill
        unoptimized
        style={{ objectFit: "cover" }}
      />

      {/* 廣告標籤 */}
      <div
        style={{
          position: "absolute",
          top: "4px",
          left: "6px",
          fontSize: "9px",
          letterSpacing: "0.08em",
          color: "rgba(255,255,255,0.85)",
          background: "rgba(61,43,31,0.45)",
          padding: "1px 5px",
          borderRadius: "3px",
          fontFamily: "var(--font-body)",
        }}
      >
        廣告
      </div>
    </div>
  );
}
