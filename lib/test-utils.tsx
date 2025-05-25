import type React from "react"
import type { ReactElement } from "react"
import { render, type RenderOptions } from "@testing-library/react"
import { ThemeProvider } from "@/components/theme-provider"
import { SessionProvider } from "next-auth/react"
import { Toaster } from "@/components/ui/toaster"
import { expect } from "vitest"

// Mock session for testing
const mockSession = {
  user: {
    id: "test-user-id",
    name: "Test User",
    email: "test@example.com",
    image: "https://example.com/avatar.jpg",
  },
  expires: "2024-12-31",
}

interface AllTheProvidersProps {
  children: React.ReactNode
  session?: any
}

const AllTheProviders = ({ children, session = null }: AllTheProvidersProps) => {
  return (
    <SessionProvider session={session}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
        {children}
        <Toaster />
      </ThemeProvider>
    </SessionProvider>
  )
}

interface CustomRenderOptions extends Omit<RenderOptions, "wrapper"> {
  session?: any
}

const customRender = (ui: ReactElement, { session, ...options }: CustomRenderOptions = {}) =>
  render(ui, {
    wrapper: (props) => <AllTheProviders {...props} session={session} />,
    ...options,
  })

// Test data factories
export const createMockOffer = (overrides = {}) => ({
  id: "1",
  title: "Test Offer",
  description: "A test offer description",
  location: "Test Location",
  price: 100,
  priceType: "fixed" as const,
  category: "romantic" as const,
  images: ["https://example.com/image.jpg"],
  maxGuests: 2,
  hostId: "host-1",
  hostName: "Test Host",
  hostImage: "https://example.com/host.jpg",
  hostRating: 4.8,
  hostReviews: 25,
  isVerified: true,
  availableSlots: [
    {
      id: "slot-1",
      date: "2024-06-01",
      startTime: "18:00",
      endTime: "21:00",
      isBooked: false,
    },
  ],
  tags: ["romantic", "dinner"],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  ...overrides,
})

export const createMockUser = (overrides = {}) => ({
  id: "user-1",
  name: "Test User",
  email: "test@example.com",
  image: "https://example.com/user.jpg",
  bio: "Test user bio",
  age: 25,
  location: "Test City",
  interests: ["travel", "food"],
  ...overrides,
})

export const createMockBooking = (overrides = {}) => ({
  id: "booking-1",
  offerId: "1",
  userId: "user-1",
  slotId: "slot-1",
  guestCount: 2,
  specialRequests: "Test special request",
  status: "confirmed" as const,
  totalAmount: 200,
  createdAt: new Date().toISOString(),
  ...overrides,
})

export const createMockMessage = (overrides = {}) => ({
  id: "message-1",
  chatId: "chat-1",
  senderId: "user-1",
  senderName: "Test User",
  content: "Test message content",
  timestamp: new Date().toISOString(),
  isRead: false,
  ...overrides,
})

// Custom matchers
expect.extend({
  toBeInTheDocument(received) {
    const pass = received !== null
    return {
      message: () => (pass ? `Expected element not to be in the document` : `Expected element to be in the document`),
      pass,
    }
  },
})

// Re-export everything
export * from "@testing-library/react"
export { customRender as render, mockSession }
