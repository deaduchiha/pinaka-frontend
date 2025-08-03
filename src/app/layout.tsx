import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pinaka E-commerce",
  description: "Modern e-commerce platform built with Next.js",
  keywords: ["e-commerce", "shopping", "online store", "pinaka"],
  authors: [{ name: "Pinaka Team" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
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
    <html lang="fa" dir="rtl">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
