@AGENTS.md

# 樹洞專案說明

## 專案定位
匿名傾訴網站，使用者說心事，Gemini 以「樹洞」角色溫柔回應。
目標受眾：對 AI 不熟悉、想抒發情緒的一般使用者。
主打：設計溫暖、童話書風格、隱私保護、無需登入。支援中英文。

## 技術棧
- Next.js 16 (App Router) + Tailwind CSS v4
- Google Gemini API (`@google/genai`)：對話用 `gemini-2.5-flash`
- 首頁插圖：Imagen 4 生成，存於 `public/grandpa.png`
- 廣告佔位圖：`public/ad-sidebar.png`、`public/ad-banner.png`（Imagen 4 生成）
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
- 廣告位用 `AdSlot` 元件佔位（顯示生成的廣告佔位圖），之後換 Google AdSense
- 插圖用 `unoptimized` 避免 Next.js Image 快取問題
- 每次重新生成插圖後需清 `.next/cache/images/`
- gemini-2.0-flash 已停用，改用 gemini-2.5-flash

## 多語言（i18n）
- 無外部套件，純 client-side 偵測：`navigator.language` 開頭 `zh` → 中文，其他 → 英文
- 所有 UI 字串集中在 `lib/i18n.ts`（`translations` 物件 + `useLocale()` hook）
- API 接收 `locale` 參數，`lib/gemini.ts` 根據 locale 選擇對應 system prompt
- 兩份完整 system prompt：中文版（SYSTEM_PROMPT_ZH）、英文版（SYSTEM_PROMPT_EN）
- 初始 SSR 顯示中文，`useEffect` 後切換為正確語言（避免 hydration 錯誤）

## RWD
- 首頁廣告：手機 320×50，桌面 728×90（用 `block md:hidden` / `hidden md:block` 切換）
- 首頁角落裝飾：`hidden sm:block`，手機不顯示
- ChatBubble 寬度：手機 `max-w-[85%]`，桌面 `max-w-[76%]`
- 聊天側欄廣告：`hidden lg:flex`，只在大螢幕顯示

## AI 人設
- 古老樹洞，見過無數人走來哭泣沉默離開，時間流動慢，永不急
- 說話方式：短句留白、根據話語重量調整密度、自然使用自然意象、往裡走的問題
- 明確禁止：清單建議、急著正向、套話（「我理解你的感受」等）

## 安全防護（已實作）
- Rate limiting：每 IP 每分鐘 15 次
- 輸入驗證：訊息數上限 20、每筆 2000 字
- HTTP security headers：CSP、HSTS、X-Frame-Options 等
- Gemini Safety Filter 偵測色情/暴力（finishReason === "SAFETY"）
- System Prompt 包含：自殺危機引導（1925）、未成年保護（113）、Prompt Injection 防禦

## 重新生成圖片
```bash
# 首頁插圖
node scripts/generate-illustration.mjs
rm -rf .next/cache/images

# 廣告佔位圖
node scripts/generate-ads.mjs
```
