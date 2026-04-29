import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ferrari — The Art of Speed",
  description:
    "Experience the pinnacle of automotive engineering. Ferrari — where passion meets precision since 1947.",
  keywords: ["Ferrari", "luxury cars", "sports cars", "supercar", "racing"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${playfair.variable} ${montserrat.variable}`}>
      <body>{children}</body>
    </html>
  );
}
