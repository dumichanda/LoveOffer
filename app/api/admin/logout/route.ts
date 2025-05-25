import { NextResponse } from "next/server"

export async function POST() {
  const response = NextResponse.json({ success: true })

  // Clear admin session cookie
  response.cookies.delete("admin-session")

  return response
}
