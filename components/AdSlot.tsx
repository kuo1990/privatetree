"use client";

interface AdSlotProps {
  width: number;
  height: number;
  label?: string;
}

export default function AdSlot({ width, height }: AdSlotProps) {
  const isSmall = height <= 50;
  const isBanner = width >= 600;

  return (
    <div
      className="flex-shrink-0 overflow-hidden relative"
      style={{
        width: `min(${width}px, 100%)`,
        height: `${height}px`,
        background: "linear-gradient(135deg, var(--color-linen) 0%, var(--color-aged) 100%)",
        border: "1px solid var(--color-fog)",
        borderRadius: "6px",
      }}
    >
      {/* 左側色塊裝飾 */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: isSmall ? "4px" : "6px",
          background: "var(--color-gold)",
          opacity: 0.6,
        }}
      />

      <div
        className="flex items-center justify-between h-full"
        style={{ padding: isSmall ? "0 10px 0 14px" : "0 16px 0 20px" }}
      >
        {/* 左側文字 */}
        <div className="flex flex-col justify-center">
          {!isSmall && (
            <div
              className="text-[10px] mb-0.5 tracking-widest"
              style={{ color: "var(--color-gold)", opacity: 0.8, fontFamily: "var(--font-body)" }}
            >
              廣告 AD
            </div>
          )}
          <div
            style={{
              fontFamily: "var(--font-title)",
              color: "var(--color-ink)",
              fontSize: isSmall ? "12px" : isBanner ? "16px" : "14px",
              lineHeight: 1.3,
            }}
          >
            {isBanner ? "支持樹洞，讓更多人找到傾訴的地方" : "廣告合作洽詢"}
          </div>
          {!isSmall && (
            <div
              className="text-[11px] mt-0.5"
              style={{ color: "var(--color-ink-light)", opacity: 0.7 }}
            >
              {isBanner ? "廣告合作請洽站長" : "歡迎刊登"}
            </div>
          )}
        </div>

        {/* 右側 CTA */}
        <div
          className="flex-shrink-0 flex items-center justify-center"
          style={{
            padding: isSmall ? "4px 10px" : "6px 14px",
            background: "var(--color-rust)",
            borderRadius: "3px 8px 3px 8px / 6px 3px 6px 3px",
            opacity: 0.85,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-title)",
              color: "var(--color-cream)",
              fontSize: isSmall ? "10px" : "12px",
              letterSpacing: "0.05em",
              whiteSpace: "nowrap",
            }}
          >
            了解更多
          </span>
        </div>
      </div>
    </div>
  );
}
