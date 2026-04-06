@AGENTS.md

# 樹洞專案說明

## 專案定位
匿名傾訴網站，使用者說心事，Gemini 2.0 Flash 以「樹洞」角色溫柔回應。
目標受眾：對 AI 不熟悉、想抒發情緒的一般使用者。
主打：設計溫暖、童話書風格、隱私保護、無需登入。

## 技術棧
- Next.js 16 (App Router) + Tailwind CSS v4
- Google Gemini API (`@google/genai`)：對話用 `gemini-2.0-flash`
- 首頁插圖：Imagen 4 生成，存於 `public/grandpa.png`
- 部署目標：Vercel

## 設計系統
色彩（`app/globals.css` `@theme`）：
- `--color-paper` #FEF6E4 頁面背景（泛黃紙張）
- `--color-aged` #F2E8D0 次要背景
- `--color-ink` #3D2B1F 主要文字
- `--color-rust` #C0522A 主要按鈕
- `--color-gold` #C17F24 裝飾色
字型：`--font-title`（ZCOOL KuaiLe 手寫感）、`--font-body`（Noto Sans TC）

## 重要決策記錄
- 不儲存對話，session 結束即消失（隱私核心設計）
- 不加登入帳號，匿名是產品價值
- 廣告位用 `AdSlot` 元件佔位，之後換 Google AdSense
- 插圖用 `unoptimized` 避免 Next.js Image 快取問題
- 每次重新生成插圖後需清 `.next/cache/images/`

## 安全防護（已實作）
- Rate limiting：每 IP 每分鐘 15 次
- 輸入驗證：訊息數上限 20、每筆 2000 字
- HTTP security headers：CSP、HSTS、X-Frame-Options 等
- Gemini Safety Filter 偵測色情/暴力（finishReason === "SAFETY"）
- System Prompt 包含：自殺危機引導（1925）、未成年保護（113）、Prompt Injection 防禦

## 重新生成插圖
```bash
node scripts/generate-illustration.mjs
rm -rf .next/cache/images
```
