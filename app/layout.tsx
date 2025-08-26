import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Playfair_Display } from "next/font/google"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  title: "Floating Thoughts - 思考者的诗意空间",
  description: "一个极简的思考空间，让思想如梦境般漂浮",
  generator: "v0.app",
  icons: {
    icon: [
      { url: '/thinker.webp', type: 'image/webp' },
      { url: '/favicon.ico', type: 'image/x-icon' }
    ],
    shortcut: '/thinker.webp',
    apple: '/thinker.webp',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
  --font-playfair: ${playfair.variable};
}
        `}</style>
      </head>
      <body className={`${playfair.variable}`}>{children}</body>
    </html>
  )
}
