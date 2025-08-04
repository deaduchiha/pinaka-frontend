import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const vazirmatn = Vazirmatn();

export const metadata: Metadata = {
  title: "Pinaka E-commerce",
  description: "Modern e-commerce platform built with Next.js",
  keywords: ["e-commerce", "shopping", "online store", "pinaka"],
  openGraph: {
    title: "Pinaka E-commerce",
    description: "Modern e-commerce platform built with Next.js",
    type: "website",
    locale: "fa_IR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa_IR" dir="rtl">
      <body className={vazirmatn.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
