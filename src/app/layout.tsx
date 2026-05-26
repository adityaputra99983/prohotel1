import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import AnimatedBackground from "@/components/AnimatedBackground";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Forest Haven Resort - Penginapan Alam Kelas Atas",
  description: "Nikmati pengalaman menginap yang tak terlupakan di Forest Haven Resort. Fasilitas premium, layanan terbaik, dan ketenangan hutan alam.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${playfair.variable} ${inter.variable} scroll-smooth`}>
      <body className={`${inter.className} min-h-screen flex flex-col antialiased bg-bg-cream`}>
        <AnimatedBackground />
        <main className="relative z-10 flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}
