"use client";
import Footer from "@/components/Footer";
import "./globals.css";
import Header from "@/components/Header";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { ThemeProvider } from "next-themes";
import type { Metadata } from "next";


config.autoAddCss = false;

export const metadata: Metadata = {
  title: 'Ohana 日記',
  description: 'Ohana日記は、毎日の経験や学びを綴った日記を通じて成長を記録するウェブサイトです。日々の生活で得た気づきや知識を共有し、自己向上を目指す場を提供します。',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang="en">
        <body className=" flex flex-col min-h-screen tracking-widest ">
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            storageKey="theme"
          >
            <Header />
            {children}
            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
