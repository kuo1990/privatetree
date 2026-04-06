"use client";

interface AdSlotProps {
  width: number;
  height: number;
  label?: string;
}

export default function AdSlot({ width, height, label = "廣告" }: AdSlotProps) {
  return (
    <div
      className="flex items-center justify-center rounded-xl overflow-hidden flex-shrink-0"
      style={{
        width: `min(${width}px, 100%)`,
        height: `${height}px`,
        background: "var(--color-fog)",
        border: "1px dashed var(--color-amber)",
        opacity: 0.7,
      }}
    >
      <span className="text-xs" style={{ color: "var(--color-bark)" }}>
        {label}
      </span>
    </div>
  );
}
