import type { Metadata } from "next";
import { Noto_Sans_TC, ZCOOL_KuaiLe } from "next/font/google";
import "./globals.css";

const notoSans = Noto_Sans_TC({
  weight: ["300", "400"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

const zcoolKuaiLe = ZCOOL_KuaiLe({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-title",
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
    <html lang="zh-TW" className={`${notoSans.variable} ${zcoolKuaiLe.variable} h-full`}>
      <body className="min-h-full flex flex-col relative z-[1]">{children}</body>
    </html>
  );
}
