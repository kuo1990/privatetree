"use client";

import { useState, useRef, useEffect } from "react";
import type { Locale } from "@/lib/i18n";

interface MessageInputProps {
  onSend: (text: string) => void;
  disabled?: boolean;
  locale?: Locale;
}

export default function MessageInput({ onSend, disabled, locale = "zh" }: MessageInputProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 160) + "px";
  }, [value]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  function handleSend() {
    const text = value.trim();
    if (!text || disabled) return;
    onSend(text);
    setValue("");
  }

  const hasText = !!value.trim() && !disabled;

  return (
    <div
      className="flex items-end gap-3 px-4 py-3"
      style={{
        background: "var(--color-cream)",
        border: "1.5px solid var(--color-fog)",
        borderRadius: "4px 14px 4px 14px / 12px 4px 12px 4px",
        boxShadow: "3px 3px 0 rgba(61,43,31,0.08)",
      }}
    >
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        rows={1}
        placeholder={locale === "en" ? "Share what's on your mind..." : "有什麼想說的，慢慢說..."}
        className="flex-1 resize-none bg-transparent text-sm outline-none leading-relaxed"
        style={{
          color: "var(--color-ink)",
          fontFamily: "var(--font-body)",
          minHeight: "24px",
          maxHeight: "160px",
        }}
      />

      <button
        onClick={handleSend}
        disabled={!hasText}
        className="flex-shrink-0 px-3 py-1.5 text-sm transition-all duration-150 hover:scale-105 active:scale-95 disabled:opacity-35 disabled:cursor-not-allowed disabled:hover:scale-100"
        style={{
          fontFamily: "var(--font-title)",
          background: hasText ? "var(--color-rust)" : "var(--color-fog)",
          color: hasText ? "#FEF6E4" : "var(--color-ink-light)",
          borderRadius: "2px 8px 2px 6px / 6px 2px 6px 2px",
          boxShadow: hasText ? "2px 2px 0 rgba(61,43,31,0.2)" : "none",
          border: "1px solid rgba(61,43,31,0.12)",
          letterSpacing: "0.05em",
        }}
        aria-label={locale === "en" ? "Send" : "送出"}
      >
        {locale === "en" ? "Send" : "說吧"}
      </button>
    </div>
  );
}
