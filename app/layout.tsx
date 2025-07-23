import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NavigationWrapper } from "@/components/NavigationWrapper";
import { CartProvider } from "@/lib/CartContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "紙箱小屋 - 幼兒紙箱傢俱專賣店",
  description: "專為幼兒設計的環保紙箱傢俱，安全無毒，創意無限。包含紙箱小廚房、遊戲屋、折疊椅等多種產品。",
  keywords: "幼兒傢俱, 紙箱傢俱, 環保玩具, DIY傢俱, 兒童遊戲屋",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&family=Noto+Sans+TC:wght@300;400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className={`${inter.variable} antialiased min-h-screen flex flex-col`}>
        <CartProvider>
          <NavigationWrapper />
          <main className="flex-1">
            {children}
          </main>
          <footer className="bg-card border-t border-border py-8 px-4">
            <div className="container mx-auto text-center text-muted-foreground">
              <p>&copy; 2025 紙箱小屋. 讓創意從紙箱開始</p>
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
