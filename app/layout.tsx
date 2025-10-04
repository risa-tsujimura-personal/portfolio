import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Kaisei_Decol } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Suspense } from "react"
import localFont from "next/font/local"

const kaiseiDecol = Kaisei_Decol({
  subsets: ["latin"],
  variable: "--font-kaisei-decol",
  display: "swap",
  weight: ["400", "500", "700"],
})

const bodoni = localFont({
  src: [
    // 置いた実ファイル名に合わせて変更
    { path: "./fonts/Bodoni-Regular.woff2", weight: "400", style: "normal" },
    // { path: "./fonts/Bodoni-Italic.ttf",  weight: "400", style: "italic" },
    // { path: "./fonts/Bodoni-Bold.ttf",    weight: "700", style: "normal" },
  ],
  variable: "--font-bodoni",
  display: "swap",
})

export const metadata: Metadata = {
  title: "v0 App",
  description: "Created with v0",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={`... bg-[url('/background.png')] bg-[length:100%_auto] bg-repeat-y bg-top bg-center font-bodoni ${GeistSans.variable} ${GeistMono.variable} ${kaiseiDecol.variable} ${bodoni.variable}`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}