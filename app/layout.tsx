import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from 'sonner';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BaatCheet | Personas",
  description: "Chat with AI personas of your favorite tech creators",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <head>
        <Script id="theme-init" strategy="beforeInteractive">
          {`
            try {
              var d = document.documentElement;
              var key = 'theme';
              var saved = localStorage.getItem(key);
              var sys = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
              var t = saved || sys;
              d.classList.remove('light','dark');
              d.classList.add(t);
              d.setAttribute('data-theme', t);
            } catch (e) { /* noop */ }
          `}
        </Script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Toaster richColors position="top-right" />
        {children}
      </body>
    </html>
  );
}
