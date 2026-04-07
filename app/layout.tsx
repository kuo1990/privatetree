import type { Metadata } from "next";
import { Noto_Sans_TC } from "next/font/google";
import "./globals.css";

const notoSans = Noto_Sans_TC({
  weight: ["300", "400"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://privatetree.vercel.app"),
  title: "樹洞爺爺 — 說說心裡的話 | Tree Hollow",
  description:
    "樹洞爺爺是免費、匿名的 AI 傾訴空間。不需登入，不留記錄，說完即消失。心情難受時，讓樹洞爺爺靜靜陪你說說心事。不評斷、不說教，只是陪著你。",
  openGraph: {
    title: "樹洞爺爺 — 說說心裡的話 | Tree Hollow",
    description:
      "樹洞爺爺是免費、匿名的 AI 傾訴空間。不需登入，不留記錄，說完即消失。心情難受時，讓樹洞爺爺靜靜陪你說說心事。",
    locale: "zh_TW",
    type: "website",
    url: "https://privatetree.vercel.app",
    images: [{ url: "/grandpa.png", width: 1200, height: 630, alt: "樹洞爺爺" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "樹洞爺爺 — 說說心裡的話",
    description: "免費、匿名 AI 傾訴空間。不評斷、不說教，只是陪著你。",
    images: ["/grandpa.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-TW" className={`${notoSans.variable} h-full`}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=ZCOOL+KuaiLe&display=swap"
        rel="stylesheet"
      />
      <body className="min-h-full flex flex-col relative z-[1]">{children}</body>
    </html>
  );
}
