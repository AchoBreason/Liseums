import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "谱相留白 LISEUMS | Life Slices Protocol",
  description: "在社会时钟之外，存档你的真实。Life Slices Protocol / 人生切片协议。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={`${inter.variable} font-sans antialiased selection:bg-neutral-800/10`}>
        {children}
      </body>
    </html>
  );
}
