import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
});

export const metadata: Metadata = {
  title: {
    default: "БЛИЗКО — Платформа психологического здоровья",
    template: "%s | БЛИЗКО",
  },
  description:
    "Аудио-терапия с клиническим психологом. Короткие терапевтические аудиоролики для работы с тревогой, самооценкой, отношениями и выгоранием.",
  keywords: [
    "психолог",
    "аудио-терапия",
    "тревога",
    "самооценка",
    "выгорание",
    "психологическая помощь",
    "онлайн психолог",
  ],
  openGraph: {
    title: "БЛИЗКО — Платформа психологического здоровья",
    description:
      "Аудио-терапия с клиническим психологом. Короткие терапевтические аудиоролики.",
    type: "website",
    locale: "ru_RU",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${inter.variable} ${fraunces.variable} h-full`}
    >
      <body
        className="min-h-full flex flex-col antialiased"
        style={{
          fontFamily: "var(--font-body)",
        }}
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
