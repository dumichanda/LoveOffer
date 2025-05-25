import { render, screen, fireEvent, waitFor } from "@/lib/test-utils"
import { OfferCard } from "@/components/offer-card"
import { createMockOffer } from "@/lib/test-utils"
import { useAppStore } from "@/lib/store"

// Mock the store
jest.mock("@/lib/store")
const mockUseAppStore = useAppStore as jest.MockedFunction<typeof useAppStore>

describe("OfferCard", () => {
  const mockOffer = createMockOffer()
  const mockLikeOffer = jest.fn()
  const mockPassOffer = jest.fn()

  beforeEach(() => {
    mockUseAppStore.mockReturnValue({
      offers: [mockOffer],
      currentOffer: mockOffer,
      likeOffer: mockLikeOffer,
      passOffer: mockPassOffer,
      setCurrentOffer: jest.fn(),
      addOffer: jest.fn(),
      bookings: [],
      addBooking: jest.fn(),
      chats: [],
      messages: [],
      addMessage: jest.fn(),
      markAsRead: jest.fn(),
      notifications: [],
      addNotification: jest.fn(),
      markNotificationAsRead: jest.fn(),
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("renders offer information correctly", () => {
    render(<OfferCard />)

    expect(screen.getByText(mockOffer.title)).toBeInTheDocument()
    expect(screen.getByText(mockOffer.description)).toBeInTheDocument()
    expect(screen.getByText(mockOffer.location)).toBeInTheDocument()
    expect(screen.getByText(`R${mockOffer.price}`)).toBeInTheDocument()
    expect(screen.getByText(`by ${mockOffer.hostName}`)).toBeInTheDocument()
  })

  it("displays host verification badge when verified", () => {
    render(<OfferCard />)

    expect(screen.getByText("Verified Host")).toBeInTheDocument()
  })

  it("shows correct rating and review count", () => {
    render(<OfferCard />)

    expect(screen.getByText(mockOffer.hostRating.toString())).toBeInTheDocument()
    expect(screen.getByText(`${mockOffer.hostReviews} reviews`)).toBeInTheDocument()
  })

  it("displays available time slot information", () => {
    render(<OfferCard />)

    const slot = mockOffer.availableSlots[0]
    expect(screen.getByText(new RegExp(slot.startTime))).toBeInTheDocument()
    expect(screen.getByText(new RegExp(slot.endTime))).toBeInTheDocument()
  })

  it("calls likeOffer when like button is clicked", async () => {
    render(<OfferCard />)

    const likeButton = screen.getByRole("button", { name: /like/i })
    fireEvent.click(likeButton)

    await waitFor(() => {
      expect(mockLikeOffer).toHaveBeenCalledWith(mockOffer.id)
    })
  })

  it("calls passOffer when pass button is clicked", async () => {
    render(<OfferCard />)

    const passButton = screen.getByRole("button", { name: /pass/i })
    fireEvent.click(passButton)

    await waitFor(() => {
      expect(mockPassOffer).toHaveBeenCalledWith(mockOffer.id)
    })
  })

  it("displays category tags", () => {
    render(<OfferCard />)

    mockOffer.tags.forEach((tag) => {
      expect(screen.getByText(tag)).toBeInTheDocument()
    })
  })

  it("shows max guests information", () => {
    render(<OfferCard />)

    expect(screen.getByText(`Max ${mockOffer.maxGuests} guests`)).toBeInTheDocument()
  })

  it("handles missing offer gracefully", () => {
    mockUseAppStore.mockReturnValue({
      offers: [],
      currentOffer: null,
      likeOffer: mockLikeOffer,
      passOffer: mockPassOffer,
      setCurrentOffer: jest.fn(),
      addOffer: jest.fn(),
      bookings: [],
      addBooking: jest.fn(),
      chats: [],
      messages: [],
      addMessage: jest.fn(),
      markAsRead: jest.fn(),
      notifications: [],
      addNotification: jest.fn(),
      markNotificationAsRead: jest.fn(),
    })

    render(<OfferCard />)

    expect(screen.getByText("No offers available")).toBeInTheDocument()
  })
})
