/**
 * 一次性執行：生成樹洞爺爺水彩插圖
 *
 * 用法：
 *   node scripts/generate-illustration.mjs
 *
 * 需要環境變數 GEMINI_API_KEY（會自動從 .env.local 讀取）
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

// 手動讀取 .env.local（不需要額外套件）
const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, "../.env.local");

if (existsSync(envPath)) {
  const envContent = readFileSync(envPath, "utf-8");
  for (const line of envContent.split("\n")) {
    const [key, ...vals] = line.split("=");
    if (key && vals.length) {
      process.env[key.trim()] = vals.join("=").trim();
    }
  }
}

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey || apiKey === "your_gemini_api_key_here") {
  console.error("❌ 請先在 .env.local 填入有效的 GEMINI_API_KEY");
  process.exit(1);
}

const { GoogleGenAI } = await import("@google/genai");
const ai = new GoogleGenAI({ apiKey });

const PROMPT = `
Studio Ghibli style illustration: a magical hollow inside an ancient forest tree at twilight.
The tree hollow is warm and glowing softly from within — golden amber light spilling out gently.
Small woodland creatures gather nearby: a sleepy owl perched above the hollow,
a tiny fox curled at the roots, a rabbit peeking from behind a mushroom.
Fireflies float in the misty air. Leaves gently sway and drift.
Moss-covered roots wind across the forest floor. Dewdrops catch the light.

The mood is: dreamy, tender, safe — like a childhood memory or a gentle dream.
As if the forest itself is breathing slowly, and everything is quietly listening.

Color palette: warm amber glow, soft moss green, deep forest shadow with golden highlights,
misty lavender-cream in the background. Rich but soft — never harsh.
The overall tone is warm and healing, like exhaling after a long day.

Style: Studio Ghibli hand-painted animation background style —
detailed painterly texture, soft edges, luminous atmospheric depth,
reminiscent of scenes from "My Neighbor Totoro" or "Princess Mononoke" forest sequences.
NOT photorealistic. NOT vector. NOT cartoon outlines.
Painterly, lush, magical realism. No text. No border. No characters.
`.trim();

console.log("正在生成插圖，請稍候（約 15-30 秒）...");

try {
  const response = await ai.models.generateImages({
    model: "imagen-4.0-generate-001",
    prompt: PROMPT,
    config: {
      numberOfImages: 1,
      aspectRatio: "1:1",
      personGeneration: "allow_adult",
    },
  });

  const imageBytes = response?.generatedImages?.[0]?.image?.imageBytes;
  if (!imageBytes) {
    console.error("❌ 未收到圖片資料，回應：", JSON.stringify(response, null, 2));
    process.exit(1);
  }

  const outputPath = resolve(__dirname, "../public/grandpa.png");
  writeFileSync(outputPath, Buffer.from(imageBytes, "base64"));
  console.log(`✅ 插圖已儲存到 public/grandpa.png`);
  console.log(`   可以重新執行這個腳本來重新生成不同的版本。`);
} catch (err) {
  console.error("❌ 生成失敗：", err.message ?? err);
  process.exit(1);
}
