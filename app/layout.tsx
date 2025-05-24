import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Mavuso - Unique Dating Experiences",
  description: "Create and book unique dating experiences in your city",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <main className="pb-16 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}
