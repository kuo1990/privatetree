"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import ChatBubble from "@/components/ChatBubble";
import MessageInput from "@/components/MessageInput";
import LoadingDots from "@/components/LoadingDots";
import AdSlot from "@/components/AdSlot";

interface Message {
  role: "user" | "model";
  content: string;
}

const WELCOME_MESSAGE: Message = {
  role: "model",
  content:
    "你來了。\n\n這裡很安靜，沒有人會評斷你，也不會有人催你。\n\n想說什麼，就慢慢說吧。",
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function handleSend(text: string) {
    const userMsg: Message = { role: "user", content: text };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updated }),
      });
      const data = await res.json();
      setMessages([...updated, { role: "model", content: data.reply ?? "（樹洞靜靜地聽著...）" }]);
    } catch {
      setMessages([
        ...updated,
        { role: "model", content: "樹洞暫時安靜了，稍後再說說吧。" },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col h-screen max-h-screen overflow-hidden">

      {/* Header */}
      <header
        className="flex items-center justify-between px-5 py-3 flex-shrink-0"
        style={{
          background: "var(--color-aged)",
          borderBottom: "2px dashed var(--color-fog)",
        }}
      >
        <Link
          href="/"
          className="text-sm transition-opacity hover:opacity-60"
          style={{ color: "var(--color-ink-light)" }}
        >
          ← 離開
        </Link>

        <div className="flex flex-col items-center">
          <span
            className="text-base leading-tight"
            style={{ fontFamily: "var(--font-title)", color: "var(--color-ink)" }}
          >
            樹洞
          </span>
          <span className="text-[10px]" style={{ color: "var(--color-gold)" }}>
            正在傾聽
          </span>
        </div>

        <div className="hidden md:block">
          <AdSlot width={100} height={28} label="廣告" />
        </div>
        <div className="md:hidden w-14" />
      </header>

      {/* 聊天主體 */}
      <div className="flex flex-1 overflow-hidden">
        <main
          className="flex-1 overflow-y-auto px-4 py-6 flex flex-col gap-5"
          style={{ background: "var(--color-paper)" }}
        >
          {messages.map((msg, i) => (
            <ChatBubble key={i} role={msg.role} content={msg.content} />
          ))}

          {loading && (
            <div className="flex gap-3 items-end animate-slide-in">
              <HollowAvatar />
              <div
                className="px-4 py-3"
                style={{
                  background: "var(--color-cream)",
                  border: "1.5px solid var(--color-fog)",
                  borderRadius: "12px 20px 20px 4px",
                  boxShadow: "2px 2px 0 rgba(61,43,31,0.07)",
                }}
              >
                <LoadingDots />
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </main>

        {/* 桌面側欄廣告 */}
        <aside
          className="hidden lg:flex flex-col items-center justify-center gap-4 w-[160px] flex-shrink-0 p-4"
          style={{
            borderLeft: "1.5px dashed var(--color-fog)",
            background: "var(--color-aged)",
          }}
        >
          <AdSlot width={140} height={240} label="側邊廣告" />
        </aside>
      </div>

      {/* 輸入區 */}
      <div
        className="flex-shrink-0 px-4 pt-3"
        style={{
          background: "var(--color-aged)",
          borderTop: "2px dashed var(--color-fog)",
          paddingBottom: "max(12px, env(safe-area-inset-bottom))",
        }}
      >
        <div className="flex justify-center mb-2 lg:hidden">
          <AdSlot width={300} height={50} label="底部廣告" />
        </div>

        <div className="max-w-2xl mx-auto">
          <MessageInput onSend={handleSend} disabled={loading} />
          <p
            className="text-center text-[11px] mt-1.5"
            style={{ color: "var(--color-fog)" }}
          >
            Enter 送出 · Shift+Enter 換行
          </p>
        </div>
      </div>
    </div>
  );
}

function HollowAvatar() {
  return (
    <div
      className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
      style={{
        background: "var(--color-aged)",
        border: "1.5px solid var(--color-fog)",
        boxShadow: "1px 1px 0 rgba(61,43,31,0.1)",
        fontFamily: "var(--font-title)",
        fontSize: "14px",
        color: "var(--color-ink)",
      }}
    >
      洞
    </div>
  );
}
