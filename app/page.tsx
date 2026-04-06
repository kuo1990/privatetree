"use client";

import Link from "next/link";
import Image from "next/image";
import AdSlot from "@/components/AdSlot";
import { useLocale, translations } from "@/lib/i18n";

export default function Home() {
  const locale = useLocale();
  const t = translations[locale].home;

  return (
    <div className="flex flex-col min-h-screen">

      {/* 全版首頁 */}
      <main className="relative flex-1 flex flex-col items-center justify-end min-h-screen overflow-hidden">

        {/* 背景圖 */}
        <Image
          src="/grandpa.png"
          alt=""
          fill
          style={{ objectFit: "cover", objectPosition: "center top" }}
          priority
        />

        {/* 漸層遮罩 — 上方透明，下方漸漸不透明讓文字浮現 */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(
              to bottom,
              rgba(254,246,228,0.05) 0%,
              rgba(254,246,228,0.0)  35%,
              rgba(254,246,228,0.7)  62%,
              rgba(254,246,228,0.96) 80%,
              rgba(254,246,228,1.0)  100%
            )`,
            pointerEvents: "none",
          }}
        />

        {/* 角落裝飾 — 小螢幕隱藏 */}
        <CornerDeco position="top-left" />
        <CornerDeco position="top-right" />

        {/* 文字內容區 — 沉在下半部 */}
        <div className="relative z-10 w-full flex flex-col items-center text-center px-6 pb-14">

          {/* 書名框 */}
          <div className="animate-fade-in-up mb-3" style={{ animationDelay: "0.1s" }}>
            <div
              className="inline-block px-5 py-1 text-xs tracking-widest"
              style={{
                color: "var(--color-gold)",
                border: "1px solid var(--color-gold)",
                borderRadius: "1px 4px 2px 3px / 3px 1px 4px 2px",
                opacity: 0.85,
              }}
            >
              {t.tagline}
            </div>
          </div>

          {/* 標題 */}
          <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <h1
              className="text-5xl md:text-7xl mb-2 leading-tight"
              style={{ fontFamily: "var(--font-title)", color: "var(--color-ink)" }}
            >
              {t.title}
            </h1>
            <p
              className="text-base md:text-xl mb-1"
              style={{ color: "var(--color-ink-light)" }}
            >
              {t.subtitle}
            </p>
            <p className="text-sm" style={{ color: "var(--color-gold)", opacity: 0.9 }}>
              {t.desc}
            </p>
          </div>

          {/* CTA */}
          <div className="animate-fade-in-up mt-7" style={{ animationDelay: "0.35s" }}>
            <Link
              href="/chat"
              className="inline-block px-10 py-4 text-lg transition-all duration-200 hover:scale-105 active:scale-95"
              style={{
                fontFamily: "var(--font-title)",
                color: "var(--color-cream)",
                background: "var(--color-rust)",
                borderRadius: "3px 12px 4px 10px / 8px 3px 10px 4px",
                boxShadow: "4px 4px 0 rgba(61,43,31,0.25), -1px -1px 0 rgba(61,43,31,0.1)",
                letterSpacing: "0.05em",
              }}
            >
              {t.cta}
            </Link>
          </div>

          <p
            className="animate-fade-in-up mt-4 text-xs"
            style={{ animationDelay: "0.5s", color: "var(--color-fog)" }}
          >
            {t.hint}
          </p>
        </div>
      </main>

      {/* 廣告 — 行動版 320×50，桌面版 728×90 */}
      <div
        className="w-full flex justify-center py-3 px-4"
        style={{ background: "var(--color-aged)", borderTop: "1px dashed var(--color-fog)" }}
      >
        <div className="block md:hidden w-full flex justify-center">
          <AdSlot width={320} height={50} />
        </div>
        <div className="hidden md:block">
          <AdSlot width={728} height={90} />
        </div>
      </div>

      <footer
        className="text-center text-xs py-3"
        style={{ color: "var(--color-fog)", background: "var(--color-aged)" }}
      >
        樹洞 · {new Date().getFullYear()}
      </footer>
    </div>
  );
}

function CornerDeco({ position }: { position: "top-left" | "top-right" }) {
  const map: Record<string, React.CSSProperties> = {
    "top-left":  { top: 20, left: 20 },
    "top-right": { top: 20, right: 20, transform: "scaleX(-1)" },
  };

  return (
    <svg
      width="60" height="60" viewBox="0 0 60 60" fill="none"
      className="hidden sm:block"
      style={{ position: "absolute", opacity: 0.3, pointerEvents: "none", zIndex: 10, ...map[position] }}
    >
      <path d="M5 55 L5 10 Q5 5 10 5 L55 5" stroke="#8B6240" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M5 45 Q18 32 30 20" stroke="#8B6240" strokeWidth="1" strokeLinecap="round" fill="none" strokeDasharray="2,4" />
      <circle cx="10" cy="10" r="2.5" fill="#C17F24" />
      <path d="M20 5 Q22 2 25 5 Q22 8 20 5Z" fill="#9CB87A" />
      <path d="M38 5 Q41 1 44 5 Q41 9 38 5Z" fill="#9CB87A" opacity="0.7" />
    </svg>
  );
}
