/**
 * 生成廣告佔位圖片（側欄 + 橫幅）
 *
 * 用法：
 *   node scripts/generate-ads.mjs
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

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

const SIDEBAR_PROMPT = `
A warm, hand-painted advertisement poster in Studio Ghibli style.
The poster shows a cozy forest scene with soft golden light filtering through leaves.
In the center, elegant Chinese calligraphy-style text area (leave space for text overlay).
Small decorative elements: acorns, maple leaves, tiny mushrooms along the border.
A tiny woodland creature (fox or owl) peeks from the corner with a friendly expression.

Color palette: warm amber, soft parchment cream, muted forest green, gentle gold accents.
The overall feel: warm, trustworthy, handcrafted, like an artisan shop advertisement.
Painterly texture, soft watercolor washes. Vertical composition.
No actual text rendered. Decorative border with organic curved lines.
Style: Studio Ghibli background art, warm illustration, advertisement poster feel.
`.trim();

const BANNER_PROMPT = `
A warm horizontal advertisement banner in watercolor illustration style.
Left side: a cozy glowing tree hollow with soft amber light, small woodland animals nearby.
Right side: warm parchment-colored space for text (leave empty, no text).
Decorative elements along the border: leaves, vines, tiny stars.

Color palette: warm amber glow on left, cream-parchment on right, muted forest greens.
The transition between the illustration and text area is soft and organic.
Horizontal composition, wide banner format.
Painterly watercolor style, warm and welcoming. No text. No harsh lines.
`.trim();

async function generate(prompt, aspectRatio, outputFile) {
  console.log(`正在生成 ${outputFile}...`);
  const response = await ai.models.generateImages({
    model: "imagen-4.0-generate-001",
    prompt,
    config: {
      numberOfImages: 1,
      aspectRatio,
      personGeneration: "dont_allow",
    },
  });

  const imageBytes = response?.generatedImages?.[0]?.image?.imageBytes;
  if (!imageBytes) {
    console.error(`❌ 未收到圖片資料`);
    return false;
  }

  const outputPath = resolve(__dirname, `../public/${outputFile}`);
  writeFileSync(outputPath, Buffer.from(imageBytes, "base64"));
  console.log(`✅ 已儲存到 public/${outputFile}`);
  return true;
}

try {
  await generate(SIDEBAR_PROMPT, "3:4", "ad-sidebar.png");
  await generate(BANNER_PROMPT, "16:9", "ad-banner.png");
  console.log("\n完成！可執行此腳本重新生成不同版本。");
} catch (err) {
  console.error("❌ 生成失敗：", err.message ?? err);
  process.exit(1);
}
