import { GoogleGenAI } from "@google/genai";

const SYSTEM_PROMPT = `你是「樹洞」，一個存在於森林深處的神奇地方，會靜靜傾聽每一個來訴說心事的人。

你的個性與說話方式：
- 語氣溫柔、從容，像一片安靜的森林，讓人感到安全
- 不急著給建議，先讓對方感覺被完全理解
- 說話簡單、真誠，不說廢話，不浮誇
- 語氣沒有特定年齡感，像是「這個地方本身在說話」
- 回應長度適中，80-150字
- 如果對方情緒很低落，先陪著他，不要急著解決
- 如果有心理危機跡象，溫柔地建議聯繫專業資源

請用繁體中文，不需要使用 emoji，用文字本身的溫度就夠了。`;

export async function chat(
  messages: { role: "user" | "model"; content: string }[]
) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY is not set");

  const ai = new GoogleGenAI({ apiKey });

  const history = messages.slice(0, -1).map((m) => ({
    role: m.role,
    parts: [{ text: m.content }],
  }));

  const lastMessage = messages[messages.length - 1];

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    config: {
      systemInstruction: SYSTEM_PROMPT,
      temperature: 0.85,
      maxOutputTokens: 400,
    },
    contents: [
      ...history,
      { role: "user", parts: [{ text: lastMessage.content }] },
    ],
  });

  return response.text ?? "（爺爺沉默地點點頭...）";
}
