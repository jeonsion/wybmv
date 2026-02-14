import type { Metadata } from "next";
import { Nunito, Pacifico } from "next/font/google";
import "./globals.css";

const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito" });
const pacifico = Pacifico({ subsets: ["latin"], weight: "400", variable: "--font-pacifico" });

export const metadata: Metadata = {
  title: "Will You Be My Valentine?",
  description: "A cute valentine page with yes/no interactions"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.variable} ${pacifico.variable} font-sans`}>{children}</body>
    </html>
  );
}
