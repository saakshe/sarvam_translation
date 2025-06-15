import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { ThemeToggle } from "./components/theme-toggle";
import { Montserrat } from 'next/font/google';

const geist = Geist({
  subsets: ["latin"],
});

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  title: "Language Translator",
  description: "Translate text between Indian languages",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${montserrat.variable} font-montserrat bg-background text-foreground antialiased`}>
        <Providers>
          <ThemeToggle />
          {children}
        </Providers>
      </body>
    </html>
  );
}
