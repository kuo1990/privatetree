import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    localPatterns: [{ pathname: "/grandpa.png" }],
  },

  async headers() {
    return [
      {
        // HTML 頁面不快取，確保用戶永遠拿到最新版
        source: "/",
        headers: [
          { key: "Cache-Control", value: "no-cache, no-store, must-revalidate" },
        ],
      },
      {
        source: "/chat",
        headers: [
          { key: "Cache-Control", value: "no-cache, no-store, must-revalidate" },
        ],
      },
      {
        source: "/(.*)",
        headers: [
          // 防止 Clickjacking
          { key: "X-Frame-Options", value: "DENY" },
          // 防止 MIME sniffing
          { key: "X-Content-Type-Options", value: "nosniff" },
          // 不傳送 Referer，保護使用者來源隱私
          { key: "Referrer-Policy", value: "no-referrer" },
          // 禁用不必要的瀏覽器功能
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          // 強制 HTTPS（部署後生效）
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          // CSP：限制資源來源，防 XSS
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              // Next.js 需要 inline script（nonce 方案較複雜，先用 unsafe-inline）
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob:",
              "connect-src 'self'",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
