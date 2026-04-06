import { NextRequest } from "next/server";
import { chat } from "@/lib/gemini";

// ── Rate Limiter ────────────────────────────────────────────────
// In-memory，每個 IP 每分鐘最多 15 次請求
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

// 每 5 分鐘清理過期記錄，防記憶體無限增長
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of rateLimitMap) {
    if (record.resetAt < now) rateLimitMap.delete(ip);
  }
}, 5 * 60 * 1000);

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || record.resetAt < now) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60_000 });
    return false;
  }

  if (record.count >= 15) return true;

  record.count++;
  return false;
}

// ── Input Validation ────────────────────────────────────────────
const VALID_ROLES = new Set(["user", "model"]);
const MAX_MESSAGES = 20;
const MAX_CONTENT_LENGTH = 2000;

function validateMessages(
  messages: unknown
): messages is { role: "user" | "model"; content: string }[] {
  if (!Array.isArray(messages)) return false;
  if (messages.length === 0 || messages.length > MAX_MESSAGES) return false;

  return messages.every(
    (m) =>
      m !== null &&
      typeof m === "object" &&
      VALID_ROLES.has((m as { role: string }).role) &&
      typeof (m as { content: string }).content === "string" &&
      (m as { content: string }).content.length > 0 &&
      (m as { content: string }).content.length <= MAX_CONTENT_LENGTH
  );
}

// ── Handler ─────────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  // Rate limiting
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (isRateLimited(ip)) {
    return Response.json(
      { error: "請稍後再試" },
      {
        status: 429,
        headers: { "Retry-After": "60" },
      }
    );
  }

  try {
    const body = await request.json();

    // 輸入驗證
    if (!validateMessages(body.messages)) {
      return Response.json({ error: "無效的請求格式" }, { status: 400 });
    }

    const reply = await chat(body.messages);
    return Response.json({ reply });
  } catch {
    // 只 log 錯誤類型，不 log 任何訊息內容
    console.error("[chat] API error");
    return Response.json({ error: "樹洞暫時沉默了，請稍後再說。" }, { status: 500 });
  }
}
