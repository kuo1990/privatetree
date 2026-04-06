"use client";

import { useState, useEffect } from "react";

export type Locale = "zh" | "en";

export function detectLocale(): Locale {
  if (typeof navigator === "undefined") return "zh";
  return navigator.language.toLowerCase().startsWith("zh") ? "zh" : "en";
}

export function useLocale(): Locale {
  const [locale, setLocale] = useState<Locale>("zh");
  useEffect(() => {
    setLocale(detectLocale());
  }, []);
  return locale;
}

export const translations = {
  zh: {
    home: {
      tagline: "一個傾聽的地方",
      title: "樹洞",
      subtitle: "說說心裡的話，樹洞會靜靜聆聽",
      desc: "不評斷 · 不說教 · 只是陪著你",
      cta: "走進樹洞 →",
      hint: "這裡很安靜，說多久都沒關係",
    },
    chat: {
      leave: "← 離開",
      name: "樹洞",
      listening: "正在傾聽",
      welcome:
        "你來了。\n\n這裡很安靜，沒有人會評斷你，也不會有人催你。\n\n想說什麼，就慢慢說吧。",
      placeholder: "有什麼想說的，慢慢說...",
      send: "說吧",
      hint: "Enter 送出 · Shift+Enter 換行",
      privacy: "對話僅在你的裝置暫存，離開即消失，伺服器不留記錄",
      userAvatar: "你",
      hollowAvatar: "洞",
      userLabel: "你",
      hollowLabel: "樹洞",
      fallback: "（樹洞靜靜地聽著...）",
      error: "樹洞暫時安靜了，稍後再說說吧。",
    },
  },
  en: {
    home: {
      tagline: "A place to be heard",
      title: "Tree Hollow",
      subtitle: "Share what's on your mind. The hollow listens.",
      desc: "No judgment · No lectures · Just here with you",
      cta: "Enter the Hollow →",
      hint: "It's quiet here. Take all the time you need.",
    },
    chat: {
      leave: "← Leave",
      name: "Tree Hollow",
      listening: "Listening",
      welcome:
        "You're here.\n\nIt's quiet here. No one will judge you, and no one will rush you.\n\nTake your time.",
      placeholder: "Share what's on your mind...",
      send: "Send",
      hint: "Enter to send · Shift+Enter for new line",
      privacy:
        "Conversation is stored only on your device and disappears when you leave. No server records.",
      userAvatar: "U",
      hollowAvatar: "洞",
      userLabel: "You",
      hollowLabel: "Tree Hollow",
      fallback: "(The hollow listens quietly...)",
      error: "The hollow went quiet for a moment. Try again soon.",
    },
  },
} as const;
