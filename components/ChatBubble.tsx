interface ChatBubbleProps {
  role: "user" | "model";
  content: string;
}

export default function ChatBubble({ role, content }: ChatBubbleProps) {
  const isUser = role === "user";

  return (
    <div className={`flex gap-3 items-end animate-slide-in ${isUser ? "flex-row-reverse" : "flex-row"}`}>

      {/* 頭像 */}
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
        {isUser ? "你" : "洞"}
      </div>

      {/* 氣泡 */}
      <div className="flex flex-col gap-1 max-w-[76%]">
        <span
          className="text-[11px] px-1"
          style={{
            color: "var(--color-gold)",
            fontFamily: "var(--font-title)",
            textAlign: isUser ? "right" : "left",
          }}
        >
          {isUser ? "你" : "樹洞"}
        </span>

        <div
          className="px-4 py-3 text-sm leading-relaxed"
          style={
            isUser
              ? {
                  background: "var(--color-rust)",
                  color: "#FEF6E4",
                  borderRadius: "16px 4px 16px 16px",
                  boxShadow: "3px 3px 0 rgba(61,43,31,0.15), -1px -1px 0 rgba(61,43,31,0.06)",
                  border: "1.5px solid rgba(61,43,31,0.15)",
                }
              : {
                  background: "var(--color-cream)",
                  color: "var(--color-ink)",
                  borderRadius: "4px 16px 16px 16px",
                  boxShadow: "3px 3px 0 rgba(61,43,31,0.1), -1px -1px 0 rgba(61,43,31,0.04)",
                  border: "1.5px solid var(--color-fog)",
                }
          }
        >
          <p className="whitespace-pre-wrap break-words">{content}</p>
        </div>
      </div>
    </div>
  );
}
