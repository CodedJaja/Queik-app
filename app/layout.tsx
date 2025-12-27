import type { Metadata, Viewport } from "next"

import "./globals.css"

import { Inter, Cabin as V0_Font_Cabin, Geist_Mono as V0_Font_Geist_Mono, Shadows_Into_Light as V0_Font_Shadows_Into_Light } from 'next/font/google'

// Initialize fonts
const _cabin = V0_Font_Cabin({ subsets: ['latin'], weight: ["400","500","600","700"] })
const _geistMono = V0_Font_Geist_Mono({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"] })
const _shadowsIntoLight = V0_Font_Shadows_Into_Light({ subsets: ['latin'], weight: ["400"] })

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "FinFlow - Modern Financial Platform",
    template: "%s | FinFlow"
  },
  description: "A sophisticated fintech platform for managing investments and transactions with real-time analytics and AI-powered insights.",
  keywords: ["fintech", "investment", "portfolio", "trading", "wealth management"],
  authors: [{ name: "FinFlow Team" }],
  creator: "FinFlow",
  publisher: "FinFlow",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://finflow.com",
    title: "FinFlow - Modern Financial Platform",
    description: "Manage your wealth and investments with advanced analytics",
    images: [
      {
        url: "https://finflow.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "FinFlow Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FinFlow - Modern Financial Platform",
    description: "Manage your wealth and investments with advanced analytics",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
    generator: 'v0.app'
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" }
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
      </head>
      <body className={`${inter.className} antialiased bg-white text-slate-900`}>
        {children}
      </body>
    </html>
  )
}
