import type React from "react"
import "./globals.css"

export const metadata = {
  title: "DateCraft - Unique Dating Experiences",
  description: "Discover unique dating experiences in South Africa",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
