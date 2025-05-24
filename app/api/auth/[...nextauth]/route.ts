import NextAuth from "next-auth"
import { authOptions } from "@/lib/auth"

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

// Error handling (optional, but recommended)
// It's better to handle errors within authOptions or NextAuth itself
// rather than wrapping the entire handler in a try/catch.
// This example shows how you might log errors, but you should
// avoid exporting fallback handlers unless absolutely necessary.
// try {
//   const handler = NextAuth(authOptions)
//   export { handler as GET, handler as POST }
// } catch (error) {
//   console.error('NextAuth configuration error:', error)

//   // Fallback handler
//   export async function GET() {
//     return new Response('Authentication service temporarily unavailable', {
//       status: 503,
//       headers: { 'Content-Type': 'text/plain' }
//     })
//   }

//   export async function POST() {
//     return new Response('Authentication service temporarily unavailable', {
//       status: 503,
//       headers: { 'Content-Type': 'text/plain' }
//     })
//   }
// }
