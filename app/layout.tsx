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
  title: "樹洞 — 說說心裡的話",
  description: "一個安靜的地方，說說心事。不評斷，不說教，只是陪著你。",
  openGraph: {
    title: "樹洞 — 說說心裡的話",
    description: "一個安靜的地方，說說心事。不評斷，不說教，只是陪著你。",
    locale: "zh_TW",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-TW" className={`${notoSans.variable} h-full`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=ZCOOL+KuaiLe&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col relative z-[1]">{children}</body>
    </html>
  );
}
