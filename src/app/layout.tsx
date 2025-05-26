import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LifeLevels.AI - Level Up Your Life",
  description: "A beautiful, engaging dashboard that scores every level of life and helps you live better through AI coaching and data-driven insights.",
  keywords: ["life tracking", "personal development", "AI coaching", "wellness", "productivity"],
  authors: [{ name: "LifeLevels.AI" }],
  creator: "LifeLevels.AI",
  publisher: "LifeLevels.AI",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  openGraph: {
    title: "LifeLevels.AI - Level Up Your Life",
    description: "A beautiful, engaging dashboard that scores every level of life and helps you live better through AI coaching and data-driven insights.",
    url: "/",
    siteName: "LifeLevels.AI",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "LifeLevels.AI Dashboard",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LifeLevels.AI - Level Up Your Life",
    description: "A beautiful, engaging dashboard that scores every level of life and helps you live better through AI coaching and data-driven insights.",
    images: ["/og-image.png"],
    creator: "@lifelevelsai",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background font-sans`}
      >
        <Providers>
          <div className="relative flex min-h-screen flex-col">
            <div className="flex-1">
              {children}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
